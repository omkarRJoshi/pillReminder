CREATE USER 'pillReminderApp'@'localhost' IDENTIFIED BY 'pillReminder';

GRANT ALL PRIVILEGES ON * . * TO 'pillReminderApp'@'localhost';

FLUSH PRIVILEGES;