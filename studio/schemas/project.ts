interface Rule {
	required: () => boolean
	unique: () => boolean
}

export default {
	name: "project",
	title: "Project",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
			description: "The name of the project.",
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
		},
		{
			name: "mainImage",
			title: "Main Image",
			type: "image",
			options: {
				hotspot: true,
			},
			validation: (rule: Rule): boolean => rule.required(),
		},
		{
			name: "deployedUrl",
			title: "Deployed At",
			type: "url",
			description: "The URL to the deployed project.",
			validation: (rule: Rule): boolean => rule.required(),
		},
		{
			name: "repoUrl",
			title: "Repo URL",
			type: "url",
			description: "The URL to the repository.",
			validation: (rule: Rule): boolean => rule.required(),
		},
		{
			name: "purpose",
			title: "Purpose",
			type: "array",
			of: [{ type: "block" }],
			description: "What problem does this project solve?",
			validation: (rule: Rule): boolean => rule.required(),
		},
		{
			name: "keyFeatures",
			title: "Key Features",
			type: "array",
			of: [{ type: "string" }],
			description: "List of the top features",
			validation: (rule: Rule): boolean => rule.unique(),
		},
		{
			name: "techStack",
			title: "Tech Stack",
			type: "array",
			of: [{ type: "string" }],
			options: {
				layout: "tags",
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
