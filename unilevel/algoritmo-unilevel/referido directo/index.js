
const express = require('express');
const admin = require('firebase-admin');

const app = express();
const serviceAccount = require('./serviceAccountKey.json');


// Inicializar la aplicación de Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


// Referencia a la base de datos de Firebase
const db = admin.firestore();


class Node {
    constructor(level, percentage) {
      this.level = level;
      this.percentage = percentage;
      this.children = [];
    }
  
    addChild(child) {
      this.children.push(child);
    }
  }
  
  function createTree(levels, percentages) {
    const rootNode = new Node(1, percentages[0]);
    let currentLevelNodes = [rootNode];
  
    for (let i = 2; i <= levels; i++) {
      const level = i;
      const currentLevelPercentage = percentages[i - 1];
      const newLevelNodes = [];
  
      currentLevelNodes.forEach((node) => {
        for (let j = 0; j < Math.floor(Math.random() * 10); j++) {
          const child = new Node(level, currentLevelPercentage);
          node.addChild(child);
          newLevelNodes.push(child);
        }
      });
  
      currentLevelNodes = newLevelNodes;
    }
  
    return rootNode;
  }
  
  // Función para obtener información del root, calcular el porcentaje y actualizar las ganancias
  function calculateAndUpdate(rootNode, ganancia) {
    let totalPercentage = rootNode.percentage;
  
    rootNode.children.forEach((child) => {
      totalPercentage += calculateAndUpdate(child, ganancia);
    });
  
    const updatedGanancia = totalPercentage * ganancia;
  
    var washingtonRef = db.collection("nodos").doc('ooCjn7HgMsRts0bxk9Mb');
  
    washingtonRef.update({ ganancia: updatedGanancia });
  
    return totalPercentage;
  }
  
  const levels = 1;
  const percentages = [0.1];
  const tree = createTree(levels, percentages);
  
  
  // Ruta para obtener información del root, calcular el porcentaje y actualizar las ganancias
  app.post('/calculate-and-update', (req, res) => {
    const ganancia = 900 // Obtén la ganancia del cuerpo de la solicitud POST
  
    const totalPercentage = calculateAndUpdate(tree, ganancia);
  
    res.json({ totalPercentage });
  });
  


const port = 4000;

app.listen(port, () => {
    console.log('Servidor en funcionamiento en el puerto', port)
});