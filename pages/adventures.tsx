import {
  Box,
  Button,
  Container,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react"
import geoJson from "@mapbox/togeojson"
import { easeCubic } from "d3"
import type { FeatureCollection } from "geojson"
import mapboxgl from "mapbox-gl"
import type { FC, SetStateAction } from "react"
import { useEffect, useRef, useState } from "react"
import type { MapRef } from "react-map-gl"
import ReactMapGL, { FlyToInterpolator, Layer, Source } from "react-map-gl"
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
  const mapRef = useRef<MapRef>(null)
  interface ViewPort {
    width: string
    height: string
    latitude: number
    longitude: number
    zoom: number
    pitch: number
    bearing: number
    transitionDuration?: number
    transitionInterpolator?: FlyToInterpolator
    transitionEasing?: (time: number) => number
  }

  type Zoom = number
  type Bearing = number
  type Pitch = number
  type Longitude = number
  type Latitude = number

  const parseViewport = (
    view: string
  ): [Zoom, Bearing, Pitch, Longitude, Latitude] => {
    const parsed = view.split(" ")
    const [zoom, bearing, pitch, longitude, latitude] = parsed.map(x =>
      Number(x)
    )
    return [zoom, bearing, pitch, longitude, latitude]
  }

  const [viewport, setViewport] = useState<ViewPort>({
    width: "100%",
    height: "100%",
    latitude: 35.790266,
    longitude: -118.063029,
    zoom: 14.19,
    pitch: 43.92,
    bearing: 0,
  })

  const updateView = ([zoom, bearing, pitch, longitude, latitude]: [
    Zoom,
    Bearing,
    Pitch,
    Longitude,
    Latitude
  ]) => {
    setViewport({
      ...viewport,
      latitude,
      longitude,
      zoom,
      pitch,
      bearing,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic,
    })
  }

  const rotateCamera = () => {
    const map = mapRef.current.getMap() as mapboxgl.Map
    map.on("moveend", () => {
      const rotateNumber = map.getBearing()
      map.rotateTo(rotateNumber + 90, {
        duration: 24000,
        easing: t => t,
      })
    })
  }

  useEffect(() => {
    rotateCamera()
  }, [])

  const [activeAdventure, setActiveAdventure] = useState(adventures[0])

  return (
    <Box h="calc(100vh - 64px)">
      <Container left={8} maxW="md" mt={8} position="absolute" zIndex={1000}>
        <Heading as="h2">{activeAdventure.title}</Heading>
        {activeAdventure.stories.map(story => (
          <div key={story._key}>
            <Heading as="h3">{story.headline}</Heading>
            <Text>{story.body}</Text>
          </div>
        ))}
      </Container>

      <Container maxW="xs" mt={8} position="absolute" right={8} zIndex={1000}>
        <UnorderedList listStyleType="none" marginInlineStart={0}>
          {adventures.map(adventure => (
            <ListItem key={adventure._id} mb={2}>
              <Button
                colorScheme="teal"
                variant="ghost"
                onClick={() => {
                  updateView(parseViewport(adventure.initialView))
                  setActiveAdventure(adventure)
                }}
              >
                {adventure.title}
              </Button>
            </ListItem>
          ))}
        </UnorderedList>
      </Container>
      <ReactMapGL
        {...viewport}
        ref={mapRef}
        mapboxApiAccessToken={token}
        mapStyle={style}
        onViewportChange={(nextViewport: SetStateAction<ViewPort>) =>
          setViewport(nextViewport)
        }
      >
        {tracks.map((track, i) => (
          <div key={i}>
            <Source
              data={{
                ...track,
                features: track.features.filter(feature =>
                  ["MultiLineString", "LineString"].includes(
                    feature.geometry.type
                  )
                ),
              }}
              id={`line${i}`}
              type="geojson"
            >
              <Layer
                paint={{
                  "line-color": theme.colors.cyan["600"],
                  "line-width": 2,
                }}
                type="line"
              />
            </Source>

            {track.features.some(
              feature => feature.geometry.type === "Point"
            ) && (
              <Source
                data={{
                  ...track,
                  features: track.features.filter(
                    feature => feature.geometry.type === "Point"
                  ),
                }}
                id="points"
                type="geojson"
              >
                <Layer
                  layout={{
                    "icon-size": 2,
                    "icon-image": "marker-11",
                  }}
                  paint={{
                    "icon-color": theme.colors.yellow["400"],
                    "text-color": theme.colors.cyan["100"],
                    "text-halo-color": theme.colors.cyan["700"],
                  }}
                  type="symbol"
                />
              </Source>
            )}
          </div>
        ))}
      </ReactMapGL>
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
      token: process.env.MAPBOX_TOKEN,
      style: process.env.MAPBOX_STYLE,
      tracks,
      adventures,
    },
  }
}
