const contactModel = require('../../models/contact');

async function createContact(data){
    try{
        return await contactModel.create(data);

    }catch(error){
        console.log(error);
        throw error;
    }
}

module.exports = createContact;