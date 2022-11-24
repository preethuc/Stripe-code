const stripe = require("stripe")(
  "sk_test_51M6q92KBnabCo49phVpzbFnrlCBqrtvjLVZCvDshfccJzwzudhTg9PqVq98kWKps3Ui0k7GUtWa9Z564St9x2XXX00SYuvsTTX"
);

//CREATE CUSTOMER
exports.createCustomers = async (data,method) => {
  console.log(data.name);
  let customerDetail = {
    email: data.email,
    name: data.name,
    address: {
      postal_code: "default",
    },
    payment_method: method,
  };
  const customerData = await stripe.customers.create(customerDetail);
  console.log(customerData);
  return customerData;
};

//CREATE PAYMENT-INTENT
exports.paymentIntent = async (customer, card) => {
  let intentDetails = {
    amount: 100,
    currency: "usd",
    customer: customer.id,

    payment_method_types: ["card"],
    setup_future_usage: "off_session",
    payment_method: card,
    confirm: true,
  };
  const intentData = await stripe.paymentIntents.create(intentDetails);
  console.log(intentData);
  return intentData;
};

//CREATE PAYEMNT METHOD
exports.paymentMethod = async () => {
  let paymentMethodDetails = {
    type: "card",
    card: {
      number: "4000003560000008",
      exp_month: 05,
      exp_year: 2026,
      cvc: "208",
    },
  };
  const paymentMethodData = await stripe.paymentMethods.create(
    paymentMethodDetails
  );
  console.log(paymentMethodData);
  return paymentMethodData;
};



//CREATE PRODUCT
exports.createProduct = async ({ product_name, product_description }) => {
  let productDetails = {
    name: product_name,
    description: product_description,
    // name: "pencil",
    // description: "nuivgyuvxc",
  };
  const productData = await stripe.products.create(productDetails);
  console.log(productData);
  return productData;
};

// CREATE PRICE FOR PRODUCT
exports.createPrice = async ({ currency, price, interval, interval_count },
  { id }) => {
  let priceDetails = {
    unit_amount: price * 100,
    currency: currency,
    recurring: {
      interval: interval,
      interval_count: interval_count,
    },
    product: id,
  };

  const priceData = await stripe.prices.create(priceDetails);
  console.log(priceData);
  return priceData;
};

//CREATE SUBSCRIPTION
exports.subscription = async ({ price, trial_period_days },card, { id }) => {
  let subscriptionDetails = {
    customer: id,
    items: [{ price: price }],
    trial_period_days: trial_period_days,
    off_session: true,
    payment_settings: {
      payment_method_types: ["card"],
    },
    collection_method: "charge_automatically",
    payment_behavior: "allow_incomplete",
    default_payment_method: card.id,
  };

  const subscriptionData = await stripe.subscriptions.create(
    subscriptionDetails
  );
  console.log(subscriptionData);
  return subscriptionData;
};
