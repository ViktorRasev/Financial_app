import { ajax, AjaxResponse } from "rxjs/ajax";
import { map, filter, switchMap, debounceTime } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";

export interface Suggestion {
  symbol: string;
  name: string;
  type: string;
  region: string;
  marketOpen: string;
  marketClose: string;
  timezone: string;
  currency: string;
  matchScore: string;
}

const getApiUrl = (value: string) => `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=YMY17M0V40J0GK5H`;

const transformResponse = ({ response }: AjaxResponse) => {
  return response.bestMatches.map(item => ({
    id: item["1. symbol"],
    symbol: item["1. symbol"],
    name: item["2. name"],
    type: item["3. type"],
    region: item["4. region"],
    marketOpen: item["5. marketOpen"],
    marketClose: item["6. marketClose"],
    timezone: item["7. timezone"],
    currency: item["8. currency"],
    matchScore: item["9. matchScore"]
  }));
};

export const getSuggestions = <S>(
    subject: BehaviorSubject<string>
): Observable<S[]> => {
  return subject.pipe(
      debounceTime(500),
      filter(v => v.length > 2),
      map(getApiUrl),
      switchMap(url => ajax(url)),
      map(transformResponse)
  );
};
