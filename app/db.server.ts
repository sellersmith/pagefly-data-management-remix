/* eslint-disable no-var */
import { MongoClient } from "mongodb";

declare global {
  var mongoProd: MongoClient;
  var mongoRc: MongoClient;
  var mongoWip: MongoClient;
}

const mongoProd: MongoClient =
  global.mongoProd || new MongoClient(process.env.PROD_DATABASE_URL || "");

const mongoRc: MongoClient =
  global.mongoRc || new MongoClient(process.env.RC_DATABASE_URL || "");

const mongoWip: MongoClient =
  global.mongoWip || new MongoClient(process.env.WIP_DATABASE_URL || "");

if (process.env.NODE_ENV !== "production") {
  if (!global.mongoProd) {
    global.mongoProd = new MongoClient(process.env.PROD_DATABASE_URL || "");
    await global.mongoProd.connect();
  }

  if (!global.mongoRc) {
    global.mongoRc = new MongoClient(process.env.RC_DATABASE_URL || "");
    await global.mongoRc.connect();
  }

  if (!global.mongoWip) {
    global.mongoWip = new MongoClient(process.env.WIP_DATABASE_URL || "");
    await global.mongoWip.connect();
  }
  console.log("Connected successfully to server");
}

export const mongoClient = {
  prod: mongoProd.db("pagefly"),
  rc: mongoRc.db("pagefly"),
  wip: mongoWip.db("pagefly"),
};
