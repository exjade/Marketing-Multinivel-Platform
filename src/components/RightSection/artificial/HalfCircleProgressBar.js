import React, { useState } from 'react';
import PropTypes from 'prop-types'
import styles from './progress.module.css';


const HalfCircleProgressBar = ({ profitGoal, investment }) => {

    const [progress, setProgress] = useState(0);

    // Calcula el porcentaje de progreso
    const calculateProgress = () => {
        const currentProfit = profitGoal - investment;
        const progressPercentage = (currentProfit / Math.abs(investment)) * 100;
        return Math.min(progressPercentage, 100); // Limitamos el progreso al 100%
       
    };

    // Actualiza el progreso en el estado
    const updateProgress = () => {
        const newProgress = calculateProgress();
        setProgress(newProgress);
    };

    // Llamamos a esta función cada vez que cambian las propiedades "investment" o "profitGoal"
    React.useEffect(() => {
        updateProgress();
    }, [investment, profitGoal]);

    return (
        <div className={styles.investmentprogressbarcontainer}>
            <div className={styles.investmentprogressbarfill} style={{ width: `${progress}%` }}>
                <span className={`${styles.investmentprogresslabel}`} >
                    {
                        isNaN(progress.toFixed(1))  || progress.toFixed(1) < 0?
                            (
                                <p className='text-green-radored w-full text-center font-semibold text-lg'>0%</p>
                            ) :
                            (

                                `${progress.toFixed(1)}%`
                            )
                    }

                </span>
            </div>
        </div>
    );
};

export default HalfCircleProgressBar;
HalfCircleProgressBar.propTypes = {
    profitGoal: PropTypes.any,
    investment: PropTypes.any
}
