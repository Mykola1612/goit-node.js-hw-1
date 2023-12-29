const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();

  const contact = contacts.find((contact) => contact.id === contactId);

  if (contact === undefined) {
    return null;
  }

  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();

  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (contactIndex === -1) {
    return null;
  }

  const removedContact = contacts.splice(contactIndex, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));

  return removedContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();

  const newContact = {
    id: crypto.randomUUID(),
    name: name,
    email: email,
    phone: phone,
  };

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));

  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
