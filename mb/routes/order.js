const express = require("express")
const router = express.Router()

const {isSignedin, isAuthenticated, isAdmin} = require("../controllers/auth");
const {getUserById, pushOrderInPurchaseList} = require("../controllers/user");

const {updateStock} = require("../controllers/product");
const {getOrderId, createOrder,getAllOrders, updateStatus, getOrderStatus} = require("../controllers/order");

//param
router.param("userId",getUserById)
router.param("orderId",getOrderId)

//actual routes

//create
router.post("/order/create/:userId", isSignedin, isAuthenticated, pushOrderInPurchaseList, updateStock, createOrder);

//read
router.get("/order/all/:userId", isSignedin, isAuthenticated, isAdmin, getAllOrders);

//order status 
//router.get("/order/status/:userId", isSignedin, isAuthenticated, isAdmin, getOrderStatus)
router.get("/order/status/:userId", isSignedin, isAuthenticated, getOrderStatus)


// order status update by user
router.put("/order/:orderId/status/:userId", isSignedin, isAuthenticated, isAdmin, updateStatus);

module.exports = router;
