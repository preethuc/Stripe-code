const express = require('express')
const router = express.Router()

const customerController = require('./../controller/customer')

router.route('/createCustomer').post(customerController.createCustomer)
router.route('/payment').post(customerController.paymentCharge)
router.route('/addProduct').post(customerController.addProduct)
router.route('/subscriber').post(customerController.addSubscription)

module.exports = router