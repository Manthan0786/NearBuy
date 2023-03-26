import { useState } from "react";

function SearchBar() {
    const [results, setResults] = useState([]);
    const handleChange = (e) => {
        const query = e.target.value;
        fetchSearch(query);
    }

    async function fetchSearch(query) {
        const response = await fetch(`api/search?q=${query}`);
        const data = await response.json();
        console.log(data);
        setResults(data);
    }

    return (
        <>
            <input
                className='searchbar'
                type="text"
                placeholder="Search here"
                onChange={handleChange}
            />
        </>
    )
}

export default SearchBar;