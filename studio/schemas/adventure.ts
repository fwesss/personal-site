interface Rule {
  required?: () => boolean
  unique?: () => boolean
}
export default {
  name: "adventure",
  title: "Adventure",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "The name of the project.",
      codegen: { required: true },
      validation: (rule: Rule): boolean => rule.required(),
    },
    {
      name: "gpx",
      title: "GPX File",
      type: "file",
      description: "GPX file for adventure.",
      codegen: { required: true },
      validation: (rule: Rule): boolean => rule.required(),
    },
    {
      name: "initialView",
      title: "Initial View",
      type: "string",
      description:
        "Initial view of the trail. Get position from Mapbox Studio. [zoom bearing pitch lon lat]",
      codegen: { required: true },
      validation: (rule: Rule): boolean => rule.required(),
    },
    {
      name: "stories",
      title: "Stories",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",

          fields: [
            {
              name: "caption",
              title: "Caption",
              type: "text",
              options: { isHighlighted: true },
            },
            {
              name: "alt",
              title: "Alt",
              type: "string",
              options: { isHighlighted: true },
              codegen: { required: true },
              validation: (rule: Rule): boolean => rule.required(),
            },
          ],
          options: {
            hotspot: true,
          },
        },
      ],
      description:
        "Story for different points in the adventure. There should be 1 for each waypoint in the GPX file.",
      validation: (rule: Rule): boolean => rule.unique(),
    },
  ],
}
