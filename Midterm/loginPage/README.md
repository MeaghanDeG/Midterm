Project Overview
Nota Bene is a note-taking web application that allows users to create, edit, and manage notes securely. It provides authentication mechanisms, enabling users to register, log in, and reset their passwords. The application uses MongoDB for data storage and integrates with third-party services like Google, Facebook, and Apple for authentication.

Features
User Authentication: Secure sign-up, log-in, and password reset functionalities.
Social Media Login: Users can log in using Google, Facebook, or Apple accounts.
Note Management: Users can create, edit, and delete notes.
Responsive Design: Optimized for use on both desktop and mobile devices.

Technologies Used

Frontend:
HTML, CSS, JavaScript
Responsive design using CSS Grid and Flexbox
AJAX for dynamic content loading

Backend:
Node.js, Express.js
MongoDB with Mongoose for data modeling
Passport.js for authentication

Environment Management:
dotenv for managing environment variables
nodemon for auto-restarting the server during development

Installation
To set up the project locally, follow these steps:

Prerequisites
Node.js installed (version 14.x or later)
MongoDB installed locally or access to a MongoDB Atlas cluster
Git installed (optional, for cloning the repository)

Steps

Clone the Repository:


git clone https://github.com/meaghandegroot/nota-bene.git
cd nota-bene

Install Dependencies:

npm install

Create a .env File: Create a .env file in the root directory with the following variables:


MONGO_URI=mongodb+srv://midterm:project@atlascluster.8h0fn.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster
SESSION_SECRET=your-secret-key

Run the Application:
npm run dev

This will start the server at http://localhost:3001.

File Structure


├── public
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── controllers
│   └── authController.js
├── models
│   └── User.js
├── routes
│   └── auth.js
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
Usage
Accessing the Application
Open your web browser and go to http://localhost:3001/public/index.html.
You will be greeted with a login page where you can either log in or create a new account.
Social Media Login
You can log in using Google, Facebook, or Apple by clicking on the corresponding buttons on the login page.
Note Management
After logging in, you can access the note management features where you can create, edit, and delete notes.



This project is licensed under the MIT License.


# midtermProject
