/* eslint-disable no-var */
import { MongoClient } from 'mongodb'

declare global {
  var DBMaster: MongoClient
  var DBStaging: MongoClient
  var DBDevelopment: MongoClient
}

const DBMaster: MongoClient = new MongoClient(process.env.PROD_DATABASE_URL || '')
const DBStaging: MongoClient = new MongoClient(process.env.RC_DATABASE_URL || '')
const DBDevelopment: MongoClient = new MongoClient(process.env.WIP_DATABASE_URL || '')

async function connectDatabases() {
  await DBMaster.connect()
  await DBStaging.connect()
  await DBDevelopment.connect()
}

export { DBMaster, DBStaging, DBDevelopment, connectDatabases }
