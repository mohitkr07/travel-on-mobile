import { TAPI_STATUS } from "@/types/constantsTypes";

export const BASE_URL = "http://192.168.29.219:3000"

export const API_STATUS: TAPI_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
} as const;