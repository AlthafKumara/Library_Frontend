import { ZodError } from 'zod'

/**
 * Parses the full API envelope: { data, message, statusCode }.
 * Validates only the `data` field against the given schema.
 *
 * @param {import('zod').ZodSchema} schema  — schema for response.data.data
 * @param {object} responseData             — raw response.data ({ data, message, statusCode })
 * @returns {{ data: T, message: string, statusCode: number }}
 */
export default function parseApiResponse(schema, responseData) {
  try {
    const parsed = schema ? schema.parse(responseData?.data ?? {}) : responseData?.data;
    return {
      data: parsed ?? null,
      message: responseData?.message ?? null,
      statusCode: responseData?.statusCode ?? null,
    }
  } catch (err) {
    if (err instanceof ZodError) {
      console.error('[API Response Validation Failed]', err.issues)
      throw new Error('SERVER_SHAPE_MISMATCH', { cause: err })
    }
    throw err
  }
}