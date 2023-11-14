
// Necesito al crear el arbol unilevel, que los referidos que se añaden en this.referidos, sean ingresados mediante una petición post y  no sean aleatorios sino que vengan de un input proveniente del frontend
//ganancia: La ganancia debe calcularse de la inversión de los nodos y subnodos de mis nodos en mi array de referidos, multiplicarlas por el porcentaje de su nivel y actualizar las ganancias del Nodo en el nivel 0. Algo importante es no sumar el porcentaje del root en las ganancias,

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
    this.inversion = 100; // Inversión aleatoria entre 0 y 1000
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

function construirArbolUnilevel(niveles, nodoId, nodoRoot) {
  const nodo = new Nodo(nodoId, nodoRoot, niveles);


  nodo.calcularGanancia(); // Calcular la ganancia del nodo

  // Almacenar el nodo en Firebase Firestore
  db.collection(`nodos-test`).doc(`unilevel-4/${nodoId}/niveles`).set({
    nodoId: nodo.nodoId,
    nodoRoot: nodo.nodoRoot,
    nivel: nodo.nivel,
    inversion: nodo.inversion,
    porcentaje: nodo.porcentaje,
    ganancia: nodo.ganancia,
    referidos: nodo.referidos.map(referido => referido.nodoId)
  });

  return nodo;
}

app.get('/arbol', (req, res) => {
  const { inversion } = req.body;
  const arbol = construirArbolUnilevel(3, '1', null);
  arbol.calcularGanancia();
  res.json(arbol);
});


// Función recursiva para calcular la ganancia total del nodo y sus referidos en varios niveles
async function calcularGananciaTotal(nodoId) {
  const nodoRef = db.collection('nodos-test').doc(`unilevel-4/${nodoId}/niveles`);
  const nodoDoc = await nodoRef.get();

  if (nodoDoc.exists) {
    const nodoData = nodoDoc.data();
    let gananciaTotal = nodoData.ganancia;

    for (const referidoId of nodoData.referidos) {
      gananciaTotal += await calcularGananciaTotal(referidoId);
    }

    return gananciaTotal;
  }

  return 0;
}


app.post('/arbol/referidos', async (req, res) => {
  const { nodoId, nodoRoot } = req.body;

  // Crear el nuevo nodo referido
  const nuevoReferido = new Nodo(nodoId, nodoRoot, 5);
  nuevoReferido.agregarReferido(nuevoReferido);

  // Obtener el nodo root actual desde la base de datos
  const nodoRootRef = db.collection('nodos-test').doc(`unilevel-4/${nodoRoot}/niveles`);
  const nodoRootDoc = await nodoRootRef.get();

  if (nodoRootDoc.exists) {
    const nodoRootData = nodoRootDoc.data();

    // Verificar si el nodoId ya existe en el array de referidos del nodo root
    if (!nodoRootData.referidos.includes(nuevoReferido.nodoId)) {
      // Agregar el nuevo nodo referido al array de referidos del nodo root
      nodoRootData.referidos.push(nuevoReferido.nodoId);
    }

    // Calcular la ganancia total del nodo root y sus referidos en varios niveles
    nodoRootData.ganancia = await calcularGananciaTotal(nodoRoot);

    // Actualizar el nodo root en la base de datos
    await nodoRootRef.update({
      referidos: nodoRootData.referidos,
      ganancia: nodoRootData.ganancia
    });

  }

  // Construir el resto del árbol y realizar otras actualizaciones si es necesario
  const arbol = construirArbolUnilevel(5, nodoId, nodoRoot);
  arbol.calcularGanancia();

  res.json({ message: 'Referido agregado exitosamente', nodoRoot });
});


const port = 4000;

app.listen(port, () => {
  console.log('Servidor en funcionamiento en el puerto', port)
});





// app.post('/crear-nodo', (req, res) => {
//   const { nivel, nodoId, nodoRoot } = req.body; // Suponiendo que los datos se envían en el cuerpo de la solicitud en formato JSON

//   const nuevoNodo = construirArbolUnilevel(nivel, nodoId, nodoRoot);
//   nuevoNodo.calcularGanancia();

//   // Guardar el nuevo nodo en la base de datos (Firestore)
//   db.collection('nodos-test').doc(`${nuevoNodo.nodoId}`).set({
//     nodoId: this.nodoId,
//     nodoRoot: this.nodoRoot,
//     nivel: this.nivel,
//     inversion: this.inversion,
//     porcentaje: this.porcentaje,
//     ganancia: this.ganancia,
//     referidos: this.referidos
//   })
//     .then(() => {
//       res.json(nuevoNodo);
//     })
//     .catch((error) => {
//       console.error('Error al guardar el nodo en la base de datos', error);
//       res.status(500).json({ error: 'Error al guardar el nodo en la base de datos' });
//     });
// });

