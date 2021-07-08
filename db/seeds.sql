INSERT INTO department
    (name)
VALUES
('Marketing'),
('Engineering'),
('Sales');

INSERT INTO roles
    (title, salary, department_id)
VALUES
('Social Media Manager', 100, 1),
('Engineer', 400, 2),
('Cashier', 5, 3); 

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
('John', 'Snow', 1, NULL),
('Sam', 'Tulley', 1, 1),
('Sansa', 'Stark', 2, NULL),
('Theon', 'Greyjoy', 2, 3),
('Arya', 'Stark', 3, NULL),
('The', 'Hound', 3, 5);
