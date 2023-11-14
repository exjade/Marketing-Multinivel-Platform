
const express = require('express')
const admin = require('firebase-admin');


const app = express();


const serviceAccount = require('./serviceAccountKey.json')


// Inicializar la aplicación de Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


// Referencia a la base de datos de Firebase
const db = admin.firestore();

// Función para agregar un nuevo nodo al árbol unilevel
async function addNode(name, level, percentage) {



    // Obtener la referencia del padre
    const parentRef = db.collection('unilevel').doc('HZK0KN79Lcp2TXbVKNVl');

    // Crear un nuevo nodo
    const newNode = {
        name: name,
        level: level,
        percentage: percentage,
        parent: parentRef
    };

    // Agregar el nuevo nodo a la base de datos
    const nodeRef = await db.collection('unilevel').add(newNode);

    // Actualizar el campo "children" del nodo padre
    await parentRef.update({
        children: admin.firestore.FieldValue.arrayUnion(nodeRef)
    });

    return nodeRef.id;
}

// Función para obtener los nodos de un nivel específico
async function getNodesByLevel(level) {
    const snapshot = await db.collection('unilevel').where('level', '==', level).get();
    const nodes = [];

    snapshot.forEach((doc) => {
        nodes.push(doc.data());
    });

    return nodes;
}

async function generateTree(parentId, level, maxLevel, percentages) {
    if (level > maxLevel) {
        return;
    }

    for (let i = 0; i < percentages.length; i++) {
        const nodeName = `Nivel ${level} Nodo ${i + 1}`;
        const nodeId = await addNode(parentId, nodeName, level, percentages[i]);

        await generateTree(nodeId, level + 1, maxLevel, percentages);
    }
}

async function runExample() {
    const rootId = await addNode(null, 'Raíz', 0, 0);

    const maxLevel = 5;
    const percentages = [10, 7, 6, 4, 3];

    await generateTree(rootId, 1, maxLevel, percentages);

    // Obtener los nodos del nivel 3
    const level3Nodes = await getNodesByLevel(3);
    console.log('Nodos del nivel 3:', level3Nodes);
}


app.get('/test', async (req, res) => {
    try {
        await runExample()
        res.send('ejecutado con exito')
    } catch (error) {
        console.error('Error al ejecutar:', error)
        res.status(500).send('OCurrio un error')
    }
})


const port = 4000;

app.listen(port, () => {
    console.log('Servidor en funcionamiento en el puerto', port)
})