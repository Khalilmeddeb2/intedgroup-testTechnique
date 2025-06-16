# 📘 Documentation Technique  
**Projet : Plateforme de Blog Collaboratif (MEAN Stack)**  
**Test technique - IntedGroup**

---

## 🧩 Introduction

Ce projet est une plateforme de blog collaboratif multi-auteurs développée avec le stack **MEAN** (MongoDB, Express.js, Angular, Node.js).  
Elle permet à différents types d’utilisateurs (Admin, Éditeur, Rédacteur, Lecteur) de créer, modifier, commenter et gérer des articles avec des permissions dynamiques.

---

## 🗂️ Structure générale du projet

intedgroup-blog/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── services/
│ ├── routes/
│ ├── middlewares/
│ └── app.js
├── frontend/
│ └── src/app/
│ ├── _guards/
│ ├── _services/
│ ├── components/
│ │ ├── login/
│ │ ├── signup/
│ ├── template/
│ │ ├── articles/
│ │ ├── accueil/
│ │ └── roles/
│ └── app.module.ts

---

## 🛠️ Partie Back-End

### 🔧 Stack : Node.js, Express.js, MongoDB, Mongoose

### 📁 Structure

backend/
├── controllers/
│ ├── authController.js
│ ├── userController.js
│ ├── articleController.js
│ ├── commentController.js
│ └── roleController.js
├── models/
│ ├── User.js
│ ├── Role.js
│ ├── Article.js
│ └── Comment.js
├── services/
│ ├── authService.js
│ ├── userService.js
│ ├── roleService.js
│ ├── articleService.js
│ └── commentService.js
├── routes/
│ ├── auth.routes.js
│ ├── users.routes.js
│ ├── roles.routes.js
│ ├── articles.routes.js
│ └── comments.routes.js
├── middlewares/
│ ├── articlePermissions.js
│ ├── auth.js
│ └── multerStorage.js
└── app.js


### 🔐 Fonctionnalités principales

1. **Authentification et gestion des rôles**
   - Système de rôles (Admin, Éditeur, Rédacteur, Lecteur)
   - JWT + Refresh Token pour sécuriser les sessions
   - Hashage des mots de passe avec bcrypt
   - Middleware de vérification des permissions basé sur les rôles

2. **Gestion des utilisateurs**
   - CRUD utilisateurs (admins peuvent gérer les rôles)
   - Attribution dynamique des rôles

3. **Gestion des articles**
   - CRUD articles avec contrôle des permissions (création, modification, suppression)
   - Upload et gestion d’images associées
   - Ajout d’étiquettes (tags)

4. **Gestion des commentaires en temps réel**
   - Stockage dans MongoDB
   - Support des commentaires imbriqués (réponses)
   - Notification en temps réel via Socket.io à l’auteur de l’article

5. **Sécurité avancée**
   - Rate limiting sur API
   - CORS configuré
   - Protection des données sensibles

---

## 💻 Partie Front-End

### 🔧 Stack : Angular 9

### 📁 Structure

frontend/
├── src/
│ ├── app/
│ │ ├── _guards/
│ │ │ └── auth.guard.ts, role.guard.ts ...
│ │ ├── _services/
│ │ │ └── auth.service.ts, article.service.ts, comment.service.ts, role.service.ts ...
│ │ ├── components/
│ │ │ ├── login/
│ │ │ ├── signup/
│ │ ├── template/
│ │ │ ├── articles/
│ │ │ ├── accueil/
│ │ │ └── roles/
│ │ └── app.module.ts


### 🎯 Fonctionnalités principales

1. **Authentification / Inscription**
   - Composants `login` et `signup`
   - Formulaires réactifs avec validation (Angular Reactive Forms)
   - Stockage sécurisé des tokens (JWT + refresh token) dans `localStorage`
   - Guards pour protéger les routes sensibles selon rôles

2. **Gestion des articles**
   - Pages pour afficher, créer, modifier les articles
   - Intégration de l’upload d’image
   - Filtrage par tags
   - Affichage conditionnel selon permissions utilisateurs

3. **Gestion des commentaires temps réel**
   - Intégration Socket.io client pour afficher les commentaires en direct
   - Support des réponses imbriquées
   - Notification visuelle à l’auteur

4. **Gestion des rôles (admin)**
   - Pages pour gérer les rôles des utilisateurs
   - Interface d’administration accessible uniquement aux admins

---

## 📦 Installation & Lancement

### 🔹 Prérequis
- Node.js (v14)
- MongoDB (local)
- Angular CLI (v9)

### 🔧 Backend && front 

```bash
cd backend
npm install
npm run dev

cd frontend
npm install
ng serve







