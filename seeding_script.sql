-- SEEDING SCRIPT:

-- Insert more demo data into Users table
INSERT INTO Users (email, phoneNum, password, firstName, lastName, roleType)
VALUES 
    ('susan.lee@example.com', '567-890-1234', '123password', 'Susan', 'Lee', 'Employee'),
    ('michael.wong@example.com', '678-901-2345', '12345678', 'Michael', 'Wong', 'Manager'),
    ('bob.jones@example.com', '456-789-0123', 'password123', 'Bob', 'Jones', 'Admin'),
    ('david.martinez@example.com', '890-123-4567', 'password', 'David', 'Martinez', 'Employee');

-- Insert more demo data into Projects table
INSERT INTO Projects (projectName, manager_id, hasFile)
VALUES 
    ('E-commerce Platform', 2, TRUE),
    ('Cloud Infrastructure Setup', 2, FALSE),
    ('Machine Learning Model', 2, TRUE),
    ('CRM Software Development', 2, TRUE),
    ('Inventory Management System', 2, FALSE);

-- Insert more demo data into Tasks table
INSERT INTO Tasks (taskName, dueDate, taskProgress, taskPriority, taskType, project_id, employee_id)
VALUES 
    ('Frontend Framework Selection', '2024-11-20', TRUE, 'Medium', 'Research', 1, 4),
    ('Database Optimization', '2024-11-25', FALSE, 'High', 'Development', 4, 1),
    ('Containerization Setup', '2024-12-01', FALSE, 'High', 'Infrastructure', 2, 1),
    ('User Authentication', '2024-12-10', TRUE, 'High', 'Development', 3, 4),
    ('UI Prototyping', '2024-12-15', FALSE, 'Medium', 'Design', 1, 4),
    ('API Documentation', '2024-11-30', TRUE, 'Low', 'Documentation', 4, 4),
    ('Testing Algorithms', '2024-12-12', FALSE, 'Medium', 'Testing', 5, 1),
    ('Payment Gateway Integration', '2024-11-22', TRUE, 'High', 'Development', 1, 4),
    ('User Analytics', '2024-11-28', TRUE, 'Low', 'Data', 3, 1),
    ('Security Audit', '2024-12-05', TRUE, 'High', 'Audit', 2, 4);

-- Insert more demo data into Comments table
INSERT INTO Comments (task_id, project_id, user_id, created_at, message)
VALUES 
    (1, 1, 4, '2024-10-28 11:00:00', 'Evaluating different frameworks for UI.'),
    (2, 4, 8, '2024-10-29 14:30:00', 'Indexing improved query performance by 20%.'),
    (3, 2, 5, '2024-10-30 16:00:00', 'Basic containerization setup complete.'),
    (4, 3, 3, '2024-10-31 10:00:00', 'Auth module integrated with basic security checks.'),
    (5, 1, 2, '2024-11-01 09:45:00', 'First UI prototype version is live.'),
    (6, 4, 6, '2024-11-02 13:00:00', 'Initial draft of API docs completed.'),
    (7, 5, 7, '2024-11-03 15:30:00', 'Testing various algorithm edge cases.'),
    (8, 1, 4, '2024-11-04 11:20:00', 'Gateway integration facing timeout issues.'),
    (9, 3, 8, '2024-11-05 12:45:00', 'Implementing analytics for user demographics.'),
    (10, 2, 3, '2024-11-06 14:10:00', 'Scheduled audit review on critical security flows.');

