const trimTrailingSlash = (value: string) => value.replace(/\/$/, "")

const STAGING_API_BASE_URL = trimTrailingSlash("https://medipulse-staging.sahl.ai")
const PRODUCTION_API_BASE_URL = trimTrailingSlash("https://medipulse.sahl.ai")

type EnvironmentKey = "dev" | "alt" | "altProd" | "altUae" | "prod"

export const API_BASE_URLS: Record<EnvironmentKey, string> = {
  dev: STAGING_API_BASE_URL,
  alt: STAGING_API_BASE_URL,
  altProd: PRODUCTION_API_BASE_URL,
  altUae: PRODUCTION_API_BASE_URL,
  prod: PRODUCTION_API_BASE_URL
}

export const DEFAULT_API_BASE_URL = STAGING_API_BASE_URL

