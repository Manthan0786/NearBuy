import { signIn, getCsrfToken, getProviders, getSession } from 'next-auth/react';
import Image from 'next/image'
import styles from './Signin.module.css'

const SignIn = ({ csrfToken, providers, session }) => {
  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
     
      <div className={styles.wrapper} />
      <div className={styles.content}>
        <div className={styles.cardWrapper}>
          <div className={styles.cardContent}>
            <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
            {providers &&
              Object.values(providers).map(provider => (
                <div key={provider.name} style={{ marginBottom: 0 }}>
                  <button onClick={() => signIn(provider.id)} >
                    Sign in with{' '} {provider.name}
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
    </div>
  )
}

export default SignIn

export async function getServerSideProps(context) {
  const providers = await getProviders()
  const csrfToken = await getCsrfToken(context);
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/buyer/homepage" },
    };
  }
  return {
    props: {
      providers,
      csrfToken,
      session
    },
  }
}
