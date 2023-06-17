const contactDbComponent = require("../../../dbQueries/contact");
const responseFormatter = require("../../responseFormatter");
const { Op } = require("sequelize");

async function identifyContacts(req, res) {
  try {
    const payload = req.body;
    const email = payload.email ? payload.email : null;
    const phoneNumber = payload.phoneNumber ? payload.phoneNumber : null;

    let data = {
      phoneNumber,
      email
    };

    let conatctQuery = makeContactQuery(phoneNumber, email);
    let queryDetails = {
      [Op.or]: conatctQuery
    }

    const contactData = await contactDbComponent.getContacts(queryDetails);
    if (!contactData || !contactData.length) {
      //if there is not any entry of given phone and emails
      data = { ...data, linkPrecedence: "primary" };
      await contactDbComponent.createContact(data);
      
    } else {
      let previousEmailEntry = null;
      let previousPhoneEntry = null;

      previousEmailEntry = contactData.find((ele) => ele.email && ele.email == payload.email);
      previousPhoneEntry = contactData.find((ele) => ele.phoneNumber && ele.phoneNumber == payload.phoneNumber);

      //if there is previous email and phone entry then link the later one to the former one
      if (previousEmailEntry && previousPhoneEntry && previousEmailEntry.id != previousPhoneEntry.id) {
        const rowToBeUpdate = (previousEmailEntry.id > previousPhoneEntry.id) ? previousEmailEntry : previousPhoneEntry;
        const parentRow =  (previousEmailEntry.id < previousPhoneEntry.id) ? previousEmailEntry : previousPhoneEntry;

        const dataToUpdate = {
          linkedId: parentRow.id,
          linkPrecedence: "secondary"
        };
        const updatQuery = { id: rowToBeUpdate.id };
        await contactDbComponent.updateContact(dataToUpdate, updatQuery);

      } else if (previousEmailEntry && !previousPhoneEntry && phoneNumber && (previousEmailEntry.phoneNumber != phoneNumber)) {
        //if there is previous email entry but there is not any phone which is linked to this email
        data = { ...data, linkPrecedence: "secondary", linkedId: (previousEmailEntry.linkedId) ? previousEmailEntry.linkedId: previousEmailEntry.id };
        await contactDbComponent.createContact(data);

      } else if(!previousEmailEntry && previousPhoneEntry &&  email && (previousPhoneEntry.email != email)){
        //if there is previous phone entry but there is not any email which is linked to this email
        data = { ...data, linkPrecedence: "secondary", linkedId: (previousPhoneEntry.linkedId) ? previousPhoneEntry.linkedId: previousPhoneEntry.id };
        await contactDbComponent.createContact(data);
      }
    }

    let response = await makeResponse(phoneNumber, email, contactData);
    return responseFormatter.successOk(res, 'Success', response);
   
  } catch (error) {
    console.log(error);
    return responseFormatter.internalError(res);
  }
}

async function makeResponse(phoneNumber, email, contactData) {
  try {
    let conatctQuery = makeContactQuery(phoneNumber, email);

    let queryDetailsUpdated = {
      [Op.or]: conatctQuery,
    };

    let previousData = contactData.length ? contactData[0] : null;
    if (previousData && previousData.linkPrecedence == "primary") {
      //if previous result was primary search all result by linkedId as id of previousData
      conatctQuery.push({ linkedId: previousData.id });
    } else if (previousData && previousData.linkPrecedence == "secondary") {
      //if previous result was secondary search all result by id as id of linkedId of previousData
      conatctQuery.push({ id: previousData.linkedId });
    }
    queryDetailsUpdated = { [Op.or]: conatctQuery };
    const updatedContactData = await contactDbComponent.getContacts(
      queryDetailsUpdated
    );

    let primaryContactId = null;
    let emails = [];
    let phoneNumbers = [];
    let secondaryContactIds = [];

    for (let i = 0; i < updatedContactData.length; i++) {
      const currentData = updatedContactData[i];
      if (currentData.linkPrecedence == "primary") {
        primaryContactId = currentData.id;
      } else if (currentData.linkPrecedence == "secondary") {
        secondaryContactIds.push(currentData.id);
      }
      if (currentData.email && !emails.includes(currentData.email)) {
        emails.push(currentData.email);
      }
      if ( currentData.phoneNumber &&!phoneNumbers.includes(currentData.phoneNumber)) {
        phoneNumbers.push(currentData.phoneNumber);
      }
    }

    let response = {
      contact: {
        primaryContactId,
        emails,
        phoneNumbers,
        secondaryContactIds,
      },
    };
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


function makeContactQuery(phoneNumber, email) {
  try {
    let conatctQuery = [];

    if (phoneNumber) {
      conatctQuery.push({ phoneNumber });
    }
    if (email) {
      conatctQuery.push({ email });
    }
    return conatctQuery;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
module.exports = {
  identifyContacts,
};
