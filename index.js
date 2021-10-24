const { Command } = require('commander');
const { listContacts, getContactById, removeContact,
    addContact  } = require('./contacts');
const program = new Command();

program
  .requiredOption('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
;(async ({ action, id, name, email, phone }) => {
    try{
        switch (action) {
          case 'list':
            const contacts = await listContacts()
            console.table(contacts)
            break
      
          case 'get':
           const contactById = await getContactById(id)
           if (contactById) {
               console.log('Контакт знайдено')
               console.log(contactById)
           } else {
               console.log('Контакт не знайдено')
           }
            break;
      
          case 'add':
            const contact = await addContact(name, email, phone)
            console.log('Add new contakt')
            console.log(contact)
            break;
      
          case 'remove':
            removeContact(id)
            break;
      
          default:
            console.warn('\x1B[31m Unknown action type!');
        }
    } catch (error) {
        console.error(error.message)
    }
})(argv)