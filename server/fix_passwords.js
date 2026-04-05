require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function fixPasswords() {
  try {
    // Generate real hashes
    const adminHash = await bcrypt.hash('admin123', 10);
    const userHash = await bcrypt.hash('password123', 10);

    console.log('Connecting to db...');
    const conn = await mysql.createConnection(process.env.DATABASE_URL);
    
    console.log('Updating admin password...');
    await conn.query('UPDATE users SET password = ? WHERE role = ?', [adminHash, 'admin']);
    
    console.log('Updating regular users password...');
    await conn.query('UPDATE users SET password = ? WHERE role = ?', [userHash, 'user']);
    
    console.log('Done! All fixed.');
    conn.end();
  } catch(e) {
    console.error(e);
  }
}

fixPasswords();
