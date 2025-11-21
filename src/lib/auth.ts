export class ApiError extends Error {
  status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = "ApiError"
    this.status = status
  }
}

type LoginCredentials = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
  refresh_token?: string
  message?: string
  [key: string]: unknown
}

const buildLoginUrl = (baseUrl: string) => {
  if (!baseUrl) {
    throw new Error("Missing Medipulse API base URL.")
  }

  return `${baseUrl.replace(/\/$/, "")}/users/login`
}

const buildRefreshUrl = (baseUrl: string) => {
  if (!baseUrl) {
    throw new Error("Missing Medipulse API base URL.")
  }

  return `${baseUrl.replace(/\/$/, "")}/users/refresh-token`
}

export const loginWithCredentials = async (
  credentials: LoginCredentials,
  apiBaseUrl: string
): Promise<LoginResponse> => {
  const loginUrl = buildLoginUrl(apiBaseUrl)

  const response = await fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: credentials.email,
      password: credentials.password
    })
  })

  let data: LoginResponse | null = null

  try {
    data = (await response.json()) as LoginResponse
  } catch {
    data = null
  }

  if (!response.ok) {
    const message =
      (data && typeof data.message === "string" && data.message) ||
      "Login failed. Please check your credentials."
    throw new ApiError(message, response.status)
  }

  if (!data?.token) {
    throw new Error("Login response did not include an access token.")
  }

  return data
}

export const refreshAccessToken = async (
  refreshToken: string,
  apiBaseUrl: string
): Promise<LoginResponse> => {
  if (!refreshToken) {
    throw new Error("Missing refresh token.")
  }

  const refreshUrl = buildRefreshUrl(apiBaseUrl)

  const response = await fetch(refreshUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      refresh_token: refreshToken
    })
  })

  let data: LoginResponse | null = null

  try {
    data = (await response.json()) as LoginResponse
  } catch {
    data = null
  }

  if (!response.ok) {
    const message =
      (data && typeof data.message === "string" && data.message) ||
      "Unable to refresh access token."
    throw new ApiError(message, response.status)
  }

  if (!data?.token) {
    throw new Error("Refresh response did not include an access token.")
  }

  return data
}

