

<h2 align="center"> 📝 Blocq – The Modern Blog App </h2>

<h4 align="center">
  A real-time blogging platform built with React, Firebase, Tailwind CSS, and Google Authentication.
</h4>

<p align="center">
  <img src="blocq-app/src/assets
/blocq-preview.gif" alt="Blocq App Preview" width="80%">
</p>


---

## 📖 About the Project

**Blocq** is a modern, responsive, and fully functional blogging application.  
Anyone can browse and read blogs freely. Authenticated users (via Google Sign-In) gain full control over their own posts — including creating, editing, and deleting.

The app uses **Firebase Firestore** as a real-time database, **Firebase Authentication** for secure login, and **React + Tailwind CSS** for a clean and dynamic UI.

---

## 🛠️ Built With

This project uses the following technologies:

- **React (Vite)** — frontend framework  
- **Tailwind CSS + Custom CSS** — styling  
- **Firebase Firestore** — real-time NoSQL database  
- **Firebase Authentication (Google)** — secure login  
- **React Router DOM** — navigation  
- **React Hook Form** — form handling  
- **React Icons** — icons  

---

## ✨ Features

- **Public Blog Access**  
  Anyone can view all published blog posts without logging in.

- **Google Authentication**  
  Secure login using Firebase’s Google Sign-In.

- **Full CRUD for Authors**  
  Authenticated users can create new posts, edit existing ones, and delete their own posts.

- **Author Metadata**  
  Each post stores:
  - author name  
  - email  
  - profile photo  

- **Real-time Updates**  
  Firestore `onSnapshot()` ensures posts update instantly without refreshing.

- **Server Timestamps**  
  Accurate date & time using `serverTimestamp()`.

- **Dark / Light Theme Toggle**  
  Stores user preference using `localStorage`.

- **Fully Responsive UI**  
  Optimized for desktop, tablet, and mobile.

- **Image Handling**  
  Optional image URL per post — invalid URLs are automatically hidden.

---
