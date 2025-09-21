import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

const ContactList = ({ contacts = [], deleteContact, editContact }) => {
  return (
    <div className="space-y-4 bg-ivory-white text-neutral-charcoal min-h-[60vh] p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12 rounded-lg shadow-inner">
      {contacts.length === 0 ? (
        <p className="text-center text-neutral-charcoal text-lg mt-10">No contacts found.</p>
      ) : (
        <div className="flex flex-wrap -mx-3 justify-center">
          {contacts.map(({ id, name, email, phone }) => (
            <div key={id} className="border rounded-lg p-4 sm:p-6 md:p-8 shadow-md flex flex-col sm:flex-row justify-between items-start bg-cloud-gray hover:bg-ivory-white hover:shadow-lg transition-colors duration-300 w-full sm:w-full md:w-full lg:w-full xl:w-full px-3 mb-6 break-words max-w-full overflow-hidden">
              <div className="flex flex-col space-y-2 mb-4 sm:mb-0 w-full sm:w-3/4 text-left break-words truncate max-w-full overflow-hidden">
                <div className="font-semibold text-neutral-charcoal text-lg sm:text-xl break-words truncate">{name}</div>
                <div className="text-sm sm:text-base text-neutral-charcoal break-words truncate">{email}</div>
                <div className="text-sm sm:text-base text-neutral-charcoal break-words truncate">{phone}</div>
              </div>
              <div className="flex space-x-3 w-full sm:w-1/4 justify-end self-center sm:self-auto">
                <>
                <button
                  onClick={() => editContact({ id, name, email, phone })}
                  className="bg-transparent p-3 rounded-lg text-sky-blue hover:text-sky-blue transition-colors"
                  aria-label="Edit contact"
                  title="Edit Contact"
                  type="button"
                  tabIndex={0}
                  aria-keyshortcuts="Enter"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => deleteContact(id)}
                  className="bg-transparent p-3 rounded-lg text-error-red hover:text-error-red transition-colors"
                  aria-label="Delete contact"
                  title="Delete Contact"
                  type="button"
                  tabIndex={0}
                  aria-keyshortcuts="Enter"
                >
                  <FaTrash />
                </button>
                </>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactList;
