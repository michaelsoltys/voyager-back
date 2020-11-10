var express = require('express');
var router = express.Router();
var sql = require('../../db');

/* GET all event log entries. */
router.get('/', function(req, res) {
    sql.query('select * from event_log', function(err, rows, fields) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(rows);
        }
    })
});

router.get('/:event_id', function(req, res) {
        sql.query('select * from event_log where event_id=?', req.params.event_id, function(err, rows, fields) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.status(200).send(rows[0]);
            }
        })
    });

router.patch('/:event_id', function(req, res) {
        console.info("Event Log Entry Details put called - new notes: " + req.query.notes + " for id = " + req.params.event_id);
        sql.query('update event_log set notes=? where event_id=?',
            [req.query.notes, req.params.event_id],
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
