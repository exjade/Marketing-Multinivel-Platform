import React from 'react'
import styles from '../styles/landing/landing.module.css'
import { Helmet } from 'react-helmet';
import { Header, Hero, Swipper, HeroTwo, Footer } from '../components/landing/'


const Landing = () => {

  return (
    <div className={`${styles.Background} max-w-full mx-auto h-screen text-white-normal font-roboto`} >
      <Helmet>
        <title>Welcome | Capital Traders Corp</title>
        <meta name="description" content="Unlock financial success with Capital Traders Business. Expert financial services, strategic investments, and personalized solutions for optimal growth. Trust in our commitment to your prosperity" />
        <meta property="og:title" content="Capital Traders Corp - Login" />
        <meta property="og:description" content="Securely access your account with ease at Capital Traders Corp." />
        <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/capitaltraderscorp.appspot.com/o/images%2Fisotipo.webp?alt=media&token=1e8d7226-1bd3-4cd4-986e-bce769aeee30" />
        <meta property="og:url" content="https://capitaltraders.web.app/" />
      </Helmet>

      <Header />
      <Hero />
      <Swipper />
      <HeroTwo />
      <Footer />
    </div>
  )
}

export default Landing