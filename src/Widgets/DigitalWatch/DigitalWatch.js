import "./digitalWatch.css"
import {useEffect, useState} from "react";
import {Card} from "@mui/material";
const DigitalWatch = () => {
    const [time , setTime] = useState()
    const [date, setDate] = useState()
    useEffect(() => {
        const timer = setTimeout(showTime, 1000);
        return () => {
            clearTimeout(time)
        }
    }, [time])
    const showTime = () => {
        let date = new Date();
        let h = date.getHours(); // 0 - 23
        let m = date.getMinutes(); // 0 - 59
        let s = date.getSeconds(); // 0 - 59
        let year = date.getFullYear()
        let month = date.getMonth()
        let day = date.getDay()
        if(h === 0){
            h = 24;
        }

        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;

        let time = h + ":" + m + ":" + s + " " ;
        let date1 = year + "." + month + "." + day
        setTime(time)
        setDate(date1)
    }

    return(
        <Card sx={{marginBottom:1, textAlign:"center", height:150}} >
            <div className="clock">
                {time}
            </div>
            <div className="date">
                {date}
            </div>
        </Card>
    )
}
export default DigitalWatch