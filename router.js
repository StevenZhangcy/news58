const express = require('express');
const router = express.Router();


router.get('/signin',(req,res) => {
    res.write('run it----');
    res.end();
});


module.exports = router;