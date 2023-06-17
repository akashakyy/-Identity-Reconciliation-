const contactModel = require('../../models/contact');

async function getContacts(queryDetails){
    try{
        return await contactModel.findAll({
            where:queryDetails,
            order: [['createdAt', 'asc']]
        });

    }catch(error){
        console.log(error);
        throw error;
    }
}

async function getContactData(queryDetails){
    try{
        return await contactModel.findOne({
            where:queryDetails,
        });

    }catch(error){
        console.log(error);
        throw error;
    }
}

module.exports = {
    getContacts,
    getContactData
};