const {createCustomers} = require('./stripeFunctions')


//CREATE CUSTOMER
exports.createCustomer = async (req, res) => {
    try {
        const customer = await createCustomers(req.body)
        res.status(200).json({
            status: true,
            message: "customer created",
            data: customer
        })
    } catch (err) {
        console.log(err)
    }

}

//PAYMENT CREATION BY PAYMENT-INTENT AND PAYMENT METHOD 
exports.chargePayment = async (req, res) => {
    const customer = await createCustomers(req.body)
    const paymentMeth = await paymentMethod()
    const payment = await paymentIntent(customer.id, paymentMeth.id)
    console.log(payment)
    res.status(200).json({
        status: true,
        message: "payment charged",
        data: payment
    })
}

//ADD PRODUCT
exports.addProduct = async (req, res) => {
    let product = await createProduct(req.body, res);
    let price = await createPrice(req.body, product, res);
    res.status(200).json({
        status: true,
        message: "product created",
        product: product,
        price: price
    })
}

//
