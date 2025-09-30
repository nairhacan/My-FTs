
---
<!-- Logo Section -->
<p align="center">
   <img src="/public/Img/Electron.png" alt="Electron JS" width="150"/>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/2560px-Node.js_logo.svg.png" alt="Node JS" width="150"/>
</p>


# MyFTs - Global Architecture & Folder Structure For Development Deckop apps

## Introduction
MyFTs is a modular Electron framework specifically designed to simplify the development of desktop applications with an organized, secure, and scalable structure. It was developed using Electron JS in 2025 by Kina SaQina, with the primary goal of providing a solid foundation for developers to build modern desktop applications without having to start from scratch.

Some of MyFTs' key goals and features include:

**Simplifying desktop app development**
By providing a modular framework, developers can focus on application logic and features without having to worry about folder structures, IPC flows, or database integration from scratch. Using Electron JS as a foundation
Electron enables desktop applications to run on Windows, macOS, and Linux, using web technologies (HTML, CSS, JS). MyFTs leverages these advantages to create a consistent and modern desktop experience.

**Modular & MVC Architecture**
This framework clearly separates the frontend, backend, and database. The frontend uses reusable components, while the backend uses controller-model-service, making maintenance and new feature development easier.
**Security & Controlled IPC**
Preload.js is used as a **secure bridge** between the renderer and the main process, ensuring communication between processes remains secure and controlled.
**Flexibility for Global Developers**
MyFTs' folder structure and architecture can be used in various types of desktop CRUD applications, facilitating cross-project development and team collaboration.
**Focus on scalability and maintainability**
With best practices such as the use of migration scripts, reusable services, and a component-based frontend, MyFTs is designed to grow with application needs.
**Brief History:**
Developed in **2025**, MyFTs was born from Kina SaQina's experience building complex desktop applications. This framework combines the best of **Electron, MVC, and modular design**, making it the ideal foundation for building modern desktop applications quickly and securely.


## Table of Contents

1. Overview
2. Project Root Files
3. Frontend Folder Structure
4. Backend Folder Structure
5. Database Folder
6. Scripts Folder
7. Public Assets
8. Application Flow
9. IPC & Security
10. Modularity & Componentization
11. Example CRUD Flow
12. Recommended Workflow
13. Contribution Guidelines
14. Best Practices & Notes
15. Conclusion

---

## 1. Overview & Started Electron

**MyFTs** is a modular **Electron CRUD framework** designed for scalability, cross-platform deployment, and global usage. It combines **Electron** for the desktop environment, **MVC architecture** for code organization, and **SQLite** (or other DBs) for lightweight database management.

The key objectives are:

* Separation of concerns for maintainability.
* Global architecture adaptable to any desktop CRUD application.
* Secure IPC communication between renderer and main processes.
* Reusable components for frontend flexibility.

This document explains **every folder, file, and interaction** with examples and best practices.

Before starting, make sure you have run this command in the terminal.

```
npm install --save-dev electron
```


To get started, you can use this command
```
npm run dev
```


---

## 2. Project Root Files

```
/MyFTs
├─ main.js
├─ preload.js
├─ package.json
├─ README.md
├─ .gitignore
```

**File Explanations:**

* **main.js** – Entry point of Electron app. Responsible for:

  * Creating `BrowserWindow`.
  * Loading frontend HTML.
  * Setting IPC handlers (`ipcMain.handle` and `ipcMain.on`) to communicate with frontend.
  * Handling app lifecycle events (`app.on('ready')`, `window-all-closed`, `activate`).

* **preload.js** – Secure bridge between renderer and main process.

  * Exposes limited APIs to renderer via `contextBridge`.
  * Prevents renderer from accessing Node directly.
  * Example:

```js
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('api', {
  fetchData: () => ipcRenderer.invoke('fetch-data')
});
```

* **package.json** – Holds dependencies, scripts, and metadata.
* **README.md** – Project documentation.
* **.gitignore** – Excludes `node_modules`, database files, and build artifacts from version control.

---

## 3. Frontend Folder Structure

```
frontend/
├─ index.html
├─ app.js
├─ styles/
│  └─ main.css
├─ components/
│  └─ modal.js
│  └─ card.js
```

* **index.html** – Base HTML for the app; includes component mounting points.
* **app.js** – Frontend logic including event listeners, DOM updates, and API calls via `window.api`.
* **styles/main.css** – Global styles, themes, responsive design.
* **components/** – Reusable components (cards, modals, tables, buttons).

  * Promotes modularity and reduces code duplication.
  * Example:

```js
export function createCard(title, content) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `<h3>${title}</h3><p>${content}</p>`;
  return card;
}
```

---

## 4. Backend Folder Structure

```
backend/
├─ controllers/
│  └─ dataController.js
├─ models/
│  └─ dataModel.js
├─ services/
│  └─ db.js
```

* **Controllers** – Receive requests from IPC and perform validation.
* **Models** – Responsible for CRUD operations with database abstraction.
* **Services** – Database connection management (SQLite, PostgreSQL, etc.) and utilities.

**Example CRUD Controller:**

```js
// dataController.js
const model = require('../models/dataModel');
exports.getAllRecords = async () => {
  return await model.fetchAll();
};
```

**Model Example:**

```js
// dataModel.js
const db = require('../services/db');
exports.fetchAll = async () => {
  const rows = await db.query('SELECT * FROM items');
  return rows;
};
```

---

## 5. Database Folder

```
database/
├─ myfts.db
├─ migrations/
│  └─ init.sql
```

* Contains database files and optional migration scripts.
* SQLite is recommended for lightweight apps.
* Migration scripts allow versioning DB schema.

---

## 6. Scripts Folder

```
scripts/
├─ init-db.js
```

* Scripts to initialize database, seed data, or perform maintenance.
* Example `init-db.js`:

```js
const db = require('../backend/services/db');
db.init().then(() => console.log('DB Initialized'));
```

---

## 7. Public Assets

```
public/
├─ images/
├─ fonts/
├─ icons/
```

* Static assets served by frontend.
* Avoid storing dynamic content here.

---

## 8. Application Flow

```
User Action -> Frontend (index.html + app.js)
             -> Preload API (window.api)
             -> Main IPC Handler (main.js)
             -> Controller (backend/controllers)
             -> Model (backend/models)
             -> Database (backend/services/db.js)
             -> Return Data
             -> Update UI
```

* Flow follows **MVC pattern** for clarity and separation of concerns.

---

## 9. IPC & Security

* Always use **preload.js + contextBridge** to expose limited APIs.
* Avoid using `nodeIntegration: true` in renderer.
* Use `ipcMain.handle` instead of `ipcMain.on` for **request-response** flows.

---

## 10. Modularity & Componentization

* **Frontend components** for UI: card, table, modal.
* **Backend services** for reusable DB logic.
* **Controllers** per entity for easy scaling.
* Example: Adding `UserController` and `UserModel` will not affect existing code.

---

## 11. Example CRUD Flow

1. **User clicks “Add Item”** → triggers frontend modal.
2. **app.js** sends `window.api.addItem(data)` → calls IPC.
3. **main.js** handler calls `itemController.add(data)`.
4. **Controller** validates and passes to model.
5. **Model** executes SQL insert.
6. Result returned via IPC → frontend updates table dynamically.

---

## 12. Recommended Workflow

1. Clone repo.
2. `npm install`.
3. Initialize DB: `node scripts/init-db.js`.
4. Run: `npm start`.
5. Extend frontend & backend as needed.

---

## 13. Contribution Guidelines

* Follow MVC structure.
* Write reusable components & services.
* Document new modules in README.
* Maintain modularity & separation of concerns.

---

## 14. Best Practices & Notes

* Always validate data in controllers.
* Use transactions for batch operations.
* Keep preload.js minimal & secure.
* Version database using migration scripts.
* Maintain clean folder hierarchy for global scaling.

---

## 15. Conclusion

This README provides **full global architecture** for Electron CRUD apps:

* Modular folder structure.
* Secure IPC with preload.js.
* Frontend componentization.
* Backend MVC architecture.
* Database management with migrations.
* Scalable and reusable across projects.

> Following this blueprint, developers can create **robust desktop applications** that are maintainable, extendable, and globally adaptable.


---

