var express = require('express');
var router = express.Router();
var sql = require('../../db');
var photoLogController = require('../../controllers/photoLogController');

/* GET all photo log entries. */
router.get('/', function(req, res) {
    sql.query('select * from photo_log', function(err, rows, fields) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(rows);
        }
    })
});

/* POST a new entry into the photo_log table. */
router.post('/', photoLogController.photoLog_create_post);

/* GET a specific photo_log record. */
router.get('/:photo_id', function(req, res) {
   sql.query('select * from photo_log where photo_id=?', req.params.photo_id, function(err, rows, fields) {
       if (err) {
           res.status(500).send(err);
       }
       else {
           res.status(200).send(rows[0]);
       }
   })
});

/* PUT a specific photo_log record (update it). */
router.put('/:photo_id', function(req, res) {
    let photoLogDetails = [req.query.photo_hash, req.query.link_hash,
        new Date(), req.query.file_ext, req.query.notes, req.params.photo_id];
    sql.query('update photo_log set photo_hash=?, link_hash=?, upload_date=?, file_ext=?, notes=? where photo_id=?',
        photoLogDetails, function(err, rows, fields) {
            if (err) {
                console.error(err);
                res.status(500).send(err);
            }
            else {
                res.redirect('/photo_log');
            }
        })
});

router.patch('/:photo_id', function(req, res) {
    console.info("Photo Log Entry Details put called - new notes: " + req.query.notes + ", file ext: " + req.query.fileExt + " for id = " + req.params.photo_id);
    sql.query('update photo_log set notes=?, file_ext=? where photo_id=?',
        [req.query.notes, req.query.fileExt, req.params.photo_id],
        function(err, rows) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.status(200).send(rows[0]);
            }
        })
});

module.exports = router;
