// contacts.js
const fs = require('fs/promises')
const path = require('path')
const crypto = require('crypto')

const readData = async () => {
    const result = await fs.readFile(
        path.join(__dirname, './db/contacts.json'), 
        'utf8',)
    return JSON.parse(result)
}
//  Раскомментируй и запиши значение
//  const contactsPath = ;
 

// TODO: задокументировать каждую функцию
const listContacts = async () => {
    return await readData()
  }
  
  const getContactById = async (contactId) => {
    const contacts = await readData()
    const [result] = contacts.filter((contact) => contact.id === contactId)
    return result
  }
  
  const removeContact = async (contactId) => {
    const contacts = await readData();
    const filteredContacts = contacts.filter(({ id }) => id !== contactId);
    await fs.writeFile(
        path.join(__dirname, './db/contacts.json'), 
        JSON.stringify(contacts, null, 2),
    console.table(filteredContacts))
  }
  
  const addContact = async (name, email, phone) => {
    const contacts = await readData()
    const newContact = {id: crypto.randomUUID(), name, email, phone}
    contacts.push(newContact)
    await fs.writeFile(
        path.join(__dirname, './db/contacts.json'), 
        JSON.stringify(contacts, null, 2),
    )
    return newContact
  }

  module.exports = { listContacts, getContactById, removeContact,
    addContact }