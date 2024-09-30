# Velaio Project

Welcome to the **Velaio Project**, a task management application designed to create, edit, and manage tasks, including detailed information about people assigned to tasks, their skills, and deadlines. The project follows best practices in Angular development to keep the code modular, reusable, and well-organized.

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Usage](#usage)
- [Components Overview](#components-overview)
  - [BaseTaskFormComponent](#basetaskformcomponent)
  - [TaskFormComponent](#taskformcomponent)
  - [EditTaskPageComponent](#edittaskpagecomponent)
- [Folder Structure](#folder-structure)


## About the Project

**Velaio Project** is a web-based task management application developed using Angular 16. The application allows users to create and edit tasks with assigned people and their respective skills. The main focus of this project is on reusable components, clean architecture, and an efficient form structure, aiming to minimize code duplication and provide a great user experience.

## Features

- **Add/Edit Tasks**: Create and manage tasks with deadlines.
- **Assign People**: Assign people to each task, including their skills.
- **Responsive Design**: A mobile-first approach to ensure a seamless experience across devices.
- **Reusable Components**: Leverage reusable components such as `BaseTaskFormComponent` to reduce code repetition.
- **Validation**: Ensure that form inputs are validated with clear error messages.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed:

- **Node.js**: Version 18.13.0
- **npm**: Comes with Node.js
- **Angular CLI**: Version 16

You can install Node.js from [Node.js official website](https://nodejs.org/).

### Installation

1. **Clone the Repository**:

   ```sh
   git clone https://github.com/mccastrillon12/velaioProject.git
2. **Navigate to the Project Directory**:

   ```sh
   cd velaioProject

3. **Install Dependencies**:

   ```sh
   npm install
4. **Install Angular CLI (if not already installed)**:

   ```sh
   npm install -g @angular/cli@16
### Running the Project

To start the Angular development server, run:

```sh
   ng serve
   The project should now be running at [http://localhost:4200/](http://localhost:4200/).

### Usage

    Once the development server is running, you can:

    - **Create a New Task** by navigating to the "Add New Task" section.
    - **View All Tasks** to see existing tasks.
    - **Edit or Delete a Task** by using the respective buttons.
    - The UI is responsive, ensuring good usability across both mobile and desktop devices.

### Components Overview

#### BaseTaskFormComponent
    `BaseTaskFormComponent` is the foundation of our task form structure. It is a reusable component that includes all the common logic for task forms, such as adding/removing people, validating duplicate names, and managing skills.

#### TaskFormComponent
`TaskFormComponent` is used for creating new tasks. It uses `BaseTaskFormComponent` for its form logic and adds specific functionalities related to task creation.

#### EditTaskPageComponent
`EditTaskPageComponent` is used for editing existing tasks. It also uses `BaseTaskFormComponent` and provides additional features like loading existing data and allowing task completion.

### Folder Structure
Here is a quick overview of the project's folder structure:
velaioProject/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── task-filter/
│   │   │   │   ├── task-filter.component.ts
│   │   │   │   ├── task-filter.component.html
│   │   │   ├── person-form/
│   │   │   │   ├── person-form.component.ts
│   │   │   │   ├── person-form.component.html
│   │   │   ├── task-form/
│   │   │   │   ├── task-form.component.ts
│   │   │   │   ├── task-form.component.html
│   │   │   ├── task-list/
│   │   │   │   ├── task-list.component.ts
│   │   │   │   ├── task-list.component.html
│   │   ├── pages/
│   │   │   ├── task-create/
│   │   │   │   ├── task-create.component.ts
│   │   │   │   ├── task-create.component.html
│   │   │   ├── edit-task-page/
│   │   │   │   ├── edit-task-page.component.ts
│   │   │   │   ├── edit-task-page.component.html
│   │   │   ├── home-page/
│   │   │   │   ├── home-page.component.ts
│   │   │   │   ├── home-page.component.html
│   │   │   ├── task-list-page/
│   │   │   │   ├── task-list-page.component.ts
│   │   │   │   ├── task-list-page.component.html
│   ├── assets/
│   │   ├── images/
│   │   │   ├── task.png
│   │   │   ├── delete.png
│   │   │   ├── go-back.png
│   │   │   ├── home.png
│   │   │   ├── edit.png






