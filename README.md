# 📝 Blocq – The Modern Blog App

<h4 align="center">
  A real-time blogging platform built with React, Firebase, Tailwind, and Google Authentication.
</h4>

<p align="center">
  <img src="/src/assets/blocq-preview.gif" alt="Blocq App Preview" width="80%">
</p>

---

## 📖 About The Project

Blocq is a modern, clean, and fully functional blogging application. It allows anyone to browse and read blogs without logging in. Authenticated users (via Google Sign-In) gain CRUD (Create, Read, Update, Delete) privileges for their own posts.

The project uses Firebase Firestore for a real-time database and React with Tailwind CSS for a polished, responsive user interface.

---

## 🛠️ Built With

This project was built using the following technologies:

* **Frontend:** React (Vite)
* **Styling:** Tailwind CSS & Custom CSS
* **Backend & Database:** Firebase (Firestore)
* **Authentication:** Firebase Authentication (Google)
* **Routing:** React Router DOM
* **Form Management:** React Hook Form
* **Icons:** React Icons

---

## ✨ Features

* **Public Access:** Anyone can read blog posts without an account.
* **Authentication:** Secure Google Sign-In for users.
* **CRUD Operations:** Authenticated users can **C**reate, **E**dit, and **D**elete their *own* posts.
* **Author Details:** Every post stores and displays the author's name, email, and profile picture.
* **Real-time Data:** Uses Firestore `onSnapshot()` to update posts live without a page refresh.
* **Timestamps:** Automatically adds server-side timestamps for accurate post dates.
* **Theme Toggle:** Dark / Light mode toggle with user preference saved in `localStorage`.
* **Responsive Design:** Fully responsive layout for all device sizes.
* **Image Handling:** Supports optional blog images (gracefully handles missing or invalid URLs).
