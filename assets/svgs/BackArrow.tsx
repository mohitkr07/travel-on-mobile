import * as React from "react";
import Svg, { Path } from "react-native-svg";
const BackArrow = (props: any) => (
  <Svg
    width={36}
    height={20}
    viewBox="0 0 36 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M1.11612 9.11612C0.62796 9.60427 0.62796 10.3957 1.11612 10.8839L9.07107 18.8388C9.55922 19.327 10.3507 19.327 10.8388 18.8388C11.327 18.3507 11.327 17.5592 10.8388 17.0711L3.76777 10L10.8388 2.92893C11.327 2.44078 11.327 1.64932 10.8388 1.16117C10.3507 0.67301 9.55922 0.67301 9.07107 1.16117L1.11612 9.11612ZM36 10V8.75L2 8.75V10V11.25L36 11.25V10Z"
      fill="#464747"
    />
  </Svg>
);
export default BackArrow;
