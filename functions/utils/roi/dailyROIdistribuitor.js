const functions = require('firebase-functions');
const admin = require('firebase-admin');
const db = admin.firestore();



//========== INVESTMENT 1 - 250 ========//

exports.DailyBalanceMondayToFridayStarter = functions.pubsub
    .schedule('5 0 * * *') // EVERY DAY
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            await db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    let applied = user.Applied;
                    let profit = user.Profit;
                    const limitContract = applied >= 1 && applied < 50 && parseInt(profit) < 300 / 100 * parseInt(applied)

                    const batch = db.batch();
                    if (limitContract) {
                        var sfRef = db.collection('users')
                            .doc(doc.id);
                        batch.update(sfRef, {
                            Balance: user?.Balance + (7 / 100 * parseInt(applied)),
                            lastBalanceUpdate: Date.now()
                        });

                       
                        return batch.commit();
                    } else {
                        console.log(
                            `Balance: ${user?.Balance} exceeded contract limit, the ${user?.username} must renew his contract :(`
                        );
                    }
                });
            })
        )
        return Promise.all(_data);
    });

exports.DailyBalanceMondayToFridayInitial = functions.pubsub
    .schedule('15 0 * * *') // EVERY DAY
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            await db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    let applied = user.Applied;
                    let profit = user.Profit;
                    const limitContract = applied >= 100 && applied < 250 && parseInt(profit) < 300 / 100 * parseInt(applied)

                    const batch = db.batch();
                    if (limitContract) {
                        var sfRef = db.collection('users')
                            .doc(doc.id);
                        batch.update(sfRef, {
                            Balance: user?.Balance + (7 / 100 * parseInt(applied)),
                            lastBalanceUpdate: Date.now()
                        });

                       
                        return batch.commit();
                    } else {
                        console.log(
                            `Balance: ${user?.Balance} exceeded contract limit, the ${user?.username} must renew his contract :(`
                        );
                    }
                });
            })
        )
        return Promise.all(_data);
    });


//Investment 250 - 1000//==============================================
exports.DailyBalanceMondayToFridayTall = functions.pubsub
    .schedule('25 0 * * *') // EVERY DAY
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            await db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    let applied = user.Applied;
                    let profit = user.Profit;
                    const limitContract = applied >= 250 && applied < 1000 && parseInt(profit) < 300 / 100 * parseInt(applied)

                    const batch = db.batch();
                    if (limitContract) {
                        var sfRef = db.collection('users')
                            .doc(doc.id);
                        batch.update(sfRef, {
                            Balance: user?.Balance + (7 / 100 * parseInt(applied)),
                            lastBalanceUpdate: Date.now()
                        });

                       
                        return batch.commit();
                    } else {
                        console.log(
                            `Balance: ${user?.Balance} exceeded contract limit, the ${user?.username} must renew his contract :(`
                        );
                    }
                });
            })
        )
        return Promise.all(_data);
    });




//Investment 1000 - 5000//==============================================
exports.DailyBalanceMondayToFridayGold = functions.pubsub
    .schedule('35 0 * * *') // EVERY DAY
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            await db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    let applied = user.Applied;
                    let profit = user.Profit;
                    const limitContract = applied >= 1000 && applied < 5000 && parseInt(profit) < 300 / 100 * parseInt(applied)

                    const batch = db.batch();
                    if (limitContract) {
                        var sfRef = db.collection('users')
                            .doc(doc.id);
                        batch.update(sfRef, {
                            Balance: user?.Balance + (7 / 100 * parseInt(applied)),
                            lastBalanceUpdate: Date.now()
                        });

                       
                        return batch.commit();
                    } else {
                        console.log(
                            `Balance: ${user?.Balance} exceeded contract limit, the ${user?.username} must renew his contract :(`
                        );
                    }
                });
            })
        )
        return Promise.all(_data);
    });



//Investment 5000 - 10000//==============================================
exports.DailyBalanceMondayToFridayPremium = functions.pubsub
    .schedule('45 0 * * *') // EVERY DAY
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            await db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    let applied = user.Applied;
                    let profit = user.Profit;
                    const limitContract = applied >= 5000 && applied < 10000 && parseInt(profit) < 300 / 100 * parseInt(applied)

                    const batch = db.batch();
                    if (limitContract) {
                        var sfRef = db.collection('users')
                            .doc(doc.id);
                        batch.update(sfRef, {
                            Balance: user?.Balance + (7 / 100 * parseInt(applied)),
                            lastBalanceUpdate: Date.now()
                        });

                       
                        return batch.commit();
                    } else {
                        console.log(
                            `Balance: ${user?.Balance} exceeded contract limit, the ${user?.username} must renew his contract :(`
                        );
                    }
                });
            })
        )
        return Promise.all(_data);
    });



//Investment 10000 - 100000//==============================================
exports.DailyBalanceMondayToFridayDiamond = functions.pubsub
    .schedule('55 0 * * *') // EVERY DAY
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            await db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    let applied = user.Applied;
                    let profit = user.Profit;
                    const limitContract = applied >= 10000 && applied < 100000 && parseInt(profit) < 300 / 100 * parseInt(applied)

                    const batch = db.batch();
                    if (limitContract) {
                        var sfRef = db.collection('users')
                            .doc(doc.id);
                        batch.update(sfRef, {
                            Balance: user?.Balance + (7 / 100 * parseInt(applied)),
                            lastBalanceUpdate: Date.now()
                        });

                       
                        return batch.commit();
                    } else {
                        console.log(
                            `Balance: ${user?.Balance} exceeded contract limit, the ${user?.username} must renew his contract :(`
                        );
                    }
                });
            })
        )
        return Promise.all(_data);
    });


