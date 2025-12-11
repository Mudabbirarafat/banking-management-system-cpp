let currentUser = null;

const API_BASE = 'http://localhost:3000/api';

// Tab Navigation
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.id === 'logoutBtn') {
            logout();
            return;
        }
        switchTab(this.dataset.tab);
    });
});

function switchTab(tabName) {
    if (tabName === 'accounts') {
        loadAllAccounts();
    }
    
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.nav-btn:not(#logoutBtn)').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// Create Account
document.getElementById('createForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('createName').value;
    const password = document.getElementById('createPassword').value;
    const password2 = document.getElementById('createPassword2').value;
    const initialDeposit = parseFloat(document.getElementById('createDeposit').value);
    
    const errorDiv = document.getElementById('createError');
    const successDiv = document.getElementById('createSuccess');
    
    errorDiv.classList.remove('show');
    errorDiv.innerHTML = '';
    successDiv.classList.remove('show');
    successDiv.innerHTML = '';
    
    if (password !== password2) {
        errorDiv.innerHTML = 'Passwords do not match';
        errorDiv.classList.add('show');
        return;
    }
    
    if (password.length < 6) {
        errorDiv.innerHTML = 'Password must be at least 6 characters';
        errorDiv.classList.add('show');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/account/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                password,
                initialDeposit
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            successDiv.innerHTML = `✓ ${data.message}`;
            successDiv.classList.add('show');
            document.getElementById('createForm').reset();
        } else {
            errorDiv.innerHTML = data.error || 'Failed to create account';
            errorDiv.classList.add('show');
        }
    } catch (err) {
        errorDiv.innerHTML = 'Error: ' + err.message;
        errorDiv.classList.add('show');
    }
});

// Login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = parseInt(document.getElementById('loginId').value);
    const password = document.getElementById('loginPassword').value;
    const errorDiv = document.getElementById('loginError');
    
    errorDiv.classList.remove('show');
    errorDiv.innerHTML = '';
    
    try {
        const response = await fetch(`${API_BASE}/account/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            currentUser = data.account;
            showDashboard();
            document.getElementById('loginForm').reset();
        } else {
            errorDiv.innerHTML = data.error || 'Login failed';
            errorDiv.classList.add('show');
        }
    } catch (err) {
        errorDiv.innerHTML = 'Error: ' + err.message;
        errorDiv.classList.add('show');
    }
});

function showDashboard() {
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('displayBalance').textContent = currentUser.balance.toFixed(2);
    
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('logoutBtn').style.display = 'block';
    
    document.querySelectorAll('.nav-btn:not(#logoutBtn)').forEach(btn => {
        btn.style.display = 'none';
    });
}

function logout() {
    currentUser = null;
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('logoutBtn').style.display = 'none';
    document.querySelectorAll('.nav-btn:not(#logoutBtn)').forEach(btn => {
        btn.style.display = 'block';
    });
    switchTab('login');
    document.querySelector('[data-tab="login"]').classList.add('active');
}

async function checkBalance() {
    if (!currentUser) return;
    
    try {
        const response = await fetch(`${API_BASE}/account/balance`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: currentUser.id,
                password: document.getElementById('loginPassword').value || currentUser.password
            })
        });
        
        const data = await response.json();
        if (response.ok) {
            document.getElementById('displayBalance').textContent = data.balance.toFixed(2);
            showTransactionMessage(`Current Balance: $${data.balance.toFixed(2)}`);
        }
    } catch (err) {
        showTransactionMessage('Error: ' + err.message, true);
    }
}

async function deposit() {
    if (!currentUser) return;
    
    const amount = parseFloat(document.getElementById('depositAmount').value);
    
    if (!amount || amount <= 0) {
        showTransactionMessage('Please enter a valid amount', true);
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/account/deposit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: currentUser.id,
                password: 'demo', // In real app, user would enter password
                amount
            })
        });
        
        const data = await response.json();
        if (response.ok) {
            currentUser.balance = data.balance;
            document.getElementById('displayBalance').textContent = data.balance.toFixed(2);
            document.getElementById('depositAmount').value = '';
            showTransactionMessage(`✓ ${data.message}`);
        } else {
            showTransactionMessage('Error: ' + (data.error || 'Deposit failed'), true);
        }
    } catch (err) {
        showTransactionMessage('Error: ' + err.message, true);
    }
}

async function withdraw() {
    if (!currentUser) return;
    
    const amount = parseFloat(document.getElementById('withdrawAmount').value);
    
    if (!amount || amount <= 0) {
        showTransactionMessage('Please enter a valid amount', true);
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/account/withdraw`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: currentUser.id,
                password: 'demo', // In real app, user would enter password
                amount
            })
        });
        
        const data = await response.json();
        if (response.ok) {
            currentUser.balance = data.balance;
            document.getElementById('displayBalance').textContent = data.balance.toFixed(2);
            document.getElementById('withdrawAmount').value = '';
            showTransactionMessage(`✓ ${data.message}`);
        } else {
            showTransactionMessage('Error: ' + (data.error || 'Withdrawal failed'), true);
        }
    } catch (err) {
        showTransactionMessage('Error: ' + err.message, true);
    }
}

function showTransactionMessage(message, isError = false) {
    const msgDiv = document.getElementById('transactionMessage');
    msgDiv.textContent = message;
    msgDiv.classList.add('show');
    msgDiv.style.background = isError ? '#f8d7da' : '#d1ecf1';
    msgDiv.style.color = isError ? '#721c24' : '#0c5460';
    
    setTimeout(() => {
        msgDiv.classList.remove('show');
    }, 4000);
}

async function loadAllAccounts() {
    try {
        const response = await fetch(`${API_BASE}/accounts`);
        const data = await response.json();
        
        const accountsList = document.getElementById('accountsList');
        
        if (data.accounts.length === 0) {
            accountsList.innerHTML = '<p style="text-align: center; color: #666;">No accounts yet</p>';
            return;
        }
        
        accountsList.innerHTML = data.accounts.map(account => `
            <div class="account-item">
                <div class="account-info">
                    <h4>Account ID: ${account.id}</h4>
                    <p><strong>${account.name}</strong></p>
                    <p>Created: ${new Date(account.createdAt).toLocaleDateString()}</p>
                </div>
                <div class="account-balance">
                    $${account.balance.toFixed(2)}
                </div>
            </div>
        `).join('');
    } catch (err) {
        document.getElementById('accountsList').innerHTML = '<p style="color: red;">Error loading accounts</p>';
    }
}
