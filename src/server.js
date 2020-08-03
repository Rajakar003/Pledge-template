const express = require('express'),
  https = require('https'),
  app = express(),
  
  multer = require('multer'),
  upload = multer(),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  assert = require('assert'),
  f = require('util').format,
  fs = require('fs'),
  path = require('path'),
  url = require('url');
  nodemailer = require('nodemailer');
     
pdf = require('html-pdf');
global.__basedir = __dirname;

const pledge = require('./document/pledge');

let user, password;

//(original) user = encodeURIComponent('mongouser2');
user = encodeURIComponent('SplatMongo');
password = encodeURIComponent('SplatMongo@Pledge101');
protocol = 'http://',
  hostname = '127.0.0.1',
  port = 8006,
  MongoClient = require('mongodb'),
  authMechanism = 'DEFAULT',
  //mongoUrl = f('mongodb://%s:%s@localhost:27017/?authMechanism=%s', user, password, authMechanism),
  mongoUrl = f('mongodb://localhost:27017/')
dbName = 'Pledge_wall',
  //nodemailer = require('nodemailer');
  storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads', '../SPLAT_BACKEND-1');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + file.originalname);
    }
  });

// const fileFilter = (req, file, cb) => {
//   // reject a file
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };


let fileFilter = function (req, file, cb) {
  var allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];
  if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb({
          success: false,
          message: 'Invalid file type. Only jpg, png image files are allowed.'
      }, false);
  }
};


var uploadImage = multer({
  storage: storage,
  limits: {
    files: 1,
    //fileSize: 2 * 1024 * 1024  // 2 MB},
    fileSize:  1024 * 1024 * 4
  },
  fileFilter: fileFilter
});
var uploadfile = multer({ storage: storage });



// let smtpAuth;

// smtpAuth = {
//   user: 'noreply@spotyourdeals.com',
//   pass: ''
// }

// let smtpConfig = {
//   host: 'smtp.1and1.com',
//   port: 587,
//   secure: false,
//   auth: smtpAuth
// };
// let transporter = nodemailer.createTransport(smtpConfig);

// transporter.verify(function (error, success) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Server is ready to take our messages');
//   }
// });

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rsk.splat@gmail.com',
    pass: 'Splat123'
  }
});


application = require('./application'),

  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    } else {
      return next();
    }
  });


app.use('/documents',express.static('./documents'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({
  limit: '5mb'
}));

app.use(bodyParser.urlencoded({
  limit: '5mb',
  parameterLimit: 100000,
  extended: true 
}));

app.use(express.static('uploads'));
app.use(express.static('document'));
app.use(express.static('SPLAT_BACKEND-1'));
MongoClient.connect(mongoUrl, (err, client) => {
  assert.equal(null, err);
  db = client.db(dbName);

  //app.post('/SignUp' ,uploadImage.single('imagename'), (req, res)=> application.SignUp(req, res, db, MongoClient));
  app.post('/SignUp', (req, res) => application.SignUp(req, res, db, MongoClient));
  app.post('/ClientImage', uploadImage.single('imagename'), (req, res) => application.ClientImage(req, res, db, MongoClient));
  app.get('/FetchClientInfo', (req, res) => application.FetchClientInfo(req, res, db, MongoClient));
  app.get('/CountUsers', (req, res) => application.CountUsers(req, res, db, MongoClient));
  app.post('/UpdateSignature', uploadImage.single('imagename'), (req, res) => application.UpdateSignature(req, res, db, MongoClient));
  app.post('/pledgePDF', (req, res) => pledge.pledgePDF(req, res, db, MongoClient, transporter, protocol, hostname, port));
  app.post('/CouponCode', (req, res) => application.CouponCode(req, res, db, MongoClient));
  app.post('/photo', (req, res) => application.photo(req, res, db, MongoClient));
  app.post('/fetchphoto', (req, res) => application.fetchphoto(req, res, db, MongoClient));


  app.get('/', (req, res) => {
    res.send('Wellcome to SPLAT STUDIO')
  });

  //   app.get('/index', (req, res) => {
  //     res.sendFile(path.join(__dirname, frontServingDir + '/index.html'));
  //   });


  app.listen(port, () => console.log('Started successfully on port ' + port));
});