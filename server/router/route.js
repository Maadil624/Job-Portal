import express from 'express'
import userController from '../controller/userController.js'
import { allUsers, loginController, verifyUser } from '../controller/loginController.js'
import multer from 'multer';
import { fileUpload, filefetch,deleteuser, deletedata, deletefile, updatefiledata } from '../controller/FileUploadController.js'
import passport from '../controller/FBcontroller.js'
import GuserController from '../controller/GuserController.js'
// initilize express with pre defined method router for routing
const route = express.Router()

// File Upload Routes
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
// filefilter to get required file
const fileFilter = (req, file, cb) => {
  // let response = new Response();
  // console.log(file)
  if (
    file.mimetype === "application/vnd.ms-excel" ||
    file.mimetype === "application/msexcel" ||
    file.mimetype === "application/x-ms-excell" ||
    file.mimetype === "application/x-excel" ||
    file.mimetype === "application/xls" ||
    file.mimetype === "application/csv" ||
    file.mimetype === "text/csv" ||
    file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    file.mimetype === "application/x-msexcel"
  ) {
    // console.log(papa.parse(file))
    cb(null, true);
  } else {
    try {
      cb(new Error("Not an Csv! Please upload an CSV File.", 400), false);
    } catch (err) {
      console.log("hiiiii")
    }
  }
};
// 'uploads/' is the destination folder for uploaded files
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 30 * 1024,
    files: 3
  },
  fileFilter: fileFilter
});

// Attach the upload middleware to the route that handles the file upload
route.route('/fileupload').post(verifyUser,upload.any('file'), fileUpload)

route.get('/fileusers',verifyUser,filefetch)
route.post('/getdeletedata', deletedata)
route.delete('/deletefileuser/:id', deleteuser)
route.delete('/deletefile/:id', deletefile)
route.put('/updatefiledata/:id',updatefiledata)

// user Routes
route.post('/register', userController)
route.post('/login', loginController)
route.route('/allusers').get(verifyUser, allUsers)

// Social Media Login Routes

// facebook and google auth routes
route.get('/facebook', passport.authenticate('facebook'));
route.get('/facebook/callback', passport.authenticate('facebook',
  {
    failureRedirect: `http://localhost:5000/profile`
    ,
    successRedirect: 'http://localhost:3000/alljob'
  }), (req, res) => {
    res.status(200).send({
      success: true,
      message: "login sucessfull"
    });
    //   console.log(res)
  });

// linkdden routes

route.get('/', function (req, res) {
  res.render('index.ejs', {
    user: req.user
  }); // load the index.ejs file
});

route.get('/auth/linkedin', passport.authenticate('linkedin', {
  scope: ['openid', 'email'],
}));

route.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

// google auth routes
route.route('/glogin').post(GuserController)



export default route