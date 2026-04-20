const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

// 数据库连接池
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 测试接口
app.get('/', (req, res) => {
  res.send('校企双导师实习培训管理系统 后端启动成功！');
});

// 注册接口
app.post('/api/register', async (req, res) => {
  const { username, password, role, realName } = req.body;
  try {
    // 检查账号是否存在
    const [rows] = await pool.query('SELECT * FROM t_user WHERE username = ?', [username]);
    if (rows.length > 0) {
      return res.json({ code: 400, msg: '账号已存在' });
    }
    // 密码加密
    const hashedPwd = await bcrypt.hash(password, 10);
    // 插入用户
    await pool.query(
      'INSERT INTO t_user (username, password, role, real_name) VALUES (?, ?, ?, ?)',
      [username, hashedPwd, role, realName]
    );
    res.json({ code: 200, msg: '注册成功' });
  } catch (e) {
    res.status(500).json({ code: 500, msg: '注册失败', error: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('后端已启动：http://localhost:' + PORT);
});