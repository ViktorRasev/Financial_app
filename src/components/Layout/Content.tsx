import { FC, useEffect, useState } from "react";
import axios from "axios";
// "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=APLE&interval=1min&apikey=YMY17M0V40J0GK5H
import { setAutocompleteResult } from "../../features/autocomplete/autocompleteSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart,
} from "recharts";



type ApiResult = {
  [key: string]: {
    "1. open": string;
    "2. high": string;
    "3. low": string;
    "4. close": string;
    "5. volume": string;
    "6. time": string;
  };
};

type Transformed = {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  time: string;
}[];


const Content = () => {
  const [data, setData] = useState<Transformed>([]);
  const [symbol, setSymbol] = useState<string>("IBM");
  const autocompleteSearchResult = useSelector(
    (state: RootState) => state.autocomplete
  );
  const searchedResult = autocompleteSearchResult || {};
  const resultSymbol: string = searchedResult.symbol || "IBM"
  const resultName: string = searchedResult.name
  const interval: string = "60min";
console.log(resultName)
  const transformData = (apiResult: ApiResult) => {
    // add "6. time" property to original object
    const modifiedObjs = [];
    for (let [key, value] of Object.entries(apiResult)) {
      modifiedObjs.push(Object.assign({}, value, { "6. time": key }));
    }
    const transformed: Transformed = modifiedObjs.map((obj) => {
      return {
        open: parseFloat(obj["1. open"]),
        high: parseFloat(obj["2. high"]),
        low: parseFloat(obj["3. low"]),
        close: parseFloat(obj["4. close"]),
        volume: parseFloat(obj["5. volume"]),
        time: obj["6. time"],
      };
    });
      setData(transformed);
  };
  useEffect(() => {
    // setSymbol(resultSymbol)
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${resultSymbol}&interval=${interval}&apikey=YMY17M0V40J0GK5H`
      )
      .then((response) => {
        if (response.data) {
          const apiResult = response.data[`Time Series (${interval})`];

          transformData(apiResult);
        } else {
          console.log("ERROR");
        }

      })
      .catch((error) => {
        console.error(error);
        console.log("MAX API CALLS PER MINUTE");
      });
  }, [resultSymbol]);

  return (
    <div style={{ width: "500px", height: "400px" }}>
      <h2>name: {resultName}</h2>
      <h2>currency: {searchedResult.currency}</h2>
      {data && (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="high"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Content;
