import { z } from 'zod';

export const CatImageSchema = z.object({
  id: z.string(),
  url: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
  breeds: z.array(z.unknown()).optional(),
});

export const CatImagesSchema = z.array(CatImageSchema);

export type CatImage = z.infer<typeof CatImageSchema>;
