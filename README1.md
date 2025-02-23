
# 🚀 SECURE NOTES AT FINGERTIPS  

## 📖 Table of Contents  
- 📌 What is Secure Notes? 
- 📥 Installation
- ⚙️ Working Mechanism
- 💻 Usage
- ✨ Features
- 📽️ Demo
- 📜 License 

---

## 📌 What is Secure Notes?  
Secure Notes are encrypted digital notes that store sensitive information, such as passwords, personal data, or confidential details. They use encryption (e.g., AES-256) to protect data from unauthorized access and often require authentication (password, biometrics, or multi-factor authentication) for access. Secure Notes are commonly found in password managers and secure storage apps.  

---

## 📥 Installation  
To install **Secure Notes**, follow these steps:  

1. **Clone the repository**  
   ```bash
   git clone https://github.com/hema-latha-reddy/Secure-Notes-at-fingertips
   ```  

2. **Navigate to the project directory**  
   ```bash
   cd prototype
   ```  

3. **Run the backend application first**  
   ```bash
   cd backend  
   npm start
   ```  

4. **Now execute the frontend application**  
   ```bash
   cd frontend  
   npm start
   ```  

---
## ⚙️ Working Mechanism
### **✅ User Authentication**  

The application includes a robust **user authentication system** to ensure that only authorized individuals can access their stored data. Users are required to sign up and log in using their credentials. The backend validates these credentials and generates a **JWT (JSON Web Token)**, which is stored in the frontend for session management.

### **✅ Secure Data Storage**  

Once authenticated, users can store passwords, links, and notes through the frontend interface. To maintain security:  

   - **The data is encrypted using AES-256 encryption before being transmitted to the backend.**  

   - **The encrypted data is then stored in MongoDB, ensuring that even if the database is compromised, the data remains unreadable without decryption.**

### **✅ Data Retrieval and Decryption**  

When a user wants to retrieve their stored notes:  

   - **The backend verifies the JWT token to confirm authentication.**  

   - **If valid, the encrypted data is fetched from the MongoDB database.**  

   - **The backend decrypts the data using AES-256 and sends the original content back to the frontend.**  

   - **The user can then view their decrypted passwords, links, or notes in the interface.**

### **✅ Technical Components**  

### **✅ Backend (Node.js, Express, MongoDB)**  

The backend is responsible for handling authentication, encryption, and data storage.  

   - **Authentication:** Handled via JWT tokens to maintain user sessions.  

   - **Encryption:** AES-256 encryption is used to secure sensitive data before storing it.  

   - **Database:** MongoDB is used to store the encrypted user data securely.  

The backend has different API routes for:  

   - **User authentication (`/api/auth`)** – Handles user login and signup.  

   - **Storing and retrieving encrypted data (`/api/links`, `/api/notes`, `/api/passwords`)** – Manages secure storage and retrieval of user data.
### **✅ Frontend (React)**  

The frontend provides a user-friendly interface where users can:  

   - **Sign up and log in** to access their secure notes.  

   - **Store new passwords, links, or notes**, which are encrypted before sending to the backend.  

   - **Retrieve and decrypt stored notes** upon authentication.  

The frontend ensures seamless interaction with the backend using **React Router** for navigation and **Axios** for API requests.
### **✅ Security Features**  

🔹 **AES-256 Encryption** – Ensures strong protection against data breaches.  

🔹 **JWT Authentication** – Prevents unauthorized access to user data.  

🔹 **CORS Implementation** – Secures communication between the frontend and backend.  

🔹 **Environment Variables (`.env`)** – Stores sensitive information like encryption keys securely.


## 💻 Usage  
When the execution of the frontend is done, it will directly navigate to:  
🔗 **[http://localhost:3000](http://localhost:3000)**. Start using it.  

---

## ✨ Features  
1. **User Authentication** – Login and signup functionality.  
2. **Password Protection** – Requires a password to access the notes.  
3. **End-to-End Encryption** – Encrypts notes on the client side before sending them to the server.  
4. **Secure Cloud Database** – Prevents unauthorized access to stored data.  
5. **Cross-Platform Support** – Making notes accessible from any device securely.  

---
## 📽️ Demo
Watch the demo video here:

https://drive.google.com/file/d/1BqYd1H2oJ2_Dp-ZCnOr6UKgNPh5jJvLU/view?usp=drivesdk

## 📜 License  
This project is licensed under the [MIT License](./LICENSE).
