
import * as React from "react";
import { BehaviorSubject, Observable } from "rxjs";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch } from "react-redux";
import {setAutocompleteResult} from "./autocompleteSlice"


interface Props<S> {
  getSuggestions: <S>(subject: BehaviorSubject<string>) => Observable<S[]>;
}

const subject$ = new BehaviorSubject("");

export function AutocompleteInput<S>(props: Props<S>) {
  const dispatch = useDispatch()
  const { getSuggestions } = props;

  const [suggestions, setSuggestions] = React.useState<S[]>([]);

  React.useEffect(() => {
    const subscription = getSuggestions<S>(subject$).subscribe(
      (suggestions) => {
        // store suggestions in state
        setSuggestions(suggestions);
      },
      (error) => {
        // handle error here
        console.error(error);
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    subject$.next(e.target.value);
  };

  const handleSelect = (value: {}) => {
    if (value) {
        dispatch(setAutocompleteResult(value))
    }
  };

  return (
    <>
      <Autocomplete
        freeSolo
        disablePortal
        id="combo-box-demo"
        options={suggestions}
        getOptionLabel={(option) => ` ${option.symbol} - ${option.name}`}
        onChange={(event, newValue) => {
          handleSelect(newValue);
        }}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Search" onChange={handleChange} />
        )}
      />
    </>
  );
}
