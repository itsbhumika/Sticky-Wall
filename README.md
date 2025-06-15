# 🧱 Sticky Wall — Task Management App

Sticky Wall is a colorful, interactive React-based task management app that helps you visually organize tasks using sticky notes. It supports dark/light themes, task filtering, and saves everything locally.

---

## ✨ Features

- 📌 Add/delete sticky notes
- ✏️ Editable titles and tasks (double-click to edit)
- ✅ Mark tasks as complete or pending
- 🎨 Pick different colors for notes
- 🌓 Dark/Light theme toggle
- 🔄 Undo delete (tasks & notes)
- 🧹 Filter tasks (All / Pending / Done)
- 💾 LocalStorage persistence
- 🖥️ Responsive layout

---

## 📦 Installation

```bash
git clone https://github.com/your-username/sticky-wall.git
cd sticky-wall
npm install
npm start
````

---

## 🧪 Manual Testing Guide

You can manually test features by following these actions:

| Feature          | Action                                                   |
| ---------------- | -------------------------------------------------------- |
| ➕ Add Note       | Click the floating `+` button, pick a color, and confirm |
| 📝 Edit Title    | Double-click the note's title                            |
| ➕ Add Task       | Click `➕ Add Task` inside the note                       |
| ✅ Toggle Task    | Check/uncheck the task's checkbox                        |
| ❌ Delete Task    | Click the ❌ button next to the task                      |
| 🗑️ Delete Note  | Click the 🗑️ button on the top right of the note        |
| ↩️ Undo Delete   | Click the ↩️ button after deleting a task or note        |
| 🌗 Toggle Theme  | Click the 🌙 or ☀️ button on the top right               |
| 🗂️ Filter Tasks | Use "All", "Pending", "Done" buttons inside the note     |

---

## Sidebar 
The left sidebar helps organize and navigate your notes more efficiently:

- 🔍 **Search Bar**: Type and press `Enter` to highlight matching tasks across all notes.
- **Tasks Section**:
  - ⏳ Upcoming — placeholder for future deadline-based filters
  - 🕑 Today — placeholder for daily task filters
  - 🗓️ Calendar — placeholder for calendar integration
- **Category Section**:
  - Personal & Work tags for organizing types of notes
- **Footer Menu**:
  - Settings (planned)
  - Log Out (UI placeholder only)

> ⚠️ Note: The sidebar sections are mostly static now but are designed for easy extension.

---

## 🧱 Project Structure

```
sticky-wall/
├── public/
│   ├── paper6-01.jpg
│   └── dark-bg.jpg
├── src/
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

---

## 🛠️ Built With

* ⚛️ React (with Hooks)
* 🎨 CSS (custom-styled, responsive)
* 🌐 HTML5
* 🧠 LocalStorage API

---

## 🙏 Acknowledgements

* Emoji icons from Unicode
* Note board inspiration from productivity tools like Trello, Google Keep

---

## 🔮 Future Scope

The Sticky Wall app is built with scalability in mind. Some planned and potential enhancements include:

📆 Calendar Integration: Link notes to dates and deadlines

⏰ Reminders & Notifications: Alert users for upcoming tasks

🧠 Drag-and-Drop Notes: Rearranging sticky notes dynamically

🔐 User Authentication: Enable login and secure multi-user access

☁️ Cloud Sync: Save notes to a backend or cloud storage

📱 Mobile App Version: Using React Native or PWA for phones

🔍 Advanced Search Filters: Search by category, date, or tag

🧾 Rich Text Tasks: Add descriptions, subtasks, or attachments

---

###  *"Stick your thoughts where they belong — on your Sticky Wall!"*

---

## Author

Bhumika
