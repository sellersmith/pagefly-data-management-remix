/* eslint-disable no-var */
import { MongoClient } from "mongodb";

declare global {
  var mongoProd: MongoClient;
  var mongoRc: MongoClient;
}

const mongoProd: MongoClient =
  global.mongoProd || new MongoClient(process.env.PROD_DATABASE_URL || "");
const mongoRc: MongoClient =
  global.mongoRc || new MongoClient(process.env.RC_DATABASE_URL || "");

if (process.env.NODE_ENV !== "production") {
  if (!global.mongoProd) {
    global.mongoProd = new MongoClient(process.env.PROD_DATABASE_URL || "");
  }
  if (!global.mongoRc) {
    global.mongoRc = new MongoClient(process.env.RC_DATABASE_URL || "");
  }
}

export { mongoProd, mongoRc };
