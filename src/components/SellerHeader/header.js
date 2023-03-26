import PersonIcon from '@mui/icons-material/Person';
import styles from './header.module.css'
import { signOut } from "next-auth/react"

export default function Header() {
    return (
        <>
            <div className={styles.header}>
                <h1 className={styles.title}>NearBuy</h1>
                <div className={styles.account}>
                    <PersonIcon sx={{ fontSize: '1.3rem' }} />
                    <button onClick={() => signOut({ callbackUrl: 'http://localhost:3000/seller/SignIn/signin' })}>Sign out</button>
                </div>
            </div>
            
        </>
    )
}