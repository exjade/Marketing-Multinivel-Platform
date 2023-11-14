import React, { useState, useEffect } from 'react'
import styles from './styles/wallet.module.css'
import WalletHeader from './artificial/header/wallet-header'
import WalletMenu from './artificial/menu/wallet-menu'
import WalletMenuScreens from './artificial/wallet-menu-screens'
import WalletActions from './artificial/staking/wallet-actions'
import shortid from 'shortid';
import useAuthListener from '../../hooks/use-auth-listener'
import useStaking from '../../hooks/use-staking'
import { fetchData } from './artificial/divisas/crypto-usd'
import useUser from '../../hooks/use-user'
import WithdrawalWalletModal from './artificial/withdrawal'
//firebase
import { firebase } from '../../lib/firebase'
import { getFirestore, collection, addDoc, doc, updateDoc } from 'firebase/firestore'
const firestore = getFirestore(firebase)


const WalletTimeline = () => {

  useEffect(() => { document.title = 'Welcome to Artificial' }, [])
  const { user: activeUser } = useUser()
  const { user } = useAuthListener()
  const { staking } = useStaking()

  const [balanceUSDT, setBalanceUSDT] = useState(0)
  // MENU
  const [isActive, setIsActive] = useState({
    home: false,
    wallet: true,
    buy: false,
    recharge: false,
    settings: false,
    stake: false,
  })

  // Staking: This state  allows you to select the cryptocurrency card, 
  //which displays the APR, days and stake button 
  const [selectCurrency, setSelectCurrency] = useState({
    loader: true,
    bitcoin: false,
    ethereum: false,
    bnb: false,
    tron: false,
    solana: false,
  })

  const [modal, setModal] = useState(false)
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false)

  const stakeDate = Date.now();
  // Obtener la fecha actual
  var today = new Date();
  // ===================== STAKING: 30 DAYS ===================== //
  // Sumar 30 días a la fecha actual
  today.setDate(today.getDate() + 30);
  // Obtener el timestamp en milisegundos
  var timestamp = today.getTime();
  // ===================== STAKING: 60 DAYS ===================== //
  // Sumar 30 días más a la fecha actual
  today.setDate(today.getDate() + 30);
  // Obtener el timestamp en milisegundos
  var timestampSixteen = today.getTime();
  // ===================== STAKING: 120 DAYS ===================== //
  // Sumar 60  días a la fecha actual
  today.setDate(today.getDate() + 60);
  // Obtener el timestamp en milisegundos
  var timestampHundredTwenty = today.getTime();

  // This states manages the status and functions to update the information in the database
  const [bitcoin, setBitcoin] = useState({
    name: '',
    coin: '',
    initialInvestment: 0,
    earningAmount: 0,
    earningTotal: 0,
    percentage: 0,
    duration: 0,
    startDate: stakeDate,
    endDate: null,
    investorSign: false,
    docId: shortid.generate().trim(),
    userEmail: user?.email,
    userId: user?.uid,
    userName: user?.displayName,
    status: 'inProgress',
  })
  // It listens for changes in the input and updates the status with the information that was written.
  const handleOnChangeInitialInvestment = (e) => {
    setBitcoin({
      ...bitcoin,
      initialInvestment: parseFloat(e.target.value),
      earningAmount: parseFloat(e.target.value),
    })
  }

  const AnnualPercentageRate = {
    btc: {
      treinta: 7,
      sesenta: 14,
      cientoveinte: 28,
    },
    eth: {
      treinta: 5,
      sesenta: 10,
      cientoveinte: 20,
    },
    bnb: {
      treinta: 15,
      sesenta: 30,
      cientoveinte: 60,
    },
    trx: {
      treinta: 16,
      sesenta: 32,
      cientoveinte: 64,
    },
    sol: {
      treinta: 14,
      sesenta: 28,
      cientoveinte: 56,
    },
  }


  // Filter by cryptocurrency
  const filterBitcoin = staking?.filter((currency) => currency.name === 'Cardano')
  const filterEthereum = staking?.filter((currency) => currency.name === 'Ethereum')
  const filterBNB = staking?.filter((currency) => currency.name === 'Tether')
  const filterTron = staking?.filter((currency) => currency.name === 'Polkadot')
  const filterSolana = staking?.filter((currency) => currency.name === 'Solana')


  /*  ================================ BITCOIN ================================  */
  // Collect in an array: Initial Investment
  const arrBitcoin = filterBitcoin.map((value) => parseInt(value.initialInvestment))
  // Collect in an array: Earning Amount
  const arrBitcoinEarningAmount = filterBitcoin.map((value) => parseInt(value.earningAmount))
  // Sum: Initial Investment
  const sumBitcoin = arrBitcoin?.reduce((acc, numero) => { return acc + numero }, 0)
  // Sum: Earning Amount
  const sumBitcoinEarningAmount = arrBitcoinEarningAmount?.reduce((acc, numero) => { return acc + numero }, 0)
  /*  ================================ ETHEREUM ================================  */
  // Collect in an array: Initial Investment
  const arrEthereum = filterEthereum.map((value) => parseInt(value.initialInvestment))
  // Collect in an array: Earning Amount
  const arrEthereumEarningAmount = filterEthereum.map((value) => parseInt(value.earningAmount))
  // Sum: Initial Investment
  const sumEthereum = arrEthereum?.reduce((acc, numero) => { return acc + numero }, 0)
  // Sum: Earning Amount
  const sumEthereumEarningAmount = arrEthereumEarningAmount?.reduce((acc, numero) => { return acc + numero }, 0)
  /*  ================================ BNB ================================  */
  // Collect in an array: Initial Investment
  const arrBNB = filterBNB.map((value) => parseInt(value.initialInvestment))
  // Collect in an array: Earning Amount
  const arrBNBEarningAmount = filterBNB.map((value) => parseInt(value.earningAmount))
  // Sum: Initial Investment
  const sumBNB = arrBNB?.reduce((acc, numero) => { return acc + numero }, 0)
  // Sum: Earning Amount
  const sumBNBEarningAmount = arrBNBEarningAmount?.reduce((acc, numero) => { return acc + numero }, 0)
  /*  ================================ TRON ================================  */
  // Collect in an array: Initial Investment
  const arrTron = filterTron.map((value) => parseInt(value.initialInvestment))
  // Collect in an array: Earning Amount
  const arrTronEarningAmount = filterTron.map((value) => parseInt(value.earningAmount))
  // Sum: Initial Investment
  const sumTron = arrTron?.reduce((acc, numero) => { return acc + numero }, 0)
  // Sum: Earning Amount
  const sumTronEarningAmount = arrTronEarningAmount?.reduce((acc, numero) => { return acc + numero }, 0)

  /*  ================================ SOLANA ================================  */
  // Collect in an array: Initial Investment
  const arrSolana = filterSolana.map((value) => parseInt(value.initialInvestment))
  // Collect in an array: Earning Amount
  const arrSolanaEarningAmount = filterSolana.map((value) => parseInt(value.earningAmount))
  // Sum: Initial Investment
  const sumSolana = arrSolana?.reduce((acc, numero) => { return acc + numero }, 0)
  // Sum: Earning Amount
  const sumSolanaEarningAmount = arrSolanaEarningAmount?.reduce((acc, numero) => { return acc + numero }, 0)



  /*  ================================ ================= ================================  */
  /*  ================================ CONVERT CRYPTO TO USD ================================  */
  /*  ================================ ================= ================================  */
  const [conversionData, setConversionData] = useState([]);
  useEffect(() => {

    const cryptoList = [
      { symbol: 'ADA', conversionAmount: null, amount: sumBitcoinEarningAmount },
      { symbol: 'ETH', conversionAmount: null, amount: sumEthereumEarningAmount },
      { symbol: 'USDT', conversionAmount: null, amount: sumBNBEarningAmount },
      { symbol: 'DOT', conversionAmount: null, amount: sumTronEarningAmount },
      { symbol: 'SOL', conversionAmount: null, amount: sumSolanaEarningAmount },
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
      setConversionData(updatedConversionData);
    };

    fetchConversionData();
  }, [staking]);

  // BITCOIN
  const filterBTC = conversionData.filter((c) => c.symbol === 'ADA')
  const mapBTC = filterBTC.map((v) => parseFloat(v.conversionAmount))
  // ETHEREUM
  const filterETH = conversionData.filter((c) => c.symbol === 'ETH')
  const mapETH = filterETH.map((v) => parseFloat(v.conversionAmount))
  // SOLANA
  const filterSOL = conversionData.filter((c) => c.symbol === 'SOL')
  const mapSOL = filterSOL.map((v) => parseFloat(v.conversionAmount))
  // POLKADOT
  const filterDOT = conversionData.filter((c) => c.symbol === 'DOT')
  const mapDOT = filterDOT.map((v) => parseFloat(v.conversionAmount))
  // POLKADOT
  const filterUSDT = conversionData.filter((c) => c.symbol === 'USDT')
  const mapUSDT = filterUSDT.map((v) => parseFloat(v.conversionAmount))


  //This must have the information coming from the database
  const stakingCrypto = {
    btc: {
      image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png',
      name: 'Cardano',
      coin_amount: mapBTC,
      coin: 'ADA',
      initialInvestment: sumBitcoin,
      earningAmount: sumBitcoinEarningAmount,
      CalculatePercentageGain: function () {
        const profitLessInvestment = this.earningAmount - this.initialInvestment;
        const percentaje = (profitLessInvestment / this.initialInvestment) * 100;
        return percentaje.toFixed(2);
      }
    },
    eth: {
      image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
      name: 'Ethereum',
      coin_amount: mapETH,
      coin: 'ETH',
      initialInvestment: sumEthereum,
      earningAmount: sumEthereumEarningAmount,
      CalculatePercentageGain: function () {
        const profitLessInvestment = this.earningAmount - this.initialInvestment;
        const percentaje = (profitLessInvestment / this.initialInvestment) * 100;
        return percentaje.toFixed(2);
      }
    },
    bnb: {
      image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
      name: 'Tether',
      coin_amount: mapUSDT,
      coin: 'USDT',
      initialInvestment: sumBNB,
      earningAmount: sumBNBEarningAmount,
      CalculatePercentageGain: function () {
        const profitLessInvestment = this.earningAmount - this.initialInvestment;
        const percentaje = (profitLessInvestment / this.initialInvestment) * 100;
        return percentaje.toFixed(2);
      }
    },
    trx: {
      image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png',
      name: 'Polkadot',
      coin_amount: mapDOT, // USD to cryptocurrency value
      coin: 'DOT',
      initialInvestment: sumTron, // initial investment
      earningAmount: sumTronEarningAmount, // current earnings + initial Investment
      CalculatePercentageGain: function () {
        const profitLessInvestment = this.earningAmount - this.initialInvestment;
        const percentaje = (profitLessInvestment / this.initialInvestment) * 100;
        return percentaje.toFixed(2);
      }
    },
    sol: {
      image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png',
      name: 'Solana',
      coin_amount: mapSOL, // USD to cryptocurrency value
      coin: 'SOL',
      initialInvestment: sumSolana, // initial investment
      earningAmount: sumSolanaEarningAmount, // current earnings + initial Investment
      CalculatePercentageGain: function () {
        const profitLessInvestment = this.earningAmount - this.initialInvestment;
        const percentaje = (profitLessInvestment / this.initialInvestment) * 100;
        return percentaje.toFixed(2);
      }
    }
  }

  // Sum stakingCrypto Object Initial  less earingAmount
  const initialInvestment = [
    stakingCrypto.btc.initialInvestment,
    stakingCrypto.eth.initialInvestment,
    stakingCrypto.bnb.initialInvestment,
    stakingCrypto.trx.initialInvestment,
    stakingCrypto.sol.initialInvestment,
  ]
  const earningAmount = [
    stakingCrypto.btc.earningAmount,
    stakingCrypto.eth.earningAmount,
    stakingCrypto.bnb.earningAmount,
    stakingCrypto.trx.earningAmount,
    stakingCrypto.sol.earningAmount,
  ]
  const sumInitialInvestment = initialInvestment.reduce((acc, number) => acc + number, 0);
  const sumEarningAmount = earningAmount.reduce((acc, number) => acc + number, 0);
  const currentYields = (sumEarningAmount - sumInitialInvestment)
  // Percentage 
  const gananciaNeta = sumEarningAmount - sumInitialInvestment;
  const ProfitPercentage = parseFloat((gananciaNeta / sumInitialInvestment) * 100).toFixed(2);


  // ============================================= ================= =====================================================//
  // ============================================= WALLET WITHDRAWAL =====================================================//
  // ============================================= ================= =====================================================//

  const { user: currentUser } = useAuthListener()

  const [loader, setLoader] = useState(false);
  const [loaderError, setLoaderError] = useState('');
  // const [isInvalid, setIsInvalid] = useState(false);
  const [pinError, setPinError] = useState('')
  const [withdrawalAmountError, setWithdrawalAmountError] = useState('')
  const [gassFeeError, setGassFeeError] = useState('')

  const [withdrawalAmount, setWithdrawalAmount] = useState(0)
  const [withdrawalAddress, setWithdrawalAddress] = useState('')
  const [pin, setPin] = useState('')
  // const [searchWithdrawal, setSearchWithdrawal] = useState('')


  // MODAL
  const [WithdrawalModal, setWithdrawalModal] = useState(false);
  const handleOpenModal = () => setWithdrawalModal(true);
  const handleCloseModal = () => {
    setWithdrawalModal(false);

    setTimeout(() => {
      setWithdrawalAmount(0)
      setWithdrawalAddress('')
      setPin('')
      setPinError('')
      setWithdrawalAmountError('')
    },100)
  }

  const gasFee = parseFloat((Math.random() * (2.9 - 1.5) + 1.5).toFixed(2))


  const bankInformation = {
    tether: {
      Currency: 'TETHER',
      BankName: 'Tether (USDT)',
      AccountNumber: withdrawalAddress,
      AccountName: activeUser?.username,
      WithdrawalAmount: activeUser?.topupBalance
    },
  }

  const data = {
    CustomerName: activeUser?.fullName,
    CustomerId: currentUser.uid,
    CustomerEmail: currentUser.email,
    CustomerWallet: withdrawalAddress,
    CustomerCurrentBalance: activeUser?.Balance,
    CustomerCurrentWithdrawal: activeUser?.topupBalance,
    CustomerLastWithdrawal: activeUser?.topupBalance,
    WithdrawalAmount: parseInt(withdrawalAmount) === parseInt(activeUser?.topupBalance) ? parseInt(activeUser?.topupBalance) : withdrawalAmount,
    WithdrawalFee: gasFee,
    WithdrawalStatus: 'Pending',
    WithdrawalId: shortid.generate(),
    WithdrawalDate: Date.now(),
    WithdrawalInformation: bankInformation,
    WithdrawalCurrency: 'TETHER',
    WithdrawalURL: '',
    AdminName: '',
  }

  // const earnings = {
  //   date: Date.now(),
  //   amount: parseInt(withdrawalAmount),
  //   userId: currentUser.uid,
  //   CustomerEmail: currentUser.email,
  //   CustomerWallet: withdrawalAddress,
  //   WithdrawalId: shortid.generate(),
  //   username: activeUser?.username,
  // }


  const makeWithdrawalRequest = async () => {
    try {
      if (pin === activeUser?.pin) {
        if (data?.CustomerId === activeUser?.userId) {
          if (data?.CustomerId !== '') {
            if (parseInt(withdrawalAmount) <= parseInt(activeUser?.topupBalance)) {
              if (parseInt(activeUser?.topupBalance) >= 1 && parseInt(withdrawalAmount) >= 1) {
                //eslint-disable-next-line no-unused-vars
                const docRef = await addDoc(collection(firestore, 'wallet-withdrawals'), data);
                //eslint-disable-next-line no-unused-vars
                // const eoverviewRef = await addDoc(collection(firestore, 'earnings-overview'), earnings);
                // setIsInvalid(true)
                const userRef = doc(firestore, 'users', activeUser.docId);
                setLoader(true)
                // check if user has enougth for gas fee
                if (parseInt(activeUser?.topupBalance) >= gasFee) {
                  await updateDoc(userRef, {
                    topupBalance: parseInt(withdrawalAmount) === parseInt(activeUser?.topupBalance) ? 0 : (parseInt(activeUser?.topupBalance) - parseInt(withdrawalAmount)) - gasFee,
                  })
                } else {
                  setGassFeeError('Insufficient funds to cover the network fee.')
                }
              } else {
                setWithdrawalAmountError('There isnt enough balance in your wallet to perform this action')
              }
            } else {
              setWithdrawalAmountError('It is not permissible to send an amount greater than the available balance.')
            }
          }
        }
      } else {
        setPinError('Wrong security pin')
      }
      setTimeout(() => {
        setLoaderError('')
        setWithdrawalAmountError('')
        setLoader(false)
        setTimeout(() => {
          window.location.reload()
        }, 150)
      }, 1000)
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div className='flex fex-col justify-center items-center w-full font-Inter-500'>
      <div className={`container flex flex-col items-center justify-center max-w-screen-lg`}>
        <div className={`${styles.mainWrapper}`}>
          <WalletHeader
            currentYields={currentYields}
            ProfitPercentage={ProfitPercentage}
            sumEarningAmount={sumEarningAmount}
            activeUser={activeUser}
            isActive={isActive}
            handleOpenModal={handleOpenModal}
          />
          {
            isActive.buy || isActive.recharge ? null
              : (<WalletActions setIsActive={setIsActive} />)
          }

          {
            WithdrawalModal &&
            (<WithdrawalWalletModal
              handleCloseModal={handleCloseModal}
              setWithdrawalAmount={setWithdrawalAmount}
              setWithdrawalAddress={setWithdrawalAddress}
              setPin={setPin}
              makeWithdrawalRequest={makeWithdrawalRequest}
              withdrawalAmount={withdrawalAmount}
              withdrawalAddress={withdrawalAddress}
              gasFee={gasFee}
              pin={pin}
              pinError={pinError}
              withdrawalAmountError={withdrawalAmountError}
              gassFeeError={gassFeeError}
              activeUser={activeUser}
              setPinError={setPinError}
              setWithdrawalAmountError={setWithdrawalAmountError}
              loader={loader}
            />)
          }

          <WalletMenu
            isActive={isActive}
            setIsActive={setIsActive}
          />
          <WalletMenuScreens
            isActive={isActive}
            setIsActive={setIsActive}
            stakingCrypto={stakingCrypto}
            selectCurrency={selectCurrency}
            setSelectCurrency={setSelectCurrency}
            modal={modal}
            openModal={openModal}
            closeModal={closeModal}
            setBitcoin={setBitcoin}
            bitcoin={bitcoin}
            handleOnChangeInitialInvestment={handleOnChangeInitialInvestment}
            AnnualPercentageRate={AnnualPercentageRate}
            stakeDate={stakeDate}
            timestamp={timestamp}
            timestampSixteen={timestampSixteen}
            timestampHundredTwenty={timestampHundredTwenty}
            staking={staking}
            setBalanceUSDT={setBalanceUSDT}
            balanceUSDT={balanceUSDT}
            activeUser={activeUser}
          />
        </div>
      </div>
    </div>
  )
}

export default WalletTimeline