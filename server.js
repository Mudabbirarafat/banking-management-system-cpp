const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'data', 'accounts.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Database functions
let accounts = [];
let nextId = 1;

function loadAccounts() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf8');
      accounts = JSON.parse(data);
      nextId = Math.max(...accounts.map(a => a.id), 0) + 1;
    }
  } catch (err) {
    console.log('No existing accounts database');
    accounts = [];
    nextId = 1;
  }
}

function saveAccounts() {
  fs.writeFileSync(DB_FILE, JSON.stringify(accounts, null, 2));
}

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function findAccountById(id) {
  return accounts.find(a => a.id === id);
}

function authenticate(id, password) {
  const account = findAccountById(id);
  if (!account) return null;
  if (account.passwordHash === hashPassword(password)) return account;
  return null;
}

// Load accounts on startup
loadAccounts();

// API Routes

// Create account
app.post('/api/account/create', (req, res) => {
  const { name, password, initialDeposit } = req.body;
  
  if (!name || !password || initialDeposit === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (initialDeposit < 0) {
    return res.status(400).json({ error: 'Initial deposit must be non-negative' });
  }

  const newAccount = {
    id: nextId++,
    name,
    passwordHash: hashPassword(password),
    balance: initialDeposit,
    createdAt: new Date().toISOString()
  };

  accounts.push(newAccount);
  saveAccounts();

  res.json({ 
    success: true, 
    accountId: newAccount.id,
    message: `Account created successfully. Your account ID: ${newAccount.id}`
  });
});

// Login
app.post('/api/account/login', (req, res) => {
  const { id, password } = req.body;
  
  if (!id || !password) {
    return res.status(400).json({ error: 'Account ID and password required' });
  }

  const account = authenticate(parseInt(id), password);
  if (!account) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({ 
    success: true, 
    account: {
      id: account.id,
      name: account.name,
      balance: account.balance
    }
  });
});

// Get balance
app.post('/api/account/balance', (req, res) => {
  const { id, password } = req.body;
  
  const account = authenticate(parseInt(id), password);
  if (!account) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({ 
    success: true, 
    balance: account.balance 
  });
});

// Deposit
app.post('/api/account/deposit', (req, res) => {
  const { id, password, amount } = req.body;
  
  if (amount === undefined || amount <= 0) {
    return res.status(400).json({ error: 'Amount must be greater than 0' });
  }

  const account = authenticate(parseInt(id), password);
  if (!account) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  account.balance += amount;
  saveAccounts();

  res.json({ 
    success: true, 
    balance: account.balance,
    message: `Deposited ${amount}. New balance: ${account.balance}`
  });
});

// Withdraw
app.post('/api/account/withdraw', (req, res) => {
  const { id, password, amount } = req.body;
  
  if (amount === undefined || amount <= 0) {
    return res.status(400).json({ error: 'Amount must be greater than 0' });
  }

  const account = authenticate(parseInt(id), password);
  if (!account) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  if (amount > account.balance) {
    return res.status(400).json({ error: 'Insufficient funds' });
  }

  account.balance -= amount;
  saveAccounts();

  res.json({ 
    success: true, 
    balance: account.balance,
    message: `Withdrawn ${amount}. New balance: ${account.balance}`
  });
});

// Get all accounts (for demo purposes)
app.get('/api/accounts', (req, res) => {
  const accountList = accounts.map(a => ({
    id: a.id,
    name: a.name,
    balance: a.balance,
    createdAt: a.createdAt
  }));
  res.json({ accounts: accountList });
});

// Start server
app.listen(PORT, () => {
  console.log(`🏦 Banking System Server running at http://localhost:${PORT}`);
  console.log(`📊 Accounts: ${accounts.length}`);
});
