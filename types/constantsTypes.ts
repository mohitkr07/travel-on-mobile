type ChipOption = {
  key: string;
  label: string;
  icon: string;
};

type ChipsOptions = {
  TRIP_TYPE_CHIP_OPTIONS: ChipOption[];
  COMPANION_CHIP_OPTIONS: ChipOption[];
  VIBE_CHIP_OPTIONS: ChipOption[];
};

type OTPPayload =
  | { phone: string; otp: string }
  | { email: string; otp: string };

type TAppSliceState = {
  bottomSheetContent?: TBottomSheetContent | null;
  bottomSheetIndex: number;
  loginMethod: "phone" | "email";
  errorMsg?: string;
  chipVisible?: boolean;
};

type TBottomSheetContent =
  | "otpVerify"
  | "emailVerify"
  | "profilePic"
  | "tripSurvey";

type TAPI_STATUS = {
  IDLE: "idle";
  LOADING: "loading";
  SUCCESS: "success";
  ERROR: "error";
};

type TAUTH_STATUS = TAPI_STATUS[keyof TAPI_STATUS];

type AuthState = {
  isAuthenticated: boolean;
  accessToken?: string | null;
  refreshToken?: string | null;
  mobile: string;
  email: string;
  user?: {
    id: string;
    email: string;
    phone?: string;
    name?: string;
    profilePic?: string;
  } | null;
  requestOtpLoading?: TAUTH_STATUS;
  verifyOtpLoading?: TAUTH_STATUS;
};

export type {
  ChipOption,
  ChipsOptions,
  OTPPayload,
  TAppSliceState,
  TBottomSheetContent,
  TAPI_STATUS,
  TAUTH_STATUS,
  AuthState,
};
