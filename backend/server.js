import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { openDb } from './configs/db.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const emailRegex = /^\S+@\S+\.\S+$/;
const phoneRegex = /^\d{10}$/;

app.post('/contacts', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required.' });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format.' });
    }
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: 'Phone must be 10 digits.' });
    }

    const db = await openDb();

    const existingEmail = await db.get('SELECT * FROM contacts WHERE email = ?', [email]);
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already registered.' });
    }
    const existingPhone = await db.get('SELECT * FROM contacts WHERE phone = ?', [phone]);
    if (existingPhone) {
      return res.status(400).json({ error: 'Phone number already registered.' });
    }

    const result = await db.run(
      'INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)',
      [name, email, phone]
    );

    const newContact = {
      id: result.lastID,
      name,
      email,
      phone,
    };

    res.status(201).json(newContact);
  } catch (error) {
    console.error('Error adding contact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/contacts', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const db = await openDb();

    const contacts = await db.all(
      'SELECT * FROM contacts LIMIT ? OFFSET ?',
      [limit, offset]
    );

    const countResult = await db.get('SELECT COUNT(*) as count FROM contacts');
    const total = countResult.count;

    res.json({ contacts, total });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/contacts/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const db = await openDb();

    const result = await db.run('DELETE FROM contacts WHERE id = ?', [id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/contacts/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required.' });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format.' });
    }
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: 'Phone must be 10 digits.' });
    }

    const db = await openDb();

    const existingContact = await db.get('SELECT * FROM contacts WHERE id = ?', [id]);
    if (!existingContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    const emailConflict = await db.get('SELECT * FROM contacts WHERE email = ? AND id != ?', [email, id]);
    if (emailConflict) {
      return res.status(400).json({ error: 'Email already registered to another contact.' });
    }
    const phoneConflict = await db.get('SELECT * FROM contacts WHERE phone = ? AND id != ?', [phone, id]);
    if (phoneConflict) {
      return res.status(400).json({ error: 'Phone number already registered to another contact.' });
    }

    await db.run(
      'UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ?',
      [name, email, phone, id]
    );

    res.json({ id: Number(id), name, email, phone });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
