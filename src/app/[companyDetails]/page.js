"use client"
import MakeGraph from '@/components/makeGraph';
import { formatCurrency, formatString } from '@/utils';
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

const CompanyDetails = () => {
    const flag = useRef(false)
    const [data, setData] = useState([]);
    const pathname = usePathname();
    const paths = pathname.substring(1).split('&');
    const symbol = paths[0];
    const currPrice = paths[1];
    const percentageChange = paths[2];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const localData = localStorage.getItem(symbol);

                if (localData) {
                    const parsedData = JSON.parse(localData);
                    const expirationTime = parsedData.expirationTime;

                    if (Date.now() < expirationTime) {
                        setData(parsedData.data.companyData);
                        return;
                    }
                }
                const expirationDate = new Date();
                expirationDate.setUTCHours(24, 0, 0, 0);
                const midnightUTC = expirationDate.getTime();

                const response = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`)
                const newData = await response.json();
                const companyData = {
                    "company_name": newData["Name"],
                    "description": newData["Description"],
                    "assetType": newData["AssetType"],
                    "exchange": newData["Exchange"],
                    "industry": newData["Industry"],
                    "sector": newData["Sector"],
                    "marketCapitalization": newData["MarketCapitalization"],
                    "dividendYield": newData["DividendYield"],
                    "beta": newData["Beta"],
                    "52WeekHigh": newData["52WeekHigh"],
                    "52WeekLow": newData["52WeekLow"],
                    "PERatio": newData["PERatio"],
                    "profitMargin": newData["ProfitMargin"],

                }
                setData(companyData)
                localStorage.setItem(symbol, JSON.stringify({ data: { "companyData": companyData }, expirationTime: midnightUTC }));
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        if (!flag.current) {
            fetchData();
            flag.current = true;
        }
    }, []);

    return (
        <div className='px-2 lg:px-44 py-6'>
            <div className='flex justify-between items-center'>
                <div>
                    <p className='font-bold sm:text-lg dark:text-gray-200'>{data.company_name}</p>
                    <p className='text-sm text-gray-800 dark:text-gray-200 font-medium'>{symbol}, {data.assetType}</p>
                    <p className='text-sm text-gray-800 dark:text-gray-200 font-medium'>{data.exchange}</p>
                </div>
                <div className='flex flex-col px-4 font-semibold text-sm '>
                    <p >${parseFloat(currPrice).toFixed(2)}</p>
                    <p className={` text-xs ${(percentageChange[0] === '-') ? "text-red-500" : "text-green-500"}`}>{parseFloat(percentageChange) > 0 ? "+" : ""}{parseFloat(percentageChange).toFixed(2)}%</p>
                </div>
            </div>
            <MakeGraph symbol={symbol} />
            <div className='border-[1px] border-gray-400 rounded-md dark:text-gray-200 pb-4'>
                <p className=' font-semibold border-b-[1px] border-gray-400 py-2 px-4'>About {data.company_name}</p>
                <p className='py-2 px-4'>{data.description}</p>
                <div className='py-2 px-4 flex flex-col xs:flex-row gap-4 sm:gap-10 font-bold'>
                    <p className='text-xs rounded-full text-[#943c3c] bg-[#b4a6a6] py-2 px-3'>Industry: {formatString(data.industry)}</p>
                    <p className='text-xs rounded-full text-[#943c3c] bg-[#b4a6a6] py-2 px-3'>Sector: {formatString(data.sector)}</p>
                </div>
                <div className='py-2 px-4 flex flex-col xs:flex-row gap-4 md:gap-0 justify-between'>
                    <div className='text-sm flex flex-row justify-between xs:flex-col'>
                        <p>Market Cap</p>
                        <p className='font-semibold'>${formatCurrency(data.marketCapitalization)}</p>
                    </div>
                    <div className='text-sm flex flex-row justify-between xs:flex-col'>
                        <p>P/E Ratio</p>
                        <p className='font-semibold'>{data.PERatio}</p>
                    </div>
                    <div className='text-sm flex flex-row justify-between xs:flex-col'>
                        <p>Beta</p>
                        <p className='font-semibold'>{data.beta}</p>
                    </div>
                    <div className='text-sm flex flex-row justify-between xs:flex-col'>
                        <p>Dividend Yield</p>
                        <p className='font-semibold'>{parseFloat(data.dividendYield)?.toFixed(3)}%</p>
                    </div>
                    <div className='text-sm flex flex-row justify-between xs:flex-col'>
                        <p>Profit Margin</p>
                        <p className='font-semibold'>{parseFloat(data.profitMargin)?.toFixed(3)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyDetails