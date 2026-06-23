export default function errorHandling(error, fallbackMessage) {
  const responseData = error?.response?.data
  const message =
    responseData?.message ||
    responseData?.error ||
    fallbackMessage
  const statusCode = error?.response?.status ?? null

  const normalised = new Error(message, { cause: error })
  normalised.statusCode = statusCode
  return normalised
}
