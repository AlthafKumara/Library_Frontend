import { ZodError } from 'zod'

/**
 * Runs schema.parse() and re-throws a clean Error on failure.
 * Use this in every service function instead of calling schema.parse() directly.
 *
 * @param {import('zod').ZodSchema} schema
 * @param {unknown} data  — the raw response payload
 */
export function parseResponse(schema, data) {
  try {
    return schema.parse(data)
  } catch (err) {
    if (err instanceof ZodError) {
      // Log details for debugging, expose nothing sensitive to the UI
      console.error('[API Response Validation Failed]', err.issues)
      throw new Error('SERVER_SHAPE_MISMATCH', { cause: err })
    }
    throw err
  }
}
