const { default: Card } = require("./card");

const CardList = ({ data, showFull }) => {
    const visibleData = showFull ? data : data.slice(0, 12);

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-y-8 my-4 place-content-center'>
            {visibleData.map((d) => (
                <Card
                    key={d.symbol}
                    companyName={d.company_name}
                    ticker={d.symbol}
                    price={d.price}
                    percentageChange={d.change_percentage}
                />
            ))}
        </div>
    );
};

export default CardList;