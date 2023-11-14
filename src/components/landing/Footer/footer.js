import React from 'react'
import styles from '../../../styles/landing/landing.module.css'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../../constants/routes'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import useMotion from '../../../hooks/use-motion'
import useIsVisible from '../../../hooks/use-isVisible'


const LandingFooter = () => {

    const { t } = useTranslation();
    const { container, image } = useMotion()
    const { isVisible } = useIsVisible()

    return (
        <motion.footer
            id="content"
            className={`${isVisible ? `${styles.content} ${styles.visible}` : `${styles.content}`} ${styles.Background} px-4 divide-y text-white-primary w-full`}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            <motion.div
                className="container flex justify-around items-center py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0 cursor-pointer"
                variants={image}
            >
                <Link to={ROUTES.FAQS}>
                    Faq
                </Link>

                <Link to={ROUTES.TERMS}>
                    Terms
                </Link>
                <Link to={ROUTES.PRIVACY}>
                    Data privacy
                </Link>
            </motion.div>
            <div className="py-6 text-sm text-center text-gray-600">© 2023 Artificial Co. {t('All rights reserved.')}</div>
        </motion.footer>
    )
}

export default LandingFooter