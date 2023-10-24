export async function GET() {
    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=WK4AOACZBYHEK5DH`);
        const newData = await response.json();
        const top_gainers = newData.top_gainers;

        const gainerPromises = top_gainers.map(async (gainer, index) => {
            try {
                // const response2 = await fetchCompanyDataWithRateLimit(gainer.ticker);
                const response2 = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=WK4AOACZBYHEK5DH`);
                const data = await response2.json();
                const { volume, ...gainerWithoutVolume } = gainer;
                const newData2 = {
                    ...gainerWithoutVolume,
                    "company_name": data["company_name"],
                    "description": data["Description"],
                    "assetType": data["AssetType"],
                    "exchange": data["Exchange"],
                    "industry": data["Industry"],
                    "sector": data["Sector"],
                    "marketCapitalization": data["MarketCapitalization"],
                    "dividendYield": data["DividendYield"],
                    "beta": data["Beta"],
                    "52WeekHigh": data["52WeekHigh"],
                    "52WeekLow": data["52WeekLow"],
                    "PERatio": data["PERatio"],
                    "profitMargin": data["ProfitMargin"],
                }

                return newData2;
            } catch (err) {
                console.log("no data came", err)
                return { "Error": "Error in Company data API" };
            }
        })

        const results = await Promise.all(gainerPromises);

        return Response.json(results);
    } catch (err) {
        return Response.json({ "Error": "Error in API" });
    }
}

// async function fetchCompanyDataWithRateLimit(ticker) {
//     const apiUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=WK4AOACZBYHEK5DH`;

//     if (!fetchCompanyDataWithRateLimit.lastCalled) {
//         fetchCompanyDataWithRateLimit.lastCalled = 0;
//     }

//     const now = Date.now();
//     const timeSinceLastCall = now - fetchCompanyDataWithRateLimit.lastCalled;

//     if (timeSinceLastCall < 60000) {
//         const delay = 60000 - timeSinceLastCall;
//         await new Promise(resolve => setTimeout(resolve, delay));
//     }

//     fetchCompanyDataWithRateLimit.lastCalled = Date.now();

//     return fetch(apiUrl);
// }

