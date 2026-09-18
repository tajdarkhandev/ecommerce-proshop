import ErrorHandler from "../middlewares/error.js";
import { catchAssyncError } from "../middlewares/catchAssyncError.js";
import { Order } from "../models/orderModel.js";
import { calcPrices } from "../utils/calcPeices.js";
import { Product } from "../models/productModel.js";

export const addOrderItems = catchAssyncError(async (req, res, next) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;

  // console.log("orderItems :", orderItems);
  // console.log("shipping address :", shippingAddress);
  // console.log("payment method :", paymentMethod);

  if (orderItems && orderItems.length === 0) {
    return next(new ErrorHandler("No order items", 400));
  } else {
    // NOTE: here we must assume that the prices from our client are incorrect.
    // We must only trust the price of the item as it exists in
    // our DB. This prevents a user paying whatever they want by hacking our client
    // side code - https://gist.github.com/bushblade/725780e6043eaf59415fbaf6ca7376ff

    // get the ordered items from our database
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });

    // map over the order items and use the price from our items from database
    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id,
      );
      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDB.price,
        _id: undefined,
      };
    });

    // calculate prices
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(dbOrderItems);

    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    return res.status(201).json(createdOrder);
  }
});

export const getMyOrders = catchAssyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

export const getOrderById = catchAssyncError(async (req, res, next) => {});

export const updateOrderToPaid = catchAssyncError(async (req, res, next) => {
  res.send("update order to paid");
});

export const updateOrderToDelivered = catchAssyncError(
  async (req, res, next) => {
    res.send("update order to deliver");
  },
);

export const getAllOrders = catchAssyncError(async (req, res, next) => {
  res.send("get all orders");
});
