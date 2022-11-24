const express = require('express')
const router = express.Router()

const customerController = require('../../controller/customer')

router.route('/createCustomer').post(customerController.createCustomer)
router.route('/addProduct').post(customerController.addProduct)
module.exports = router