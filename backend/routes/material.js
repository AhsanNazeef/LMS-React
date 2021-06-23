const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const dirPath = path.join(__dirname, '..', 'public/upload');
let Material = require('../models/material.model');

const storage = multer.diskStorage({
    // destination:'upload', //When the service starts, the folder will be created automatically
    destination: function (req, file, cb) { //The function needs to create a folder manually
      // console.log('destination()', file)
      if (!fs.existsSync(dirPath)) {
        fs.mkdir(dirPath, function (err) {
          if (err) {
            console.log(err)
          } else {
            cb(null, dirPath)
          }
        })
      } else {
        cb(null, dirPath)
      }
    },
    filename: function (req, file, cb) {
      // console.log('filename()', file)
      var ext = path.extname(file.originalname)
      cb(null, file.fieldname + '-' + Date.now() + ext)
    }
});

const upload = multer({
storage
});

const uploadSingleFile = upload.single('file');


router.route('/').get((req,res) =>{
    Material.find()
    .then(materials => res.json(materials))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req,res) =>{
    uploadSingleFile(req, res, function (err) { //Error handling
        if (err) {
          return res.send({
            status: 1,
            msg: 'File upload failed'
          })
        }
    var file = req.file;
    console.log(file);
    
    const name = file.filename;
    const path = file.path;

    const newMaterial = new Material({
         name,
         path
     });

     newMaterial.save()
     .then(()=> res.json('Material added'))
     .catch(err => res.status(400).json('Error: ' + err))
    })

});


router.route('/:id').delete((req,res) =>{
    Material.findByIdAndDelete(req.params.id)
    .then(() => res.json("Material Deleted"))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/download/:id').get((req,res) =>{
    let path = "";
    Material.findById(req.params.id)
    .then(material => {
       path =material.path;
       console.log(path);
       res.download(path);
    })
    .catch(err => res.status(400).json('Error: ' + err))
    
    
});





module.exports = router;