interface Rule {
  required?: () => boolean
  unique?: () => boolean
}

const project = {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    {
      name: "order",
      title: "Order",
      type: "number",
      hidden: true,
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "The name of the project.",
      codegen: { required: true },
      validation: (rule: Rule): boolean => rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      codegen: { required: true },
      validation: (rule: Rule): boolean => rule.required(),
    },
    {
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Should this project have a feature on the projects page?",
      codegen: { required: true },
      validation: (rule: Rule): boolean => rule.required(),
    },
    {
      name: "mainImage",
      title: "Main Image",
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
      codegen: { required: true },
      validation: (rule: Rule): boolean => rule.required(),
    },
    {
      name: "summary",
      title: "Summary",
      type: "text",
      codegen: { required: true },
      validation: (rule: Rule): boolean => rule.required(),
    },
    {
      name: "deployedUrl",
      title: "Deployed At",
      type: "url",
      description: "The URL to the deployed project.",
      codegen: { required: true },
      validation: (rule: Rule): boolean => rule.required(),
    },
    {
      name: "repoUrl",
      title: "Repo URL",
      type: "url",
      description: "The URL to the repository.",
      codegen: { required: true },
      validation: (rule: Rule): boolean => rule.required(),
    },
    {
      name: "purpose",
      title: "Purpose",
      type: "array",
      of: [{ type: "block" }],
      description: "What problem does this project solve?",
      codegen: { required: true },
      validation: (rule: Rule): boolean => rule.required(),
    },
    {
      name: "keyFeatures",
      title: "Key Features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "headline",
              title: "Headline",
              type: "string",
              codegen: { required: true },
              validation: (rule: Rule): boolean => rule.required(),
            },
            {
              name: "body",
              title: "Body",
              type: "text",
              codegen: { required: true },
              validation: (rule: Rule): boolean => rule.required(),
            },
          ],
        },
      ],
      description: "List of the top features.",
      validation: (rule: Rule): boolean => rule.unique(),
    },
    {
      name: "techStack",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
        list: [
          { title: "TypeScript", value: "TypeScript" },
          { title: "JavaScript", value: "JavaScript" },
          { title: "Python", value: "Python" },
          { title: "Haskell", value: "Haskell" },
          { title: "Mapbox", value: "Mapbox" },
          { title: "Next.js", value: "Next.js" },
          { title: "React", value: "React" },
          { title: "Redux", value: "Redux" },
          { title: "D3", value: "D3" },
          { title: "Jest", value: "Jest" },
          { title: "Vercel", value: "Vercel" },
          { title: "WebGL", value: "WebGL" },
        ],
      },
      description: "List of technologies used to build.",
      validation: (rule: Rule): boolean => rule.unique(),
    },
    {
      name: "devDiary",
      title: "Dev Diary",
      type: "array",
      of: [{ type: "reference", to: [{ type: "post" }] }],
      description: "Collection of blog posts describing work on the project.",
      validation: (rule: Rule): boolean => rule.unique(),
    },
    {
      name: "knowledgeGained",
      title: "Knowledge Gained",
      type: "array",
      of: [{ type: "block" }],
      description: "What did I learn while building this?",
    },
    {
      name: "challenges",
      title: "Challenges",
      type: "array",
      of: [{ type: "block" }],
      description: "List of issues that came up during build.",
    },
    {
      name: "different",
      title: "What Could Have Been Different?",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Collection of things I think could have been done differently.",
    },
    {
      name: "screenshots",
      title: "Screenshots",
      type: "array",
      of: [
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
      description: "Collection of screenshots.",
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
  ],
}

export default project
