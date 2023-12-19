const functions = require('firebase-functions');
const admin = require('firebase-admin');
const db = admin.firestore();


exports.DailyProfitMondayToFridayStarter = functions.pubsub
    .schedule('10 0 * * *') // EVERY DAY
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    let applied = user.Applied;
                    let profit = user.Profit;

                    const limitContract = applied >= 1 && applied < 100 && profit < 200 / 100 * parseInt(applied)

                    const batch = db.batch();

                    if (limitContract) {
                        var sfRef = db.collection('users')
                            .doc(doc.id);
                        batch.update(sfRef, {
                            Profit: user.Profit + (7 / 100 * parseInt(applied)),
                            lastProfitUpdate: Date.now()
                        });
                       
                        return batch.commit();
                    } else {
                        console.log(`INVESTMENT: ${applied}, TOTAL: ${profit} = exceeded the contract limit `)
                    }

                });
            })
        )
        return Promise.all(_data);
    });

    exports.DailyProfitMondayToFridayInitial = functions.pubsub
    .schedule('20 0 * * *') // EVERY DAY
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    let applied = user.Applied;
                    let profit = user.Profit;

                    const limitContract = applied >= 100 && applied < 250 && profit < 200 / 100 * parseInt(applied)

                    const batch = db.batch();

                    if (limitContract) {
                        var sfRef = db.collection('users')
                            .doc(doc.id);
                        batch.update(sfRef, {
                            Profit: user.Profit + (7 / 100 * parseInt(applied)),
                            lastProfitUpdate: Date.now()
                        });
                       
                        return batch.commit();
                    } else {
                        console.log(`INVESTMENT: ${applied}, TOTAL: ${profit} = exceeded the contract limit `)
                    }

                });
            })
        )
        return Promise.all(_data);
    });

    exports.DailyProfitMondayToFridayTall = functions.pubsub
    .schedule('30 0 * * *') // EVERY DAY
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    let applied = user.Applied;
                    let profit = user.Profit;

                    const limitContract = applied >= 250 && applied < 1000 && profit < 200 / 100 * parseInt(applied)

                    const batch = db.batch();

                    if (limitContract) {
                        var sfRef = db.collection('users')
                            .doc(doc.id);
                        batch.update(sfRef, {
                            Profit: user.Profit + (7 / 100 * parseInt(applied)),
                            lastProfitUpdate: Date.now()
                        });
                       
                        return batch.commit();
                    } else {
                        console.log(`INVESTMENT: ${applied}, TOTAL: ${profit} = exceeded the contract limit `)
                    }

                });
            })
        )
        return Promise.all(_data);
    });


    exports.DailyProfitMondayToFridayGold = functions.pubsub
    .schedule('40 0 * * *') // EVERY DAY
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    let applied = user.Applied;
                    let profit = user.Profit;

                    const limitContract = applied >= 1000 && applied < 5000 && profit < 200 / 100 * parseInt(applied)

                    const batch = db.batch();

                    if (limitContract) {
                        var sfRef = db.collection('users')
                            .doc(doc.id);
                        batch.update(sfRef, {
                            Profit: user.Profit + (7 / 100 * parseInt(applied)),
                            lastProfitUpdate: Date.now()
                        });
                       
                        return batch.commit();
                    } else {
                        console.log(`INVESTMENT: ${applied}, TOTAL: ${profit} = exceeded the contract limit `)
                    }

                });
            })
        )
        return Promise.all(_data);
    });

    
exports.DailyProfitMondayToFridayPremium = functions.pubsub
.schedule('50 0 * * *') // EVERY DAY
.timeZone('America/Mexico_City')
.onRun(async () => {
    const _data = []
    _data.push(
        db.collection('users').get().then(snapshot => {
            snapshot.forEach(doc => {
                let user = doc.data();
                let applied = user.Applied;
                let profit = user.Profit;

                const limitContract = applied >= 5000 && applied < 10000 && profit < 200 / 100 * parseInt(applied)

                const batch = db.batch();

                if (limitContract) {
                    var sfRef = db.collection('users')
                        .doc(doc.id);
                    batch.update(sfRef, {
                        Profit: user.Profit + (7 / 100 * parseInt(applied)),
                        lastProfitUpdate: Date.now()
                    });
                   
                    return batch.commit();
                } else {
                    console.log(`INVESTMENT: ${applied}, TOTAL: ${profit} = exceeded the contract limit `)
                }

            });
        })
    )
    return Promise.all(_data);
});


exports.DailyProfitMondayToFridayDiamond = functions.pubsub
    .schedule('0 1 * * *') // EVERY DAY
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    let applied = user.Applied;
                    let profit = user.Profit;

                    const limitContract = applied >= 10000 && applied < 100000 && profit < 200 / 100 * parseInt(applied)

                    const batch = db.batch();

                    if (limitContract) {
                        var sfRef = db.collection('users')
                            .doc(doc.id);
                        batch.update(sfRef, {
                            Profit: user.Profit + (7 / 100 * parseInt(applied)),
                            lastProfitUpdate: Date.now()
                        });
                       
                        return batch.commit();
                    } else {
                        console.log(`INVESTMENT: ${applied}, TOTAL: ${profit} = exceeded the contract limit `)
                    }

                });
            })
        )
        return Promise.all(_data);
    });



