#include "bank.h"
#include <fstream>
#include <sstream>
#include <iostream>
#include <iomanip>
#include <openssl/sha.h>
#include <mutex>

Bank::Bank(const std::string &dbfile): dbfile(dbfile), next_id(1) {}

void Bank::load() {
    std::ifstream in(dbfile);
    if (!in) return;
    accounts.clear();
    std::string line;
    while (std::getline(in, line)) {
        if(line.empty()) continue;
        std::stringstream ss(line);
        Account a;
        ss >> a.id;
        ss.ignore(1);
        std::getline(ss, a.name, '|');
        std::getline(ss, a.password_hash, '|');
        ss >> a.balance;
        accounts.push_back(a);
        if (a.id >= next_id) next_id = a.id + 1;
    }
}

void Bank::save() {
    std::ofstream out(dbfile, std::ios::trunc);
    for (auto &a: accounts) {
        out << a.id << '|' << a.name << '|' << a.password_hash << '|' << a.balance << "\n";
    }
}

void Bank::create_account() {
    std::string name, password;
    double initial;
    std::cout << "Enter name: ";
    std::cin.ignore();
    std::getline(std::cin, name);
    std::cout << "Set password: ";
    std::getline(std::cin, password);
    std::cout << "Initial deposit: ";
    std::cin >> initial;
    Account a;
    a.id = next_id++;
    a.name = name;
    a.password_hash = hash_password(password);
    a.balance = initial;
    accounts.push_back(a);
    std::cout << "Account created. Your account ID: " << a.id << "\n";
}

Account* Bank::find_account_by_id(int id) {
    for (auto &a: accounts) if (a.id == id) return &a;
    return nullptr;
}

Account* Bank::authenticate(int id, const std::string &password) {
    Account* a = find_account_by_id(id);
    if (!a) return nullptr;
    if (a->password_hash == hash_password(password)) return a;
    return nullptr;
}

bool Bank::login_menu() {
    int id; std::string password;
    std::cout << "Account ID: "; std::cin >> id;
    std::cout << "Password: "; std::cin.ignore(); std::getline(std::cin, password);
    Account* a = authenticate(id, password);
    if (!a) { std::cout << "Invalid credentials.\n"; return false; }
    std::cout << "Welcome, " << a->name << " (ID " << a->id << ")\n";
    int ch;
    while (true) {
        std::cout << "\n1. Balance 2. Deposit 3. Withdraw 4. Transactions (not implemented) 5. Logout\nChoice: ";
        std::cin >> ch;
        if (ch == 1) {
            std::cout << "Balance: " << std::fixed << std::setprecision(2) << a->balance << "\n";
        } else if (ch == 2) {
            double d; std::cout << "Amount to deposit: "; std::cin >> d;
            if (d>0) { a->balance += d; std::cout << "Deposited.\n"; }
        } else if (ch == 3) {
            double w; std::cout << "Amount to withdraw: "; std::cin >> w;
            if (w>0 && w <= a->balance) { a->balance -= w; std::cout << "Withdrawn.\n"; }
            else std::cout << "Insufficient funds or invalid amount.\n";
        } else if (ch == 5) break;
        else std::cout << "Option not implemented.\n";
    }
    return true;
}

// Simple SHA-256 using OpenSSL
std::string Bank::hash_password(const std::string &s) {
    unsigned char hash[SHA256_DIGEST_LENGTH];
    SHA256((unsigned char*)s.c_str(), s.size(), hash);
    std::stringstream ss;
    for (int i=0;i<SHA256_DIGEST_LENGTH;i++) ss << std::hex << std::setw(2) << std::setfill('0') << (int)hash[i];
    return ss.str();
}
