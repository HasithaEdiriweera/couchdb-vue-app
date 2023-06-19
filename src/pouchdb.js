import PouchDB from "pouchdb";

const username = "admin";
const password = "admin";
const remoteDbUrl = "http://localhost:5984/text-db";
const db = new PouchDB(remoteDbUrl, { skip_setup: true });

export async function saveText(text) {
  const doc = {
    _id: new Date().toISOString(),
    text: text,
  };

  try {
    await db.login(username, password);
    await db.put(doc);
    await db.logout();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function fetchAllDocuments() {
  try {
    await db.login(username, password);
    const result = await db.allDocs({ include_docs: true });
    const documents = result.rows.map((row) => row.doc);
    await db.logout();
    return documents;
  } catch (error) {
    console.error(error);
    return [];
  }
}
