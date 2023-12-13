
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const credentials = require('./serviceAccountKey.json')
admin.initializeApp({
    credential: admin.credential.cert(credentials)
});



const {
    DailyBalanceMondayToFridayStarter,
    DailyBalanceMondayToFridayInitial,
    DailyBalanceMondayToFridayTall,
    DailyBalanceMondayToFridayGold,
    DailyBalanceMondayToFridayPremium,
    DailyBalanceMondayToFridayDiamond,
} = require('./utils/roi/dailyROIdistribuitor');
const {
    DailyProfitMondayToFridayStarter,
    DailyProfitMondayToFridayInitial,
    DailyProfitMondayToFridayTall,
    DailyProfitMondayToFridayGold,
    DailyProfitMondayToFridayPremium,
    DailyProfitMondayToFridayDiamond,
} = require('./utils/roi/dailyProfitdistribuitor');
const {
    DailyLimitContractMondayToFriday,
} = require('./utils/roi/dailyROIconditions');

const {
    FridayWithdrawalFunctionStarter,
    FridayWithdrawalFunctionInitial,
    FridayWithdrawalFunctionTail,
    FridayWithdrawalFunctionGold,
    FridayWithdrawalFunctionPremium,
    FridayWithdrawalFunctionDiamond,
} = require('./utils/withdrawals/fridaywithdrawalFunctions');

const {
    FridayWithdrawalAdjustmentStarter,
    FridayWithdrawalAdjustmentInitial,
    FridayWithdrawalAdjustmentTail,
    FridayWithdrawalAdjustmentGold,
    FridayWithdrawalAdjustmentPremium,
    FridayWithdrawalAdjustmentDiamond,
} = require('./utils/withdrawals/fridayWithdrawalAdjustment');

const {
    UnilevelTransferBalance,
    UnilevelUpdateProfit,
    UnilevelResetReferralBalance,
} = require('./utils/unilevel/dailyUnilevelAdjustment');


const db = admin.firestore();


// ================================================================== ================================= ================================================================== //
// ================================================================== PAGOS ================================================================== //
// ================================================================== ================================= ================================================================== //
// ================ DAILY BALANCE TO PAY.  EXECUTION 1 At 04:00 AM Every day ================//
exports.DailyBalanceMondayToFridayStarter = DailyBalanceMondayToFridayStarter;
// ================ DAILY BALANCE TO PAY.  EXECUTION 2 At 04:10 AM Every day ================//
exports.DailyBalanceMondayToFridayInitial = DailyBalanceMondayToFridayInitial;
// ================ DAILY BALANCE TO PAY.  EXECUTION 3 At 04:20 AM Every day ================//
exports.DailyBalanceMondayToFridayTall = DailyBalanceMondayToFridayTall;
// ================ DAILY BALANCE TO PAY.  EXECUTION 4 At 04:30 AM Every day ================//
exports.DailyBalanceMondayToFridayGold = DailyBalanceMondayToFridayGold;
// ================ DAILY BALANCE TO PAY.  EXECUTION 5 At 04:40 AM Every day ================//
exports.DailyBalanceMondayToFridayPremium = DailyBalanceMondayToFridayPremium;
// ================ DAILY BALANCE TO PAY.  EXECUTION 6 At 04:50 AM Every day ================//
exports.DailyBalanceMondayToFridayDiamond = DailyBalanceMondayToFridayDiamond;

// ================ DAILY PROFIT TO PAY.  EXECUTION 1 At 04:00 AM Every day ================//
exports.DailyProfitMondayToFridayStarter = DailyProfitMondayToFridayStarter;
// ================ DAILY PROFIT TO PAY.  EXECUTION 2 At 04:10 AM Every day ================//
exports.DailyProfitMondayToFridayInitial = DailyProfitMondayToFridayInitial;
// ================ DAILY PROFIT TO PAY.  EXECUTION 3 At 04:20 AM Every day ================//
exports.DailyProfitMondayToFridayTall = DailyProfitMondayToFridayTall;
// ================ DAILY PROFIT TO PAY.  EXECUTION 4 At 04:30 AM Every day ================//
exports.DailyProfitMondayToFridayGold = DailyProfitMondayToFridayGold;
// ================ DAILY PROFIT TO PAY.  EXECUTION 5 At 04:40 AM Every day ================//
exports.DailyProfitMondayToFridayPremium = DailyProfitMondayToFridayPremium;
// ================ DAILY PROFIT TO PAY.  EXECUTION 6 At 04:50 AM Every day ================//
exports.DailyProfitMondayToFridayDiamond = DailyProfitMondayToFridayDiamond;

// ================ DAILY CONTRACT LIMIT.  EXECUTION 6 At 04:50 AM Every day ================//
exports.DailyLimitContractMondayToFriday = DailyLimitContractMondayToFriday;

// ================================================================== ================================= ================================================================== //
// ================================================================== RETIROS================================================================== //
// ================================================================== ================================= ================================================================== //


// ================ FRIDAY: BALANCE TO WITHDRAWAL.  EXECUTION 1 At 04:00 AM on Friday ================//
exports.FridayWithdrawalFunctionStarter = FridayWithdrawalFunctionStarter;
// ================ FRIDAY: BALANCE TO WITHDRAWAL.  EXECUTION 2 At 04:10 AM on Friday ================//
exports.FridayWithdrawalFunctionInitial = FridayWithdrawalFunctionInitial;
// ================ FRIDAY: BALANCE TO WITHDRAWAL.  EXECUTION 3 At 04:20 AM on Friday ================//
exports.FridayWithdrawalFunctionTail = FridayWithdrawalFunctionTail;
// ================ FRIDAY: BALANCE TO WITHDRAWAL.  EXECUTION 4 At 04:30 AM on Friday ================//
exports.FridayWithdrawalFunctionGold = FridayWithdrawalFunctionGold;
// ================ FRIDAY: BALANCE TO WITHDRAWAL.  EXECUTION 5 At 04:40 AM on Friday ================//
exports.FridayWithdrawalFunctionPremium = FridayWithdrawalFunctionPremium;
// ================ FRIDAY: BALANCE TO WITHDRAWAL.  EXECUTION 6 At 04:50 AM on Friday ================//
exports.FridayWithdrawalFunctionDiamond = FridayWithdrawalFunctionDiamond;


// ======================================================================================================================= //
// RESET DE BALANCE SÍ EL USUARIO YA HA SIDO PAGADO Y AÚN TIENE SALDO EN SU CUENTA                                         //
// SI EL USUARIO TIENE DINERO DISPONIBLE PARA RETIRO, NO SE EJECUTA                                                        //
// ======================================================================================================================= //

// ================ FRIDAY: BALANCE TO WITHDRAWAL.  EXECUTION 1 At 04:05 AM on Friday ================//
exports.FridayWithdrawalAdjustmentStarter = FridayWithdrawalAdjustmentStarter;
// ================ FRIDAY: BALANCE TO WITHDRAWAL.  EXECUTION 2 At 04:15 AM on Friday ================//
exports.FridayWithdrawalAdjustmentInitial = FridayWithdrawalAdjustmentInitial;
// ================ FRIDAY: BALANCE TO WITHDRAWAL.  EXECUTION 3 At 04:25 AM on Friday ================//
exports.FridayWithdrawalAdjustmentTail = FridayWithdrawalAdjustmentTail;
// ================ FRIDAY: BALANCE TO WITHDRAWAL.  EXECUTION 4 At 04:35 AM on Friday ================//
exports.FridayWithdrawalAdjustmentGold = FridayWithdrawalAdjustmentGold;
// ================ FRIDAY: BALANCE TO WITHDRAWAL.  EXECUTION 4 At 04:45 AM on Friday ================//
exports.FridayWithdrawalAdjustmentPremium = FridayWithdrawalAdjustmentPremium;
// ================ FRIDAY: BALANCE TO WITHDRAWAL.  EXECUTION 4 At 04:55 AM on Friday ================//
exports.FridayWithdrawalAdjustmentDiamond = FridayWithdrawalAdjustmentDiamond;


// ================================================================== ================================= ================================================================== //
// ================================================================== UNILEVEL ================================================================== //
// ================================================================== ================================= ================================================================== //


// ================ UNILEVEL BALANCE.  EXECUTION 4 At 04:35 AM Every day ================//
exports.UnilevelTransferBalance = UnilevelTransferBalance;
// ================ UNILEVEL BALANCE.  EXECUTION 4 At 04:45 AM Every day ================//
exports.UnilevelUpdateProfit = UnilevelUpdateProfit;
// ================ UNILEVEL BALANCE.  EXECUTION 4 At 04:55 AM Every day ================//
exports.UnilevelResetReferralBalance = UnilevelResetReferralBalance;




