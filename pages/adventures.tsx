import { Box, useBreakpointValue, useColorMode } from "@chakra-ui/react"
import geoJson from "@mapbox/togeojson"
import type { FeatureCollection } from "geojson"
import mapboxgl from "mapbox-gl"
import type { FC } from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import SunCalc from "suncalc"
import { DOMParser } from "xmldom"

import { Controls } from "../components/Adventures/Controls"
import { Navigation } from "../components/Adventures/Navigation"
import { Story } from "../components/Adventures/Story"
import type { Adventure } from "../studio/schema"
import theme from "../theme/index"
import "mapbox-gl/dist/mapbox-gl.css"
import sanity from "../utils/sanity-client"

interface SanityFileAsset {
  _createdAt: string
  _id: string
  _rev: string
  _type: "sanity.fileAsset"
  _updatedAt: string
  assetId: string
  extension: string
  mimeType: string
  originalFilename: string
  path: string
  sha1hash: string
  size: number
  uploadId: string
  url: string
}

type Zoom = number
type Bearing = number
type Pitch = number
type Longitude = number
type Latitude = number

export interface IndexedAdventure extends Adventure {
  index: number
}

export type Fly = ([zoom, bearing, pitch, longitude, latitude]: [
  Zoom,
  Bearing,
  Pitch,
  Longitude,
  Latitude
]) => void

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T
type AdventureProps = UnwrapPromise<ReturnType<typeof getStaticProps>>["props"]

export type ParseViewport = (
  view: string
) => [Zoom, Bearing, Pitch, Latitude, Longitude]

export const parseViewport: ParseViewport = (view: string) => {
  const parsed = view.split(" ")
  const [zoom, bearing, pitch, latitude, longitude] = parsed.map(x => Number(x))
  return [zoom, bearing, pitch, latitude, longitude]
}

const Map: FC<AdventureProps> = ({
  dataset,
  projectId,
  token,
  style,
  tracks,
  adventures,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<mapboxgl.Map>(null)

  const rotate = useCallback(() => {
    map.rotateTo(map.getBearing() + 90, {
      duration: 24000,
      easing: t => t,
    })
  }, [map])

  const rotateCamera = useCallback(() => {
    if (map) {
      map.on("moveend", rotate)
    }
  }, [map, rotate])

  const fly: Fly = ([zoom, bearing, pitch, longitude, latitude]) => {
    map.flyTo({
      zoom,
      bearing,
      pitch,
      center: [longitude, latitude],
    })
  }

  const { colorMode } = useColorMode()

  useEffect(() => {
    if (map) {
      if (colorMode === "light") {
        map.setPaintProperty("sky-day", "sky-opacity", 1)
        map.setPaintProperty("sky-night", "sky-opacity", 0)
        map.setFog({ color: "white" })
      } else {
        map.setPaintProperty("sky-day", "sky-opacity", 0)
        map.setPaintProperty("sky-night", "sky-opacity", 1)
        map.setFog({ color: "rgba(66, 88, 106, 1.0)" })
      }
    }
  }, [colorMode, map])

  useEffect(() => {
    const [zoom, bearing, pitch, latitude, longitude] = parseViewport(
      adventures[0].initialView
    )
    const initMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style,
      accessToken: token,
      center: [latitude, longitude],
      zoom,
      pitch,
      bearing,
    })

    initMap.on("load", () => {
      const sunTimes = SunCalc.getTimes(
        new Date(Date.now()),
        initMap.getCenter().lat,
        initMap.getCenter().lng
      )

      const getSunPosition = () => {
        const center = initMap.getCenter()
        const sunPos = SunCalc.getPosition(
          sunTimes.solarNoon,
          center.lat,
          center.lng
        )
        const sunAzimuth = 180 + (sunPos.azimuth * 180) / Math.PI
        const sunAltitude = 90 - (sunPos.altitude * 180) / Math.PI
        return [sunAzimuth, sunAltitude]
      }

      initMap.addLayer({
        id: "sky-day",
        type: "sky",
        paint: {
          "sky-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            0,
            5,
            0.3,
            8,
            1,
          ],
          "sky-type": "atmosphere",
          "sky-atmosphere-sun": getSunPosition(),
          "sky-atmosphere-sun-intensity": 5,
        },
      })

      initMap.addLayer({
        id: "sky-night",
        type: "sky",
        paint: {
          "sky-type": "atmosphere",
          "sky-atmosphere-halo-color": "rgba(255, 255, 255, 0.5)",
          "sky-atmosphere-color": "rgba(255, 255, 255, 0.2)",
          "sky-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            0,
            5,
            0.3,
            8,
            1,
          ],
          "sky-atmosphere-sun-intensity": 5,
          "sky-atmosphere-sun": getSunPosition(),
        },
      })

      tracks.forEach((track, i) => {
        initMap.addSource(`line${i}`, {
          data: {
            ...track,
            features: track.features.filter(feature =>
              ["MultiLineString", "LineString"].includes(feature.geometry.type)
            ),
          },
          type: "geojson",
        })

        initMap.addLayer({
          id: `line${i}`,
          source: `line${i}`,
          type: "line",
          paint: {
            "line-color": theme.colors.cyan["600"],
            "line-width": 4,
          },
        })

        if (track.features.some(feature => feature.geometry.type === "Point")) {
          initMap.addSource(`points${i}`, {
            type: "geojson",
            data: {
              ...track,
              features: track.features.filter(
                feature => feature.geometry.type === "Point"
              ),
            },
          })

          initMap.addLayer({
            id: `points${i}`,
            source: `points${i}`,
            type: "symbol",
            layout: {
              "icon-size": 2,
              "icon-image": "marker-11",
              "text-size": 14,
              "text-field": ["get", "desc"],
              "text-justify": "center",
            },
            paint: {
              "icon-color": theme.colors.yellow["400"],
              "text-color": theme.colors.cyan["100"],
              "text-halo-color": theme.colors.cyan["700"],
              "text-translate": [0, 20],
            },
          })
        }
      })

      initMap.rotateTo(initMap.getBearing() + 90, {
        duration: 24000,
        easing: t => t,
      })

      setMap(initMap)
    })

    return () => initMap.remove()
  }, [style, token, tracks, adventures])

  const [rotating, setRotate] = useState(true)

  useEffect(() => {
    if (map) {
      if (rotating) {
        rotate()
      } else {
        map.off("moveend", rotate)
        map.stop()
      }
    }
  }, [map, rotating, rotateCamera, rotate])

  useEffect(() => {
    if (map) {
      map.on("mousedown", () => {
        map.off("moveend", rotate)
        map.stop()
      })
    }
  }, [rotate, map])

  const [activeAdventure, setActiveAdventure] = useState({
    ...adventures[0],
    index: 0,
  })

  const size: "base" | "xs" | "sm" | "md" | "lg" | "xl" = useBreakpointValue({
    base: "base",
    xs: "xs",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
  })

  return (
    <Box h={{ base: "auto", xl: "calc(100vh - 64px)" }} id="top">
      <Navigation
        adventures={adventures}
        fly={fly}
        rotateCamera={rotateCamera}
        setActiveAdventure={setActiveAdventure}
      />

      <Story
        activeAdventure={activeAdventure}
        dataset={dataset}
        fly={fly}
        projectId={projectId}
        size={size}
        tracks={tracks}
      />

      <Box h="calc(100vh - 64px)">
        <Box ref={mapContainerRef} height="100%" id="map" width="100%" />
      </Box>

      <Controls rotating={rotating} setRotate={setRotate} size={size} />
    </Box>
  )
}

export default Map

export const getStaticProps = async (): Promise<{
  props: {
    dataset: string
    token: string
    style: string
    projectId: string
    tracks: FeatureCollection[]
    adventures: Adventure[]
  }
}> => {
  const adventures = await sanity.getAll("adventure")
  adventures.sort((a, b) => (a.order > b.order ? 1 : -1))

  const tracks = await Promise.all(
    adventures.map(async adventure => {
      const expanded = ((await sanity.expand<Adventure>(
        adventure.gpx.asset
      )) as unknown) as SanityFileAsset

      const res = await fetch(expanded.url)
      const data = await res.blob()
      const gpxString = await data.text()

      const gpxFile = new DOMParser().parseFromString(gpxString)

      return geoJson.gpx(gpxFile)
    })
  )

  return {
    props: {
      dataset: process.env.SANITY_STUDIO_API_DATASET,
      token: process.env.MAPBOX_TOKEN,
      projectId: process.env.SANITY_STUDIO_API_PROJECT_ID,
      style: process.env.MAPBOX_STYLE,
      tracks,
      adventures,
    },
  }
}
