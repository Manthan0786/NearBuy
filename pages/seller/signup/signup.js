import { TextField, Box } from "@mui/material";
import styles from "./signup.module.css"
import { alpha, styled } from '@mui/material/styles';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router'
import { PrismaClient } from "@prisma/client";
import { getSession } from 'next-auth/react'

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'white',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
    },
    '& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root , .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root': {
        color: 'white',
        borderColor: 'white'
    },
    '& .css-8q2m5j-MuiInputBase-root-MuiInput-root:before , .css-1ptx2yq-MuiInputBase-root-MuiInput-root:before, .css-8q2m5j-MuiInputBase-root-MuiInput-root:hover': {
        borderBottomColor: 'white'
    },
    '& .css-66dh3a-MuiInputBase-input-MuiInput-input , .css-1x51dt5-MuiInputBase-input-MuiInput-input': {
        color: 'white'
    },
    '& .MuiTextField-root': {
        '& fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },

    },
});


export default function SignUp() {
    const { data: session, status } = useSession();
    const router = useRouter();
    async function saveSeller(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const sellerDetail = {
            address: data.get('address'),
            companyName: data.get('companyName'),
            email: session.user.email
        }
        try {
            const response = await fetch('../../api/seller', {
                method: 'POST',
                body: JSON.stringify(sellerDetail),
                headers: {
                    'Content-Type': 'application/json;'
                }
            });
            router.push("/seller/homepage")
        }
        catch (e) {
            console.log(e);
        }
    }
    if (status === "authenticated") {
        return (
            <>

                <div className={styles.container}>
                    <Box onSubmit={saveSeller} component="form" className={styles.buyerDetailsForm}>
                        <h2> We just need a little more information to get you started</h2>
                        <CssTextField required className={styles.textfield} name="companyName" variant="standard" label="Company Name" />
                        <CssTextField required className={styles.textfield} name="address" variant="standard" label="Address" multiline rows={3} />
                        <button className={styles.submitButton} type="submit"> Continue </button>
                    </Box>
                </div>


            </>
        )
    }
    if (status === "unauthenticated") {
        router.push("/seller/SignIn/signin")
    }

}

export async function getServerSideProps(context) {
    const prisma = new PrismaClient();
    const { req } = context;
    const session = await getSession({ req });
    const res = await prisma.seller.findMany(
        {
            where: {
                user: {
                    email: {
                        equals: session.user.email
                    }
                }
            }

        }
    )

    if (res.length >0) {
        return {
            redirect: { destination: "/seller/homepage" },
        };
    }
    return {
        props: {
        },
    }
}
