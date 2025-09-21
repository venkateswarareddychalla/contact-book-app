import React, { useState, useEffect } from 'react';

const Form = ({ addContact, updateContact, formErrors, onClose, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors(formErrors || {});
  }, [formErrors]);

  useEffect(() => {
    setName(initialData?.name || '');
    setEmail(initialData?.email || '');
    setPhone(initialData?.phone || '');
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!email.trim()) newErrors.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Invalid email format.';
    if (!phone.trim()) newErrors.phone = 'Phone is required.';
    else if (!/^\d{10}$/.test(phone)) newErrors.phone = 'Phone must be 10 digits.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    let success = false;
    if (initialData && initialData.id) {
      success = await updateContact({ id: initialData.id, name, email, phone });
    } else {
      success = await addContact({ name, email, phone });
    }
    if (success) {
      setName('');
      setEmail('');
      setPhone('');
    }
  };

  return (
<div className="fixed inset-0 flex justify-center items-center z-50 bg-gradient-to-br from-sky-100 to-indigo-100 bg-opacity-90 backdrop-blur-sm" onClick={onClose}>
  <div className="bg-white p-6 sm:p-8 rounded-lg w-full max-w-xs sm:max-w-md md:max-w-lg shadow-lg border border-cloud-gray" onClick={e => e.stopPropagation()}>
    <h2 className="text-2xl sm:text-3xl font-extrabold text-deep-navy mb-6 text-center">{initialData && initialData.id ? 'Update Contact' : 'Add Contact'}</h2>
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-4 sm:mb-6">
        <label className="block text-neutral-charcoal font-semibold mb-1 sm:mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-cloud-gray rounded text-neutral-charcoal focus:outline-none focus:ring-2 focus:ring-sky-blue"
        />
        {errors.name && <p className="text-error-red text-xs sm:text-sm mt-1 sm:mt-2">{errors.name}</p>}
      </div>
      <div className="mb-4 sm:mb-6">
        <label className="block text-neutral-charcoal font-semibold mb-1 sm:mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-cloud-gray rounded text-neutral-charcoal focus:outline-none focus:ring-2 focus:ring-sky-blue"
        />
        {errors.email && <p className="text-error-red text-xs sm:text-sm mt-1 sm:mt-2">{errors.email}</p>}
      </div>
      <div className="mb-4 sm:mb-6">
        <label className="block text-neutral-charcoal font-semibold mb-1 sm:mb-2">Phone</label>
        <input
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-cloud-gray rounded text-neutral-charcoal focus:outline-none focus:ring-2 focus:ring-sky-blue"
        />
        {errors.phone && <p className="text-error-red text-xs sm:text-sm mt-1 sm:mt-2">{errors.phone}</p>}
      </div>
      {errors.apiError && <p className="text-error-red text-xs sm:text-sm mb-4 sm:mb-6">{errors.apiError}</p>}
      <div className="flex justify-end space-x-3 sm:space-x-4">
        <button type="submit" className="bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded shadow hover:bg-green-700 transition-colors text-sm sm:text-base">
          {initialData && initialData.id ? 'Update' : 'Add'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-red-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded shadow hover:bg-red-700 transition-colors text-sm sm:text-base"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</div>
  );
};

export default Form;
