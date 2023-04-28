import { FC } from "react";
import { HeaderDiv } from "./HeaderStyled";
import Switcher from "../UI/Switcher";
import {Autocomplete} from "../Autocomplete";
import { getSuggestions, Suggestion } from "../../services/suggestion-service";

interface HeaderProps {
    themeValue: "light" | "dark"
    toggleTheme: () => void,
}

const renderSuggestion = (suggestion: Suggestion) => {
    return `${suggestion.symbol} - ${suggestion.name}`;
};
const Header: FC<HeaderProps> = ({ themeValue, toggleTheme }) => {
  return (
    <HeaderDiv themeValue={themeValue}>
        <Autocomplete
            getSuggestions={getSuggestions}
            renderSuggestion={renderSuggestion}
            onSelect={suggestion => console.log(suggestion)}
        />
      <Switcher themeValue={themeValue} toggleTheme={toggleTheme} />
    </HeaderDiv>
  );
};

export default Header;
