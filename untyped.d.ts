declare module "@mapbox/togeojson" {
	import { FeatureCollection } from "geojson"

	const geoJson: { gpx: (file: Document) => FeatureCollection }
	export = geoJson
}
