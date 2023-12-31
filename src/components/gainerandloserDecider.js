"use client";
import React, { useState, useEffect, useRef } from 'react';
import CardList from './cardList';
import TypeButtons from './typeButtons';

const GainerandloserDecider = () => {
    const [selectedType, setSelectedType] = useState("top_gainers");
    const [data, setData] = useState([]);
    const [showFull, setShowFull] = useState(false);
    const flag = useRef(false);

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

                if (!flag.current) {
                    if (selectedType === "top_gainers") {
                        const response = await fetch(`https://api.finage.co.uk/market-information/us/most-gainers?apikey=API_KEY52KZKCEFUQORNS85XWIMXJMTK8NTK0EN`);
                        const newData = await response.json();
                        const sortedData = newData.filter(data => parseFloat(data.change))
                            .sort((a, b) => parseFloat(b.change_percentage) - parseFloat(a.change_percentage))
                            .splice(0, 40);
                        localStorage.setItem('top_gainers', JSON.stringify({ data: sortedData, expirationTime: midnightUTC }));
                        setData(sortedData);
                    } else {
                        const response = await fetch(`https://api.finage.co.uk/market-information/us/most-losers?apikey=API_KEY52KZKCEFUQORNS85XWIMXJMTK8NTK0EN`);
                        const newData = await response.json();
                        const sortedData = newData.filter(data => parseFloat(data.change) < 0)
                            .sort((a, b) => parseFloat(a.change_percentage) - parseFloat(b.change_percentage))
                            .splice(0, 40);
                        localStorage.setItem('top_losers', JSON.stringify({ data: sortedData, expirationTime: midnightUTC }));
                        setData(sortedData);
                    }

                    flag.current = true;
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, [selectedType]);

    return (
        <div className=' h-full w-full px-2 sm:px-4  py-4 relative'>
            <TypeButtons selectedType={selectedType} setSelectedType={setSelectedType} />
            <CardList data={data} showFull={showFull} />
            {!showFull && <div className='mt-12 absolute left-0 right-0 m-auto text-center translate-1/2 bottom-2 sm:-bottom-2 '>
                <button onClick={() => setShowFull(!showFull)} className='flex flex-col items-center w-fit cursor-pointer m-auto font-bold'>
                    <p>Load More</p>
                </button>
            </div>}
        </div>
    )
}

export default GainerandloserDecider