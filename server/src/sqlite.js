import path from "path";
import sqlite3 from "sqlite3";

sqlite3.verbose();

const dbPath = path.join(path.resolve(), "fleet.sqlite");

export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Could not open sqlite database", err);
  } else {
    console.log("Connected to sqlite database at", dbPath);
  }
});
