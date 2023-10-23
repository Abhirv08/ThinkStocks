import Link from 'next/link';
import React from 'react';

const Card = ({ companyName, ticker, price, percentageChange }) => {


    return (
        <Link href={`/${ticker}`} className='w-fit m-auto'>
            <div className="w-[270px] h-full rounded-lg shadow-lg p-4 dark:bg-[#272c63] dark:text-[#EEEEEE] bg-white text-black">
                <div className='flex flex-col h-12 max-h-12 overflow-hidden'>
                    <p className='text-[#1c264b] dark:text-[#dbd8d8] font-bold'>{companyName + " (" + ticker + ")"}</p>
                </div>
                <div className='flex mt-3 px-4 justify-between w-full font-semibold'>
                    <p >${parseFloat(price).toFixed(2)}</p>
                    <p className={`${(percentageChange[0] === '-') ? "text-red-500" : "text-green-500"}`}>{parseFloat(percentageChange) > 0 ? "+" : ""}{parseFloat(percentageChange).toFixed(2)}%</p>
                </div>
            </div>
        </Link>
    );
};

export default Card;
