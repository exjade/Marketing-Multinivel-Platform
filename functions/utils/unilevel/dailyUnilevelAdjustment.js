
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const db = admin.firestore();


// ================================================================================================================================= //
// ============================================  CRON JOBS: UNILEVEL BALANCE ======================================================== //
// ================================================================================================================================= //


// Función para transferir el Balance de Unilevel al Withdrawal
// 0. Verifica que el usuario tenga una inversión && no exceda el limite del contrato
// 1. Sí el usuario ha cumplido su limite de contrato, no debe transferir todo el balance
// 2. Debe restar el ReferralBalance del LastPaymentBalance para así obtener lo trabajado después del último pago de su unilevel
// 3. Transfiere el ReferralBalance al Withdrawal 
// 4. Debe almacenar en Firestore un campo "LastPaymentBalance" con el Referral Balance que se pagó
// 5. Debe pasar el restante para completar el contrato y dejar el saldo restante en el ReferralBalance 

exports.UnilevelTransferBalance = functions.pubsub
    .schedule('0 */20 * * *') // EVERY 20 HRS
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    let applied = user.Applied;
                    let profit = user.Profit;
                    const ReferralBalance = user.referral.ReferralBalance;
                    const LastPaymentBalance = user.referral.LastPaymentBalance;

                    const doesUserHasAnInvestment = parseInt(applied) > 0;
                    const doesntExceedContractLimit = parseInt(profit) < 300 / 100 * parseInt(applied);

                    // El total de todos los nodos siempre se almacena en el ReferralBalance
                    // Por lo que cada día de pago se almacena el balance del último pago (LastPaymentBalance) 
                    // En la próxima fecha de pago, el ReferralBalance será mayor sí el usuario trabajo su Unilevel 
                    // Por lo que se resta el último pago con el saldo del Unilevel actual para obtener lo que debemos pagar
                    const calculateUnilevelProfit = parseInt(ReferralBalance) <= 0 ? 0 : parseInt(ReferralBalance) - parseInt(LastPaymentBalance);

                    const batch = db.batch();

                    if (doesUserHasAnInvestment) {
                        if (doesntExceedContractLimit) {
                            var sfRef = db.collection('users')
                                .doc(doc.id);
                            batch.update(sfRef, {
                                Withdrawal: user.Withdrawal + parseInt(calculateUnilevelProfit),
                                referral: {
                                    ...user.referral,
                                    LastPaymentBalance: calculateUnilevelProfit
                                }
                            });
                            return batch.commit();
                        } else {
                            //Sí el usuario ha cumplido su limite de contrato, no debe transferir todo el balance
                            console.log(`INVESTMENT: ${applied}, TOTAL: ${profit} = exceeded the contract limit `)
                        }
                    } else {
                        console.log(`USER DOESNT HAVE AN INVESTMENT: ${applied} `)
                    }

                });
            })
        )
        return Promise.all(_data);
    });




// Función para añadir al Profit la ganancia del Balance de Unilevel
// 0. Verifica que el usuario tenga una inversión && no exceda el limite del contrato
// 1. Al añadir el ReferralBalance al Profit acelerá el limite del contrato
exports.UnilevelUpdateProfit = functions.pubsub
    .schedule('5 */20 * * *') // EVERY 20 HRS
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    let applied = user.Applied;
                    let profit = user.Profit;
                    const ReferralBalance = user.referral.ReferralBalance;
                    const LastPaymentBalance = user.referral.LastPaymentBalance;

                    const doesUserHasAnInvestment = parseInt(applied) > 0;
                    const doesntExceedContractLimit = parseInt(profit) < 300 / 100 * parseInt(applied);

                    // El total de todos los nodos siempre se almacena en el ReferralBalance
                    // Por lo que cada día de pago se almacena el balance del último pago (LastPaymentBalance) 
                    // En la próxima fecha de pago, el ReferralBalance será mayor sí el usuario trabajo su Unilevel 
                    // Por lo que se resta el último pago con el saldo del Unilevel actual para obtener lo que debemos pagar
                    const calculateUnilevelProfit = parseInt(LastPaymentBalance);

                    const batch = db.batch();

                    if (doesUserHasAnInvestment) {
                        if (doesntExceedContractLimit) {
                            var sfRef = db.collection('users')
                                .doc(doc.id);
                            batch.update(sfRef, {
                                Profit: parseInt(user.Profit) + parseInt(calculateUnilevelProfit),
                                lastProfitUpdate: Date.now()
                            });
                            return batch.commit();
                        } else {
                            //Sí el usuario ha cumplido su limite de contrato, no debe transferir todo el balance
                            console.log(`INVESTMENT: ${applied}, TOTAL: ${profit} = exceeded the contract limit `)
                        }
                    } else {
                        console.log(`USER DOESNT HAVE AN INVESTMENT: ${applied} `)
                    }

                });
            })
        )
        return Promise.all(_data);
    });

// Función para reset de balance de Unilevel el día de pago
// 1. Después de actualizar el Profit & transferir el Balance de Referido, debe eliminar el ReferralBalance
// 2. Sí el limite del contrato se completó, hace reset del Applied & Profit

exports.UnilevelResetReferralBalance = functions.pubsub
    .schedule('10 */20 * * *') // EVERY 20 HRS
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    let applied = user.Applied;
                    let profit = user.Profit;

                    const doesUserHasAnInvestment = parseInt(applied) > 0;
                    const doesntExceedContractLimit = parseInt(profit) < 300 / 100 * parseInt(applied);

                    const batch = db.batch();

                    if (doesUserHasAnInvestment) {
                        if (doesntExceedContractLimit) {
                            var sfRef = db.collection('users')
                                .doc(doc.id);
                            batch.update(sfRef, {
                                referral: {
                                    ...user.referral,
                                    ReferralBalance: 0
                                }
                            });
                            return batch.commit();
                        } else {
                            //Sí el usuario ha cumplido su limite de contrato, no debe transferir todo el balance
                            console.log(`INVESTMENT: ${applied}, TOTAL: ${profit} = exceeded the contract limit `)
                        }
                    } else {
                        console.log(`USER DOESNT HAVE AN INVESTMENT: ${applied} `)
                    }

                });
            })
        )
        return Promise.all(_data);
    });

