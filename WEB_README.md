# C++ Banking Management System - Web Version

## Overview
A modern web-based banking system with a Node.js backend and responsive HTML/CSS/JavaScript frontend. Features account creation, login, deposits, withdrawals, and account management.

## Original Files
- `main.cpp` - Original C++ console application
- `bank.h` - Original C++ header
- `bank.cpp` - Original C++ implementation
- `banking.exe` - Compiled C++ executable
- `data/accounts.csv` - Original database format

## Web Version Files
- `server.js` - Express.js backend API server
- `package.json` - Node.js dependencies
- `public/index.html` - Frontend UI
- `public/style.css` - Styling
- `public/script.js` - Client-side JavaScript
- `data/accounts.json` - JSON database

## Requirements
- Node.js (v12 or higher)
- npm (comes with Node.js)

## Installation & Setup

### 1. Install Node.js
- Download from: https://nodejs.org/
- Choose LTS version
- Install with default settings

### 2. Install Dependencies
```bash
cd c:\Users\MUDABBIR\Downloads\banking_system
npm install
```

This will install:
- express (web framework)
- body-parser (JSON parsing)
- cors (cross-origin support)
- crypto (built-in Node.js module)

### 3. Run the Server
```bash
npm start
```

or

```bash
node server.js
```

You should see:
```
🏦 Banking System Server running at http://localhost:3000
📊 Accounts: X
```

### 4. Access the Application
Open your browser and go to:
```
http://localhost:3000
```

## Features

### 1. Create Account
- Enter name, password, and initial deposit
- Account ID generated automatically
- Data saved to `data/accounts.json`

### 2. Login
- Login with Account ID and password
- Secure password hashing (SHA-256)
- Access personal dashboard

### 3. Dashboard (After Login)
- View current balance
- **Check Balance** - View account balance
- **Deposit** - Add funds to account
- **Withdraw** - Remove funds (with validation)
- **Logout** - Exit account

### 4. View All Accounts
- See all accounts in the system
- View account names, IDs, and balances
- Created date information

## API Endpoints

### Account Management
- `POST /api/account/create` - Create new account
- `POST /api/account/login` - Login with credentials
- `POST /api/account/balance` - Check balance
- `POST /api/account/deposit` - Deposit money
- `POST /api/account/withdraw` - Withdraw money
- `GET /api/accounts` - List all accounts

### Request/Response Examples

**Create Account:**
```json
POST /api/account/create
{
  "name": "John Doe",
  "password": "securepass123",
  "initialDeposit": 1000
}

Response:
{
  "success": true,
  "accountId": 1,
  "message": "Account created successfully. Your account ID: 1"
}
```

**Login:**
```json
POST /api/account/login
{
  "id": 1,
  "password": "securepass123"
}

Response:
{
  "success": true,
  "account": {
    "id": 1,
    "name": "John Doe",
    "balance": 1000
  }
}
```

**Deposit:**
```json
POST /api/account/deposit
{
  "id": 1,
  "password": "securepass123",
  "amount": 500
}

Response:
{
  "success": true,
  "balance": 1500,
  "message": "Deposited 500. New balance: 1500"
}
```

## Data Storage
- Accounts stored in `data/accounts.json`
- Each account contains:
  - `id`: Unique account number
  - `name`: Account holder name
  - `passwordHash`: SHA-256 hashed password
  - `balance`: Current account balance
  - `createdAt`: Account creation timestamp

## Security Notes
⚠️ **Educational/Demo Use Only** - Not production-ready

### Current Implementation:
- Passwords hashed with SHA-256
- CORS enabled for local development
- No SQL injection (using JSON storage)

### For Production:
- Use bcrypt for password hashing
- Add JWT authentication
- Use database (MongoDB, PostgreSQL)
- Add HTTPS/SSL
- Implement rate limiting
- Add audit logging
- Use environment variables for config

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, edit `server.js`:
```javascript
const PORT = 3001; // Change to different port
```

### "npm: The term 'npm' is not recognized"
- Ensure Node.js is installed and restarted PowerShell
- Verify PATH: `node --version` and `npm --version`

### Cannot find module errors
```bash
npm install
```

### CORS Errors
- Ensure you're accessing via `http://localhost:3000`
- Don't use `http://127.0.0.1:3000` or different hostname

## File Structure
```
banking_system/
├── server.js
├── package.json
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── data/
│   └── accounts.json (created at runtime)
├── bank.cpp
├── bank.h
├── main.cpp
└── README.md
```

## Comparison: Console vs Web Version

| Feature | Console (C++) | Web (Node.js) |
|---------|---------------|--------------|
| Interface | CLI Text | Modern UI |
| Access | Local Console | Browser (http://localhost:3000) |
| Data Format | CSV | JSON |
| Authentication | Built-in | API-based |
| Deployment | Executable | Node.js Server |
| Learning | C++ OOP | Full-stack Web Dev |

## Next Steps

### Enhancement Ideas:
1. **Database**: Switch from JSON to MySQL/MongoDB
2. **Authentication**: Add JWT tokens
3. **Transactions**: Track transfer history
4. **Multiple Users**: Concurrent login support
5. **Email**: Add email notifications
6. **Mobile**: Create mobile app version
7. **API**: RESTful API documentation (Swagger)
8. **Testing**: Unit tests with Jest

### Deployment Options:
- **Heroku**: `npm start`
- **AWS**: EC2 instance
- **Docker**: Containerize the app
- **Vercel**: Frontend only
- **Azure**: App Service

## Support
For issues or questions, check:
- Server logs in terminal
- Browser console (F12)
- Network tab for API calls
- `data/accounts.json` for stored data

---

**Created**: December 2025
**Version**: 1.0.0
**Type**: Educational/Demo Project
