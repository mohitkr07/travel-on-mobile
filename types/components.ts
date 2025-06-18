import { TAUTH_STATUS } from "./constantsTypes";

type TPrimaryButton = {
    label: string;
    onPress: () => void;
    disabled?: boolean;
    style?: object;
    width?: any;
    loading?: TAUTH_STATUS; 
}

export type { TPrimaryButton };