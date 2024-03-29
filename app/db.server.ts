import { MongoClient } from "mongodb";

declare global {
  var DBMaster: MongoClient;
  var DBStaging: MongoClient;
  var DBDevelopment: MongoClient;
}

const DBMaster: MongoClient =
  global.DBMaster || new MongoClient(process.env.PROD_DATABASE_URL || "");
const DBStaging: MongoClient =
  global.DBStaging || new MongoClient(process.env.RC_DATABASE_URL || "");
const DBDevelopment: MongoClient =
  global.DBDevelopment || new MongoClient(process.env.WIP_DATABASE_URL || "");

if (process.env.NODE_ENV !== "production") {
  if (!global.DBMaster || !global.DBStaging) {
    global.DBMaster = new MongoClient(process.env.PROD_DATABASE_URL || "");
    global.DBMaster.connect();
  }

  if (!global.DBStaging) {
    global.DBStaging = new MongoClient(process.env.RC_DATABASE_URL || "");
    global.DBStaging.connect();
  }

  if (!global.DBDevelopment) {
    global.DBDevelopment = new MongoClient(process.env.WIP_DATABASE_URL || "");
    global.DBDevelopment.connect();
  }
  console.log("😘😘😘 Connected successfully to server");
}

export const DB = {
  master: DBMaster.db("pagefly"),
  rc: DBStaging.db("pagefly"),
  wip: DBDevelopment.db("pagefly"),
};
