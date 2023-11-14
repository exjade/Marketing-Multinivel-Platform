const express = require('express');
const admin = require('firebase-admin');

const app = express();
app.use(express.json());
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


class Nodo {
    constructor(nodoId, nodoRoot, nivel) {
        this.nodoId = nodoId;
        this.nodoRoot = nodoRoot;
        this.nivel = nivel;
        this.inversion = 100;
        this.porcentaje = this.calcularPorcentaje();
        this.ganancia = 0;
        this.referidos = [];
    }

    calcularPorcentaje() {
        switch (this.nivel) {
            case 1:
                return 0.1;
            case 2:
                return 0.07;
            case 3:
                return 0.06;
            case 4:
                return 0.04;
            case 5:
                return 0.03;
            default:
                return 0;
        }
    }

    calcularGanancia() {
        let ganancia = this.inversion * this.porcentaje;

        for (const referido of this.referidos) {
            ganancia += referido.calcularGanancia();
        }

        this.ganancia = ganancia;
        return ganancia;
    }

    agregarReferido(referido) {
        this.referidos.push(referido);
    }

    actualizarRootConGanancia(gananciaReferido, nodoIdReferido) {
        this.ganancia += gananciaReferido;
        this.referidos.push(nodoIdReferido);
    }
}



async function obtenerNodoRoot(nodoRoot) {
    const docRef = db.collection('nodos-test').doc(`unilevel-7/${nodoRoot}/niveles`);

    try {
        const doc = await docRef.get();
        if (doc.exists) {
            return doc.data();
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error al obtener el nodo root:', error);
        return null;
    }
}


function calcularGananciasReferido(nodo) {
    let gananciasTotales = nodo.ganancia;

    for (const referido of nodo.referidos) {
        gananciasTotales += calcularGananciasReferido(referido);
    }

    return gananciasTotales;
}

function obtenerTodasLasGanancias(nodo) {
    let gananciasTotales = 0;

    for (const referido of nodo.referidos) {
        gananciasTotales += calcularGananciasReferido(referido);
    }

    return gananciasTotales;
}


async function actualizarRoot(docNodoRootId, nodo) {
    const rootRef = db.collection('nodos-test').doc(`unilevel-7/${docNodoRootId}/niveles`);
    const nodoRootDoc = await rootRef.get();
    const nodoRootData = nodoRootDoc.data();


    const doesIncludeNodoId = nodoRootData.referidos.some((element, index, array) => array[index].nodoId === nodo.nodoId)

    try {
        if (!doesIncludeNodoId) {
            const data = {
                nodoId: nodo.nodoId,
                nodoRoot: nodo.nodoRoot,
                nivel: nodo.nivel,
                inversion: nodo.inversion,
                porcentaje: nodo.porcentaje,
                ganancia: nodo.ganancia,
                referidos: nodo.referidos
            }

            const actualizacionReferidos = [...nodoRootData.referidos, data]
            await rootRef.update({
                ...nodoRootData,
                referidos: actualizacionReferidos,
            });
        } else {
            console.log('function actualizarRoot: No se actualizó porque el Referido YA existe')
        }

    } catch (error) {
        console.log('ERROR: actualizarRoot function', error)
    }

}


async function crearNodoEnColección(nodo, nodoId) {
    try {
        const data = {
            nodoId: nodo.nodoId,
            nodoRoot: nodo.nodoRoot,
            nivel: nodo.nivel,
            inversion: nodo.inversion,
            porcentaje: nodo.porcentaje,
            ganancia: nodo.ganancia,
            referidos: nodo.referidos
        }
        db.collection('nodos-test').doc(`unilevel-7/${nodoId}/niveles`).set(JSON.parse(JSON.stringify(data)));
    } catch (error) {
        console.log('ERROR: crearNodoEnColección function', error)
    }

}

async function NodoActualizarDocumentoUsario(nodo, nodoId, nodoRoot, nodoRootId) {
    try {

        await crearNodoEnColección(nodo, nodoId)
        await actualizarDocumentoUsuarioRoot(nodo, nodoRoot, nodoRootId, nodoId)

    } catch (error) {
        console.log('ERROR: NodoActualizarDocumentoUsario function', error)
    }

}

async function obtenerNUpdateNodoRaíz(docNodoRootId, rootId, findIndex, nodoRootData, nodo) {
    try {

        const nodoRefId = nodoRootData.nodoRoot;
        const rootofRoot = db.collection('nodos-test').doc(`unilevel-7/${nodoRefId}/niveles`);
        const rootofRootRef = await rootofRoot.get();
        const nodoRootOfRootData = rootofRootRef.data();
        const nodeRef = db.collection('nodos-test').doc(`unilevel-7/${nodo.nodoId}/niveles`);
        const nodoRefDoc = await nodeRef.get();
        const nodoReferidoData = nodoRefDoc.data();
        const nodoRootId = rootId;
        const rootRef = db.collection('nodos-test').doc(`unilevel-7/${nodoRootId}/niveles`);
        const rootDoc = await rootRef.get();
        const rootDocData = rootDoc.data();



        if (nodoRefDoc.exists && rootDoc.exists) {

            if (nodoRootOfRootData?.referidos?.length > 0) {
                const rootIndex = nodoRootOfRootData?.referidos.findIndex((value, index, array) => array[index].nodoId === rootDocData.nodoId)
                if (rootIndex !== -1) {
                    nodoRootOfRootData?.referidos.splice(rootIndex, 1);
                    nodoRootOfRootData.referidos = [rootDocData];
                    const rootOfrootUpdate = nodoRootOfRootData?.referidos;
                    if (rootDocData?.referidos.length > 0) {
                        // await rootofRoot.update({
                        //   ...nodoRootOfRootData,
                        //   referidos: rootOfrootUpdate,
                        // });
                    } else {
                        console.log('ROOTofROOT: No se puede actualizar porque el nodo aún no tiene referidos')
                    }
                }
            }

            if (nodoRootData?.referidos?.length > 0) {
                if (findIndex !== -1) {
                    nodoRootData.referidos.splice(findIndex, 1);
                    nodoRootData.referidos = [nodoReferidoData]
                    const rootOfrootUpdate = nodoRootData.referidos;

                    if (nodoReferidoData?.referidos.length > 0) {
                        // await rootRef.update({
                        //   ...nodoRootData,
                        //   referidos: rootOfrootUpdate,
                        // });

                    } else {
                        console.log('ROOT: No se puede actualizar porque el nodo aún no tiene referidos')
                    }
                    console.log('Documento del nodo root actualizado exitosamente');
                }
            } else {
                console.error('El NodoReferido no está en el array de referidos', error);
            }
        } else {
            console.log('function obtenerNUpdateNodoRaíz: nodeRefDoc no existe')
        }
    } catch (error) {
        console.log(error)
    }

}


async function obtenerYactualizarRoot(docNodoRootId, rootId, findIndex, nodoRootData, nodo, nodoRootId, nodoId, nodoRoot) {
    await obtenerNUpdateNodoRaíz(docNodoRootId, rootId, findIndex, nodoRootData, nodo);
    await actualizarRoot(docNodoRootId, nodo, nodoRoot, nodoRootId, nodoId);
    return;
}


async function encontrarIndex(
    nodoRootData,
    nodoReferidoData,
    nodo,
    nodoRoot,
    nodoRootId,
    nodoId,
    docNodoRootId,
    rootRef,
    ArrReferidos,
    ArrNodoRootId
) {
    try {
        if (nodoRootData.referidos !== undefined || nodoRootData.referidos.length > 0) {
            const findIndex = nodoRootData?.referidos.findIndex((value, index, array) => array[index].nodoId === nodo.nodoId)
            const rootId = nodo.nodoRoot;
            await obtenerYactualizarRoot(docNodoRootId, rootId, findIndex, nodoRootData, nodo, nodoRootId, nodoId, nodoRoot)
        }
    } catch (error) {
        console.log('ERROR: encontrarIndex function', error)
    }
}





async function actualizarDocumentoUsuarioRoot(nodo, nodoRoot, nodoRootId, nodoId) {

    const docNodoReferidoId = nodoId;
    const docNodoRootId = nodoRootId;
    const rootRef = db.collection('nodos-test').doc(`unilevel-7/${docNodoRootId}/niveles`);
    const referidoRef = db.collection('nodos-test').doc(`unilevel-7/${docNodoReferidoId}/niveles`);

    try {
        const nodoReferidoDoc = await referidoRef.get();
        if (nodoReferidoDoc.exists) {
            const nodoReferidoData = nodoReferidoDoc.data();

            const nodoRootDoc = await rootRef.get();
            if (nodoRootDoc.exists) {
                const nodoRootData = nodoRootDoc.data();

                const ArrReferidos = nodoRootData.referidos;
                const ArrNodoRootId = nodoRootData.nodoRoot;


                if (nodoRootData.referidos.length > 0) {
                    console.log('nodoRootData.referidos.length > 0')
                    encontrarIndex(nodoRootData,
                        nodoReferidoData,
                        nodo,
                        nodoRoot,
                        nodoRootId,
                        nodoId,
                        docNodoRootId,
                        rootRef,
                        ArrReferidos,
                        ArrNodoRootId)

                } else {
                    console.log('El array de referidos está vacio');
                    return await actualizarRoot(docNodoRootId, nodo, nodoRoot, nodoRootId, nodoId)
                }
            } else {
                console.log('El documento del NodoRoot no existe; NODOID', nodoId);
                return await NodoActualizarDocumentoUsario(nodo, nodoId, nodoRoot, nodoRootId)
            }
        } else {
            console.log('El documento del NodoReferido no existe');
            return await NodoActualizarDocumentoUsario(nodo, nodoId, nodoRoot, nodoRootId)
        }

    } catch (error) {
        console.error('Error al actualizar el documento del nodo root:', error);
    }
}

function buscarNodo(nodo, nodoId) {
    if (nodo === null) {
        return null;
    }

    if (nodo.nodoId === nodoId) {
        return nodo;
    }

    for (const referido of nodo.referidos) {
        const nodoEncontrado = buscarNodo(referido, nodoId);
        if (nodoEncontrado) {
            return nodoEncontrado;
        }
    }

    return null;
}


function calcularPorcentaje(nivel) {
    switch (nivel) {
        case 1:
            return 0.1;
        case 2:
            return 0.07;
        case 3:
            return 0.06;
        case 4:
            return 0.04;
        case 5:
            return 0.03;
        default:
            return 0;
    }
}

function calcularGananciaArbol(nodo) {
    nodo.calcularGanancia();

    for (const referido of nodo.referidos) {
        calcularGananciaArbol(referido);
    }
}



app.post('/nodo', async (req, res) => {
    const { nodoId, nodoRoot: nodoRootId, nivel, inversion } = req.body;

    const nodo = new Nodo(nodoId, nodoRootId, nivel);
    nodo.inversion = inversion;
    nodo.porcentaje = calcularPorcentaje(nivel);

    const nodoRoot = await obtenerNodoRoot(nodoRootId);

    const nodoPadre = buscarNodo(nodoRoot, nodo.nodoRoot);

    if (nodoPadre) {
        nodoPadre.referidos.push(nodo);
    } else if (nodoRoot && nodoRoot.nodoId === nodo.nodoRoot) {
        nodoRoot.referidos.push(nodo);
    }

    calcularGananciaArbol(nodo);

    await actualizarDocumentoUsuarioRoot(nodo, nodoRoot, nodoRootId, nodoId);

    res.json(nodoRoot);
});


const port = 4000;

app.listen(port, () => {
    console.log('Servidor en funcionamiento en el puerto', port)
});


