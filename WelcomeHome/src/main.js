// モジュール読み込み
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');

// 環境変数読み込み
dotenv.config();

// GETモジュール読み込み
const { get_top } = require('./app/top/get_top');
const { get_welcome } = require('./app/welcome/get_welcome');
const { get_settings } = require('./app/settings/get_settings');
const { get_board, get_drawing } = require('./app/board/get_board');
const { get_camera } = require('./app/camera/get_camera');
const { get_photo_frame } = require('./app/photo_frame/get_photo_frame');
const { get_photo_upload } = require('./app/photo_upload/get_photo_upload');
const { get_load_folders } = require('./app/photo_upload/get_load_folders');

// POSTモジュール読み込み
const { post_settings } = require('./app/settings/post_settings');
const { post_board } = require('./app/board/post_board');
const { post_photo_upload } = require('./app/photo_upload/post_photo_upload');
const { post_delete_folders } = require('./app/photo_upload/post_delete_folders');
const { post_delete_photo } = require('./app/photo_upload/post_delete_photo');

// 本番環境のPORTは.envに設定
// ローカルは8080
const PORT = process.env.PORT || 8080;

// expressの初期設定
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.set('view engine', 'ejs');
app.set('app', path.join(__dirname, 'src/app'));

// 静的ファイル（主にcssファイル）の読み込み
app.use(express.static('src/app'));
app.use(express.static('src/app/top'));
app.use(express.static('src/app/welcome'));
app.use(express.static('src/app/settings'));
app.use(express.static('src/app/board'));
app.use(express.static('src/app/camera'));
app.use(express.static('src/app/photo_frame'));
app.use(express.static('src/app/photo_upload'));

// GETの定義
app.get('/', (req, res) => { get_top(req, res); });
app.get('/welcome', (req, res) => { get_welcome(req, res); });
app.get('/settings', (req, res) => { get_settings(req, res); });
app.get('/board', (req, res) => { get_board(req, res); });
app.get('/src/app/board/picture/drawings.json', (req, res) => { get_drawing(req, res); });
app.get('/camera', (req, res) => { get_camera(req, res); });
app.get('/photo_frame', (req, res) => { get_photo_frame(req, res, app, express); });
app.get('/photo_upload', (req, res) => { get_photo_upload(req, res); });
app.get('/load_folders', (req, res) => { get_load_folders(req, res); });

// POSTの定義
app.post('/settings', (req, res) => { post_settings(req, res, app, express); });
app.post('/board', (req, res) => { post_board(req, res); });
const upload = multer({ dest: 'uploads/' });
app.post('/photo_upload', upload.single('photo'), (req, res) => { post_photo_upload(req, res); });
app.post('/delete_folders', (req, res) => { post_delete_folders(req, res); });
app.post('/delete_photo', (req, res) => { post_delete_photo(req, res); });

// サーバーの起動
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
