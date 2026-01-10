# Form Builder

A simple web application for creating custom forms, collecting responses, and managing form submissions.

## Features

- Create forms with multiple field types (text, email, number, date, select, textarea)
- Save form templates to database
- Fill out forms and submit responses
- View and manage submitted responses
- Input validation on both frontend and backend
- Clean and responsive UI

## Tech Stack

**Frontend:**
- React.js
- Vite
- CSS3

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose

## Project Structure
```
form-builder/
├── server/
│   ├── models/
│   │   ├── FormTemplate.js
│   │   └── FormSubmission.js
│   ├── routes/
│   │   ├── templates.js
│   │   └── submissions.js
│   ├── server.js
│   ├── .env
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FormDesigner.jsx
│   │   │   ├── FormRenderer.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   ├── main.css
│   │   │   ├── FormDesigner.css
│   │   │   ├── FormRenderer.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to server folder:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with MongoDB connection:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/form-builder
PORT=5050
```

4. Start the server:
```bash
npm start
```

Server runs on `http://localhost:5050`

### Frontend Setup

1. Navigate to client folder:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

## How to Use

### Creating a Form

1. Click "Create Form" button
2. Enter form title and description
3. Click buttons to add fields (Text, Email, Number, Date, Select, Textarea)
4. Edit field labels and mark as required
5. For select fields, add comma-separated options
6. Click "Save Form"

### Filling a Form

1. Click "Fill Form" on any form card
2. Fill in all required fields
3. Click "Submit" button
4. Success message will appear

=

## API Endpoints

### Templates
- `GET /api/templates` - Get all form templates
- `POST /api/templates` - Create new template
- `GET /api/templates/:id` - Get single template
- `PUT /api/templates/:id` - Update template
- `DELETE /api/templates/:id` - Delete template

### Submissions
- `POST /api/submissions` - Submit form response
- `GET /api/submissions/template/:templateId` - Get submissions for a form

## Validation

**Frontend:**
- Required field checking
- Email format validation
- Number field validation

**Backend:**
- Required field validation
- Form existence check
- Field validation based on template

## Sample Form

A sample "Customer Feedback Form" is included with:
- Name (required text field)
- Email (required email field)
- Satisfaction Rating (required select field)
- Additional Comments (textarea field)

## Deployment

### Backend (Railway)

1. Push code to GitHub
2. Connect repo to Railway
3. Add environment variables
4. Deploy

### Frontend (Vercel)

1. Push code to GitHub
2. Connect repo to Vercel
3. Set API URL to deployed backend
4. Deploy

## Challenges & Solutions

- **CORS Issues**: Solved by adding CORS middleware in Express
- **MongoDB Connection**: Using MongoDB Atlas cloud database
- **Form Validation**: Implemented on both client and server side
- **UI Responsiveness**: Used CSS Grid and Flexbox for mobile support

## Time Spent

- Backend setup: 1 day
- Frontend components: 1.5 days
- Styling and UI: 1 day
- Testing and deployment: 1.5 days

## Future Improvements

- Drag and drop field reordering
- Form templates export/import
- User authentication
- Form analytics and charts
- Conditional fields
- File upload fields

## Author

Created as a placement interview project

## License

MIT