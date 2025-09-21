import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from './components/Form';
import ContactList from './components/ContactList';
import Pagination from './components/Pagination';

axios.defaults.baseURL = 'https://contact-book-app-backend-gczp.onrender.com';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [editContact, setEditContact] = useState(null);

  const fetchContacts = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(`/contacts?page=${page}&limit=${limit}`);
      setContacts(res.data.contacts);
      setTotal(res.data.total);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts(page);
  }, [page]);

  const validateUnique = (email, phone, id = null) => {
    const errors = {};
    if (contacts.some(c => c.email === email && c.id !== id)) {
      errors.email = 'Email already registered.';
    }
    if (contacts.some(c => c.phone === phone && c.id !== id)) {
      errors.phone = 'Phone number already registered.';
    }
    return errors;
  };

  const addContact = async (contact) => {
    const errors = validateUnique(contact.email, contact.phone);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return false;
    }
    try {
      const res = await axios.post('/contacts', contact);
      setContacts((prev) => [res.data, ...prev]);
      setTotal((prev) => prev + 1);
      setFormErrors({});
      setShowForm(false);
      toast.success(`Contact "${contact.name}" added successfully!`);
      return true;
    } catch (error) {
      const errorMessage = error.response && error.response.data && error.response.data.error
        ? error.response.data.error
        : 'Error adding contact';
      setFormErrors({ apiError: errorMessage });
      toast.error(errorMessage);
      return false;
    }
  };

  const updateContact = async (contact) => {
    const errors = validateUnique(contact.email, contact.phone, contact.id);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return false;
    }
    try {
      const res = await axios.put(`/contacts/${contact.id}`, contact);
      setContacts((prev) =>
        prev.map((c) => (c.id === contact.id ? res.data : c))
      );
      setFormErrors({});
      setShowForm(false);
      setEditContact(null);
      toast.success(`Contact "${contact.name}" updated successfully!`);
      return true;
    } catch (error) {
      const errorMessage = error.response && error.response.data && error.response.data.error
        ? error.response.data.error
        : 'Error updating contact';
      setFormErrors({ apiError: errorMessage });
      toast.error(errorMessage);
      return false;
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`/contacts/${id}`);
      setContacts((prev) => prev.filter((c) => c.id !== id));
      setTotal((prev) => prev - 1);
      toast.success('Contact deleted successfully!');
    } catch (error) {
      const errorMessage = error.response && error.response.data && error.response.data.error
        ? error.response.data.error
        : 'Error deleting contact';
      console.error('Error deleting contact:', error);
      toast.error(errorMessage);
    }
  };

  const openAddForm = () => {
    setEditContact(null);
    setFormErrors({});
    setShowForm(true);
  };

  const openEditForm = (contact) => {
    setEditContact(contact);
    setFormErrors({});
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditContact(null);
    setFormErrors({});
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-100 flex flex-col w-full">
      <ToastContainer />
      <header className="bg-white shadow-md py-6 w-full">
        <h1 className="text-4xl font-extrabold text-center text-indigo-900 tracking-wide w-full">Contact Book</h1>
      </header>
      <main className="flex-grow max-w-5xl mx-auto p-8 flex flex-col w-full">
        <div className="flex justify-end mb-8 w-full">
          <button
            onClick={openAddForm}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition focus:outline-none focus:ring-4 focus:ring-indigo-300 w-full sm:w-auto"
          >
            Add Contact
          </button>
        </div>
        {showForm && (
          <Form
            addContact={addContact}
            updateContact={updateContact}
            formErrors={formErrors}
            onClose={closeForm}
            initialData={editContact}
          />
        )}
        {loading ? (
          <p className="text-indigo-900 text-center text-lg font-medium">Loading contacts...</p>
        ) : (
          <ContactList contacts={contacts} deleteContact={deleteContact} editContact={openEditForm} />
        )}
      </main>
      <footer className="bg-white shadow-inner py-4 flex justify-center w-full">
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </footer>
    </div>
  );
};

export default App;
