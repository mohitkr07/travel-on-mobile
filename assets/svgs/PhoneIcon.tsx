import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const PhoneIcon = (props: any) => (
  <Svg
    width={16}
    height={26}
    viewBox="0 0 16 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_2_2066)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.7326 0H12.3939C13.1293 0 13.7956 0.302572 14.2796 0.791341C14.7636 1.28011 15.0632 1.95296 15.0632 2.69564V23.3044C15.0632 24.047 14.7636 24.7199 14.2796 25.2087C13.7956 25.6974 13.1293 26 12.3939 26H2.7326C1.99716 26 1.33087 25.6974 0.846861 25.2087C0.362855 24.7199 0.0632324 24.047 0.0632324 23.3044V2.69564C0.0632324 1.95296 0.362855 1.28011 0.846861 0.791341C1.33087 0.302572 1.99926 0 2.7326 0ZM7.56219 22.6781C8.16562 22.6781 8.65591 23.1732 8.65591 23.7826C8.65591 24.3919 8.16562 24.887 7.56219 24.887C6.95875 24.887 6.46846 24.3919 6.46846 23.7826C6.47055 23.1732 6.95875 22.6781 7.56219 22.6781ZM0.830099 21.8317H14.2985V4.16829H0.830099V21.8317Z"
        fill="black"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_2_2066">
        <Rect
          width={15}
          height={26}
          fill="white"
          transform="translate(0.0632324)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
export default PhoneIcon;
