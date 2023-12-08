import React from 'react'
import styles from '../styles/overview.module.css'
import IncomeChart from './income-chart'
import useEarningsOverview from '../../../../hooks/use-earningsOverview'
import useAuthListener from '../../../../hooks/use-auth-listener'

const MonthlyChartOverview = () => {

    const { earnings } = useEarningsOverview()
    const { user } = useAuthListener()

    const filterEarnings = earnings?.filter( earnings =>  earnings.userId === user?.uid)


    // Calcular las ganancias por mes
    const gananciasPorMes = filterEarnings.reduce((result, ganancia) => {
        const fecha = new Date(ganancia.date);
        const mes = fecha.getMonth() + 1; // Los meses en JavaScript son base 0, por lo que se suma 1

        if (result[mes]) {
            result[mes] += ganancia.amount;
        } else {
            result[mes] = ganancia.amount;
        }

        return result;
    }, {});

    // Convertir los datos en un formato compatible con el componente de gráfica de barras
    const data = {
        values: Object.values(gananciasPorMes)
    };

    const chartData = {
        labels: ['July', 'August', 'September', 'October', 'November', 'December'],
        values: data.values,
    };

    return (
        <section className={`${styles.contenedor} mt-2 font-roboto`} >
            <div className={`${styles.wrapper}`} >
                <h3 className='font-semibold text-xl text-white-normal'>Monthly Earnings</h3>
                <IncomeChart data={chartData} />
            </div>
        </section>
    )
}

export default MonthlyChartOverview