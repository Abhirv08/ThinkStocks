const TypeButtons = ({ selectedType, setSelectedType }) => {
    const handleTypeChange = (type) => {
        setSelectedType(type);
    };

    return (
        <div className='pt-4 flex w-full sm:w-60'>
            <button
                onClick={() => handleTypeChange("top_gainers")}
                className={`${selectedType === "top_gainers" ? "border-b-2 border-green-500 text-green-600" : ""} px-4 w-1/2 box-content`}
            >
                Top Gainers
            </button>
            <button
                onClick={() => handleTypeChange("top_losers")}
                className={`${selectedType === "top_losers" ? "border-b-2 border-red-500 text-red-600" : ""} px-4 w-1/2 box-content`}
            >
                Top Losers
            </button>
        </div>
    );
};

export default TypeButtons