import PersonIcon from '@mui/icons-material/Person';
import styles from './header.module.css'

export default function Header() {
    return (
        <>
            <div className={styles.header}>
                <h1 className={styles.title}>NearBuy</h1>
                <div className={styles.account}><PersonIcon sx={{fontSize:'1.3rem'}}/> <p>My Account</p> </div>
            </div>
        </>
    )
}