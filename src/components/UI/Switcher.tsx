import { FC } from "react";
import { SwitcherContainer, Icon } from "./SwitcherStyles";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import NightlightIcon from "@mui/icons-material/Nightlight";

interface SwitcherProps {
  themeValue: "light" | "dark";
  toggleTheme: () => void;
}

const Switcher: FC<SwitcherProps> = ({ themeValue, toggleTheme }) => {
  return (
    <SwitcherContainer onClick={toggleTheme} themeValue={themeValue}>
      {themeValue === "dark" ? (
        <Icon themeValue={themeValue}>
          <WbSunnyRoundedIcon />
        </Icon>
      ) : (
        <Icon themeValue={themeValue}>
          <NightlightIcon />
        </Icon>
      )}
    </SwitcherContainer>
  );
};

export default Switcher;
