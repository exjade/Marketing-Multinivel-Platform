import axios from 'axios';

export const fetchData = async(symbol, amount, currency) => {

    try {
        const response = await axios.get(
            `https://api.coinbase.com/v2/prices/${symbol}-${currency}/spot`
        );
        const conversionRate = response.data.data.amount;
        const conversionAmount = (amount / conversionRate).toFixed(4);
        return conversionAmount;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error; // Puedes lanzar el error para manejarlo en otro componente
    }
};