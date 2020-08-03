const { MongoClient } = require('mongodb');
//first
const express = require('express'),
  https = require('https'),
  app = express(),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  assert = require('assert'),
  f = require('util').format,
  fs = require('fs'),
  path = require('path'),
  url = require('url');

module.exports = {
  SignUp: async (req, res, db, MongoClient) => {
    db.collection('Client_detail').find({
      email: req.body.email,

    })
      .toArray((err, result) => {
        if (err) {
          res.end();
          throw err;
        }
        if (result.length) {
          res.send(JSON.stringify({
            code: 0,
            msg: 'E-mail already exists in the system'
          }));
        } else {
          db.collection('Client_detail')
            .insertOne({
              "name": req.body.name,
              "email": req.body.email,
              "userId":new MongoClient.ObjectID(result.insertedId),
              "MobileNo": req.body.Mobile,
              // "datetime":new Date(Date.now()).toISOString().split('.')[0],    ##"datetime" : "2020-07-10T03:55:36",
              "datetime": new Date().toLocaleString('en-US', {
                timeZone: 'Asia/Calcutta'
              }),

              // "datetime" : "7/10/2020, 9:25:36 AM"


            }, (err, result) => {
              if (err) {
                res.send(JSON.stringify({
                  code: 1,
                  msg: 'We are very sorry there is some error ocurrs'
                }));
                console.log(err);
              } else {
                console.log(result.insertedId);
                db.collection('pledge_pdf')
                            .insertOne({
                                "name" : req.body.name,
                                "email" : req.body.email,
                                "MobileNo": req.body.Mobile,
                                "userId":new MongoClient.ObjectID(result.insertedId),
                                "datetime": new Date().toLocaleString('en-US', {timeZone: 'Asia/Calcutta'}),
                            });
                res.send(JSON.stringify({ res: 'You are registered successfully' }));
              }
            });
        }
      });
  },



  //Upload Image from Windows
  ClientImage:(req, res, db, MongoClient)=>{
    console.log("request param file ",req.file);
    let newpath=req.file.path;
    console.log("req file path",req.file.path);
    console.log("newpath",newpath);
    let Imagepath = newpath.split("\\");
    // Imagepath= newpath.split("/")
    // console.log("image path",Imagepath);
    // console.log(req.file.originalname);
    let imagepath = 'localhost:8006/'+Imagepath[1];
    db.collection('Client_detail').updateMany({userId: new MongoClient.ObjectID(req.body.userId)},
    {
      $set:{
        "imagename": req.file.originalname,
        "Imagepath":imagepath,
      }

    },{
      multi:true
    })
    res.send(JSON.stringify("your profile photo uploded"));
  },



  FetchClientInfo: (req, res, db, MongoClient) => {
    let arr = []
    db.collection('Client_detail').find({}).toArray((err, result) => {
      if (err) {
        res.end();
        throw err;
      }
      result.forEach((val) => {
        let data = {
          name: val.name,
          MobileNo: val.MobileNo,
          Imagepath: val.Imagepath

        };
        arr.push(data);

      })
      res.send(JSON.stringify(arr));
    })
  },

  CountUsers: (req, res, db, MongoClient) => {
    db.collection('Client_detail').countDocuments().then((result) => {
      console.log('Total numbers of users', result);
      res.send(JSON.stringify({ 'Total numbers of users': result }));
    })
  },





  // Upload Image from Windows
  UpdateSignature: (req, res, db, MongoClient) => {
    console.log("request param file ", req.file);
    let newpath = req.file.path;
    console.log("req file path", req.file.path);
    console.log("newpath", newpath);
    let Imagepath = newpath.split("\\");
    // Imagepath= newpath.split("/")
    // console.log("image path",Imagepath);
    // console.log(req.file.originalname);
    let imagepath = 'localhost:8006/' + Imagepath[1];
    db.collection('Client_detail').updateMany({ userId: new MongoClient.ObjectID(req.body.userId) },
      {
        $set: {
          "Upload_Sign": req.file.originalname,
          "SignPath": imagepath
        }

      }, {
      multi: true
    })
    res.send(JSON.stringify("your Signature is updated"));
  },





}   