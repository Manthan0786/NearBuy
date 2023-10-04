import PersonIcon from '@mui/icons-material/Person';
import styles from './header.module.css'
import { Link, MenuItem, TextField } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SearchBar from '../searchbar';
import { signOut } from 'next-auth/react';
import { useRouter } from "next/router";

const area = [
    {
        id: 0,
        name: 'Edmonton'
    },
    {
        id: 1,
        name: 'Calgary'
    }
];

export default function BuyerHeader() {
    const [city, setCity] = useState(area);
    const dropdownRef = useRef(null);

    const handleChange = (e) => {
        setCity(e.target.value);
    }

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    function closeDropdownOnClickOutside(event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    }
    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener('click', closeDropdownOnClickOutside);
        }

        return () => {
            document.removeEventListener('click', closeDropdownOnClickOutside);
        }
    }, [isDropdownOpen])

    const router = useRouter();
    const handleLogOut = async () => {
        const data = await signOut({ redirect: false, callbackUrl: "/" });
        router.push(data.url)
    }


    return (
        <>
            <div className={styles.header}>
                <h1 className={styles.title}>
                    <Link href="/buyer/homepage" style={{ color: 'black', textDecoration: 'none' }}>
                        NearBuy
                    </Link>
                </h1>

                <div className={styles.dropdown} onClick={toggleDropdown} ref={dropdownRef}>
                    <div className={styles.myAccount}>
                        <PersonIcon sx={{ fontSize: '1.3rem' }} />
                        <button className={styles.dropdownTrigger}>My Account</button>
                    </div>
                    {
                        isDropdownOpen && (
                            <div className={styles.dropdownContent}>
                                <a href="/account/profile">Profile</a>
                                <a href="/buyer/cart">Cart</a>
                                <a style={{ cursor: 'pointer' }} onClick={() => handleLogOut()}>Logout</a>
                            </div>
                        )
                    }
                </div>
            </div>

            <div className={styles.headerlocationrow}>
                <div className={styles.location}>
                    <h4 className={styles.locationtitle}>Location:</h4>
                    <TextField
                        select
                        className={styles.locationName}
                        value={city}
                        onChange={handleChange}
                        variant='standard'
                    >
                        {area.map((city) => (
                            <MenuItem key={city.id} value={city.name}>{city.name}</MenuItem>
                        ))}
                    </TextField>
                </div>
                <SearchBar />
            </div>
        </>
    )
}