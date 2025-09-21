# Contact Book Application

A full-stack contact management application built with React (frontend) and Node.js/Express (backend) with SQLite database. The application allows users to add, view, update, and delete contacts with pagination support.

## 🚀 Live Demo

- **Frontend**: [https://contact-book-app-nu-sepia.vercel.app/](https://contact-book-app-nu-sepia.vercel.app/)
- **Backend API**: [https://contact-book-app-backend-gczp.onrender.com/](https://contact-book-app-backend-gczp.onrender.com/)

## 📋 Features

### Backend Features
- **RESTful API** with Express.js
- **SQLite Database** for data persistence
- **CRUD Operations**: Create, Read, Update, Delete contacts
- **Input Validation** with regex patterns
- **Pagination Support** for contact listing
- **Error Handling** with proper HTTP status codes
- **CORS Enabled** for cross-origin requests
- **Duplicate Prevention** for email and phone numbers

### Frontend Features
- **React 18** with modern hooks
- **Responsive Design** using Tailwind CSS
- **Form Validation** with real-time error display
- **Toast Notifications** for user feedback
- **Pagination Controls** with page navigation
- **Modal Forms** for adding/editing contacts
- **Loading States** and error handling
- **Mobile-First Design** with responsive breakpoints

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite3** - Database
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variables
- **Nodemon** - Development server

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Toastify** - Toast notifications
- **React Icons** - Icon library

### Deployment
- **Frontend**: Vercel
- **Backend**: Render

## 📁 Project Structure

```
contact-book-app/
├── backend/                 # Backend server
│   ├── configs/
│   │   └── db.js           # Database configuration
│   ├── contacts.db         # SQLite database file
│   ├── package.json        # Backend dependencies
│   └── server.js           # Express server
├── frontend/               # React application
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── ContactList.jsx
│   │   │   ├── Form.jsx
│   │   │   └── Pagination.jsx
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # React entry point
│   │   └── index.css      # Global styles
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
├── .gitignore             # Git ignore rules
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The application will open at `http://localhost:5173`

## 📡 API Endpoints

### Base URL
- Development: `http://localhost:5000`
- Production: `https://contact-book-app-backend-gczp.onrender.com`

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API status and information |
| GET | `/contacts` | Get contacts with pagination |
| POST | `/contacts` | Add a new contact |
| PUT | `/contacts/:id` | Update a contact |
| DELETE | `/contacts/:id` | Delete a contact |

### API Response Examples

#### GET /
```json
{
  "message": "Contact Book API is running!",
  "version": "1.0.0",
  "endpoints": {
    "GET /": "API status and information",
    "GET /contacts": "Get all contacts with pagination",
    "POST /contacts": "Add a new contact",
    "PUT /contacts/:id": "Update a contact by ID",
    "DELETE /contacts/:id": "Delete a contact by ID"
  },
  "status": "active",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

#### GET /contacts
```json
{
  "contacts": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890"
    }
  ],
  "total": 1
}
```

#### POST /contacts
Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890"
}
```

## 🎨 UI Components

### ContactList Component
- Displays contacts in a responsive grid
- Shows contact information (name, email, phone)
- Edit and Delete buttons for each contact
- Empty state message when no contacts exist

### Form Component
- Modal form for adding/editing contacts
- Real-time validation with error messages
- Responsive design for mobile and desktop
- Form pre-population for editing

### Pagination Component
- Page navigation controls
- Previous/Next buttons
- Page number buttons
- Disabled states for boundaries

## ✅ Validation Rules

### Client-Side Validation
- **Name**: Required field
- **Email**: Valid email format (user@domain.com)
- **Phone**: Exactly 10 digits

### Server-Side Validation
- All client-side validations repeated
- **Duplicate Check**: Email and phone uniqueness
- **Database Constraints**: NOT NULL constraints

## 🚀 Deployment

### Frontend (Vercel)
1. Connected to GitHub repository
2. Automatic deployments on push to main branch
3. Environment variables configured
4. URL: https://contact-book-app-nu-sepia.vercel.app/

### Backend (Render)
1. Connected to GitHub repository
2. Automatic deployments on push to main branch
3. SQLite database persistence
4. URL: https://contact-book-app-backend-gczp.onrender.com

## 🔧 Development Scripts

### Backend
```bash
npm run dev    # Start development server with nodemon
npm start      # Start production server
```

### Frontend
```bash
npm run dev    # Start Vite development server
npm run build  # Build for production
npm run preview # Preview production build
```

## 📱 Responsive Design

The application is fully responsive and works on:
- **Mobile devices** (320px and up)
- **Tablets** (768px and up)
- **Desktop** (1024px and up)
- **Large screens** (1280px and up)

## 🔐 Security Features

- Input validation and sanitization
- SQL injection prevention with parameterized queries
- CORS configuration for allowed origins
- Error handling without information leakage
- Duplicate data prevention

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support or questions, please contact the development team or create an issue in the repository.

---

**Built with ❤️ using React, Node.js, Express, and SQLite**
