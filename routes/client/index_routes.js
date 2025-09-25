
const product_routes = require("./products_routes")
const home_routes = require("./home_routes.js")

module.exports = (app) =>{

    app.use("/",home_routes);
    
    app.use("/products",product_routes )
   

}
