# Family Expense Tracker - Frontend

A React application for tracking family expenses with beautiful UI and comprehensive features.

## Features

- 📊 Dashboard with expense statistics
- 📝 Add, edit, and delete expenses
- 🔍 Filter expenses by category, person, and date range
- 📈 Monthly and yearly reports
- 💾 Export reports to CSV
- 🎨 Modern and responsive UI

## Prerequisites

- Node.js (v14 or higher)
- Backend API running (see backend README)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

3. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/       # Reusable components
│   └── Layout.js    # Main layout with navigation
├── models/          # Data models
│   ├── Expense.js   # Expense model
│   └── User.js      # User model
├── pages/           # Page components
│   ├── Dashboard.js      # Main dashboard
│   ├── ExpenseList.js    # List all expenses
│   ├── ExpenseForm.js    # Add/edit expense form
│   └── Reports.js        # Reports page
├── services/        # API services
│   └── api.js       # API service class
├── styles/          # CSS files
│   ├── Layout.css
│   ├── Dashboard.css
│   ├── ExpenseList.css
│   ├── ExpenseForm.css
│   └── Reports.css
├── App.js          # Main app component with routing
└── index.js        # Entry point
```

## Pages

### Dashboard
- Overview of total expenses
- Current month statistics
- Recent expenses list
- Breakdown by category

### Expenses
- List all expenses with filtering
- Add new expense
- Edit existing expenses
- Delete expenses

### Reports
- Monthly reports with breakdown
- Export to CSV
- Statistics by category and person

## Models

### Expense Model
```javascript
{
  id: String,
  description: String,
  amount: Number,
  category: String,
  date: String,
  paidBy: String
}
```

### User Model
```javascript
{
  id: String,
  name: String,
  email: String,
  role: String
}
```

## API Integration

The app uses an API service class (`src/services/api.js`) to communicate with the backend:

- All API calls are centralized
- Automatic error handling
- Request/response interceptors
- Token-based authentication support

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Learn More

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)
- [React Router documentation](https://reactrouter.com/)
