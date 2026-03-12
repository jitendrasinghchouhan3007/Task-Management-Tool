# Task Manager Application

## Project Overview

This is a Task Manager web application built using React and Vite.
The application allows users to create, delete, and manage tasks with status tracking (Pending / Completed).
User authentication is required before accessing the dashboard.

---

# How to Run the Project

1. Clone the repository

```
git clone https://github.com/YOUR_USERNAME/task-manager.git
```

2. Navigate into the project folder

```
cd task-manager
```

3. Install dependencies

```
npm install
```

4. Run the development server

```
npm run dev
```

5. Open the application in the browser

```
http://localhost:5173
```

---

# AI Prompts Used

Some UI and structural assistance was taken from AI tools.

Example prompts used:

* "Create a React dashboard layout with sidebar and task list."
* "Create a task table UI with CSS."
* "Add toggle functionality for task status in React."
* "Design a sidebar with dropdown logout menu using React and Tailwind."

---

# What AI Generated vs What Was Modified

### AI Generated

* Initial UI layout suggestions
* Modal structure for task creation


### Modified / Implemented by Me

* Task CRUD logic
* Sidebar structure
* Task table UI
* Task filtering system
* Task status toggle functionality
* LocalStorage integration
* Dashboard task count logic
* Some Tailwind styling suggestions
* Component structure and state handling
* UI adjustments and styling improvements

---

# API Design (Non-AI Generated)

Since this project runs locally without a backend database, the task data is stored using LocalStorage.

Task Object Structure:

```
{
  id: number,
  name: string,
  status: "Pending" | "Completed",
  created_at: string
}
```

Operations performed:

Create Task
Adds a new task object to the tasks array.

Delete Task
Removes a task using the task id.

Update Task Status
Changes status between Pending and Completed.

Get Tasks
Retrieve tasks from LocalStorage.

---

# State Management (Non-AI Generated)

State is managed using React hooks.

Main states used:

* tasks → stores all tasks
* filterStatus → handles task filtering
* showCreateModal → controls task creation modal
* showDeleteModal → controls delete confirmation modal
* taskName → stores new task input

The tasks state is synchronized with LocalStorage so that tasks persist after page refresh.

---

# Technologies Used

* React
* Vite
* Tailwind CSS
* React Router
* Lucide Icons
* Framer Motion

---
# *Author*

* Jitendra Singh Chouhan (jitendra, jsinghchouhan971@gmail.com)
  - [LinkedIn](https://www.linkedin.com/in/jitendra-singh-chouhan-309560316/)
