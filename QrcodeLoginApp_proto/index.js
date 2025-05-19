const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const path = require('path');
const connectDB = require('./database/connect_db');
const { getUserById } = require('./database/get_users_query');
const qrcode = require('qrcode');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/page', express.static(path.join(__dirname, 'page')));

// セッション設定
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1時間
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'page', 'login.html'));
});

app.post('/login', async (req, res) => {
  const { id, password } = req.body;
  try {
    const user = await getUserById(id);

    // ソルトの生成
    const saltRounds = 10;  // ソルトのコストファクター
    const salt = bcryptjs.genSaltSync(saltRounds);
    const hashedPassword = bcryptjs.hashSync(user.password, salt);
    
    if (user !== null && await bcryptjs.compare(password, hashedPassword)) {
      const token = jwt.sign({ id: parseInt(user.id) }, process.env.JWT_SECRET, { expiresIn: '1h' });
      req.session.token = token;
      console.log(`Login successful for user: ${user.id}, redirecting to /page/qrcode`);
      res.redirect(`/qrcode?token=${token}`);
    } else {
      console.log(`Invalid credentials for user ID: ${id}`);
      res.status(401).send('Invalid credentials');
    }
  } catch (err) {
    console.error('Error during login: ', err.message);
    res.status(500).send('Error: ' + err.message);
  }
});

app.get('/qrcode', async (req, res) => {
  const token = req.session.token;
  if (!token) {
    console.log('No token in session, redirecting to login');
    return res.redirect('/');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token verified, user ID:', decoded.id);

    const user = await getUserById(decoded.id);
    if (!user) {
      console.log('User not found, redirecting to login');
      return res.redirect('/');
    }

    const expiration = Math.floor(Date.now() / 1000) + (60 * 60);
    const data = `${user.id}|${expiration}`;
    const salt = process.env.SALT;
    const hash = bcryptjs.hashSync(data, parseInt(salt, 10));
    const qrData = `${data}|${hash}`;
    const qrcodeImage = await qrcode.toDataURL(qrData);
    
    const qrPageUrl = `/page/qrcode.html?name=${encodeURIComponent(user.name)}&qr=${encodeURIComponent(qrcodeImage)}&token=${token}`;
    console.log('Redirecting to QR page:', qrPageUrl);
    res.redirect(qrPageUrl);
  } catch (err) {
    console.error('Error during token verification or QR code generation: ', err.message);
    res.status(500).send('Error: ' + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
