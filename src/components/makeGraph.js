import { useEffect, useRef, useState } from "react"
import { Chart } from "chart.js/auto";

function MakeGraph({ symbol }) {
    var chart;
    const flag = useRef(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const localData = localStorage.getItem(symbol + "graph");

                if (localData) {
                    const parsedData = JSON.parse(localData);
                    const expirationTime = parsedData.expirationTime;

                    if (Date.now() < expirationTime) {
                        const req_data = parsedData.data;
                        makeChart(req_data.label, req_data.smaValues);
                        return;
                    }
                }
                const expirationDate = new Date();
                expirationDate.setUTCHours(24, 0, 0, 0);
                const midnightUTC = expirationDate.getTime();

                if (!flag.current) {
                    const response = await fetch(`https://www.alphavantage.co/query?function=SMA&symbol=${symbol}&interval=monthly&time_period=60&series_type=open&apikey=${process.env.NEXT_PUBLIC_API_KEY1}`)
                    const newData = await response.json();
                    const req_data = newData["Technical Analysis: SMA"];
                    const dates = Object.keys(req_data).reverse();
                    const smaValues = dates.map((date) => parseFloat(req_data[date].SMA));
                    makeChart(dates, smaValues);
                    localStorage.setItem(symbol + "graph", JSON.stringify({ data: { "label": dates, smaValues }, expirationTime: midnightUTC }));
                    flag.current = true;
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, []);

    const makeChart = (labels, data) => {
        if (chart) {
            chart.destroy();
        }
        chart = new Chart("myChart", {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    label: "SMA Values",
                    borderColor: "rgb(62,149,205)",
                    backgroundColor: "rgb(62,149,205,0.1)",
                }
                ]
            },
        });
        chart.update();
    }

    return (
        <div className="w-full h-fit flex my-8">
            <div className='border border-gray-400 rounded-md p-4 w-full h-fit '>
                <canvas id='myChart' className="w-full">{chart}</canvas>
            </div>
        </div>
    )
}

export default MakeGraph;