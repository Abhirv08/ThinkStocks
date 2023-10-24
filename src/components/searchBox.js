import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const SearchBox = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const router = useRouter();
    const debounceTimeout = 300;
    let debounceTimer;

    const handleSearch = async (value) => {
        setSearchTerm(value);
    };

    const debouncedSearch = (value) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            if (value.trim() !== '') {
                fetchSearchResults(value);
            }
        }, debounceTimeout);
    };

    const fetchSearchResults = async (value) => {
        try {
            const response = await axios.get(
                `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=YOUR_API_KEY`
            );

            setSearchResults(response.data.bestMatches);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleResultClick = (symbol) => {
        router.push(`/company_name/${symbol}`);
    };

    useEffect(() => {
        debouncedSearch(searchTerm);
    }, [searchTerm]);

    return (
        <div>
            <input
                type="text"
                placeholder="Search for a company"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
            />
            <ul>
                {searchResults.map((result) => (
                    <li key={result['1. symbol']} onClick={() => handleResultClick(result['1. symbol'])}>
                        {result['2. name']}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBox;
