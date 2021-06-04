import { createImageUrlBuilder } from "next-sanity"
import { createClient } from "sanity-codegen"

import {
  Documents,
  SanityAsset,
  SanityImageCrop,
  SanityImageHotspot,
} from "../studio/schema"

export const config = {
  // Note: these are useful to pull from environment variables
  // (required) your sanity project id
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  // (required) your sanity dataset
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  // (required) the fetch implementation to use
  fetch,
  //
  // (optional) if true, the client will prefer drafts over the published versions
  // previewMode: true,
  // (optional) only required if your dataset is private or if you want to use preview mode
  // token: "...",
  //
  // (optional) enables the usage of `apicdn.sanity.io`. this is recommended
  // if you plan on using this in browsers. don't use this with preview mode
  // see here: https://www.sanity.io/docs/api-cdn
  useCdn: process.env.NODE_ENV === "production",
}

interface ImageUrlBuilder {
  url: () => string
}

export const urlFor = (source: {
  _type: "image"
  asset: SanityAsset
  crop?: SanityImageCrop
  hotspot?: SanityImageHotspot
}): ImageUrlBuilder =>
  createImageUrlBuilder(config).image(source).auto("format").format("webp")

// This type parameter enables the client to be aware of your generated types
//                           👇👇👇
export default createClient<Documents>(config)
