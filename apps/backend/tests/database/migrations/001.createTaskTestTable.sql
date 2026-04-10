CREATE TABLE tasks(
    task_id UUID PRIMARY KEY, 
    task_title VARCHAR(25) NOT NULL, 
    task_content VARCHAR(100) NOT NULL, 
    task_state BOOLEAN NOT NULL DEFAULT FALSE,
    task_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    task_event_date TIMESTAMP, 
    task_priority VARCHAR(6) NOT NULL,
    user_id UUID,
    FOREIGN KEY (user_id) NOT NULL REFERENCES users ON DELETE CASCADE
    
)