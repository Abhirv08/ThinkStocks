import React from 'react';


const Card = ({ areaOfWork, companyName, price, percentageChange }) => {

    return (
        <div className="w-full h-full rounded-lg shadow-lg p-4 mb-4 dark:bg-[#1E2341] dark:text-white bg-white text-black">
            <div className='flex flex-col '>
                <p>{areaOfWork}</p>
                <p>{companyName}</p>
            </div>
            <div>
                <p>{price}</p>
                <p>{percentageChange}</p>
            </div>
        </div>
    );
};

export default Card;
