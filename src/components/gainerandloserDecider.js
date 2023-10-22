"use client";
import React, { useState, useEffect } from 'react';
import Card from './card';

const GainerandloserDecider = () => {
    const [selectedType, setSelectedType] = useState("top_gainers");
    const [data, setData] = useState([]);
    const [showFull, setShowFull] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const localData = localStorage.getItem('gainerAndLoserData');

                if (localData) {
                    const parsedData = JSON.parse(localData);
                    const expirationTime = parsedData.expirationTime;

                    if (Date.now() < expirationTime) {
                        setData(parsedData.data[selectedType]);
                        console.log("API not get called")
                        return;
                    }
                }

                const response = await fetch(`https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${process.env.API_KEY}`);
                const newData = await response.json();
                const req_data = { "top_gainers": newData?.top_gainers, "top_losers": newData?.top_losers }
                console.log("API called")
                const expirationDate = new Date();
                expirationDate.setUTCHours(24, 0, 0, 0);
                const midnightUTC = expirationDate.getTime();

                localStorage.setItem('gainerAndLoserData', JSON.stringify({ data: req_data, expirationTime: midnightUTC }));

                setData(req_data[selectedType]);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, [selectedType]);

    return (
        <div className='border-2 border-red-500 h-full w-full px-2 sm:px-4 md:pl-12 py-4'>
            <div className='pt-4 flex w-full sm:w-60'>
                <button onClick={() => setSelectedType("top_gainers")} className={`${selectedType === "top_gainers" ? "border-b-2 border-green-500 text-green-600" : ""} px-4 w-1/2`}  >Top Gainers</button>
                <button onClick={() => setSelectedType("top_losers")} className={`${selectedType === "top_losers" ? "border-b-2 border-red-500 text-red-600" : ""} px-4 w-1/2`}  >Top Losers</button>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 gap-y-16 my-4'>
                {
                    showFull ? (
                        data.map(d => (
                            <Card key={d.ticker} areaOfWork="dummy" companyName={d.ticker} price={d.price} percentageChange={d.change_percentage} />
                        ))
                    ) : (
                        data.slice(0, 8).map(d => (
                            <Card key={d.ticker} areaOfWork="dummy" companyName={d.ticker} price={d.price} percentageChange={d.change_percentage} />
                        ))
                    )
                }
            </div>
            <div className='text-center '>
                <button onClick={() => setShowFull(!showFull)}>{showFull ? "Show Less" : "Show More"}</button>
            </div>
        </div>
    )
}

export default GainerandloserDecider