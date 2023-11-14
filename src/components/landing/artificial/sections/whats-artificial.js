import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from '../landing.module.css'
import { motion } from 'framer-motion'
import useIsVisible from '../../../../hooks/use-isVisible'
import useMotion from '../../../../hooks/use-motion'

const LandingWhatsArtificial = () => {
  const { t } = useTranslation()//eslint-disable-line

  const { item, container, image } = useMotion()
  const { isContentVisible } = useIsVisible()

  return (
    <div
      id="content"
      className={`${isContentVisible ? `${styles.content} ${styles.visible}` : `${styles.content}`} 
    ${styles.backgroundColor} container flex flex-col justify-around items-center
     max-w-full mx-auto h-screen text-white-normal `}>
      <motion.div
        className='flex flex-col justify-center items-center gap-6  font-medium px-5'
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className='uppercase text-green-landingButton font-medium'
          variants={item}
        >
          what is Artificial?
        </motion.p>
        <span className='text-2xl sm:text-4xl text-center'>
          <h1>Artificial: Where technology redefines your investments</h1>
        </span>
        <p className='text-gray-primary font-light '>Blockchain, Artificial Intelligence and Data Analysis</p>
        <motion.div
          className='flex w-10/12 flex-col items-center justify-center gap-2 font-light '
          variants={image}
        >
          <p>
            Artificial is a revolutionary platform that combines the best of blockchain technology
            and artificial intelligence to deliver advanced cryptocurrency and investment solutions.
          </p>
          <p>At Artificial, we use cutting-edge software development technologies to create a secure and efficient platform.
            The foundation of our platform is blockchain technology, which enables transparent, immutable and decentralized transactions.
            We leverage the unique features of blockchain to ensure the security of transactions and the protection of our users' assets.</p>
          <p>
            Using advanced algorithms, we are able to analyze large volumes of data and detect patterns and trends in the cryptocurrency markets.
            This allows us to make informed decisions and maximize returns for our investors.
          </p>
          <p>
            Our focus on technology is not limited only to platform development. We are constantly researching and exploring new technological innovations in the field of cryptocurrencies and finance. This allows us to be at the forefront of the latest trends and offer cutting-edge solutions that adapt to a constantly evolving financial environment.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default LandingWhatsArtificial