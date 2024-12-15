--before running the script make sure you update the lib\db.js file to contain the same MySQL data you have set up locally

USE kandoit_db;
CREATE TABLE Users (
	user_id INT PRIMARY KEY AUTO_INCREMENT,     
	email VARCHAR(255) NOT NULL UNIQUE,     
	phoneNum VARCHAR(20) NOT NULL UNIQUE,     
	password VARCHAR(255) NOT NULL,     
	firstName VARCHAR(50) NOT NULL,     
	lastName VARCHAR(50) NOT NULL,     
	roleType VARCHAR(50) CHECK (roleType IN ('Manager', 'Employee', 'Admin')) NOT NULL );
CREATE TABLE Projects (
	project_id INT PRIMARY KEY AUTO_INCREMENT,     
	projectName VARCHAR(255) NOT NULL,     
	manager_id INT NOT NULL,     
	hasFile BOOLEAN DEFAULT FALSE,     
	FOREIGN KEY (manager_id) REFERENCES Users(user_id) ON DELETE CASCADE );
CREATE TABLE Tasks (
	task_id INT PRIMARY KEY AUTO_INCREMENT,     
    taskName VARCHAR(255) NOT NULL,     
    dueDate DATE,     
    taskProgress BOOLEAN DEFAULT FALSE,     
    taskPriority VARCHAR(50) CHECK (taskPriority IN ('low', 'medium', 'high') OR taskPriority IS NULL),     
    taskType VARCHAR(50),     
    project_id INT,     
    employee_id INT NOT NULL,     
    FOREIGN KEY (project_id) REFERENCES Projects(project_id) ON DELETE SET NULL,     
    FOREIGN KEY (employee_id) REFERENCES Users(user_id) ON DELETE CASCADE );
CREATE TABLE Comments (
	comment_id INT PRIMARY KEY AUTO_INCREMENT,     
    task_id INT NOT NULL,     
    project_id INT NOT NULL,     
    user_id INT NOT NULL,     
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,     
    message TEXT,     
    FOREIGN KEY (task_id) REFERENCES Tasks(task_id) ON DELETE CASCADE,     
    FOREIGN KEY (project_id) REFERENCES Projects(project_id) ON DELETE CASCADE,     
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE );




INSERT INTO Users (email, phoneNum, password, firstName, lastName, roleType)
VALUES
('admin@example.com', '1234567890', 'adminpass', 'Admin', 'User', 'Admin'),
('manager1@example.com', '1111111111', 'managerpass1', 'Manager', 'One', 'Manager'),
('manager2@example.com', '2222222222', 'managerpass2', 'Manager', 'Two', 'Manager'),
('employee1@example.com', '3333333333', 'employeepass1', 'Employee', 'One', 'Employee'),
('employee2@example.com', '4444444444', 'employeepass2', 'Employee', 'Two', 'Employee');

INSERT INTO Projects (projectName, manager_id, hasFile)
VALUES
('Project Alpha', 2, false), -- Managed by Manager One
('Project Beta', 2, false),  -- Managed by Manager One
('Project Gamma', 3, false); -- Managed by Manager Two

INSERT INTO Tasks (taskName, dueDate, taskProgress, taskPriority, taskType, project_id, employee_id)
VALUES
('Task 1', '2024-12-15', false, 'high', 'Development', 1, 4), -- Assigned to Employee One
('Task 2', '2024-12-20', true, 'medium', 'Testing', 1, 5),   -- Assigned to Employee Two
('Task 3', '2024-12-25', false, 'low', 'Design', 2, 4),      -- Assigned to Employee One
('Task 4', '2024-12-30', false, 'medium', 'Documentation', 3, 5); -- Assigned to Employee Two
