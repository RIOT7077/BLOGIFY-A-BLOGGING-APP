# 📝 Blogify - MERN Stack Blogging Platform

Blogify is a full-stack blogging application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to create, publish, edit, and delete blogs with features like user authentication, comment management, publishing/unpublishing blogs, and admin control for approving/disapproving comments. The project demonstrates scalable web development practices and clean UI design.

## 🚀 Features

🔐 User Authentication – Secure login and signup functionality.

📝 Create & Manage Blogs – Add, edit, publish, and unpublish blogs.

💬 Comment System – Users can post comments; admins can approve or disapprove them.

👤 Profile Management – Personalized dashboard for managing blogs.

🎨 Responsive UI – Built with React for smooth and modern user experience.

🌐 REST API – Node.js and Express.js power the backend with clean API endpoints.

🗄️ Database – MongoDB for efficient and scalable data storage.

## 🛠️ Tech Stack

Frontend: React.js, React Router, Axios

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ORM)

Authentication: JSON Web Tokens (JWT), bcrypt.js

Styling: CSS / Tailwind

##  ⚙️ Installation & Setup

## #Clone the repository:

git clone https://github.com/RIOT7077/BLOGIFY-A-BLOGGING-APP.git
cd blogify


### Install dependencies for both frontend & backend:

cd server
npm install
cd ../client
npm install


Set up your .env file in the backend with:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000


Run the backend:

cd server
npm start


Run the frontend:

cd client
npm start

### 📌 How to Use

Register or login to your account.

Create a new blog and choose to publish/unpublish.

Interact with other blogs by reading and commenting.

Admin can approve/disapprove comments to maintain quality.

### 📊 Project Flow

User → Register/Login → Create/Read Blogs → Comment → Manage Profile

Admin → Approve/Disapprove Comments → Manage Blogs


### 📚 References

Horstmann, C. S., & Cornell, G. – Core Java Volume I

Sommerville, I. – Software Engineering (10th Edition)

Norman, D. A. – The Design of Everyday Things

ProCodrr, CodeWithHarry, Sheriyans Coding School tutorials

### Keywords

MERN, Blog App, Blogging Platform, React, Node.js, MongoDB, Express, Full Stack, Authentication, REST API, Web Development

✨ This project showcases modern full-stack development and can be extended further with features like categories, likes, image uploads, and rich-text editor.
