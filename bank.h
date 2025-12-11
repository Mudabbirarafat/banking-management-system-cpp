#pragma once
#include <string>
#include <vector>

struct Account {
    int id;
    std::string name;
    std::string password_hash;
    double balance;
};

class Bank {
    std::string dbfile;
    std::vector<Account> accounts;
    int next_id;
public:
    Bank(const std::string &dbfile);
    void load();
    void save();
    void create_account();
    bool login_menu();
private:
    Account* find_account_by_id(int id);
    Account* authenticate(int id, const std::string &password);
    static std::string hash_password(const std::string &s);
};
