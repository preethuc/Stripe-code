const {
  createCustomers,
  paymentIntent,
  paymentMethod,
  createPrice,
  createProduct,
  subscription,
} = require("./stripeFunctions");

//CREATE CUSTOMER
exports.createCustomer = async (req, res) => {
  try {
    const customer = await createCustomers(req.body);
    res.status(201).json({
      status: true,
      message: "customer created",
      data: customer,
    });
  } catch (err) {
    console.log(err);
  }
};

//PAYMENT CREATION BY PAYMENT-INTENT AND PAYMENT METHOD
exports.paymentCharge = async (req, res) => {
    const customer = await createCustomers(req.body);
  const paymentmethod = await paymentMethod();
  const payment = await paymentIntent(customer.id, paymentmethod.id);
  console.log(payment);
  res.status(201).json({
    status: true,
    message: "payment charged",
    data: payment,
  });
};

//ADD PRODUCT
exports.addProduct = async (req, res) => {
  let product = await createProduct(req.body, res);
  let price = await createPrice(req.body, product, res);
  res.status(201).json({
    status: true,
    message: "product created",
    product: product,
    price: price,
  });
};

//SUBSCRIPTION
exports.addSubscription = async (req, res) => {
  let paymentmethod = await paymentMethod();
  let customer = await createCustomers(req.body, paymentmethod.id, res);
  await subscription(req.body, paymentmethod, customer, res).catch((err) => {
    console.log(err);
  });
  res.status(201).json({
    status: true,
    message: "subscription created",
    data: subscription,
  });
};
