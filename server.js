
const path = require(`path`);
const express = require(`express`);
const bodyParser = require(`body-parser`);
const logger = require(`./utils/logger`);
const productRoutes = require(`./routing/product`);
const logoutRoutes = require(`./routing/logout`);
const killRoutes = require(`./routing/kill`);
const homeRoutes = require(`./routing/home`);
const { STATUS_CODE } = require('./constants/statusCode');
const config = require("./config");
const { requestRouting } = require("./routing/routing");

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  logger.getInfoLog(req);
  next();
});

app.use('/product', productRoutes);
app.use('/logout', logoutRoutes);
app.use('/kill', killRoutes);
app.use('/', homeRoutes);

app.use((req, res, next) => {
  res.status(STATUS_CODE.NOT_FOUND);
  res.sendFile(path.join(__dirname, 'views', '404.html'));
  logger.getErrorLog(new Error(`requested url ${req.url} doesn't exist.`));
});

app.listen(config.PORT, () => {
  console.log(`Server is running on http://localhost:${config.PORT}`);
});
  