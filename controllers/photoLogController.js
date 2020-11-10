// let PhotoLogEntryInstance = require('../models/photoLogEntry');
var sql = require('../db');

exports.photoLog_create_post = function(req, res) {
    sql.query('insert into photo_log (photo_hash, link_hash, upload_date, file_ext, notes) ' +
        'values (?,?,?,?,?);', [req.query.photo_hash, req.query.link_hash, new Date(), req.query.file_ext, req.query.notes],
        function(err, rows, fields) {
            if (err) {
                console.error(err);
                res.status(500).send(err);
            }
            else {
                res
                    .status(200)
                    .send();
            }
        });

    res.send()
};

exports.photoLog_create_upload = function(req, res) {
    sql.query('insert into photo_log (photo_hash, link_hash, upload_date, file_ext, notes) ' +
        'values (?,?,?,?,?);', [req.query.photo_hash, req.query.link_hash, req.query.upload_time, req.query.file_ext, req.query.notes],
        function(err, rows, fields) {
            if (err) {
                console.error(err);
                res.status(500).send(err);
            }
            else {
                res
                    .status(200)
                    .send();
            }
        });

    res.send()
};