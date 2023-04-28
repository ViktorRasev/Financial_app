import {FC} from "react";
import {useEffect} from "react";

const ApiFetch:FC = () => {
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=APLE&interval=1min&apikey=YMY17M0V40J0GK5H")
            const data = await response.json()
            console.log(data)

        }
        // fetchData()
    }, [])

    return <>SOmething</>

}



export default ApiFetch