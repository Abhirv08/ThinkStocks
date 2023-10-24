
function formatString(sentence) {
    if (sentence === undefined) return "";
    const wordsArray = sentence.split(" ");

    let ans = "";
    wordsArray.forEach((word) => {
        ans += (word[0] + word.substring(1).toLowerCase() + " ");
    });

    return ans;
}

function formatCurrency(value) {
    if (value === undefined) return 0;
    if (typeof value === "string") {
        value = parseInt(value);
    }

    if (Math.abs(value) >= 1e12) {
        return (value / 1e12).toFixed(2) + 'T';
    } else if (Math.abs(value) >= 1e9) {
        return (value / 1e9).toFixed(2) + 'B';
    } else if (Math.abs(value) >= 1e6) {
        return (value / 1e6).toFixed(2) + 'M';
    } else if (Math.abs(value) >= 1e3) {
        return (value / 1e3).toFixed(2) + 'K';
    } else {
        return value.toFixed(2);
    }
}

export { formatString, formatCurrency }