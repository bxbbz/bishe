CREATE DATABASE IF NOT EXISTS internship;
USE internship;

-- 用户表：学生、校内导师、企业导师、管理员
CREATE TABLE t_user (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('student','school_mentor','enterprise_mentor','admin') NOT NULL,
  real_name VARCHAR(50) NOT NULL,
  student_no VARCHAR(20),
  staff_no VARCHAR(20),
  phone VARCHAR(20),
  create_time DATETIME DEFAULT NOW()
);

-- 实习课题表
CREATE TABLE t_project (
  project_id INT PRIMARY KEY AUTO_INCREMENT,
  project_code VARCHAR(30) UNIQUE NOT NULL,
  mentor_id INT NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  max_students INT NOT NULL,
  current_students INT DEFAULT 0,
  status ENUM('recruiting','ongoing','ended') DEFAULT 'recruiting',
  create_time DATETIME DEFAULT NOW()
);

-- 实习日志表
CREATE TABLE t_log (
  log_id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  project_id INT NOT NULL,
  title VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  submit_time DATETIME DEFAULT NOW()
);

-- 双导师评价表
CREATE TABLE t_assessment (
  assessment_id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  evaluator_id INT NOT NULL,
  evaluator_role ENUM('school','enterprise') NOT NULL,
  score DECIMAL(5,2),
  comment TEXT,
  evaluate_time DATETIME DEFAULT NOW()
);

-- 插入默认管理员账号
INSERT INTO t_user (username, password, role, real_name) 
VALUES ('admin', '123456', 'admin', '系统管理员');