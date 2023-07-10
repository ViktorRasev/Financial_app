import {FC, useState} from "react";
import { HeaderDiv } from "./HeaderStyled";
import Switcher from "../UI/Switcher";
import { AutocompleteInput} from "../../features/autocomplete/Autocomplete";
import { getSuggestions } from "../../services/suggestion-service";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

interface HeaderProps {
    themeValue: "light" | "dark"
    toggleTheme: () => void,
}


const Header: FC<HeaderProps> = ({ themeValue, toggleTheme }) => {
    const [toggleNavigation, setToggleNavigation] = useState(false)


  return (
    <HeaderDiv themeValue={themeValue}>
        <button onClick={() => setToggleNavigation(prevState => !prevState)}>
            {toggleNavigation ?
                <KeyboardDoubleArrowRightIcon/>
                :
                <KeyboardDoubleArrowLeftIcon/>
            }

        </button>
        <AutocompleteInput getSuggestions={getSuggestions}/>
      <Switcher themeValue={themeValue} toggleTheme={toggleTheme} />
    </HeaderDiv>
  );
};

export default Header;
