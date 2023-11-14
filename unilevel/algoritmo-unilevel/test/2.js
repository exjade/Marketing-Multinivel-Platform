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

// function construirArbolUnilevel(niveles, nodoId, nodoRoot) {
//   const nodo = new Nodo(nodoId, nodoRoot, niveles);

//   if (niveles > 1) {
//     for (let i = 0; i < nodo.referidos.length; i++) {
//       const referido = construirArbolUnilevel(niveles - 1, `${nodoId}-${i + 1}`, nodoId);
//       nodo.referidos.push(referido);
//     }
//   }

//   // Calcular la ganancia del nodo
//   nodo.calcularGanancia();

//   const data = {
//     nodoId: nodo.nodoId,
//     nodoRoot: nodo.nodoRoot,
//     nivel: nodo.nivel,
//     inversion: nodo.inversion,
//     porcentaje: nodo.porcentaje,
//     ganancia: nodo.ganancia,
//     referidos: nodo.referidos
//   }

//   // Almacenar el nodo en Firebase Firestore
//   db.collection(`nodos-test`).doc(`unilevel-1/${nodoId}/niveles`).set(JSON.parse(JSON.stringify(data)));

//   return nodo;

// }

function construirArbolUnilevel(nodoId, nodoRoot, nivel, referidosDirectos) {
  const nodo = new Nodo(nodoId, nodoRoot, nivel);

  if (nivel > 0) {
    
    for (const referido of referidosDirectos) {
      const nodoReferido = construirArbolUnilevel(referido.nodoId, nodoId, nivel - 1, referidosDirectos);
      nodo.agregarReferido(nodoReferido);
    }
  }

  nodo.calcularGanancia();

  return nodo;
}

app.get('/arbol', (req, res) => {
  const { nodoId, nodoRoot, nivel } = req.body;
  const arbol = construirArbolUnilevel(nivel, nodoId, nodoRoot);
  arbol.calcularGanancia();
  res.json(arbol);
});




app.post('/nodo', (req, res) => {
  const { nodoId, nodoRoot, nivel, referidosDirectos } = req.body;

  const nodo = construirArbolUnilevel(nodoId, nodoRoot, nivel, referidosDirectos);

  // Calcular la ganancia del nodo y sus referidos
  nodo.calcularGanancia();

  const data = {
    nodoId: nodo.nodoId,
    nodoRoot: nodo.nodoRoot,
    nivel: nodo.nivel,
    inversion: nodo.inversion,
    porcentaje: nodo.porcentaje,
    ganancia: nodo.ganancia,
    referidos: nodo.referidos
  }

  // Almacenar el nodo en Firebase Firestore
  db.collection(`nodos-test`).doc(`unilevel-7/${nodoId}/niveles`).set(JSON.parse(JSON.stringify(data)));

  res.json(nodo);
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

