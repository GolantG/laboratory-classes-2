const express = require("express");
const path = require(`path`);
const fs = require("fs");
const { STATUS_CODE } = require("../constants/statusCode");
const renderNewProductPage = require("../views/renderNewProductPage");

const router = express.Router();

router.get("/add", (req, res) => {
  res.sendFile('add-product.html', { root: path.join(__dirname, '../views') });
});

router.post("/add", (req, res) => {
  const { title, description, price } = req.body; 

  const formData = { title, description, price };

  fs.writeFile("product.txt", JSON.stringify(formData), (err) => {
    if (err) {
      console.error("Error writing to file", err);
      return res.status(500).send("Internal Server Error");
    }

    res.redirect("/product/new");
  });
});

router.get("/new", (req, res) => {
  fs.readFile("product.txt", "utf-8", (err, data) => {
    if (err || !data) {
      res.status(STATUS_CODE.NOT_FOUND).send("No product found");
      return;
    }
    const product = JSON.parse(data);
    renderNewProductPage(res, product);
  });
});

module.exports = router;