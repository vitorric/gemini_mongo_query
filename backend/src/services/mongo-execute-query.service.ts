import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)

const dbName = 'ia_testing'
const collectionName = 'charges'

function isISODateString(str: any): any {
  return typeof str === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.?\d*Z?$/.test(str);
}

function convertToDates(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(convertToDates);
  } else if (obj && typeof obj === 'object') {
    // Handle { "$date": "..." }
    if ('$date' in obj && typeof obj['$date'] === 'string') {
      return new Date(obj['$date']);
    }

    const result: any = {};
    for (const key in obj) {
      const val = obj[key];
      // If value is ISO string, convert to Date
      if (isISODateString(val)) {
        result[key] = new Date(val);
      } else {
        result[key] = convertToDates(val);
      }
    }
    return result;
  }
  return obj;
}

export async function executeDBQuery({ query, question }: { question: string, query: string }) {
  try {
    await client.connect()
    console.log('✅ Conectado ao MongoDB')
    const jsonParsedQuery = JSON.parse(query);
    console.log('➡️ JSON Query: ', JSON.stringify(convertToDates(jsonParsedQuery)))
    const finalQuery = convertToDates(jsonParsedQuery);
    const db = client.db(dbName)
    const collection = db.collection(collectionName)

    const resultDB = await collection.aggregate(finalQuery).toArray();
    console.log(resultDB)
    return { resultDB, question, query };
  } catch (err) {
    console.error('❌ Erro ao a query:', err)
    console.error('❌ Response query:', query)
  } finally {
    // Fecha a conexão
    await client.close()
    console.error('❎ Desconectado do MongoDB:')
  }
}
