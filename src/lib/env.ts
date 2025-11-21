import {
  API_BASE_URLS,
  DEFAULT_API_BASE_URL
} from "../config/api"

export const ENVS = {
  alt: import.meta.env.VITE_IFRAME_URL_ALT,
  dev: import.meta.env.VITE_IFRAME_URL_DEV,
  altProd: import.meta.env.VITE_IFRAME_URL_ALTPROD,
  altUae: import.meta.env.VITE_IFRAME_URL_ALTUAE,
  prod: import.meta.env.VITE_IFRAME_URL_PROD
}

export const getApiBaseUrlForEnv = (envKey: string) =>
  API_BASE_URLS[envKey as keyof typeof API_BASE_URLS] ?? DEFAULT_API_BASE_URL
