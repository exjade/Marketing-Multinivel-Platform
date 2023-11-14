import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styles from '../../../../styles/wallet.module.css'
import StakingModalLeft from './staking-modal-left'
import StakingModalRight from './staking-modal-right'
import shortid from 'shortid';
import useAuthListener from '../../../../../../hooks/use-auth-listener'
import { fetchData } from '../../../../artificial/divisas/crypto-usd'
import useStaking from '../../../../../../hooks/use-staking'

const StakingModalInformation = (props) => {
  const { staking } = useStaking()
  const { user } = useAuthListener()
  const [availableBalance, setAvailableBalance] = useState('Not enough assets on your balance sheet')

  const closeModalResetCurrency = () => {
    const stakeDate = Date.now();
    props.setBitcoin({
      name: '',
      coin: '',
      initialInvestment: 0,
      earningAmount: 0,
      earningTotal: 0,
      percentage: 0,
      duration: 0,
      startDate: stakeDate,
      endDate: null,
      docId: shortid.generate().trim(),
      userEmail: user?.email,
      userId: user?.uid,
      userName: user?.displayName,
    });
    props.setSelectCurrency({
      loader: true,
      bitcoin: false,
      ethereum: false,
      bnb: false,
      tron: false,
      solana: false,
    })
    props.closeModal()
  }

  const setCurrencyDurationThirtyDays = async () => {
    props.setBitcoin({
      ...props.bitcoin,
      duration: 30,
      endDate: props.timestamp,
    })
  }
  const setCurrencyDurationSixtyDays = () => {
    props.setBitcoin({
      ...props.bitcoin,
      duration: 60,
      endDate: props.timestampSixteen,
    })
  }
  const setCurrencyDurationHundredTwentyDays = () => {
    props.setBitcoin({
      ...props.bitcoin,
      duration: 120,
      endDate: props.timestampHundredTwenty,
    })
  }

  /*  ================================ ================= ================================  */
  /*  ================================ CONVERT CRYPTO TO USD ================================  */
  /*  ================================ ================= ================================  */
  const [conversionCurrency, setConversionCurrency] = useState([]);
  useEffect(() => {

    const cryptoList = [
      { symbol: 'ADA', conversionAmount: null, amount: props.activeUser?.topupBalance },
      { symbol: 'ETH', conversionAmount: null, amount: props.activeUser?.topupBalance },
      { symbol: 'USDT', conversionAmount: null, amount: props.activeUser?.topupBalance },
      { symbol: 'DOT', conversionAmount: null, amount: props.activeUser?.topupBalance },
      { symbol: 'SOL', conversionAmount: null, amount: props.activeUser?.topupBalance },
    ];
    const fetchConversionData = async () => {
      const currency = 'USD';

      const updatedConversionData = await Promise.all(
        cryptoList.map(async (crypto) => {
          try {
            const symbol = crypto.symbol
            const amount = crypto.amount
            const conversionAmount = await fetchData(symbol, amount, currency);
            return { ...crypto, conversionAmount };
          } catch (error) {
            console.error(`Error al obtener los datos para ${crypto.symbol}:`, error);
            return { ...crypto, conversionAmount: null };
          }
        })
      );
      setConversionCurrency(updatedConversionData);
    };
    if (props.activeUser?.topupBalance > 0) {
      fetchConversionData();
    }
  }, [staking]);

  const inputRef = useRef(0);
  console.log(conversionCurrency)

  return (
    <div className={`${styles.StakingModalConclusionContainer} font-Inter-600`} >
      <div className={`${styles.StakingModalConclusionWrapper}`} >
        {/*  ============ LEFT CARD ============   */}
        <StakingModalLeft
          closeModal={props.closeModal}
          selectCurrency={props.selectCurrency}
          setBitcoin={props.setBitcoin}
          bitcoin={props.bitcoin}
          handleOnChangeInitialInvestment={props.handleOnChangeInitialInvestment}
          closeModalResetCurrency={closeModalResetCurrency}
          setCurrencyDurationThirtyDays={setCurrencyDurationThirtyDays}
          setCurrencyDurationSixtyDays={setCurrencyDurationSixtyDays}
          setCurrencyDurationHundredTwentyDays={setCurrencyDurationHundredTwentyDays}
          availableBalance={availableBalance}
          setAvailableBalance={setAvailableBalance}
          activeUser={props.activeUser}
          conversionCurrency={conversionCurrency}
          inputRef={inputRef}
        />
        {/*  ============ RIGHT CARD ============   */}
        <StakingModalRight
          closeModal={props.closeModal}
          selectCurrency={props.selectCurrency}
          handleOnChangeInitialInvestment={props.handleOnChangeInitialInvestment}
          bitcoin={props.bitcoin}
          setBitcoin={props.setBitcoin}
          AnnualPercentageRate={props.AnnualPercentageRate}
          closeModalResetCurrency={closeModalResetCurrency}
          stakeDate={props.stakeDate}
          timestamp={props.timestamp}
          timestampSixteen={props.timestampSixteen}
          timestampHundredTwenty={props.timestampHundredTwenty}
          activeUser={props.activeUser}
        />

      </div>
    </div>
  )
}

export default StakingModalInformation
StakingModalInformation.propTypes = {
  closeModal: PropTypes.func,
  selectCurrency: PropTypes.object,
  setSelectCurrency: PropTypes.func,
  setBitcoin: PropTypes.func,
  bitcoin: PropTypes.object,
  handleOnChangeInitialInvestment: PropTypes.func,
  AnnualPercentageRate: PropTypes.object,
  closeModalResetCurrency: PropTypes.func,
  stakeDate: PropTypes.any,
  timestamp: PropTypes.any,
  timestampSixteen: PropTypes.any,
  timestampHundredTwenty: PropTypes.any,
  activeUser: PropTypes.object,
  setMaxInicialInvestment: PropTypes.func,
}