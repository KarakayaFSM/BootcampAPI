const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({success: true, msg:'get All Bootcamps'});
});

router.get('/:id', (req, res) => {
    res.status(200).json({success: true, msg:`get bootcamp ${req.params.id}`});
});

router.post('/', (req, res) => {
    res.status(200).json({success: true, msg:'Add Bootcamp'});
});

router.put('/:id', (req, res) => {
    res.status(200).json({success: true, msg:`Update bootcamp ${req.params.id}`});
});

router.delete('/:id', (req, res) => {
    res.status(200).json({success: true, msg:`delete bootcamp ${req.params.id}`});
});

module.exports = router;