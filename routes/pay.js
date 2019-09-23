const qr      = require('qr-image');
const express = require('express');
var passport = require('passport')
var payController = require('../controllers/payController')
const router  = express.Router();

router.get("/", (req, res) => {
	res.render("index");
});

router.post("/createInvoice",(req, res) => {
	payController.createInvoice(req,res)
});

router.post("/callback",(req, res) => {
	payController.callback(req,res)
});

router.post("/checkInvoice",(req, res) => {
	payController.checkInvoice(req,res)
});

router.get("/createQRCode",(req, res) => {
	payController.createQRCode(req,res)
	var text = req.query.text || "";
        try {
            var img = qr.image(text,{size :10});
            res.writeHead(200, {'Content-Type': 'image/png'});
            img.pipe(res);
        } catch (e) {
            res.writeHead(414, {'Content-Type': 'text/html'});
            res.end('<h1>414 Request-URI Too Large</h1>');
        }
});


module.exports = router;