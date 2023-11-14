require('dotenv').config()
const express = require('express');
const cors = require("cors");
const {
  DOMAIN,
  REQUEST
} = require('./config');
const admin = require('firebase-admin');

const app = express();
app.use(express.json());
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const corsOptions = {
  host: DOMAIN,
  origin: REQUEST,
}

app.use(cors());

class Nodo {

  constructor(nodoId, nodoRoot, nivel) {
    this.nodoId = nodoId;
    this.nodoRoot = nodoRoot;
    this.posicion = 0;
    this.inversion = 0;
    this.nivel = 0;
    this.nivelUnilevel = 0;
    this.nivelUnilevelUsuario = 0;
    this.porcentaje = this.calcularPorcentaje();
    this.porcentajeUnilevel = this.calcularPorcentajeDirecto();
    this.porcentajeUnilevelUsuario = this.calcularPorcentajeUnilevel();
    this.ganancia = 0;
    this.gananciaUnilevel = 0;
    this.gananciaUnilevelUsuario = 0;
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

  calcularPorcentajeDirecto() {
    switch (this.nivelUnilevel) {
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
  calcularPorcentajeUnilevel() {
    switch (this.nivelUnilevelUsuario) {
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
    referido.nivel = this.nivel + 1;
    this.referidos.push(referido);
  }

  actualizarRootConGanancia(gananciaReferido, nodoIdReferido) {
    this.ganancia += gananciaReferido;
    this.referidos.push(nodoIdReferido);
  }


}



async function obtenerNodoRoot(nodoRoot, nodo, nodoId) {

  const nodoRootFix = nodoRoot === null ? nodo.nodoRoot : nodoRoot

  const docRef = db.collection('nodes-unilevel').doc(`unilevel/${nodoRootFix}/details`);

  try {
    const doc = await docRef.get();
    if (doc.exists) {
      return doc.data();
    } else {
      // Si el documento no existe, puedes crear el nodo root aquí y retornarlo
      crearNodoEnColección(nodo, nodoId);
      return null;
    }
  } catch (error) {
    // Manejar errores de lectura del documento
    console.error('Error al obtener el nodo root:', error);
    return null;
  }
}



// ================================================================================================================ //
function calcularGananciasReferidoUnilevel(nodo) {
  let gananciasTotales = nodo.gananciaUnilevel;
  for (const referido of nodo.referidos) {
    gananciasTotales += calcularGananciasReferidoUnilevel(referido);
  }
  return gananciasTotales;
}
function obtenerTodasLasGananciasDelUnilevel(nodo) {
  let gananciasTotales = 0;

  for (const referido of nodo.referidos) {
    gananciasTotales += calcularGananciasReferidoUnilevel(referido);
  }
  return gananciasTotales;
}


// DERRAME DE TODOS LOS NODOS, PARA SU PROPIA ESTRCUTURA DE 5 NIVELES
function calcularGananciasReferidoDelDerrameDeCadaUnilevel(nodo) {
  let gananciasTotales = nodo.gananciaUnilevelUsuario;
  for (const referido of nodo.referidos) {
    gananciasTotales += calcularGananciasReferidoDelDerrameDeCadaUnilevel(referido);
  }
  return gananciasTotales;
}
function obtenerTodasLasGananciasDelDerrameDeCadaUnilevel(nodo) {
  let gananciasTotales = 0;

  for (const referido of nodo.referidos) {
    gananciasTotales += calcularGananciasReferidoDelDerrameDeCadaUnilevel(referido);
  }
  return gananciasTotales;
}
// ================================================================================================================ //
function sumNivelUnilevelMayor(data) {
  let sum = 0;

  if (data.nivelUnilevel > 2) {
    sum += data.ganancia;
  }

  if (data.referidos && data.referidos !== undefined && data.referidos.length > 0) {
    for (const referido of data.referidos) {
      sum += sumNivelUnilevelMayor(referido);
    }
  }

  return sum;
}

// // Se itera sobre los referidos del nodo raíz y se acumula las ganancias totales utilizando la función calcularGananciasReferido. 
// function calcularGananciasReferido(nodo) {
//   let gananciasTotales = nodo.ganancia;
//   // if (nodo?.referidos?.length > 0 || nodo?.referidos !== []) {
//   for (const referido of nodo.referidos) {
//     gananciasTotales += calcularGananciasReferido(referido);
//     // }
//   }
//   return gananciasTotales;
// }

// // Función para calcular las ganancias de los referidos
// function calcularGananciasReferidos(referidos) {
//   let gananciasReferidos = 0;
//   for (const referido of referidos) {
//     gananciasReferidos += referido.ganancia;
//   }
//   return gananciasReferidos;
// }


function sumarGananciaNivel1ConNodoRootIgual(nodo) {
  let gananciaTotal = 0;

  // Verificar si el nodo tiene referidos en el nivel 1
  if (nodo.referidos !== undefined && nodo.referidos !== null && nodo.referidos.length > 0) {
    // Iterar por cada referido en el nivel 1
    nodo.referidos.forEach((referido) => {
      gananciaTotal += referido.gananciaUnilevel;
    });
  }

  return gananciaTotal;
}



// La función obtenerTodasLasGanancias se utiliza para obtener las ganancias totales del árbol de referidos, excluyendo la ganancia del nodo raíz.
// function obtenerTodasLasGanancias(nodo) {
//   let gananciasTotales = 0;

//   // if (nodo?.referidos?.length > 0 || nodo?.referidos !== []) {
//   for (const referido of nodo.referidos) {
//     gananciasTotales += calcularGananciasReferido(referido);
//   }
//   // }
//   return gananciasTotales;
// }


async function actualizarRoot(docNodoRootId, nodo, nodoRoot, nodoRootId, nodoId, nodoRootData, findIndex, rootId) {

  const RootDataExist = nodoRootData ? nodoRootData.nodoId : docNodoRootId
  const rootRef = db.collection('nodes-unilevel').doc(`unilevel/${RootDataExist}/details`);
  const nodoRootDoc = await rootRef.get();
  const RootData = nodoRootDoc.data();
  const doesIncludeNodoId = RootData.referidos.some((element, index, array) => array[index].nodoId === nodo.nodoId)

  try {

    if (!doesIncludeNodoId) {
      console.log('doesIncludeNodoId', !doesIncludeNodoId)
      const data = {
        nodoId: nodo.nodoId,
        nodoRoot: nodo.nodoRoot,
        nivel: nodo.nivel,
        nivelUnilevel: nodo.nivelUnilevel,
        nivelUnilevelUsuario: nodo.nivelUnilevelUsuario,
        posicion: nodo.posicion,
        inversion: nodo.inversion,
        porcentaje: nodo.porcentaje,
        porcentajeUnilevel: nodo.porcentajeUnilevel,
        porcentajeUnilevelUsuario: nodo.porcentajeUnilevelUsuario,
        ganancia: nodo.ganancia,
        gananciaUnilevel: nodo.gananciaUnilevel,
        gananciaUnilevelUsuario: nodo.gananciaUnilevelUsuario,
        referidos: nodo.referidos
      }

      const actualizacionReferidos = [...RootData.referidos, data]

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
      nivelUnilevel: nodo.nivelUnilevel,
      nivelUnilevelUsuario: nodo.nivelUnilevelUsuario,
      posicion: nodo.posicion,
      inversion: nodo.inversion,
      porcentaje: nodo.porcentaje,
      porcentajeUnilevel: nodo.porcentajeUnilevel,
      porcentajeUnilevelUsuario: nodo.porcentajeUnilevelUsuario,
      ganancia: nodo.ganancia,
      gananciaUnilevel: nodo.gananciaUnilevel,
      gananciaUnilevelUsuario: nodo.gananciaUnilevelUsuario,
      referidos: nodo.referidos
    }
    // Almacenar el nodo en Firebase Firestore
    db.collection('nodes-unilevel').doc(`unilevel/${nodoId}/details`).set(JSON.parse(JSON.stringify(data)));
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

async function actualizarSaldoReferidos(gananciasTotalesDerramesRootIndividual, gananciasTotalesDelUnilevel, gananciasTotales, nodoRootOfRootData, rootDocData) {
  try {
    if (rootDocData === undefined) {
      return
    };

    const docId = nodoRootOfRootData.nodoId;
    if (docId !== null || docId !== undefined) {
      // ROOT 
      const userCollection = db.collection('users').doc(`${docId}`);
      const userRef = await userCollection.get();
      const userData = userRef.data();

      if (rootDocData.referidos.length > 0) {
        // Actualizar el root del root documento con la información del root
        await userCollection.update({
          ...userData,
          referral: {
            ...userData.referral,
            ReferralBalance: gananciasTotalesDerramesRootIndividual + gananciasTotales,
            TotalReferralBalance: gananciasTotalesDerramesRootIndividual + gananciasTotales,
          }
        })
      }
    } else {
      console.error('ACTUALIZAR SALDO REFERIDOS: ', error)
    }

  } catch (error) {
    console.log(error)
  }
}


async function obtenerNUpdateNodoRaíz(docNodoRootId, rootId, findIndex, nodoRootData, nodo) {
  try {

    // Obtener el documento del root del root documento
    const nodoMainRoot = nodoRootData.nodoRoot;
    const rootofRoot = db.collection('nodes-unilevel').doc(`unilevel/${nodoMainRoot}/details`);
    const rootofRootRef = await rootofRoot.get();
    const nodoRootOfRootData = rootofRootRef.data();

    // Obtener documento del nodo nodoId
    const nodeRef = db.collection('nodes-unilevel').doc(`unilevel/${nodo.nodoId}/details`);
    const nodoRefDoc = await nodeRef.get();
    const nodoReferidoData = nodoRefDoc.data();
    // console.log('nodo referido =========>', nodoReferidoData)
    // Obtener documento del root
    // ID DEL ROOT 
    const nodoRootId = rootId;
    const rootRef = db.collection('nodes-unilevel').doc(`unilevel/${nodoRootId}/details`);
    const rootDoc = await rootRef.get();
    const rootDocData = rootDoc.data();
    // console.log('nodo root ======>', rootDocData)
    // if (nodo?.referidos.length > 0) {

    if (nodoRefDoc.exists && rootDoc.exists) {
      if (rootofRootRef.exists) {

        const gananciasTotales = sumarGananciaNivel1ConNodoRootIgual(nodoRootOfRootData);
        const gananciasTotalesDelUnilevel = obtenerTodasLasGananciasDelUnilevel(nodoRootOfRootData);
        const gananciasTotalesDerramesRootIndividual = obtenerTodasLasGananciasDelDerrameDeCadaUnilevel(nodoRootOfRootData);

        setTimeout(() => {
          actualizarSaldoReferidos(gananciasTotalesDerramesRootIndividual, gananciasTotalesDelUnilevel, gananciasTotales, nodoRootOfRootData, rootDocData)
        }, 1000);
        if (nodoRootOfRootData?.referidos?.length > 0) {
          const rootIndex = nodoRootOfRootData?.referidos.findIndex((value, index, array) => array[index].nodoId === rootDocData.nodoId)
          if (rootIndex !== -1) {
            const data = nodoRootOfRootData;
            data?.referidos.splice(rootIndex, 1);
            data.referidos = [...nodoRootOfRootData.referidos, rootDocData];
            const rootOfrootUpdate = data?.referidos;

            if (rootDocData?.referidos.length > 0) {
              // Actualizar el root del root documento con la información del root
              await rootofRoot.update({
                ...nodoRootOfRootData,
                ganancia: gananciasTotales,
                gananciaUnilevel: gananciasTotalesDelUnilevel,
                gananciaUnilevelUsuario: gananciasTotalesDerramesRootIndividual,
                referidos: rootOfrootUpdate,
              })
            } else {
              console.log('ROOTofROOT: No se puede actualizar porque el nodo aún no tiene referidos')
            }
          }
        }
      } else {
        console.log('NO EXISTE: Documento del nodo root')
      }

      if (nodoRootData.referidos.length > 0) {
        // Verifica que el indice no sea -1
        if (findIndex !== -1) {
          // Eliminar el elemento del array
          nodoRootData.referidos.splice(findIndex, 1);
          // Agregar un nuevo elemento al array
          nodoRootData.referidos = [...rootDocData.referidos, nodoReferidoData]
          const rootOfrootUpdate2 = nodoRootData.referidos;

          // console.log(nodoRootData)
          if (nodoReferidoData?.referidos.length > 0) {
            // Actualizar el root documento con la información nueva
            await rootRef.update({
              ...rootDocData,
              referidos: rootOfrootUpdate2,
            });
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

  await actualizarRoot(docNodoRootId, nodo, nodoRoot, nodoRootId, nodoId, nodoRootData, findIndex, rootId)
    .then(async () => {
      await obtenerNUpdateNodoRaíz(docNodoRootId, rootId, findIndex, nodoRootData, nodo);
    })
    .catch((error) => {
      console.error(error);
    });

  return;
}


async function encontrarIndex(nodoRootData,
  nodo,
  nodoRoot,
  nodoRootId,
  nodoId,
  docNodoRootId,
  rootRef,
  ArrReferidos,
  ArrNodoRootId,
  nodoReferidoData) {

  try {

    if (nodoRootData.referidos !== undefined || nodoRootData.referidos.length > 0) {
      // Obtener el index del elemento dentro del array
      const findIndex = nodoRootData.referidos.findIndex((value, index, array) => array[index].nodoId === nodo.nodoId)
      // Root del nodo root
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
  const rootRef = db.collection('nodes-unilevel').doc(`unilevel/${docNodoRootId}/details`);
  const referidoRef = db.collection('nodes-unilevel').doc(`unilevel/${docNodoReferidoId}/details`);


  try {
    // Obtenemos la Referencia de nuestra referido
    const nodoReferidoDoc = await referidoRef.get();
    // Verificamos que el documento exista en firestore
    if (nodoReferidoDoc.exists) {
      // Obtener el documento del NodoReferido
      const nodoReferidoData = nodoReferidoDoc.data();
      // Obtenemos la Referencia del NodoRoot
      const nodoRootDoc = await rootRef.get();
      // Verificamos que el documento exista en firestore
      if (nodoRootDoc.exists) {
        // Obtener el documento del NodoRoot
        const nodoRootData = nodoRootDoc.data();
        // array de referidos del nodoroot
        const ArrReferidos = nodoRootData.referidos;
        const ArrNodoRootId = nodoRootData.nodoRoot;

        // Verificamos que el array de nuestro Nodo Raíz tenga referidos
        if (nodoRootData.referidos.length > 0) {

          encontrarIndex(
            nodoRootData,
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
        // LLAMAR A LA FUNCION
        // return await NodoActualizarDocumentoUsario(nodo, nodoId, nodoRoot, nodoRootId)
        return await obtenerNodoRoot(nodoRoot, nodo, nodoId)
      }
    } else {
      console.log('El documento del NodoReferido no existe');
      return await NodoActualizarDocumentoUsario(nodo, nodoId, nodoRoot, nodoRootId)
    }
  } catch (error) {
    // Manejar errores de lectura o actualización del documento
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


function calcularPorcentajeNivelUnilevel(nivelUnilevel) {
  switch (nivelUnilevel) {
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

function calcularPorcentajeNivelRootsIndividuales(nivelUnilevelUsuario) {
  switch (nivelUnilevelUsuario) {
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

app.post('/nodo', cors(corsOptions), async (req, res) => {
  const { nodoId, nodoRoot: nodoRootId, nivel, inversion } = req.body;

  const nodo = new Nodo(nodoId, nodoRootId, nivel);
  nodo.inversion = inversion;

  const nodoRoot = await obtenerNodoRoot(nodoRootId, nodoId, nodo);

  const nodoPadre = buscarNodo(nodoRoot, nodo.nodoRoot);

  if (nodoPadre) {
    //Porcentaje de directo
    if (nodo.nivel < 6) {
      nodo.posicion = 0;
      nodo.nivel = nodoRoot && nodo.nivel < 6 ? nodoRoot.posicion + 1 : 0;
      nodo.porcentaje = calcularPorcentajeNivelUnilevel(nodo.nivel);
      nodo.gananciaUnilevel = inversion * nodo.porcentajeUnilevel;
      nodoPadre.referidos.push(nodo);
    }

    if (nodo.nivelUnilevel < 6) {
      nodo.posicion = 0;
      //Porcentaje de directo
      nodo.nivel = nodoRoot && nodo.nivel < 6 ? nodoRoot.posicion + 1 : 0;
      //Calculo del derrame del root
      nodo.nivelUnilevel = nodo.nivel = nodoRoot.nivelUnilevel <= 1 ? nodoRoot.nivel + 1 : nodoRoot.nivelUnilevel + 1;
      //Porcentaje de derrame del root
      nodo.porcentajeUnilevel = calcularPorcentajeNivelUnilevel(nodo.nivelUnilevel);
      //Porcentaje de todos los roots
      nodo.gananciaUnilevel = inversion * nodo.porcentajeUnilevel;
      // Añadir referidos al nodo
      nodoPadre.referidos.push(nodo);
    }

    //Calculo del derrame de todos los roots
    if (nodo.nivelUnilevelUsuario < 6) {
      nodo.posicion = 0;
      nodo.nivelUnilevelUsuario = nodoRoot ? nodoRoot.nivelUnilevelUsuario + 1 : 0;
      nodo.porcentajeUnilevelUsuario = calcularPorcentajeNivelRootsIndividuales(nodo.nivelUnilevelUsuario);
      nodo.gananciaUnilevelUsuario = inversion * nodo.porcentajeUnilevelUsuario;
      nodoPadre.referidos.push(nodo);
    }


   
  // } else if (nodoRoot && nodoRoot.nodoId === nodo.nodoRoot) {
  //   if (nodo.nivelUnilevel < 5) {
  //     nodo.posicion = 0;
  //     //Porcentaje de directo
  //     nodo.nivel = nodoRoot && nodo.nivel < 6 ? nodoRoot.posicion + 1 : 0;
  //     //Calculo del derrame del root
  //     nodo.nivelUnilevel = nodo.nivel = nodoRoot.nivelUnilevel <= 1 ? nodoRoot.nivel + 1 : nodoRoot.nivelUnilevel + 1;
  //     //Calculo del derrame de todos los roots
  //     nodo.nivelUnilevelUsuario = nodoRoot ? nodoRoot.nivelUnilevelUsuario + 1 : 0; nivelUnilevelUsuario + 1;
  //     // Porcentaje del directo
  //     nodo.porcentaje = calcularPorcentajeNivelUnilevel(nodo.nivel);
  //     //Porcentaje de derrame del root
  //     nodo.porcentajeUnilevel = calcularPorcentajeNivelUnilevel(nodo.nivelUnilevel);
  //     nodo.porcentajeUnilevelUsuario = calcularPorcentajeNivelRootsIndividuales(nodo.nivelUnilevelUsuario);
  //     //Porcentaje de todos los roots
  //     nodo.gananciaUnilevel = inversion * nodo.porcentajeUnilevel;
  //     nodo.gananciaUnilevelUsuario = inversion * nodo.porcentajeUnilevelUsuario;
  //     // Añadir referidos al nodo
  //     nodoRoot.referidos.push(nodo);
  //   }
  }

  calcularGananciaArbol(nodo);

  await actualizarDocumentoUsuarioRoot(nodo, nodoRoot, nodoRootId, nodoId);

  res.json(nodoRoot);
});


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Servidor en funcionamiento en el puerto', port)
});


