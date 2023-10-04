import PersonIcon from '@mui/icons-material/Person';
import styles from './header.module.css'

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useRouter } from "next/router";

export default function SellerHeader() {
    const dropdownRef = useRef(null);
    const router = useRouter();
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

    const handleLogOut = async () => {
        const data = await signOut({ redirect: false, callbackUrl: "/" });
        router.push(data.url)
    }

    return (
        <>
            <div className={styles.header}>
                <h1 className={styles.title}>
                    <Link href="/seller/homepage" style={{ color: 'black', textDecoration: 'none' }}>
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
                                <a style={{ cursor: 'pointer' }} onClick={() => handleLogOut()}>Logout</a>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}