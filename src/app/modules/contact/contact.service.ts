import { Contact } from "./contact.model";

// CREATE
const createContact = async (payload: any) => {
  return await Contact.create(payload);
};

// GET ALL (ADMIN)
const getAllContacts = async () => {
  return await Contact.find({ isDeleted: false }).sort({ createdAt: -1 });
};

// DELETE SINGLE
const deleteContact = async (id: string) => {
  return await Contact.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
};

// DELETE ALL
const deleteAllContacts = async () => {
  return await Contact.updateMany({}, { isDeleted: true });
};

export const ContactService = {
  createContact,
  getAllContacts,
  deleteContact,
  deleteAllContacts,
};