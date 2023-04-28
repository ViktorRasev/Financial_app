import * as React from "react";
import { BehaviorSubject, Observable } from "rxjs";

interface Props<S> {
  getSuggestions: <S>(subject: BehaviorSubject<string>) => Observable<S[]>;
  renderSuggestion?: (suggestion: S) => JSX.Element | string;
  onSelect?: (suggestion: S) => void;
}

const subject$ = new BehaviorSubject("");

export function Autocomplete<S>(props: Props<S>) {
  const { renderSuggestion = (s: S) => s, onSelect, getSuggestions } = props;
  const [value, setValue] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<S[]>([]);
  const [highlightedIdx, setHighlightedIdx] = React.useState(0);

  React.useEffect(() => {
    const subscription = getSuggestions<S>(subject$).subscribe(
        suggestions => {
          // store suggestions in state
          setSuggestions(suggestions);
        },
        error => {
          // handle error here
          console.error(error);
        }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    subject$.next(e.target.value);
  };

  const handleSelect = (idx: number) => {
    if (onSelect) {
      onSelect(suggestions[idx]);
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const UP = 38;
    const DOWN = 40;
    const ENTER = 13;
    const INITIAL_IDX = 0;

    if (e.keyCode === DOWN) {
      e.preventDefault();
      const idx = highlightedIdx;
      const nextIdx = idx !== undefined ? idx + 1 : INITIAL_IDX;

      if (nextIdx < suggestions.length) {
        setHighlightedIdx(nextIdx);
      } else {
        setHighlightedIdx(INITIAL_IDX);
      }
    }

    if (e.keyCode === UP) {
      e.preventDefault();
      const lastIdx = suggestions.length - 1;
      const idx = highlightedIdx;
      const prevIdx = idx !== undefined ? idx - 1 : lastIdx;

      if (prevIdx >= 0) {
        setHighlightedIdx(prevIdx);
      } else {
        setHighlightedIdx(lastIdx);
      }
    }

    if (e.keyCode === ENTER && highlightedIdx !== undefined) {
      handleSelect(highlightedIdx);
    }
  };

  const shouldShowSuggestions = suggestions.length > 0 && value.length > 2;

  return (
      <div style={{ width: "400px" }}>


        <input
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={value}
            placeholder="start typing"
            list="suggestionList"
        />

        <datalist id="suggestionList">
          { shouldShowSuggestions && suggestions.map((suggestion, idx) => (
              <option
                  key={`suggestion-${idx}`}
                  value={renderSuggestion(suggestion)}
                  onClick={() => handleSelect(idx)}
                  // selected={highlightedIdx === idx}
              />
                ))}
        </datalist>

      </div>
  );
}
