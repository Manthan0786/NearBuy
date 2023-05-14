import { useEffect, useState } from "react";

function SearchBar() {
    const [results, setResults] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        async function fetchSearch() {
            try {
                if (query) {
                    const response = await fetch(`/api/search?query=${query}`);
                    const data = await response.json();
                    console.log(data);
                    setResults(data);
                }
            }
            catch (error) {
                console.error('Error searching:', error);
            }
        }
        fetchSearch()
    }, [query])

    const handleChange = (e) => {
        setQuery(e.target.value);
    }

    return (
        <>
            <input
                className='searchbar'
                type="text"
                placeholder="Search here"
                value={query}
                onChange={handleChange}
            />

            {
                query && (
                    <div>
                        {results.map((result) => (
                            <div key={result.id}>{result.name}</div>
                        ))}
                    </div>
                )
            }

        </>
    )
}

export default SearchBar;