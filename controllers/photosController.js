const sql = require('../db');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const config = require('../config');

const handleError = (err, res) => {
    //todo remove the send (should never send err in production)
    res
        .status(500).send(err);
    return;
};
const acceptedFileExtensions = [".png", ".jpg", ".pdf"];

exports.photoLog_upload_post = function(req, res) {
    const now = Date.now();
    const tempPath = req.file.path;
    const fileExtension = path.extname(req.file.originalname).toLowerCase();
    const fileName = now.toString() + fileExtension;
    const targetPath = "./uploads/" + fileName;

    if (acceptedFileExtensions.includes(fileExtension)) {
        fs.rename(tempPath, targetPath, err => {
            if (err) {
                console.error(err);
                return handleError(err, res)
            }
            else {
                const imagePath = path.join(process.env.PWD, "uploads");
                const oldFileName = path.join(imagePath, fileName);

                const photoHash = crypto.createHash('md5')
                    .update(oldFileName)
                    .digest('hex');

                const link_hash = crypto.createHash('md5')
                    .update(photoHash)
                    .update(now.toString())
                    .digest('hex');

                const newFileName = path.join(imagePath, link_hash) + fileExtension;

                fs.rename(oldFileName, newFileName, err => {
                    if (err) {
                        console.error(err);
                        handleError(err, res);
                    }

                    console.info("Received now file upload: " + newFileName);

                    console.info("REQ");
                    console.info(req);

                    console.info("BODY");
                    console.info(req.body);

                    console.info("QUERY");
                    console.info(req.query);
                    sql.query('insert into photo_log (photo_hash, link_hash, upload_date, file_ext, notes) ' +
                        'values (?,?,?,?,?);', [photoHash, link_hash, new Date(now), fileExtension, req.query.notes],
                        function(err, rows, fields) {
                            if (err) {
                                console.error(err);
                                handleError(err, res);
                            }
                            else {
                                res.redirect(config.frontend.url + '/photo_log');
                            }
                        });
                });
            }
        });
    }
    else {
        fs.unlink(tempPath, err => {
            if (err) {
                console.error(err);
                return handleError(err, res)
            }

            res
                .status(403)
                .contentType("text/plain")
                .end("Only .png, .jpg, and .pdf files are allowed!");
        });
    }
};

