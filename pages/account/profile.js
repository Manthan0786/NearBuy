import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { useEffect } from "react";
import Image from 'next/image'

function Page() {
  const session = useSession();
  const router = useRouter();
  console.log(session);
  useEffect(() => {
    if (session.status == 'loading') {
      return
    }
    if (session.status !== 'authenticated') {
      router.push('/');
    }
  }, [])

  const imageStyle = {
    borderRadius: '50%',
    border: '1px solid #fff',
  }


  return (
    <>
      {
        session.status == 'loading' ? <h2>Loading</h2> :
          <div className="profile_container">
            <Image src={session.data.user.image} alt={`${session.data.user.image} Image`} width={200} height={200} style={imageStyle}></Image>
            <h2>Hi! {session.data.user.name}</h2>
          </div>
      }
    </>
  )
}

export default Page;