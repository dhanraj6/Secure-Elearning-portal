const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require("../models/product");


var storage = multer.diskStorage({
    destination:  (req, file, cb) => {
        cb(null, '../mf/src/assets/uploads')
    },
    filename:  (req, file, cb) => {
        cb(null, `${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")


//=================================
//             User
//=================================


/* 
router.get("/video/uploadfiles", (req, res) => {
    console.log("im here")
} )
 */


 router.post("/video/uploadfiles", (req, res) => {
     upload(req, res, err => {
         if (err) {
            console.log(err)
           return res.json({ success: false, err })
       }
         return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
     })

}); 

router.post("/video/getVideo", (req, res) => {
     
    Product.findOne({ "_id" : req.body.videoId })
    .populate('writer')
    .exec((err, video) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, video })
    })
});


module.exports = router;