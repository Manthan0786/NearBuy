import PersonIcon from '@mui/icons-material/Person';
import styles from './header.module.css'
import { MenuItem, TextField } from '@mui/material';
import { useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react"
import SignIn from '../../../pages/buyer/SignIn/signin';
import Image from 'next/image';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router'

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
    const { data: session, status } = useSession();
    const router = useRouter()
    const handleChange = (e) => {
        setCity(e.target.value);
    }
    if (status === "authenticated") {
        return (
            <>
                <div className={styles.header}>
                    <h1 className={styles.title}>NearBuy</h1>
                    <div className={styles.account}>
                    <Image
                            src={""+session.user.image}
                            width={50}
                            height={50}
                            style={{borderRadius:'50%'}}
                            layout="responsive"
                        />
                        <button  style={{marginLeft:'10px', background:'transparent', color:'blue',  width:'60px',border:'none'}} onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })}>Sign Out</button>
                    </div>
                </div>

                {/* <div className={styles.headerlocationrow}>
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
                                <MenuItem key={city.value} value={city.id}>{city.name}</MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <input
                        type="text"
                        placeholder="Search here"
                        style={{ height: '20px' }}
                    // onChange={handleChange}
                    // value={searchInput}
                    />
                </div> */}
            </>
        )
    }
    if(status==="unauthenticated"){
        router.push("/seller/SignIn/signin")
    }



}