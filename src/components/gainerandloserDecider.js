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
                const localData = localStorage.getItem(selectedType);

                if (localData) {
                    const parsedData = JSON.parse(localData);
                    const expirationTime = parsedData.expirationTime;

                    if (Date.now() < expirationTime) {
                        setData(parsedData.data);
                        return;
                    }
                }
                const expirationDate = new Date();
                expirationDate.setUTCHours(24, 0, 0, 0);
                const midnightUTC = expirationDate.getTime();

                if (selectedType === "top_gainers") {
                    const response = await fetch(`https://api.finage.co.uk/market-information/us/most-gainers?apikey=${process.env.NEXT_PUBLIC_API_KEY2}`);
                    const newData = await response.json();
                    const sortedData = newData.filter(data => parseFloat(data.change))
                        .sort((a, b) => parseFloat(b.change_percentage) - parseFloat(a.change_percentage))
                        .splice(0, 40);
                    localStorage.setItem('top_gainers', JSON.stringify({ data: sortedData, expirationTime: midnightUTC }));
                    setData(sortedData);
                } else {
                    const response = await fetch(`https://api.finage.co.uk/market-information/us/most-losers?apikey=${process.env.NEXT_PUBLIC_API_KEY2}`);
                    const newData = await response.json();
                    const sortedData = newData.filter(data => parseFloat(data.change) < 0)
                        .sort((a, b) => parseFloat(a.change_percentage) - parseFloat(b.change_percentage))
                        .splice(0, 40);
                    localStorage.setItem('top_losers', JSON.stringify({ data: sortedData, expirationTime: midnightUTC }));
                    setData(sortedData);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, [selectedType]);

    return (
        <div className=' h-full w-full px-2 sm:px-4  py-4 relative'>
            <div className='pt-4 flex w-full sm:w-60'>
                <button onClick={() => setSelectedType("top_gainers")} className={`${selectedType === "top_gainers" ? "border-b-2 border-green-500 text-green-600" : ""} px-4 w-1/2 box-content`}  >Top Gainers</button>
                <button onClick={() => setSelectedType("top_losers")} className={`${selectedType === "top_losers" ? "border-b-2 border-red-500 text-red-600" : ""} px-4 w-1/2 box-content`}  >Top Losers</button>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-y-8 my-4 place-content-center'>
                {
                    showFull ? (
                        data?.map(d => (
                            <Card key={d.ticker} companyName={d.company_name} ticker={d.symbol} price={d.price} percentageChange={d.change_percentage} />
                        ))
                    ) : (
                        data?.slice(0, 12).map(d => (
                            <Card key={d.ticker} companyName={d.company_name} ticker={d.symbol} price={d.price} percentageChange={d.change_percentage} />
                        ))
                    )
                }
            </div>
            {!showFull && <div className='mt-12 absolute left-0 right-0 m-auto text-center translate-1/2 bottom-2 sm:-bottom-2 '>
                <button onClick={() => setShowFull(!showFull)} className='flex flex-col items-center w-fit cursor-pointer m-auto font-bold'>
                    <p>Load More</p>
                </button>
            </div>}
        </div>
    )
}

export default GainerandloserDecider