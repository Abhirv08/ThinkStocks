

export async function getTopGainersLosers() {
    const response = await fetch('https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo');
    const data = await response.json();

    return data;
}