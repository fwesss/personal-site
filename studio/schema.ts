import type {
	SanityReference,
	SanityKeyedReference,
	SanityAsset,
	SanityImage,
	SanityFile,
	SanityGeoPoint,
	SanityBlock,
	SanityDocument,
	SanityImageCrop,
	SanityImageHotspot,
	SanityKeyed,
} from "sanity-codegen"

export type {
	SanityReference,
	SanityKeyedReference,
	SanityAsset,
	SanityImage,
	SanityFile,
	SanityGeoPoint,
	SanityBlock,
	SanityDocument,
	SanityImageCrop,
	SanityImageHotspot,
	SanityKeyed,
}

/**
 * Adventure
 *
 *
 */
export interface Adventure extends SanityDocument {
	_type: "adventure"

	/**
	 * Title — `string`
	 *
	 * The name of the project.
	 */
	title: string

	/**
	 * GPX File — `file`
	 *
	 * GPX file for adventure.
	 */
	gpx: { _type: "file"; asset: SanityAsset }

	/**
	 * Initial View — `string`
	 *
	 * Initial view of the trail. Get position from Mapbox Studio. [zoom bearing pitch lon lat]
	 */
	initialView: string

	/**
	 * Stories — `array`
	 *
	 * Story for different points in the adventure. There should be 1 for each waypoint in the GPX file.
	 */
	stories?: Array<
		SanityKeyed<{
			/**
			 * Headline — `string`
			 *
			 *
			 */
			headline: string

			/**
			 * Body — `text`
			 *
			 *
			 */
			body: string
		}>
	>
}

/**
 * Project
 *
 *
 */
export interface Project extends SanityDocument {
	_type: "project"

	/**
	 * Order — `number`
	 *
	 *
	 */
	order?: number

	/**
	 * Title — `string`
	 *
	 * The name of the project.
	 */
	title: string

	/**
	 * Slug — `slug`
	 *
	 *
	 */
	slug: { _type: "slug"; current: string }

	/**
	 * Featured — `boolean`
	 *
	 * Should this project have a feature on the projects page?
	 */
	featured: boolean

	/**
	 * Main Image — `image`
	 *
	 *
	 */
	mainImage: {
		_type: "image"
		asset: SanityAsset
		crop?: SanityImageCrop
		hotspot?: SanityImageHotspot

		/**
		 * Caption — `text`
		 *
		 *
		 */
		caption?: string

		/**
		 * Alt — `string`
		 *
		 *
		 */
		alt: string
	}

	/**
	 * Summary — `text`
	 *
	 *
	 */
	summary: string

	/**
	 * Deployed At — `url`
	 *
	 * The URL to the deployed project.
	 */
	deployedUrl: string

	/**
	 * Repo URL — `url`
	 *
	 * The URL to the repository.
	 */
	repoUrl: string

	/**
	 * Purpose — `array`
	 *
	 * What problem does this project solve?
	 */
	purpose: Array<SanityKeyed<SanityBlock>>

	/**
	 * Key Features — `array`
	 *
	 * List of the top features.
	 */
	keyFeatures?: Array<
		SanityKeyed<{
			/**
			 * Headline — `string`
			 *
			 *
			 */
			headline: string

			/**
			 * Body — `text`
			 *
			 *
			 */
			body: string
		}>
	>

	/**
	 * Tech Stack — `array`
	 *
	 * List of technologies used to build.
	 */
	techStack?: Array<SanityKeyed<string>>

	/**
	 * Dev Diary — `array`
	 *
	 * Collection of blog posts describing work on the project.
	 */
	devDiary?: Array<SanityKeyedReference<Post>>

	/**
	 * Knowledge Gained — `array`
	 *
	 * What did I learn while building this?
	 */
	knowledgeGained?: Array<SanityKeyed<SanityBlock>>

	/**
	 * Challenges — `array`
	 *
	 * List of issues that came up during build.
	 */
	challenges?: Array<SanityKeyed<SanityBlock>>

	/**
	 * What Could Have Been Different? — `array`
	 *
	 * Collection of things I think could have been done differently.
	 */
	different?: Array<SanityKeyed<SanityBlock>>

	/**
	 * Screenshots — `array`
	 *
	 * Collection of screenshots.
	 */
	screenshots?: Array<
		SanityKeyed<{
			_type: "image"
			asset: SanityAsset
			crop?: SanityImageCrop
			hotspot?: SanityImageHotspot

			/**
			 * Caption — `text`
			 *
			 *
			 */
			caption?: string

			/**
			 * Alt — `string`
			 *
			 *
			 */
			alt: string
		}>
	>

	/**
	 * Tags — `array`
	 *
	 *
	 */
	tags?: Array<SanityKeyed<string>>
}

/**
 * Post
 *
 *
 */
export interface Post extends SanityDocument {
	_type: "post"

	/**
	 * Title — `string`
	 *
	 *
	 */
	title?: string

	/**
	 * Slug — `slug`
	 *
	 *
	 */
	slug?: { _type: "slug"; current: string }

	/**
	 * Author — `reference`
	 *
	 *
	 */
	author?: SanityReference<Author>

	/**
	 * Main image — `image`
	 *
	 *
	 */
	mainImage?: {
		_type: "image"
		asset: SanityAsset
		crop?: SanityImageCrop
		hotspot?: SanityImageHotspot
	}

	/**
	 * Categories — `array`
	 *
	 *
	 */
	categories?: Array<SanityKeyedReference<Category>>

	/**
	 * Published at — `datetime`
	 *
	 *
	 */
	publishedAt?: string

	/**
	 * Body — `blockContent`
	 *
	 *
	 */
	body?: BlockContent
}

/**
 * Author
 *
 *
 */
export interface Author extends SanityDocument {
	_type: "author"

	/**
	 * Name — `string`
	 *
	 *
	 */
	name?: string

	/**
	 * Slug — `slug`
	 *
	 *
	 */
	slug?: { _type: "slug"; current: string }

	/**
	 * Image — `image`
	 *
	 *
	 */
	image?: {
		_type: "image"
		asset: SanityAsset
		crop?: SanityImageCrop
		hotspot?: SanityImageHotspot
	}

	/**
	 * Bio — `array`
	 *
	 *
	 */
	bio?: Array<SanityKeyed<SanityBlock>>
}

/**
 * Category
 *
 *
 */
export interface Category extends SanityDocument {
	_type: "category"

	/**
	 * Title — `string`
	 *
	 *
	 */
	title?: string

	/**
	 * Description — `text`
	 *
	 *
	 */
	description?: string
}

export type BlockContent = Array<
	| SanityKeyed<SanityBlock>
	| SanityKeyed<{
			_type: "image"
			asset: SanityAsset
			crop?: SanityImageCrop
			hotspot?: SanityImageHotspot
	  }>
>

export type Documents = Adventure | Project | Post | Author | Category
