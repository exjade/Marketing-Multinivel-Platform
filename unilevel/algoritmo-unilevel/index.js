
const express = require('express');
const admin = require('firebase-admin');

const app = express();
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
      this.inversion = Math.random() * 1000; // Inversión aleatoria entre 0 y 1000
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
  }
  
  function construirArbolUnilevel(niveles, nodoId, nodoRoot) {
    const nodo = new Nodo(nodoId, nodoRoot, niveles);
  
    if (niveles > 1) {
      for (let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
        const referido = construirArbolUnilevel(niveles - 1, `${nodoId}-${i + 1}`, nodoId);
        nodo.referidos.push(referido);
      }
    }
  
    return nodo;
  }
  
  app.get('/arbol', (req, res) => {
    const arbol = construirArbolUnilevel(6, '1', null);
    arbol.calcularGanancia();
    res.json(arbol);
  });



const port = 4000;

app.listen(port, () => {
    console.log('Servidor en funcionamiento en el puerto', port)
});

// Programa en node javascript un arbol unilevel de 5 niveles de profundidad ,
// Cada nodo que yo refiera irá al 1er nivel y puedo añadir nodos infinitos a mi primer nivel.
// Y cada nodo root también tendrá referidos infinitos en su primer nivel

// ¿Cómo se organizan los nodos?
// Sí es referido directo mio debe estar en el nivel 1
// Sí es referido directo de los nodos en mi nivel 1 debe estar en el nivel 2
// Sí es referido directo de los nodos en mi nivel 2 debe estar en el nivel 3
// Sí es referido directo de los nodos en mi nivel 3 debe estar en el nivel 4
// Sí es referido directo de los nodos en mi nivel 4 debe estar en el nivel 5


// El arbol debe ir añadiendo a mis referidos en el 1er nivel de profundidad, y añadir a mis referidos indirectos, osea referidos que fueron añadidos por nodos en niveles inferiores del 1er.
// Cada nodo directo tendrá la misma lógica aque se emplea dado que el sería directo mio pero raiz de sus directos

// Cada nodo debe tener la siguiente información
// Nodo {
//     nivel: number,
//     nodoId: id del nodo,
//     nodoRoot: el id del nodo que lo refirio,
//     inversión: cantidad aleatoria,
//     porcentaje:
//  los porcenajes a entregar por cada nivel al nodo raiz son:
// nivel 1: 10%,
// nivel 2: 7%,
// nivel 3: 6%,
// nivel 4: 4%,
// nivel 5: 3%, ,
//ganancia: La ganancia debe calcularse de la inversión de los nodos y subnodos de mis nodos en mi array de referidos, multiplicarlas por el porcentaje de su nivel y actualizar las ganancias del Nodo en el nivel 0. Algo importante es no sumar el porcentaje del root en las ganancias,
//      referidos: []
//
// }



//referidos de mi referido directo (nivel 1) pasarían a estar en mi 2do nivel
// si es referido directo de los Nodos en mi 2do nivel debe ir al nivel 3,
// si es referido directo de los Nodos en mi 3er nivel debe ir al nivel 4,
// si es referido directo de los Nodos en mi 4o nivel debe ir al nivel 5,
