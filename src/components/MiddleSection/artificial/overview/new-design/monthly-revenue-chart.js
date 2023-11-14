import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useEarningsOverview from '../../../../../hooks/use-earningsOverview'
import useAuthListener from '../../../../../hooks/use-auth-listener'

const MonthlyRevenueChart = () => {

    const { earnings } = useEarningsOverview();
    const { user } = useAuthListener();

    const filterEarnings = earnings?.filter((earnings) => earnings.userId === user?.uid);

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
    const chartData = {
        labels: ['July', 'August', 'September', 'October', 'November', 'December'],
        values: [0, 0, 0,0, 0, 0], // Inicializamos los valores a 0 para asegurarnos de que haya datos para todos los meses
    };

    // Mapeamos los valores de gananciasPorMes en el objeto chartData
    Object.keys(gananciasPorMes).forEach((mes) => {
        const monthIndex = parseInt(mes, 10) - 1; // Convertimos el mes a base 0 restando 1
        chartData.values[monthIndex] = gananciasPorMes[mes];
    });

    console.log(chartData)

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="rgba(37,150,130,0.75)" />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default MonthlyRevenueChart