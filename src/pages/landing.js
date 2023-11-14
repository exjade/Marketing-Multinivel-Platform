import React from 'react'
import styles from '../styles/landing/landing.module.css'
import LandingTestimonials from '../components/landing/Testimonials/testimonials'
import LandingCallToAction from '../components/landing/calltoaction/call-to-action'
import LandingFooter from '../components/landing/Footer/footer'
// import TranslationBtn from '../components/translations/translationBtn'
// import LandingHeader from '../components/landing/Header/header'
// import LandingHero from '../components/landing/Hero/hero'
// import LandingContent from '../components/landing/Content/content'
import LandingHeader from '../components/landing/artificial/header'
import LandingHero from '../components/landing/artificial/hero'
import LandingWhatsArtificial from '../components/landing/artificial/sections/whats-artificial'
import LandingSponsors from '../components/landing/artificial/sponsors'
import AuditSecutiry from '../components/landing/artificial/sections/audit-secutiry'
import LandingFaq from '../components/landing/artificial/faq'
import { Helmet } from 'react-helmet';


const Landing = () => {

  return (
    <div className={`${styles.Background} max-w-full mx-auto h-screen text-white-normal font-Biryani`} >
       <Helmet>
        <title>Welcome - ArtificialTech4u</title>
        <meta name="description" content="Welcome to ArtificialTech4u, your all-in-one platform. Harness the power of artificial intelligence to optimize your investment strategies and manage your digital assets securely. Explore our cutting-edge services and unlock new opportunities in the world of finance. Join us today and let Artificial Tech4u revolutionize your investment experience." />
        <meta property="og:title" content="ArtificialTech4u - Login" />
        <meta property="og:description" content="Securely access your account with ease at Artificial Tech4u. Our advanced login platform, powered by intelligent AI technology, ensures a seamless and secure login experience. Safeguard your investments and digital assets with our cutting-edge authentication protocols. Join us at Artificial Tech4u and discover the future of secure and intelligent financial management." />
        <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/artificialtech4u-d99e3.appspot.com/o/logo.webp?alt=media&token=8956532b-e360-43fb-846e-19986f8860a6" />
        <meta property="og:url" content="artificialtech4u.com" />
      </Helmet>

      <LandingHeader />
      <LandingHero />
      <LandingWhatsArtificial />
      <LandingSponsors />
      <AuditSecutiry />
      <LandingTestimonials />
      <LandingCallToAction />
      {/* <LandingFaq /> */}
      <LandingFooter />
      {/* <div className={`${styles.translationFixed}`} >
        <TranslationBtn />
      </div> */}
    </div>
  )
}

export default Landing