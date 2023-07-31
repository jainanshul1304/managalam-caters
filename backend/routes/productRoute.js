const express = require("express");

const { getAllProducts, createProduct, updateProduct, deleteProduct,
    getProductDetails, createProductReviews, getProductReviews, deleteReview, getAdminProducts, deleteProducts }
    = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRole } = require("../middlerware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/products/new").post(isAuthenticatedUser, createProduct);
router.route("/products/:id").put(isAuthenticatedUser, authorizeRole("admin"), updateProduct);
router.route("/products/:id").delete(isAuthenticatedUser, authorizeRole("admin"), deleteProduct);
router.route("/products/:id").put(isAuthenticatedUser, authorizeRole("admin"), deleteProduct);
router.route("/products/:id").get(getProductDetails);
router.route("/review").put(isAuthenticatedUser, createProductReviews);
router.route("/review").get(getProductReviews).delete(isAuthenticatedUser, deleteReview);
router.route("/admin/product/:id").delete(isAuthenticatedUser , authorizeRole("admin"),deleteProducts);

router.route("/admin/products").get(isAuthenticatedUser,authorizeRole("admin")  , getAdminProducts)

module.exports = router



