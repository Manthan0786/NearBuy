import Header from "../Header/header";
import styles from './firstpage.module.css'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { CardActionArea, Card, CardContent, CardMedia, Typography} from '@mui/material';

export default function Firstpage() {
    return (
        <>
        <Header />
        <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    marginLeft: '5%',
                    marginRight: '5%',
                    border: '1px solid red',
                    '& > :not(style)': {
                        m: 0,
                        width: 1200,
                        height: 'auto',
                    },
                }}
            >
                <Paper>
                    <div className={styles.cardcontentrow}>
                    <Card  sx={{ maxWidth: 345 }} className={styles.cardcontent}>
                        <CardActionArea>
                            <CardMedia 
                                component="img"
                                height="140"
                                image="/static/images/cards/contemplative-reptile.jpg"
                                alt="green iguana"
                            />
                            <CardContent >
                                <Typography gutterBottom variant="h5" component="div">
                                    Wallet
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card  sx={{ maxWidth: 345 }} className={styles.cardcontent}>
                        <CardActionArea>
                            <CardMedia 
                                component="img"
                                height="140"
                                image="/static/images/cards/contemplative-reptile.jpg"
                                alt="green iguana"
                            />
                            <CardContent >
                                <Typography gutterBottom variant="h5" component="div">
                                    Shoes
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card  sx={{ maxWidth: 345 }} className={styles.cardcontent}>
                        <CardActionArea>
                            <CardMedia 
                                component="img"
                                height="140"
                                image="/static/images/cards/contemplative-reptile.jpg"
                                alt="green iguana"
                            />
                            <CardContent >
                                <Typography gutterBottom variant="h5" component="div">
                                    Clothing
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    </div>
                    <div className={styles.cardcontentrow}>
                    <Card  sx={{ maxWidth: 345 }} className={styles.cardcontent}>
                        <CardActionArea>
                            <CardMedia 
                                component="img"
                                height="140"
                                image="/static/images/cards/contemplative-reptile.jpg"
                                alt="green iguana"
                            />
                            <CardContent >
                                <Typography gutterBottom variant="h5" component="div">
                                    Wallet
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card  sx={{ maxWidth: 345 }} className={styles.cardcontent}>
                        <CardActionArea>
                            <CardMedia 
                                component="img"
                                height="140"
                                image="/static/images/cards/contemplative-reptile.jpg"
                                alt="green iguana"
                            />
                            <CardContent >
                                <Typography gutterBottom variant="h5" component="div">
                                    Shoes
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    </div>
                </Paper>
            </Box>
        </>
    );
}