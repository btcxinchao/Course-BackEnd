const Product = require("../../model/model.js")
module.exports.products = async (req,res)=>{
    const products = await Product.find({deleted: false})
    res.render('client/pages/product/products',{
        products    
    });
    
}

module.exports.Detail = async (req, res) => {
  try {
    const find = {
      deleted : false,
      slug: req.params.slug  ,
      status : "active"
    }
    const products = await Product.findOne(find);
    console.log(products);
    
      res.render('client/pages/product/detail',{ 
        title : products.title ,
      products 
    });
  } catch (error) {
    console.error(error);
    res.redirect(req.get("Referrer"));
  }
   
}