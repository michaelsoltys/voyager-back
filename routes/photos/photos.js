const express = require('express');
const router = express.Router();
const photosController = require('../../controllers/photosController');
const multer = require("multer");

const upload = multer({
    dest: "./uploads/"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

//todo create post logic to upload photos into the public/images/ folder (maybe look at s3 bucket later)

/* POST a new entry into the photo_log table. */
router.post('/upload', upload.single("photo"), photosController.photoLog_upload_post);

module.exports = router;

