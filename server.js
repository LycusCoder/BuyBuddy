import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const usersFile = path.join(__dirname, 'src', 'data', 'users.json');

const readUsers = () => {
  if (!fs.existsSync(usersFile)) return [];
  return JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
};

const writeUsers = (users) => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

app.post('/api/register', (req, res) => {
  const { email, name, password, nomorhp, alamat, avatar } = req.body;
  let users = readUsers();

  if (users.some(user => user.email === email)) {
    return res.status(400).json({ message: 'Email sudah terdaftar' });
  }

  const newUser = { name, email, password, nomorhp, alamat, avatar: avatar || `/images/default-avatar.png` };
  users.push(newUser);
  writeUsers(users);

  res.json({ message: 'Registrasi berhasil', user: newUser });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  let users = readUsers();

  const user = users.find(user => user.email === email && user.password === password);
  if (!user) return res.status(400).json({ message: 'Email atau password salah' });

  res.json({ message: 'Login berhasil', user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
