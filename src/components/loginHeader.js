import PersonIcon from '@mui/icons-material/Person';
import styles from './loginHeader.module.css';

function HeaderLogin() {
    return (
        <>
            <div className={styles.header}>
                <h1 className={styles.title}>NearBuy</h1>
            </div>
        </>
    )
}

export default HeaderLogin;