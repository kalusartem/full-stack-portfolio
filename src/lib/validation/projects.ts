import { z } from "zod";

/**
 * Project input validation schemas.
 *
 * Goals:
 * - Validate AND whitelist fields at the API boundary
 * - Provide strongly typed inputs via z.infer<>
 * - Make "PATCH" updates safe (no empty updates, no unknown fields)
 *
 * Notes:
 * - Use `.strict()` to reject unknown fields (strong safety signal).
 * - Allow null for optional URL fields since many DB schemas store nullable text.
 */

// Reusable primitives
const urlOrNull = z
  .string()
  .trim()
  .url("Must be a valid URL")
  .nullable()
  .optional();

const nonEmptyString = (label: string, max: number) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .max(max, `${label} must be at most ${max} characters`);

const tagsSchema = z
  .array(
    z
      .string()
      .trim()
      .min(1, "Tags cannot be empty")
      .max(40, "Tags must be at most 40 characters"),
  )
  .max(25, "Too many tags")
  .default([]);

/**
 * Fields allowed to be created/updated from the admin API.
 * Keep this list tightly aligned with your `projects` table columns.
 */
export const projectBaseSchema = z
  .object({
    title: nonEmptyString("Title", 120),
    description: nonEmptyString("Description", 2000),

    // Optional publish + ordering controls
    is_published: z.boolean().optional(),
    sort_order: z.number().int().min(0).max(100000).optional(),

    // Common portfolio fields
    tags: tagsSchema,

    live_url: urlOrNull,
    repo_url: urlOrNull,

    /**
     * External image URL (optional).
     * If you use Supabase Storage, prefer `image_path`.
     */
    image_url: urlOrNull,

    /**
     * Original filename (useful for admin UI display; optional).
     */
    image_name: z
      .string()
      .trim()
      .min(1, "image_name cannot be empty")
      .max(255, "image_name is too long")
      .nullable()
      .optional(),

    /**
     * Storage object path such as:
     *   "projects/<projectId>/cover.webp"
     */
    image_path: z
      .string()
      .trim()
      .min(1, "image_path cannot be empty")
      .max(500, "image_path is too long")
      .nullable()
      .optional(),
  })
  .strict();

/**
 * Create payload (POST).
 * Requires required fields from base schema.
 */
export const projectCreateSchema = projectBaseSchema;

/**
 * Update payload (PATCH).
 * Allows partial updates but forbids empty patch objects.
 */
export const projectUpdateSchema = projectBaseSchema
  .partial()
  .refine((obj) => Object.keys(obj).length > 0, {
    message: "At least one field must be provided",
  });

/**
 * If your PATCH body includes an `id`, validate it separately and then validate the rest
 * with `projectUpdateSchema`.
 *
 * Example:
 *   const { id, ...rest } = projectIdSchema.merge(z.object({ ... })).parse(body)
 */
export const projectIdSchema = z.object({
  id: z.union([
    z.number().int().positive(),
    z
      .string()
      .regex(/^\d+$/, "id must be a positive integer string")
      .transform((v) => Number(v)),
  ]),
});

// Inferred types for strong typing
export type ProjectCreateInput = z.infer<typeof projectCreateSchema>;
export type ProjectUpdateInput = z.infer<typeof projectUpdateSchema>;
