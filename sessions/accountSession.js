const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    req.session.reload((err) => {
        if (err) console.log('no session found')
        res.send(req.session)
    });
});

router.post('/', (req, res) => {
    req.session.data = req.body.data
    req.session.save((err) => {
        if (err) {
            console.log(err);
        }
    });
    res.status(200).send('OK');
});

router.put('/', (req, res) => {
    req.session.data = req.body.data
    req.session.save((err) => {
        if (err) {
            console.log(err);
        }
    });
    res.status(200).send('OK');
})
router.delete('/', (req, res) => {
    req.session.destroy()
    res.end()
});

module.exports = router;