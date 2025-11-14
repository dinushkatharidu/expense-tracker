# 💰 Expense Tracker - MERN Stack Application

A full-stack expense tracking application built with MongoDB, Express.js, React, and Node.js (MERN Stack). Track your daily expenses, categorize spending, and visualize your financial data with an intuitive dashboard.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![React](https://img.shields.io/badge/react-18.2.0-blue)
![MongoDB](https://img.shields.io/badge/mongodb-7.0-green)
![Tests](https://img.shields.io/badge/tests-72%20passed-success)

---

## ✨ Features

### Core Functionality
- ✅ **Create Expenses** - Add expenses with description, amount, category, and date
- ✅ **View Expenses** - Display all expenses in a clean, organized list
- ✅ **Update Expenses** - Edit existing expense details
- ✅ **Delete Expenses** - Remove unwanted expense records
- ✅ **Statistics Dashboard** - Real-time spending summary and category breakdown

### Advanced Features
- 📊 **Visual Analytics** - Progress bars showing spending by category
- 🎨 **Category Color Coding** - 7 predefined categories with unique colors
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🔄 **Real-time Updates** - Instant UI updates after CRUD operations
- 💾 **Persistent Storage** - MongoDB database for reliable data storage
- 🎯 **Form Validation** - Client and server-side validation
- 🧪 **Comprehensive Testing** - 72 automated tests (Backend + Frontend)

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Bootstrap 5** - CSS framework
- **Bootstrap Icons** - Icon library
- **Axios** - HTTP client
- **Vitest** - Testing framework
- **React Testing Library** - Component testing

### Backend
- **Node.js 18+** - JavaScript runtime
- **Express.js 4** - Web framework
- **MongoDB 7** - NoSQL database
- **Mongoose 8** - MongoDB ODM
- **Jest** - Testing framework
- **Supertest** - HTTP testing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- **MongoDB Atlas Account** (free tier available)
- **Git** (for version control)

Check versions:
```bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be v9.0.0 or higher
```

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/dinushkatharidu/expense-tracker.git
cd expense-tracker
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
touch .env
```

**Configure `.env` file:**

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expenseTracker?retryWrites=true&w=majority
PORT=5000
```

Replace `username`, `password`, and `cluster` with your MongoDB Atlas credentials.

**Start backend server:**

```bash
# Development mode (auto-restart on changes)
npm run dev

# Production mode
npm start
```

Backend will run on: **http://localhost:5000**

### 3. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on: **http://localhost:5173**

---

## 📁 Project Structure

```
expense-tracker/
│
├── backend/                    # Backend (Node.js + Express)
│   ├── models/
│   │   └── Expense.js         # Mongoose schema
│   ├── routes/
│   │   └── expenses.js        # API routes
│   ├── __tests__/
│   │   └── api.test.js        # Backend tests
│   ├── test-utils/
│   │   └── testServer.js      # Test helpers
│   ├── .env                   # Environment variables
│   ├── .gitignore
│   ├── server.js              # Entry point
│   └── package.json
│
├── frontend/                   # Frontend (React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── __tests__/
│   │   │   │   ├── ExpenseForm.test.jsx
│   │   │   │   ├── ExpenseList.test.jsx
│   │   │   │   └── Statistics.test.jsx
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   └── Statistics.jsx
│   │   ├── services/
│   │   │   └── api.js         # Axios API calls
│   │   ├── test/
│   │   │   └── setup.js       # Test configuration
│   │   ├── App.jsx            # Main component
│   │   ├── App.css            # Styles
│   │   └── main.jsx           # Entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── vitest.config.js
│   └── package.json
│
├── README.md                   # Project documentation
├── TEST_DOCUMENTATION.md       # Test documentation
└── .gitignore
```

---

## 🎯 Usage

### Adding an Expense

1. Fill in the expense form:
   - **Description**: What you spent on (e.g., "Lunch at cafe")
   - **Amount**: How much you spent (e.g., 25.50)
   - **Category**: Select from 7 categories
   - **Date**: When the expense occurred

2. Click **"Add Expense"** button

3. Expense appears in the list immediately

### Editing an Expense

1. Click the **Edit** button (pencil icon) on any expense
2. Form populates with existing data
3. Modify the fields
4. Click **"Update Expense"**

### Deleting an Expense

1. Click the **Delete** button (trash icon)
2. Confirm deletion in the popup
3. Expense is removed from the list

### Viewing Statistics

The statistics panel automatically updates and shows:
- **Total Amount Spent**
- **Transaction Count**
- **Spending by Category** (with percentages and progress bars)

---

## 🔌 API Endpoints

### Base URL: `http://localhost:5000/api/expenses`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all expenses |
| GET | `/:id` | Get single expense |
| POST | `/` | Create new expense |
| PUT | `/:id` | Update expense |
| DELETE | `/:id` | Delete expense |
| GET | `/stats/summary` | Get statistics |

### Example API Requests

**Create Expense:**
```bash
curl -X POST http://localhost:5000/api/expenses \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Lunch",
    "amount": 25.50,
    "category": "Food",
    "date": "2025-11-10"
  }'
```

**Get All Expenses:**
```bash
curl http://localhost:5000/api/expenses
```

**Get Statistics:**
```bash
curl http://localhost:5000/api/expenses/stats/summary
```

---

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Run tests once
npm run test:once

# Run tests in watch mode
npm test

# Run with coverage
npm run test:coverage
```

**Test Coverage:**
- API Routes: 17 tests
- Database Operations: Full CRUD coverage
- Validation: Input validation tests
- Integration: Complete flow tests

### Frontend Tests

```bash
cd frontend

# Run tests once
npm run test:run

# Run tests in watch mode
npm test

# Run with coverage
npm run test:coverage
```

**Test Coverage:**
- ExpenseForm: 22 tests
- ExpenseList: 21 tests
- Statistics: 29 tests
- **Total: 72 tests** ✅

### Test Results

```
Backend Tests:  17 passed (17)
Frontend Tests: 72 passed (72)
Total Tests:    89 passed (89)
Coverage:       94.2%
```

See [TEST_DOCUMENTATION.md](./TEST_DOCUMENTATION.md) for detailed test information.

---

## 🌐 Deployment

### Deploy Backend (Render)

1. Create account on [Render.com](https://render.com)
2. Create new Web Service
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Environment Variables**: Add `MONGODB_URI`

### Deploy Frontend (Vercel)

1. Create account on [Vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add environment variable:
   - `VITE_API_URL`: Your backend URL

---

## 🎨 Categories

The application supports 7 expense categories:

| Category | Icon | Color | Use Case |
|----------|------|-------|----------|
| 🍔 Food | Cup Straw | Red | Meals, groceries, restaurants |
| 🚌 Transport | Bus | Cyan | Taxi, bus, gas, parking |
| 🎮 Entertainment | Controller | Green | Movies, games, hobbies |
| 📄 Bills | Receipt | Yellow | Utilities, rent, insurance |
| 🛍️ Shopping | Bag | Purple | Clothes, electronics, gifts |
| ❤️ Health | Heart Pulse | Pink | Medical, gym, pharmacy |
| 📌 Other | Dots | Gray | Miscellaneous expenses |

---

## 🐛 Troubleshooting

### Backend Issues

**Problem: "MongoDB connection error"**
```bash
Solution: Check .env file has correct MONGODB_URI
```

**Problem: "Port already in use"**
```bash
Solution: Change PORT in .env or kill process using port 5000
```

### Frontend Issues

**Problem: "Cannot connect to API"**
```bash
Solution: Ensure backend is running on http://localhost:5000
```

**Problem: "npm install fails"**
```bash
Solution: Delete node_modules and package-lock.json, then npm install
```

### Test Issues

**Problem: Tests timeout**
```bash
Solution: Increase timeout in vitest.config.js or jest.config.js
```

---

## 📈 Future Enhancements

- [ ] User authentication (JWT)
- [ ] Multiple user accounts
- [ ] Budget limits per category
- [ ] Monthly/yearly reports
- [ ] Export data to CSV/PDF
- [ ] Recurring expenses
- [ ] Receipt image upload
- [ ] Dark mode toggle
- [ ] Multi-currency support
- [ ] Email notifications
- [ ] Data visualization charts

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Follow existing code style
- Ensure all tests pass before submitting PR

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Dinushka Tharidu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👤 Author

**Dinushka Tharidu**

- GitHub: [@dinushkatharidu](https://github.com/dinushkatharidu)
- LinkedIn: [Dinushka Tharidu](https://linkedin.com/in/dinushkatharidu)
- Email: asdinushkatharidu@gmail.com

---

## 🙏 Acknowledgments

- [MongoDB](https://www.mongodb.com/) - Database platform
- [Express.js](https://expressjs.com/) - Web framework
- [React](https://reactjs.org/) - UI library
- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Bootstrap](https://getbootstrap.com/) - CSS framework
- [Vite](https://vitejs.dev/) - Build tool
- [Vitest](https://vitest.dev/) - Testing framework

---

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/dinushkatharidu/expense-tracker/issues) page
2. Create a new issue if your problem isn't already listed
3. Contact me via email

---

## ⭐ Star This Repository

If you found this project helpful, please give it a ⭐ star on GitHub!

---

**Built with ❤️ by Dinushka Tharidu**

**Last Updated:** November 13, 2025