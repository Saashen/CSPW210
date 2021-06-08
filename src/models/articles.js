// const Articles = require('./schema/article');

// const getAllArticles = async ({ page, limit }) => {
//   const options = {
//     page,
//     limit,
//     collation: {
//       locale: 'en',
//     },
//   };

//   const queryCriteria = sub && sub.length ? { subscription: sub } : {};

//   return Contacts.paginate(queryCriteria, options, (err, result) =>
//     err ? err : result.docs,
//   );
// };

// const getOneContact = id => Articles.findById({ _id: id });

// const createContact = contact => Articles.create(contact);

// const updateContactById = (id, contact) =>
// Articles.findByIdAndUpdate({ _id: id }, { ...contact }, { new: true });

// const removeContactById = id => Contacts.findByIdAndRemove({ _id: id });

// module.exports = {
//   getAllContacts,
//   getOneContact,
//   createContact,
//   updateContactById,
//   removeContactById,
// };
