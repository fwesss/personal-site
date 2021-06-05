import {
  Box,
  Button,
  Container,
  Heading,
  ListItem,
  Text,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react"
import geoJson from "@mapbox/togeojson"
import type { FeatureCollection } from "geojson"
import mapboxgl from "mapbox-gl"
import type { FC } from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { DOMParser } from "xmldom"

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

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T
type AdventureProps = UnwrapPromise<ReturnType<typeof getStaticProps>>["props"]

const Map: FC<AdventureProps> = ({ token, style, tracks, adventures }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<mapboxgl.Map>(null)

  type Zoom = number
  type Bearing = number
  type Pitch = number
  type Longitude = number
  type Latitude = number

  const parseViewport = (
    view: string
  ): [Zoom, Bearing, Pitch, Latitude, Longitude] => {
    const parsed = view.split(" ")
    const [zoom, bearing, pitch, latitude, longitude] = parsed.map(x =>
      Number(x)
    )
    return [zoom, bearing, pitch, latitude, longitude]
  }

  const rotate = useCallback(() => {
    map.rotateTo(map.getBearing() + 90, {
      duration: 24000,
      easing: t => t,
    })
  }, [map])

  const rotateCamera = () => {
    if (map) {
      map.on("moveend", rotate)
    }
  }

  const fly = ([zoom, bearing, pitch, longitude, latitude]: [
    Zoom,
    Bearing,
    Pitch,
    Longitude,
    Latitude
  ]) => {
    map.flyTo({
      zoom,
      bearing,
      pitch,
      center: [longitude, latitude],
    })
  }

  useEffect(() => {
    const initMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style,
      accessToken: token,
      center: [-118.063029, 35.790266],
      zoom: 14.19,
      pitch: 43.92,
      bearing: 0,
    })

    initMap.on("load", () => {
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
            "line-width": 2,
          },
        })

        if (track.features.some(feature => feature.geometry.type === "Point")) {
          initMap.addSource("points", {
            type: "geojson",
            data: {
              ...track,
              features: track.features.filter(
                feature => feature.geometry.type === "Point"
              ),
            },
          })

          initMap.addLayer({
            id: "points",
            source: "points",
            type: "symbol",
            layout: { "icon-size": 2, "icon-image": "marker-11" },
            paint: {
              "icon-color": theme.colors.yellow["400"],
              "text-color": theme.colors.cyan["100"],
              "text-halo-color": theme.colors.cyan["700"],
            },
          })
        }
      })

      setMap(initMap)
    })

    return () => initMap.remove()
  }, [style, token, tracks])

  useEffect(() => {
    const stopRotation = () => {
      map.off("moveend", rotate)
      map.stop()
    }
    if (map) {
      map.on("mousedown", stopRotation)
    }
  }, [rotate, map])

  const [activeAdventure, setActiveAdventure] = useState({
    ...adventures[0],
    index: 0,
  })

  const goToAdventure = (
    adventure: Adventure,
    adventureIndex: number
  ): void => {
    fly(parseViewport(adventure.initialView))
    setActiveAdventure({ ...adventure, index: adventureIndex })
    rotateCamera()
  }

  useEffect(() => {
    console.log(tracks[0])
    console.log(
      tracks[activeAdventure.index].features.filter(
        feature =>
          feature.geometry.type === "Point" &&
          feature.properties.name.split(" ")[0] === "0"
      )
    )
  }, [activeAdventure.index, tracks])

  return (
    <Box h="calc(100vh - 64px)">
      <Container
        _hover={{
          bg: useColorModeValue(
            theme.colors.gray["50"],
            theme.colors.gray["900"]
          ),
        }}
        bg={useColorModeValue(
          `${theme.colors.gray["50"]}BB`,
          `${theme.colors.gray["900"]}BB`
        )}
        left={8}
        maxW="3xl"
        mt={8}
        position="absolute"
        px={12}
        zIndex={1000}
      >
        <Heading as="h2">{activeAdventure.title}</Heading>
        {activeAdventure.stories.map((story, storyIndex) => (
          <div key={story._key}>
            <Button
              as="h3"
              fontSize={28}
              size="lg"
              variant="link"
              onClick={() =>
                fly(
                  parseViewport(
                    tracks[activeAdventure.index].features
                      .filter(feature => feature.geometry.type === "Point")
                      .filter(
                        feature =>
                          Number(feature.properties.name.split(" ")[0]) ===
                          storyIndex
                      )[0].properties.cmt
                  )
                )
              }
            >
              {story.headline}
            </Button>
            <Text>{story.body}</Text>
          </div>
        ))}
      </Container>

      <Container
        _hover={{
          bg: useColorModeValue(
            theme.colors.gray["50"],
            theme.colors.gray["900"]
          ),
        }}
        bg={useColorModeValue(
          `${theme.colors.gray["50"]}BB`,
          `${theme.colors.gray["900"]}BB`
        )}
        maxW="xs"
        mt={8}
        position="absolute"
        right={8}
        zIndex={1000}
      >
        <UnorderedList listStyleType="none" marginInlineStart={0}>
          {adventures.map((adventure, adventureIndex) => (
            <ListItem key={adventure._id} mb={2}>
              <Button
                colorScheme="teal"
                variant="ghost"
                onClick={() => {
                  goToAdventure(adventure, adventureIndex)
                }}
              >
                {adventure.title}
              </Button>
            </ListItem>
          ))}
        </UnorderedList>
      </Container>
      <Box ref={mapContainerRef} height="100%" width="100%" />
    </Box>
  )
}

export default Map

export const getStaticProps = async (): Promise<{
  props: {
    token: string
    style: string
    tracks: FeatureCollection[]
    adventures: Adventure[]
  }
}> => {
  const adventures = await sanity.getAll("adventure")
  const tracks = await Promise.all(
    adventures.map(async adventure => {
      const expanded = (await sanity.expand<Adventure>(
        adventure.gpx.asset
      )) as unknown as SanityFileAsset

      const res = await fetch(expanded.url)
      const data = await res.blob()
      const gpxString = await data.text()

      const gpxFile = new DOMParser().parseFromString(gpxString)

      return geoJson.gpx(gpxFile)
    })
  )

  return {
    props: {
      token: process.env.MAPBOX_TOKEN,
      style: process.env.MAPBOX_STYLE,
      tracks,
      adventures,
    },
  }
}
