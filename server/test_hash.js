const bcrypt = require('bcryptjs');

const hash = '$2a$10$kIGx8fYFpKrY2zqOjZZKZeZlMVE5XJKH1n5Vv7yWG0VvXOZQXqWG';

async function test() {
  const match1 = await bcrypt.compare('admin123', hash);
  console.log('Matches admin123?', match1);
  const match2 = await bcrypt.compare('password', hash);
  console.log('Matches password?', match2);
  const match3 = await bcrypt.compare('123456', hash);
  console.log('Matches 123456?', match3);
}

test();
