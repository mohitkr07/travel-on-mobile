import { API_STATUS } from "@/redux/slices/authSlice";

type TPrimaryButton = {
    label: string;
    onPress: () => void;
    disabled?: boolean;
    style?: object;
    width?: any;
    loading?: (typeof API_STATUS)[keyof typeof API_STATUS];
}

export type { TPrimaryButton };