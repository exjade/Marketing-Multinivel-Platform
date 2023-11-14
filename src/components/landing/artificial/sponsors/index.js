import React from 'react'
import styles from '../landing.module.css'
import { motion } from 'framer-motion'
import useMotion from '../../../../hooks/use-motion'

const LandingSponsors = () => {

    const { container, image } = useMotion()

    return (
        <motion.div
            className={`${styles.sponsorsContainer} mb-16`}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            <div className={`${styles.sponsorTwo}`}>
            </div>
            <motion.div
                className={`${styles.sponsorOne}`}
                variants={image}
            >
                <div className={styles.sponsorBrandings}>
                    <span className={styles.sponsorText}>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/6001/6001408.png"
                            alt="binanace"
                            className='w-10 h-10 object-contain'
                        />
                        <p>
                            Binance
                        </p>
                    </span>
                    <span className={styles.sponsorText}>
                        <img
                            src="https://crypto-central.io/library/uploads/Coinbase-Pro-Logo.png"
                            alt="coinbase"
                            className='w-10 h-10 object-contain'
                        />
                        <p>Coinbase</p>
                    </span >
                    <span className={styles.sponsorText}>
                        <img
                            src="https://icon-library.com/images/maze-icon/maze-icon-25.jpg"
                            alt="maze"
                            className='w-10 h-10 object-contain'
                        />
                        <p>Maze</p>
                    </span>
                    <span className={styles.sponsorText}>
                        <img
                            src="https://static-00.iconduck.com/assets.00/crypto-com-cryptocurrency-icon-445x512-mui68axc.png"
                            alt="crypto"
                            className='w-10 h-10 object-contain'
                        />
                        <p>Crypto</p>
                    </span>
                    <span className={styles.sponsorText}>
                        <img
                            src="https://i.imgur.com/6mcsnP2.png"
                            alt="Intellectsoft"
                            className='w-10 h-10 object-contain'
                        />
                        <p>Intellectsoft</p>
                    </span>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default LandingSponsors