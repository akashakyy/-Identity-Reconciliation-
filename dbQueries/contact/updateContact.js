const contactModel = require('../../models/contact');

async function updateContact(data, whereQuery){
    try{
        return await contactModel.update(data, {
            where: whereQuery
        });

    }catch(error){
        console.log(error);
        throw error;
    }
}

module.exports = updateContact;