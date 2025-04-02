const path = require('path');

const renderNewProductPage = (response, productData) => {
  if (productData) {
    response.setHeader("Content-Type", "text/html");
    response.write("<html>");
    response.write("<head><title>Shop - New Product</title></head>");
    response.write("<body>");
    response.write("<h1>Newest Product</h1>");
    
    response.write("<p><strong>Name:</strong> " + productData.name + "</p>");
    response.write("<p><strong>Description:</strong> " + productData.description + "</p>");
    response.write("<p><strong>Price:</strong> " + productData.price + "</p>");
    
    response.write("<nav><a href='/'>Home</a><br /><a href='/product/add'>Add product</a></nav>");
    response.write("</body>");
    response.write("</html>");
  } else {
    response.setHeader("Content-Type", "text/html");
    response.write("<html>");
    response.write("<head><title>Shop - New Product</title></head>");
    response.write("<body>");
    response.write("<h1>No product found</h1>");
    response.write("<p>The product data is not available.</p>");
    response.write("<nav><a href='/'>Home</a></nav>");
    response.write("</body>");
    response.write("</html>");
  }

  response.end();
};

module.exports = renderNewProductPage;