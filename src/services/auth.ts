type LoginPayload = {
  email: string
  password: string
}

type LoginResponse = {
  token: string
  refresh_token: string
}

const MEDIPULSE_BASE_URL = import.meta.env.VITE_APP_MEDIPULSE_URL
const USERS_PATH = "/users"

export async function login({
  email,
  password
}: LoginPayload): Promise<LoginResponse> {
  if (!MEDIPULSE_BASE_URL) {
    throw new Error("Missing VITE_APP_MEDIPULSE_URL environment variable.")
  }

  const response = await fetch(`${MEDIPULSE_BASE_URL}${USERS_PATH}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: email,
      password
    })
  })

  let data: any = null
  try {
    data = await response.json()
  } catch (error) {
    console.error("Error parsing response:", error)
  }

  if (!response.ok) {
    const message =
      data?.message || "Unable to log in. Please verify your credentials."
    throw new Error(message)
  }

  if (!data?.token) {
    throw new Error("Login response did not include an access token.")
  }

  return {
    token: data.token,
    refresh_token: data.refresh_token
  }
}

