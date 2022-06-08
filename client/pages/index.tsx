import type { NextPage } from "next"
import dynamic from "next/dynamic"
import Head from "next/head"
// import BlankMessage from "../components/BlankMessage"
import { useUserContext } from "../context/UserContext"
// import Auth from

const Auth = dynamic(() => import("../layout/Auth"), { ssr: false })
const BlankMessage = dynamic(() => import("../components/BlankMessage"), {
  ssr: false,
})

const Home: NextPage = () => {
  const userCxt = useUserContext()

  return (
    <>
      <Head>
        <title>Message</title>
      </Head>
      {userCxt?.user !== null ? <BlankMessage /> : <Auth />}
    </>
  )
}

export default Home
