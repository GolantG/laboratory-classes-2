const express = require("express");
const fs = require("fs");
const { STATUS_CODE } = require("../constants/statusCode");
const renderNewProductPage = require("../views/renderNewProductPage");

const router = express.Router();

router.get("/add", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "add-product.html"));
});

router.post("/add", (req, res) => {
  const body = [];

  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    const parsedBody = Buffer.concat(body).toString();
    const formData = parsedBody.split("&").map((entry) => {
      const [key, value] = entry.split("=");
      return `${key}: ${decodeURIComponent(value)}`;
    });

    fs.writeFile("product.txt", formData.join(", "), (err) => {
      if (err) {
        console.error("Error writing to file", err);
        return res.status(500).send("Internal Server Error");
      }

      res.status(STATUS_CODE.FOUND);
      res.setHeader("Location", "/product/new");
      res.end();
    });
  });
});

router.get("/new", (req, res) => {
  fs.readFile("product.txt", "utf-8", (err, data) => {
    if (err || !data) {
      res.status(STATUS_CODE.NOT_FOUND).send("No product found");
      return;
    }

    renderNewProductPage(res, data);
  });
});

module.exports = router;