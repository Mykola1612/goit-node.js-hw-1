const Contacts = require("./contacts.js");

const argv = require("yargs").argv;

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await Contacts.listContacts();
      return console.table(contacts);
      break;

    case "get":
      const contact = await Contacts.getContactById(id);
      return console.log(contact);
      break;

    case "add":
      const newContact = await Contacts.addContact(name, email, phone);
      return console.log(newContact);
      break;

    case "remove":
      const removeContact = await Contacts.removeContact(id);
      console.log(removeContact);

      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
