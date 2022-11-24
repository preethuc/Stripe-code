const express = require("express");
const morgan = require("morgan");
const customerRoute = require("./route/customerRoute");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
// app.use((req, res, next) => {
//   console.log("middleware working");
// });
app.use("/api/customer", customerRoute);
app.listen(3000, () => {
  console.log("stripe running on the port 3000");
});
