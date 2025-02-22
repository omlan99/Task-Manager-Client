# Create the README.md file content

readme_content = """# 📝 Task Management Application

## Overview
The **Task Management Application** is a web-based tool that allows users to efficiently manage their tasks using a **drag-and-drop** interface. Users can create, edit, delete, and reorder tasks within three categories:  
✅ **To-Do**  
🔄 **In Progress**  
✔️ **Done**  

The app ensures **real-time synchronization** with a **MongoDB** database and provides a **clean, minimalistic, and fully responsive UI**.  

---

## 🚀 Live Demo  
🔗 **Frontend**: [Live Link](https://task-manager-auth-2ccfd.web.app)  
🔗 **Backend**: [Live API](#)  

---

## 📌 Features  

### 🔐 Authentication  
- **Google Sign-In** using Firebase Authentication  
- User details (ID, email, display name) are stored in the database upon first login  

### 📝 Task Management  
- Users can **add, edit, delete, and reorder** tasks  
- Tasks are categorized into:
  - **To-Do**  
  - **In Progress**  
  - **Done**  
- Drag-and-drop support for easy task reordering  
- Instant database updates to maintain task persistence  

### 💾 Database & Persistence  
- **MongoDB** (via Express.js server) for storing tasks  
- **Real-time updates** using:  
  - MongoDB **Change Streams**  
  - **WebSockets**  
  - Optimistic UI updates  
- Deleted tasks are **permanently removed** from the database  

### 🎨 Frontend UI  
- **Built with React (Vite.js)**
- Uses **react-beautiful-dnd** for smooth drag-and-drop interactions  
- **Modern, clean, and responsive** design  
- Uses a **4-color palette** to maintain simplicity  

### 📱 Responsiveness  
- Fully functional on **both desktop and mobile**  
- **Mobile-friendly drag-and-drop** experience  

### ⚙️ Backend (Express.js API)  
- **CRUD operations** for managing tasks  
- API Endpoints:  
  - `POST /tasks` – Add a new task  
  - `GET /tasks` – Retrieve all tasks for the logged-in user  
  - `PUT /tasks/:id` – Update a task (title, description, category)  
  - `DELETE /tasks/:id` – Remove a task  

### 🌟 Bonus Features (Optional)  
- **Dark mode toggle**  
- **Task due dates** with color indicators (e.g., overdue tasks in red)  
- **Activity log** (tracks task movements and updates)  

---

## 🛠️ Technologies Used  

### **Frontend**  
- React (Vite.js)  
- React Router  
- Firebase Authentication  
- Tailwind CSS / Styled Components (for styling)  
- react-beautiful-dnd (for drag-and-drop functionality)  

### **Backend**  
- Node.js  
- Express.js  
- MongoDB (with Mongoose ORM)  
- WebSockets (for real-time updates)  
- Firebase Authentication Middleware  

---

## 📦 Dependencies  

### **Frontend Dependencies**  
```json
"dependencies": {
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "vite": "^4.0.0",
  "firebase": "^10.0.0",
  "react-router-dom": "^6.0.0",
  "react-beautiful-dnd": "^13.0.0"
}
