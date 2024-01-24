// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

const blogCollectionSchema = z.object({
  title: z.string().max(120).min(1),
  description: z.string().max(240).min(1),
  date: z.string().regex(/^\d{2}-\d{2}-\d{4}$/), // DD-MM-YYYY
  category: z.optional(
    z.enum(["Other", "Behind the Scenes", "Tools Presentation"])
  ),
  modified: z.string().regex(/^\d{2}-\d{2}-\d{4}$/),
  image: z
    .string()
    .endsWith(".jpg")
    .or(z.string().endsWith(".png"))
    .or(z.string().endsWith(".gif")),
});

const projectCollectionSchema = z.object({
  title: z.string().max(120).min(1),
  description: z.string().max(240).min(1),
  started: z.string().regex(/^\d{2}-\d{2}-\d{4}$/), // DD-MM-YYYY
  finished: z
    .string()
    .regex(/^\d{2}-\d{2}-\d{4}$/)
    .optional(), // DD-MM-YYYY
  image: z
    .string()
    .endsWith(".jpg")
    .or(z.string().endsWith(".png"))
    .or(z.string().endsWith(".gif")),
  project_url: z.optional(z.string()),
});

const blogCollection = defineCollection({
  type: "content",
  schema: blogCollectionSchema,
});

const portfolioCollection = defineCollection({
  type: "content",
  schema: projectCollectionSchema,
});

type BlogItem = z.infer<typeof blogCollectionSchema>;

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  articles: blogCollection,
  portfolio: portfolioCollection,
};

export type { BlogItem };
