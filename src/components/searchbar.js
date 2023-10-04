import { useEffect, useState } from "react";
import styles from './searchbar.module.css';
import Link from 'next/link';

function SearchBar() {
    const [results, setResults] = useState([]);
    const [query, setQuery] = useState('');

    async function fetchSearch() {
        try {
            if (query) {
                const response = await fetch(`/api/search?query=${query}`);
                const data = await response.json();
                setResults(data);
            } else {
                setResults([]);
            }
        }
        catch (error) {
            console.error('Error searching:', error);
        }
    }

    useEffect(() => {
        let timer;
        function debounce(callback, delay) {
            clearTimeout(timer);
            timer = setTimeout(callback, delay);
        }
        debounce(() => fetchSearch(), 1000);
        return () => clearTimeout(timer);
    }, [query])

    useEffect(() => {
        window.addEventListener('click', () => {
            setQuery('')
            setResults([]);
        })
    }, [])

    function handleChangeDebounce(e) {
        setQuery(e.target.value);
    }

    return (
        <>
            <div className={styles.search_container}>
                <input
                    className={styles.searchbar}
                    type="text"
                    placeholder="Search here"
                    value={query}
                    onChange={handleChangeDebounce}
                />

                {
                    query && (
                        <div className={styles.searchresults}>
                            {
                                results.map((result, index) => (
                                    <Link key={index} href={`/buyer/product/productid/${result.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                        <div>{result.name}</div>
                                    </Link>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default SearchBar;