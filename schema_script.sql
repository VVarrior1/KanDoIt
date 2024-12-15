-- SQL Table Creation (Scheema script):

-- Create Users Table
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    phoneNum VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    roleType VARCHAR(50) CHECK (roleType IN ('Manager', 'Employee', 'Admin')) NOT NULL
);

-- Create Projects Table
CREATE TABLE Projects (
    project_id INT PRIMARY KEY AUTO_INCREMENT,
    projectName VARCHAR(255) NOT NULL,
    manager_id INT NOT NULL,
    hasFile BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (manager_id) REFERENCES Users(user_id) ON DELETE SET NULL
);

-- Create Tasks Table
CREATE TABLE Tasks (
    task_id INT PRIMARY KEY AUTO_INCREMENT,
    taskName VARCHAR(255) NOT NULL,
    dueDate DATE,
    taskProgress BOOLEAN DEFAULT FALSE,
    taskPriority VARCHAR(50) CHECK (taskPriority IN ('low', 'medium', 'high') OR taskPriority IS NULL)
    taskType VARCHAR(50),
    project_id INT NOT NULL,
    employee_id INT NOT NULL,
    FOREIGN KEY (project_id) REFERENCES Projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES Users(user_id) ON DELETE SET NULL
);

-- Create Comments Table
CREATE TABLE Comments (
    comment_id INT PRIMARY KEY AUTO_INCREMENT,
    task_id INT NOT NULL,
    project_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    message TEXT,
    FOREIGN KEY (task_id) REFERENCES Tasks(task_id) ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES Projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

