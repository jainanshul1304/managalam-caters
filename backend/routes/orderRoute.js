const express = require("express");
const { newOrder, getSingleOrder, myOrder, getAllOrder, updateOrder, deleteOrder } = require("../controllers/orderControllers");
const router = express.Router();


const { isAuthenticatedUser, authorizeRole } = require("../middlerware/auth");


router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrder);
router.route("/admin/orders").get(isAuthenticatedUser, authorizeRole("admin"), getAllOrder);
router.route("/admin/order/:id").put(isAuthenticatedUser, authorizeRole("admin"), updateOrder)
    .delete(isAuthenticatedUser, authorizeRole("admin"), deleteOrder);

module.exports = router;