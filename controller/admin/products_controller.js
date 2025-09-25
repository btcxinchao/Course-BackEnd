const Product = require("../../model/model.js");

// LIST + filter + pagination
module.exports.Product = async (req, res) => {
  let find = { deleted: false };

  // filter status
  if (req.query.status) {
    find.status = req.query.status;
  }

  // search keyword
  let keyword = "";
  if (req.query.keyword) {
    keyword = req.query.keyword.trim();
    const regex = new RegExp(keyword, "i");
    find.title = regex;
  }

  // pagination
  let objecPagination = { currentPage: 1, limitItem: 4 };
  if (req.query.page) {
    objecPagination.currentPage = parseInt(req.query.page);
  }
  objecPagination.skip =
    (objecPagination.currentPage - 1) * objecPagination.limitItem;

  const countProduct = await Product.countDocuments(find);
  objecPagination.totalPage = Math.ceil(
    countProduct / objecPagination.limitItem
  );

  const products = await Product.find(find)
    .limit(objecPagination.limitItem)
    .skip(objecPagination.skip);

  res.render("admin/pages/products/product", {
    products,
    currentStatus: req.query.status || "",
    keyword,
    pagination: objecPagination,
  });
};

// CHANGE STATUS ONE
module.exports.changeStatus = async (req, res) => {
  const { status, id } = req.params;
  await Product.updateOne({ _id: id }, { status });
  res.redirect(req.get("Referrer") || "/");
};

// CHANGE STATUS MULTI
module.exports.changeStatusMulti = async (req, res) => {
  let ids = [];
  if (req.body.ids) {
    ids = req.body.ids.split(",").map((id) => id.trim());
  }

  const type = req.body.type;
  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      break;
    default:
      break;
  }
  res.redirect(req.get("Referrer") || "/");
};

// DELETE ONE ITEM (soft delete)
module.exports.deleteOneItem = async (req, res) => {
  const id = req.params.id;
  await Product.updateOne(
    { _id: id },
    { deleted: true, deletedAt: new Date() }
  );
  res.redirect(req.get("Referrer") || "/");
};

// CREATE (GET form)
module.exports.create = (req, res) => {
  res.render("admin/pages/products/createProduct");
};

// CREATE (POST)
module.exports.createPost = async (req, res) => {
  if (!req.body.title) {
    return res.redirect(req.get("Referrer"));
  }

  req.body.price = parseInt(req.body.price) || 0;
  req.body.stock = parseInt(req.body.stock) || 0;

  if (!req.body.position || req.body.position === "") {
    const countStock = await Product.countDocuments();
    req.body.position = countStock + 1;
  } else {
    req.body.position = parseInt(req.body.position) || 0;
  }

  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  const product = new Product(req.body);
  await product.save();
  res.redirect(`/admin/product`);
};

// EDIT (GET form)
module.exports.edit = async (req, res) => {
  const find = { deleted: false, _id: req.params.id };
  const products = await Product.findOne(find);

  if (!products) {
    return res.redirect("/admin/product");
  }

  res.render("admin/pages/products/edit", { products });
};

// PATCH EDIT
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;

  req.body.price = parseInt(req.body.price) || 0;
  req.body.stock = parseInt(req.body.stock) || 0;
  req.body.position = parseInt(req.body.position) || 0;
  req.body.discountpercent = parseInt(req.body.discountpercent) || 0;

  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  try {
    await Product.updateOne({ _id: id }, req.body);
    res.redirect("/admin/product");
  } catch (error) {
    console.error(error);
    res.redirect(req.get("Referrer"));
  }
};


///admin/product/detail
module.exports.Detail = async (req, res) => {
  try {
    const find = {  
      deleted : false,
      _id: req.params.id  
    }
    const products = await Product.findOne(find);
    console.log(products);
    
      res.render("admin/pages/products/detail",{ 
        title : products.title ,
      products 
    });
  } catch (error) {
    console.error(error);
    res.redirect(req.get("Referrer"));
  }
   
}
///end admin/product/detail