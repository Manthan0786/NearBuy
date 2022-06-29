import Header from "../Header/header";
import { Box, Paper, Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import styles from './firstpage.module.css';

export default function SecondPage() {
    return(
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
                    </div>                   
                </Paper>
            </Box>
        </>
    );
}