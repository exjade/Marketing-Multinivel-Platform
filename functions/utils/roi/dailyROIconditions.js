const functions = require('firebase-functions');
const admin = require('firebase-admin');
const db = admin.firestore();

// ========================================================================================================================== //
// ========================================================================================================================== //
// This function is used to check if a user has exceeded the investment limit, and resets his Balance & Initial Investment.   //
// ========================================================================================================================== //
// ========================================================================================================================== //

exports.DailyLimitContractMondayToFriday = functions.pubsub
    .schedule('0 3 * * *') // Every day
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    let applied = user.Applied;
                    let profit = user.Profit;

                    const limitContract = profit >= 300 / 100 * parseInt(applied)


                    if (limitContract) {
                        db.collection('users')
                            .doc(doc.id)
                            .update({
                                Profit: 0,
                                Applied: 0,
                                lastBalanceUpdate: admin.firestore.FieldValue.delete(),
                                lastProfitUpdate: admin.firestore.FieldValue.delete()
                            });
                    } else {
                        console.log(`Without a contract,the ${user?.username} doesnt have an active investment.`);
                    }

                    if (profit >= applied) {
                        console.log(`This contract has expired ${user?.username}`)
                    }

                });
            })
        )
        return Promise.all(_data);
    });

