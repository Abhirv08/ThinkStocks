import Link from 'next/link';
import React from 'react';


const Card = ({ areaOfWork, companyName, price, percentageChange }) => {

    return (
        <Link href={`/${companyName}`} className='w-fit'>
            <div className="w-full h-full md:w-60 rounded-lg shadow-lg p-4 mb-4 dark:bg-[#787A91] dark:text-[#EEEEEE] bg-white text-black">
                <div className='flex flex-col '>
                    <div className='text-xs'>{areaOfWork}</div>
                    <p className=''>{companyName}</p>
                </div>
                <div>
                    <p>{price}</p>
                    <p>{percentageChange}</p>
                </div>
            </div>
        </Link>
    );
};

export default Card;
