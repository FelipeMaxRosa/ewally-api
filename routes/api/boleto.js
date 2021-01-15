const express = require("express");
const router = express.Router();

// Controller
const controllerBoleto = require("../../controllers/boletoController");

// @routes POST api/clients

// @routes GET api/clients/:id
// @description Get a client
router.get("/:barCode", controllerBoleto.findOne);


module.exports = router;
