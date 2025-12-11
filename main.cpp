#include "bank.h"
#include <iostream>
using namespace std;

int main() {
    Bank bank("data/accounts.csv");
    bank.load();

    int choice;
    while (true) {
        cout << "\n=== Simple Banking System ===\n";
        cout << "1. Create account\n2. Login\n3. Exit\nChoice: ";
        if(!(cin >> choice)) break;
        if (choice == 1) {
            bank.create_account();
        } else if (choice == 2) {
            if (bank.login_menu()) {
                // logged in and handled inside
            }
        } else break;
    }

    bank.save();
    cout << "Goodbye.\n";
    return 0;
}
