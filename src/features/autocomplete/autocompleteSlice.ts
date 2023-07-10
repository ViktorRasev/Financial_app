import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AutocompleteState = {
    currency: string,
    id: string,
    marketClose: string,
    marketOpen: string,
    matchScore: string,
    name: string,
    region: string,
    symbol: string,
    timezone: string,
    type: string,
}


const initialState: AutocompleteState = {
    currency: "",
    id: "",
    marketClose: "",
    marketOpen: "",
    matchScore: "",
    name: "",
    region: "",
    symbol: "",
    timezone: "",
    type: "",
}

export const autocompleteSlice = createSlice({
    name: "autocomplete",
    initialState,
    reducers: {
        setAutocompleteResult: ((state, action: PayloadAction<AutocompleteState>) => {
            return action.payload
        })
    }
})


export const { setAutocompleteResult } = autocompleteSlice.actions
export default autocompleteSlice.reducer