import styles from '../../styles/modules/packages/package.module.css'

const SkeletonPackages = () => {
    return (
        <>
            <div className={`${styles.container} `}>
                <div className={`${styles.wraper} `}>

                    <div className="h-44 w-full animate-pulse bg-gray-loader mb-4"></div>


                    <div className={`${styles.packages} `}>

                        <div className={`${styles.package} `}>
                            <div className="h-80 w-full animate-pulse bg-gray-loader"></div>
                        </div>
                        <div className={`${styles.package} `}>
                            <div className="h-80 w-full animate-pulse bg-gray-loader"></div>
                        </div>
                        <div className={`${styles.package} `}>
                            <div className="h-80 w-full animate-pulse bg-gray-loader"></div>
                        </div>
                        <div className={`${styles.package} `}>
                            <div className="h-80 w-full animate-pulse bg-gray-loader"></div>
                        </div>
                        <div className={`${styles.package} `}>
                            <div className="h-80 w-full animate-pulse bg-gray-loader"></div>
                        </div>
                        <div className={`${styles.package} `}>
                            <div className="h-80 w-full animate-pulse bg-gray-loader"></div>
                        </div>
                        <div className={`${styles.package} `}>
                            <div className="h-80 w-full animate-pulse bg-gray-loader"></div>
                        </div>
                        <div className={`${styles.package} `}>
                            <div className="h-80 w-full animate-pulse bg-gray-loader"></div>
                        </div>
                        <div className={`${styles.package} `}>
                            <div className="h-80 w-full animate-pulse bg-gray-loader"></div>
                        </div>



                    </div>
                </div>
            </div>
        </>
    )
}

export default SkeletonPackages