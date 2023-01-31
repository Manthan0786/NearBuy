import PersonIcon from '@mui/icons-material/Person';
import styles from './header.module.css'
import { Link, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Homepage  from '../../../pages/buyer/homepage';

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

export default function Header() {
    const [city, setCity] = useState(area);
    const handleChange = (e) => {
        setCity(e.target.value);
    }

    return (
        <>
            <div className={styles.header}>
                <Link href={"/"} >
                  <h1 className={styles.title}>NearBuy</h1>
                </Link>
                
                <div className={styles.account}>
                    <PersonIcon sx={{ fontSize: '1.3rem' }} />
                    <p>My Account</p>
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
                            <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>
                        ))}
                    </TextField>
                </div>
                <input
                    className='searchbar'
                    type="text"
                    placeholder="Search here"
                />
            </div>
        </>
    )
}