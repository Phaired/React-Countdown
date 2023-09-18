import './App.css'
import {useEffect, useState} from "react";
import {Line} from "rc-progress";
import {Tooltip} from "react-tooltip";

function App() {

    const endDate = new Date()
    endDate.setHours(22)
    endDate.setMinutes(59)
    endDate.setSeconds(59)

    endDate.setFullYear(2025)
    endDate.setMonth(2)
    endDate.setDate(28)

    const startDate = new Date()
    startDate.setHours(8)
    startDate.setMinutes(0)
    startDate.setSeconds(0)

    startDate.setFullYear(2023)
    startDate.setMonth(8)
    startDate.setDate(4)



    const [d, setD] = useState<number>(0)
    const [h, setH] = useState<number>(0)
    const [m, setM] = useState<number>(0)
    const [s, setS] = useState<number>(0)


    useEffect(() => {
        const interval = setInterval(() => {
            const remainingTime = new Date(endDate.getTime() - Date.now());

            const days = Math.floor(remainingTime.getTime() / 1000 / 60 / 60 / 24);
            const hours = Math.floor((remainingTime.getTime() / 1000 / 60 / 60) % 24);
            const minutes = Math.floor((remainingTime.getTime() / 1000 / 60) % 60);
            const seconds = Math.floor((remainingTime.getTime() / 1000) % 60);

            // Mettre à jour les états
            setD(days);
            setH(hours);
            setM(minutes);
            setS(seconds);
        }, 1000);

        return () => clearInterval(interval);
    }, [endDate]);

    const pluralize = (count: number, unit: string) => (count < 2 ? unit : unit + 's');


    return (
        <>

            {d !== 0 && (
            <div style={{width: "100%"}}>
                <p>
                    Encore {d} {pluralize(d, 'jour')} {h} {pluralize(h, 'heure')} {m} {pluralize(m, 'minute')} {s} {pluralize(s, 'seconde')}.
                </p>
                <p className="end-date-date">
                    Nous finissons le 28 mars 2025 🥳🥳🥳
                </p>
                <Tooltip anchorSelect=".end-date-date" content="En vrai on termine le 5 septembre 2025" data-tooltip-variant="warning" />
                <span style={{fontSize :"14px",
                                display: "flex",
                                alignItems: "center",
                    justifyContent: "center",
                    gap: "10px"
                }}>


                <Line style={{width: "clamp(200px, 20%, 30vw)"}} percent={((Date.now() - startDate.getTime()) / (endDate.getTime() - startDate.getTime())*100)} strokeWidth={2} strokeColor="green" />
                    { ((Date.now() - startDate.getTime()) / (endDate.getTime() - startDate.getTime())*100).toPrecision(5)} %
                </span>
                </div>)}
        </>

  )
}

export default App
