const functions = require('firebase-functions');
const admin = require('firebase-admin');
const credentials = require('./serviceAccountKey.json')
admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

const db = admin.firestore();

// ================================================================== ================================= ================================================================== //
// ================================================================== PENDIENTE DE SUBIR: FridayUpdateReferralsPercentaje1Execution, ResetReferralBalance ================================================================== //
// ================================================================== firebase deploy --only functions:nombredefunction ================================= ================================================================== //

// ================================= FRIDAY: TRANSFER REFERRAL BALANCE TO GENERAL BALANCE =================================//
exports.TuesdayUpdateReferralsPercentaje = functions.pubsub
    .schedule('0 2 * * TUE')// Miercoles a las 2:00 am
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    const applied = user?.Applied;
                    const profit = user?.Profit;
                    const balance = user?.Balance
                    const referralBalance = user?.referral?.ReferralBalance;
                    const limitContrat = applied > 1 && profit < 200 / 100 * applied

                    if (user?.Applied > 0) {
                        if (limitContrat) {
                            if (applied > 0 && balance > 0 && profit > 0) {
                                db.collection('users')
                                    .doc(doc.id)
                                    .update({
                                        Balance: user?.Balance + parseInt(referralBalance),
                                    });
                            }
                        }
                    }


                });//END
            })
        )
        return Promise.all(_data);
    })


// ================================= Responsible for deleting the referral balance after it has been added to the GeneralBalance ================================= //
exports.TuesdayResetReferralBalance2 = functions.pubsub
    .schedule('15 2 * * TUE')// Miercoles a las 2:15 am
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    const referralBalance = user?.referral?.ReferralBalance;
                    const referral = user?.referral

                    if (user?.Applied > 0) {
                        if (referralBalance > 0) {
                            db.collection('users')
                                .doc(doc.id)
                                .update({
                                    referral: {
                                        ...referral,
                                        ReferralBalance: 0,
                                    }
                                });
                        }
                    }

                }); //END
            })
        )
        await Promise.all(_data);
    })

// ================================= EXPIRAR STATUS DE PAGOS ================================= //
exports.TuesdayResetReferralBalance = functions.pubsub
    .schedule('0 */6 * * *')// Miercoles a las 2:15 am
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('payments').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let payment = doc.data();
                    const paymentStatus = payment?.status;
                    const paymentDate = payment?.date;

                    // Sí el status de pago es NEW, entonces se actualiza a EXPIRED
                    if (paymentStatus === 'NEW') {
                        function updateBeforeToday() {
                            const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
                            if (yesterday < paymentDate) {
                                db.collection('payments')
                                    .doc(doc.id)
                                    .update({
                                        status: 'EXPIRED',
                                    });
                            }
                        }
                    }

                    updateBeforeToday()
                }); //END
            })
        )
        await Promise.all(_data);
    })

