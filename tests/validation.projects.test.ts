import { describe, expect, it } from "vitest";
import {
  projectCreateSchema,
  projectIdSchema,
  projectUpdateSchema,
} from "../src/lib/validation/projects";

const valid = { title: "  Car Market  ", description: "A marketplace" };

describe("projectCreateSchema", () => {
  it("accepts the required fields, trims strings and defaults tags", () => {
    const out = projectCreateSchema.parse(valid);
    expect(out.title).toBe("Car Market");
    expect(out.tags).toEqual([]);
  });

  it("requires a non-empty title and description", () => {
    expect(projectCreateSchema.safeParse({ ...valid, title: "   " }).success).toBe(false);
    expect(projectCreateSchema.safeParse({ title: "x" }).success).toBe(false);
  });

  it("enforces length limits", () => {
    expect(projectCreateSchema.safeParse({ ...valid, title: "x".repeat(121) }).success).toBe(false);
    expect(projectCreateSchema.safeParse({ ...valid, title: "x".repeat(120) }).success).toBe(true);
    expect(projectCreateSchema.safeParse({ ...valid, tags: ["x".repeat(41)] }).success).toBe(false);
    expect(projectCreateSchema.safeParse({ ...valid, tags: Array(26).fill("t") }).success).toBe(false);
  });

  it("rejects unknown fields (strict whitelist)", () => {
    expect(projectCreateSchema.safeParse({ ...valid, is_admin: true }).success).toBe(false);
  });

  it("accepts valid or null URLs and rejects malformed ones", () => {
    expect(projectCreateSchema.safeParse({ ...valid, live_url: "https://example.com" }).success).toBe(true);
    expect(projectCreateSchema.safeParse({ ...valid, repo_url: null }).success).toBe(true);
    expect(projectCreateSchema.safeParse({ ...valid, live_url: "not a url" }).success).toBe(false);
  });

  it("type-checks the publish and ordering controls", () => {
    expect(projectCreateSchema.safeParse({ ...valid, sort_order: -1 }).success).toBe(false);
    expect(projectCreateSchema.safeParse({ ...valid, sort_order: 1.5 }).success).toBe(false);
    expect(projectCreateSchema.safeParse({ ...valid, is_published: "yes" }).success).toBe(false);
  });
});

describe("projectUpdateSchema", () => {
  it("accepts a partial update", () => {
    expect(projectUpdateSchema.parse({ is_published: true }).is_published).toBe(true);
  });

  it("rejects an empty patch and unknown fields", () => {
    expect(projectUpdateSchema.safeParse({}).success).toBe(false);
    expect(projectUpdateSchema.safeParse({ owner_id: "x" }).success).toBe(false);
  });
});

describe("projectIdSchema", () => {
  it("accepts positive integers and numeric strings", () => {
    expect(projectIdSchema.parse({ id: 7 }).id).toBe(7);
    expect(projectIdSchema.parse({ id: "42" }).id).toBe(42);
  });

  it("rejects zero, negatives and non-numeric strings", () => {
    expect(projectIdSchema.safeParse({ id: 0 }).success).toBe(false);
    expect(projectIdSchema.safeParse({ id: "-1" }).success).toBe(false);
    expect(projectIdSchema.safeParse({ id: "abc" }).success).toBe(false);
  });
});

describe("projectUpdateSchema tags", () => {
  it("leaves tags out of a patch that doesn't send them", () => {
    expect(projectUpdateSchema.parse({ is_published: true })).toEqual({ is_published: true });
  });

  it("still validates tags when they are sent", () => {
    expect(projectUpdateSchema.parse({ tags: [" a "] }).tags).toEqual(["a"]);
    expect(projectUpdateSchema.safeParse({ tags: [""] }).success).toBe(false);
  });
});
