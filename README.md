# C++ Banking Management System - Web Edition

## Overview
Modern web-based banking system with Node.js backend and responsive HTML/CSS/JavaScript frontend. Features account creation, login, deposits, withdrawals, and real-time account management with beautiful UI.

## 🎯 Quick Start (Web Version)

### Requirements
- Node.js (v12+) - [Download](https://nodejs.org/)
- npm (comes with Node.js)

### Installation & Run
```bash
cd c:\Users\MUDABBIR\Downloads\banking_system
npm install
npm start
```

Open browser: **http://localhost:3000**

## 📁 Project Structure

### Web Version Files
- **server.js** - Express.js REST API backend
- **package.json** - Node.js dependencies
- **public/index.html** - Frontend UI
- **public/style.css** - Modern responsive styling
- **public/script.js** - Client-side JavaScript
- **data/accounts.json** - JSON database (auto-created)

### Original C++ Files
- **main.cpp** - Original console application
- **bank.h** - C++ header file
- **bank.cpp** - C++ implementation
- **banking.exe** - Compiled executable
- **data/accounts.csv** - Original CSV database

## ✨ Features

### User Management
- ✅ Create new account (name, password, initial deposit)
- ✅ Secure login with SHA-256 password hashing
- ✅ View account details and balance
- ✅ List all accounts in system

### Banking Operations
- ✅ **Check Balance** - View current account balance
- ✅ **Deposit** - Add funds to account
- ✅ **Withdraw** - Withdraw funds (with validation)
- ✅ **Real-time Updates** - Balance updates instantly

### UI/UX
- ✅ Modern, responsive design
- ✅ Beautiful gradient interface
- ✅ Mobile-friendly layout
- ✅ Real-time feedback messages
- ✅ Smooth animations

## 🔗 API Endpoints

```
POST   /api/account/create      - Create new account
POST   /api/account/login       - Login with credentials
POST   /api/account/balance     - Check account balance
POST   /api/account/deposit     - Deposit money
POST   /api/account/withdraw    - Withdraw money
GET    /api/accounts            - List all accounts
```

## 🔧 Build & Run (Original C++ Console)

### Windows (with Visual Studio)
```bash
clang++ -std=c++17 -I"C:\Program Files\OpenSSL-Win64\include" -L"C:\Program Files\OpenSSL-Win64\lib\VC\x64\MD" main.cpp bank.cpp -llibssl -llibcrypto -o banking.exe
.\banking.exe
```

### Linux
```bash
sudo apt-get install libssl-dev build-essential
g++ -std=c++17 main.cpp bank.cpp -lssl -lcrypto -o banking
./banking
```

## 💾 Data Storage
- **Web Version**: JSON format in `data/accounts.json`
- **Original**: CSV format in `data/accounts.csv`

Each account stores:
- Unique ID (auto-generated)
- Account holder name
- SHA-256 password hash
- Current balance
- Creation timestamp

## 🔐 Security Features
- Password hashing with SHA-256
- Input validation
- Insufficient funds protection
- CORS protection
- No SQL injection (JSON storage)

⚠️ **Note**: Educational/Demo only. For production, add:
- bcrypt password hashing
- JWT authentication
- HTTPS/SSL
- Database (MongoDB/PostgreSQL)
- Rate limiting
- Audit logging

## 📊 Technology Stack

| Component | Technology |
|-----------|-----------|
| Backend | Node.js + Express.js |
| Frontend | HTML5 + CSS3 + JavaScript |
| Database | JSON (JSON file) |
| Security | SHA-256 hashing |
| Styling | CSS3 Gradients & Grid |

## 🐛 Troubleshooting

**Port 3000 already in use?**
- Edit `server.js`: Change `const PORT = 3001;`

**npm command not found?**
- Restart PowerShell after Node.js installation
- Verify: `node --version` and `npm --version`

**Module not found errors?**
- Run `npm install` again

**Can't connect to localhost:3000?**
- Ensure server is running: `npm start`
- Check firewall settings
- Use `http://` not `https://`

## 📚 Documentation
- See **WEB_README.md** for detailed web version documentation
- Original C++ documentation in comments

## 🚀 Next Steps

### Enhancement Ideas
1. Add transaction history
2. Implement fund transfers between accounts
3. Add email notifications
4. Create mobile app (React Native)
5. Switch to real database (MongoDB/PostgreSQL)
6. Add JWT authentication
7. Implement 2FA
8. Create admin dashboard

### Deployment
- Heroku
- AWS EC2
- Azure App Service
- Docker containerization
- Vercel (frontend only)

## 📝 License
Educational/Demo Project - 2025

## 🤝 Support
For issues:
1. Check terminal logs
2. Open browser DevTools (F12)
3. Check Network tab for API calls
4. Review `data/accounts.json` file
