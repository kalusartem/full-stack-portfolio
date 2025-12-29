# API

This document describes the core API behavior and error conventions.

## Error format (recommended)

Errors should be consistent and machine-readable:

```json
{
  "error": {
    "code": "validation_error",
    "message": "Invalid input",
    "details": { "fieldErrors": { "title": ["Required"] } }
  }
}
```

Suggested status codes:
- `400` bad JSON
- `401` unauthenticated
- `403` forbidden (not admin)
- `404` not found
- `422` validation error (Zod)
- `500` internal error

## Admin endpoints

### POST /api/admin/projects
Create a project.

**Authorization**
- requires authenticated admin

**Validation**
- Zod schema for create payload
- unknown fields rejected (or stripped) before DB insert

**Example payload**
```json
{
  "title": "My Project",
  "description": "What it is",
  "tags": ["nextjs", "supabase"],
  "repo_url": "https://github.com/user/repo",
  "live_url": "https://example.com",
  "image_path": "projects/123/cover.png"
}
```

### PATCH /api/admin/projects
Update a project.

**Body**
- `id` required
- at least one updatable field required

**Validation**
- Zod schema for patch payload (partial but non-empty)

### DELETE /api/admin/projects?id=123
Delete a project.

**Authorization**
- requires authenticated admin

**Notes**
- If you store an `image_path`, consider deleting the object in Storage as part of this workflow.

## Upload endpoints (optional)
If you have an upload route:
- enforce max file size
- enforce MIME types
- generate deterministic paths
