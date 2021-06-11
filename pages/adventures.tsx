import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  HStack,
  IconButton,
  Link,
  ListItem,
  UnorderedList,
  VStack,
  useBoolean,
  useBreakpointValue,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react"
import geoJson from "@mapbox/togeojson"
import type { FeatureCollection } from "geojson"
import mapboxgl from "mapbox-gl"
import type { FC } from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { FaExpand, FaWindowMinimize, FaArrowUp, FaRegMap } from "react-icons/fa"
import { RiRotateLockFill } from "react-icons/ri"
import { DOMParser } from "xmldom"

import Block from "../components/Block"
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

export type Fly = ([zoom, bearing, pitch, longitude, latitude]) => void
export type ParseViewport = (
  view: string
) => [Zoom, Bearing, Pitch, Latitude, Longitude]

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T
type AdventureProps = UnwrapPromise<ReturnType<typeof getStaticProps>>["props"]

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

  const rotateCamera = useCallback(() => {
    if (map) {
      map.on("moveend", rotate)
    }
  }, [map, rotate])

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
      initMap.setFog({
        range: [1, 12],
        color: "white",
        "horizon-blend": 0.1,
      })

      initMap.addLayer({
        id: "sky-day",
        type: "sky",
        paint: {
          "sky-type": "gradient",
          "sky-opacity-transition": { duration: 400 },
        },
      })

      initMap.addLayer({
        id: "sky-night",
        type: "sky",
        paint: {
          "sky-type": "atmosphere",
          "sky-atmosphere-sun": [90, 0],
          "sky-atmosphere-halo-color": "rgba(255, 255, 255, 0.5)",
          "sky-atmosphere-color": "rgba(255, 255, 255, 0.2)",
          "sky-opacity": 0,
          "sky-opacity-transition": { duration: 400 },
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

  const goToAdventure = (
    adventure: Adventure,
    adventureIndex: number
  ): void => {
    fly(parseViewport(adventure.initialView))
    setActiveAdventure({ ...adventure, index: adventureIndex })
    rotateCamera()
  }

  const buttonHoverColor = useColorModeValue("teal.600", "teal.200")

  const [minimized, setMinimized] = useBoolean(false)
  const size = useBreakpointValue({
    base: "base",
    xs: "xs",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
  })

  return (
    <Box h={{ base: "auto", xl: "calc(100vh - 64px)" }} id="top">
      <Center
        _hover={{
          bg: useColorModeValue(
            theme.colors.gray["50"],
            theme.colors.gray["900"]
          ),
        }}
        align="center"
        background={useColorModeValue("white", "gray.800")}
        bg={useColorModeValue(
          `${theme.colors.gray["50"]}CB`,
          `${theme.colors.gray["900"]}CB`
        )}
        borderRadius="xl"
        boxShadow="xl"
        my={{ base: 0, xl: 4 }}
        position={{ xl: "absolute" }}
        px={6}
        py={{ base: 0, xl: 6 }}
        right={4}
        sx={{ backdropFilter: "blur(4px)" }}
        transition="all 0.2s"
        zIndex={1000}
      >
        <UnorderedList listStyleType="none" marginInlineStart={0}>
          {adventures.map((adventure, adventureIndex) => (
            <ListItem key={adventure._id} mb={2}>
              <Button
                _hover={{
                  borderColor: "currentcolor",
                  color: buttonHoverColor,
                }}
                borderBottom="2px"
                borderColor={{ base: "teal.600", xl: "transparent" }}
                borderRadius={0}
                colorScheme="teal"
                pointerEvents="all"
                transition="all 0.2s"
                variant="unstyled"
                onClick={() => {
                  goToAdventure(adventure, adventureIndex)
                }}
              >
                {adventure.title}
              </Button>
            </ListItem>
          ))}
        </UnorderedList>
      </Center>

      <Container
        _hover={{
          bg: useColorModeValue(
            theme.colors.gray["50"],
            theme.colors.gray["900"]
          ),
        }}
        bg={useColorModeValue(
          `${theme.colors.gray["50"]}CB`,
          `${theme.colors.gray["900"]}CB`
        )}
        left={4}
        maxH={minimized ? "3.5rem" : "88%"}
        maxW={{ base: "100vw", xl: "3xl" }}
        my={{ base: 0, xl: 4 }}
        overflowY={minimized ? "hidden" : "auto"}
        position={{ xl: "absolute" }}
        px={12}
        py={{ base: 16, xl: minimized ? 2 : 8 }}
        sx={{ backdropFilter: "blur(4px)" }}
        transition="all 0.2s"
        zIndex={1000}
      >
        <HStack
          justify="flex-end"
          mt={-10}
          position="sticky"
          top={0}
          zIndex={1000}
        >
          {size === "xl" &&
            (minimized ? (
              <IconButton
                aria-label="Expand panel"
                icon={<FaExpand />}
                variant="ghost"
                onClick={setMinimized.toggle}
              />
            ) : (
              <IconButton
                aria-label="Minimize panel"
                icon={<FaWindowMinimize />}
                variant="ghost"
                onClick={setMinimized.toggle}
              />
            ))}
        </HStack>
        <Heading as="h2">{activeAdventure.title}</Heading>
        <Block
          activeAdventure={activeAdventure}
          blocks={activeAdventure.stories}
          dataset={dataset}
          fly={fly}
          parseViewport={parseViewport}
          projectId={projectId}
          tracks={tracks}
        />
      </Container>

      <Box h="calc(100vh - 64px)">
        <Box ref={mapContainerRef} height="100%" id="map" width="100%" />
      </Box>

      {size !== "xl" ? (
        <VStack bottom={6} position="fixed" right={4} zIndex={1000}>
          <IconButton
            aria-label="Scroll to top"
            as={Link}
            colorScheme="teal"
            href="#top"
            icon={<FaArrowUp />}
            isRound
          />
          <IconButton
            aria-label="Scroll to map"
            as={Link}
            colorScheme="teal"
            href="#map"
            icon={<FaRegMap />}
            isRound
          />
          <IconButton
            aria-label="Toggle auto rotation"
            colorScheme="teal"
            icon={<RiRotateLockFill />}
            isRound
            onClick={() => setRotate(!rotating)}
          />
        </VStack>
      ) : (
        <IconButton
          aria-label="Toggle auto rotation"
          bottom={6}
          colorScheme="teal"
          icon={<RiRotateLockFill />}
          position="fixed"
          right={4}
          size="lg"
          zIndex={1000}
          isRound
          onClick={() => setRotate(!rotating)}
        />
      )}
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
