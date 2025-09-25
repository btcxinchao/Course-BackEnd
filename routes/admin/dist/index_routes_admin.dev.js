"use strict";

var system_config = require("../../config/system");

var home_routes = require("../admin/home_routes_admin");

var product_routes = require("../admin/routes_products");

module.exports = function (app) {
  var PATH = system_config.prefixAdmin;
  app.use(PATH + "/dashboard", home_routes);
  app.use(PATH + "/product", product_routes);
};