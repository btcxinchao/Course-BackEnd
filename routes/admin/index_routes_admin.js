
const system_config = require("../../config/system")
const home_routes = require("../admin/home_routes_admin")
const product_routes = require("../admin/routes_products")

module.exports = (app) =>{
   const PATH = system_config.prefixAdmin
    
    app.use(PATH + `/dashboard`,home_routes);

    app.use(PATH + "/product",product_routes);
    

   

}
