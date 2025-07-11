import { MongoClient } from 'mongodb';
import fs from 'fs'
import path from 'path';

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)

const dbName = 'ia_testing';
const collectionName = 'charges';

async function createSeed() {
    try {
        const dataSeed = await fs.promises.readFile(path.resolve('./src/seeds', 'charges_seeds.json'), 'utf-8')
        await client.connect()
        console.log('✅ Conectado ao MongoDB')

        const db = client.db(dbName)
        const collection = db.collection(collectionName)
        await collection.insertMany(JSON.parse(dataSeed))
        console.log('✅ Created seeds.')
    } catch (err) {
        console.error('❌ Erro ao a query:', err)
    } finally {
        // Fecha a conexão
        await client.close()
        console.error('❎ Desconectado do MongoDB:')
    }
}

createSeed();