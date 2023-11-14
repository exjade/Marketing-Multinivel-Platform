import React from 'react'
import styles from '../landing.module.css'
import useMotion from '../../../../hooks/use-motion'
import { motion } from 'framer-motion';
import useIsVisible from '../../../../hooks/use-isVisible'

const AuditSecutiry = () => {
    const { item, container, image } = useMotion()
    const { isContentVisible } = useIsVisible()


    return (
        <motion.div
            id="content" className={`${isContentVisible ? `${styles.content} ${styles.visible}` : `${styles.content}`}  ${styles.auditSecutiryContainer}`}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            <div className={`${styles.auditSecutiryWrapper}`}>
                <div className={`${styles.auditSecutiryOne} `}>
                    <motion.span className={`${styles.auditSecutiryTXT} flex flex-col gap-2 items-start w-10/12`} variants={image} >
                        <h2 className='uppercase text-gray-background'>is it safe?</h2>
                        <h3 className='text-3xl font-medium capitalize'>Audit and security</h3>
                        <p className='font-light w-full sm:w-2/3'>
                            Yes! Artificial checked by elastically network
                            performance monitoring and automation service
                            provides real-time visibility for any size network
                            and can be customized to measure and monitor business-
                            level objectives traditional monitoring.
                        </p>
                    </motion.span>
                    <motion.span className={styles.spyglassImage} variants={item} >
                        <img
                            src="https://i.imgur.com/6BQAo45.png"
                            alt="spyglass business"
                            className='w-32 h-16 object-contain'
                        />
                    </motion.span>
                </div>
            </div>
        </motion.div>
    )
}

export default AuditSecutiry