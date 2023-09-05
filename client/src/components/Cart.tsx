import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../types/storeType";
import { useDetail } from "../hooks/DetailContext";
import {
  increaseProductQuantity,
  decreaseProductQuantity,
  updateCartQuantity,
  removeProductFromCart,
  removeCartItem,
} from "../features/cartSlice";
import { CartItem } from "../features/cartSlice";
import ProductDetails from "./ProductDetails";
import { AnimatePresence } from "framer-motion";
import { calculateDiscount } from "../utils/calculateDiscounts";
import { data } from "../types/productType";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
const Cart = () => {
  const { items, loading } = useAppSelector((state) => state.Cart);
  const { userInfo } = useAppSelector((state) => state.Authentication);
  const dispatch = useAppDispatch();

  const detailContext = useDetail();

  if (!detailContext) {
    // Handle the case where the context is not available
    throw new Error("useDetail must be used within a CategoryProvider");
  }

  const { selectedProduct, setSelectedProduct } = detailContext;

  const increaseQuantity = (product: CartItem) => {
    dispatch(increaseProductQuantity(product));

    if (userInfo) {
      dispatch(
        updateCartQuantity({
          productId: product.product._id,
          userId: userInfo._id,
          quantity: product.quantity + 1,
        })
      );
    }

    // update localstorage
    const cart = localStorage.getItem("cart");
    let cartItems: CartItem[] = cart ? JSON.parse(cart) : [];

    const productIndex = cartItems.findIndex(
      (item) => item.product._id === product.product._id
    );

    if (productIndex !== -1) {
      cartItems[productIndex].quantity += 1;
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  };
  const decreaseQuantity = (product: CartItem) => {
    if (product.quantity > 1) {
      dispatch(decreaseProductQuantity(product));
    }
    if (userInfo && product.quantity > 1) {
      dispatch(
        updateCartQuantity({
          productId: product.product._id,
          userId: userInfo._id,
          quantity: product.quantity - 1,
        })
      );
    }
    // update localstorage
    const cart = localStorage.getItem("cart");
    let cartItems: CartItem[] = cart ? JSON.parse(cart) : [];

    const productIndex = cartItems.findIndex(
      (item) => item.product._id === product.product._id
    );

    if (productIndex !== -1 && product.quantity > 1) {
      cartItems[productIndex].quantity -= 1;
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  };

  const navigate = useNavigate();

  const storedSelectedItems = JSON.parse(
    localStorage.getItem("selectedItems") || "[]"
  );
  const [selectedItems, setSelectedItems] = useState<string[]>(
    storedSelectedItems.length > 0
      ? storedSelectedItems
      : items.map((item) => item.product._id)
  );

  const handleItemSelection = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems((prevItems) => prevItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems((prevItems) => [...prevItems, itemId]);
    }
  };

  // Calculate total original price for the cart
  const totalOriginalPrice = items.reduce(
    (total, item) =>
      selectedItems.includes(item.product._id)
        ? total + item.product.price * item.quantity
        : total,
    0
  );

  // Calculate total discount for the cart
  const totalDiscount = items.reduce((total, item) => {
    const discount = calculateDiscount(
      item.product.price,
      item.product.discount
    );

    if (!selectedItems.includes(item.product._id)) return total; // Don't include items not selected

    return total + (discount ? discount.discountAmount * item.quantity : 0);
  }, 0);

  const subtotal = totalOriginalPrice - totalDiscount;

  const handleCheckout = async () => {
    if (subtotal === 0) return toast("select an item");
    if (!userInfo) return toast.error("sign In to procced");

    const itemsToCheckout = items.filter((item) =>
      selectedItems.includes(item.product._id)
    );

    try {
      if (itemsToCheckout.length > 0) {
        toast.loading("loading..");
        const stripePromise = loadStripe(
          "pk_test_51NietrSCComPL4dLLvGZWGEBRtYC7XauF1qoDhIYTJGjNJ2f3oqzTcMkQPsPk837Lkmfmg6IwwL0XXmf59y5T3WP008P7lZS66"
        );
        const stripe = await stripePromise;
        const res = await axios.post(
          "https://e-commerce-serverside.vercel.app/create-checkout-session",
          { itemsToCheckout }
        );

        if (res.status === 200) {
          stripe?.redirectToCheckout({ sessionId: res.data.session_id });
        }
      }
    } catch (err: any) {
      console.log(err.message);
    } finally {
      toast.dismiss();
    }
  };

  const handleLocalSelectedItem = (cartItem: {
    product: data;
    quantity: number;
  }) => {
    const selectedItemForCart = localStorage.getItem("selectedItems");
    if (selectedItemForCart) {
      const localItems = JSON.parse(selectedItemForCart);
      if (localItems.length > 0) {
        const filterItems = localItems.filter(
          (item: string) => !item.includes(cartItem.product._id)
        );
        localStorage.setItem("selectedItems", JSON.stringify(filterItems));
      }
    }
  };

  const containerVarient = {
    hidden: {},
    show: {},
  };

  const childrenVariants = useMemo(() => {
    return Math.random() < 0.5
      ? {
          hidden: { opacity: 0 },
          show: { opacity: 1 },
        }
      : {
          hidden: { y: -5 },
          show: { y: 5 },
        };
  }, []);

  const childrenTransition = {
    duration: 0.4,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut",
  };

  useEffect(() => {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  }, [selectedItems]);

  useEffect(() => {
    setSelectedProduct(null);
  }, [items]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <div className="w-[min(100%-4rem,1152px)] mx-auto min-h-screen">
        <div className="p-8 mb-5 sticky top-16 shadow-sm backdrop-blur-md bg-[#dddddd2f] dark:bg-black/40 dark:text-white">
          <h1 className="flex sm:items-end items-start gap-1 sm:flex-row flex-col text-3xl font-medium">
            Shopping cart
            <span className="font-medium text-sm mb-[3px] ">
              ({items.reduce((total, item) => total + item.quantity, 0)} items)
            </span>
          </h1>

          {items.length > 0 && (
            <button
              className="flex items-center gap-1 self-start ml-5 mt-5 border px-2 py-1 text-sm text-slate-600 font-medium hover:border-black/30 rounded-md group transition-colors absolute right-5 bottom-2 dark:text-white dark:border-white/20 dark:hover:border-white/40"
              onClick={() => navigate("/")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 group-hover:-translate-x-[2px] transition-transform mt-[3px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
              <span className="max-[578px]:hidden">continue shopping</span>
            </button>
          )}
        </div>
        {items.length > 0 ? (
          <div className="flex gap-5 min-[768px]:px-10 min-h-[50vh] max-[920px]:flex-col">
            <div className="flex-1 min-w-[65%]">
              {!loading ? (
                items.map((cartItem, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-black/20 dark:text-white shadow-md mb-3 flex max-[1020px]:flex-col gap-3 py-3 px-5"
                  >
                    <div
                      className="h-[200px] w-[200px] min-h-fit min-w-fit cursor-pointer"
                      onClick={() => setSelectedProduct(cartItem.product)}
                    >
                      <img
                        src={cartItem.product.image}
                        draggable={false}
                        loading="lazy"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="flex-grow py-2 flex flex-col justify-center">
                      <h1
                        className="line-clamp-2 cursor-pointer"
                        onClick={() => setSelectedProduct(cartItem.product)}
                      >
                        {cartItem.product.title}
                      </h1>
                      {cartItem.product.color ? (
                        <span className="text-sm text-zinc-400">
                          color: {cartItem.product.color.toLocaleLowerCase()}
                        </span>
                      ) : (
                        <span className="text-sm text-zinc-400">
                          brand: {cartItem.product.brand.toLocaleLowerCase()}
                        </span>
                      )}
                      <span className="text-sm text-zinc-400">
                        price: ${cartItem.product.price}
                      </span>
                      <span className="text-green-400 text-xs">In Stock</span>
                      <div className="flex items-center gap-5">
                        <span className="text-sm">Qty:</span>
                        <div className="flex basis-[20%]">
                          <button
                            className="flex-1 border border-zinc-300 grid place-content-center"
                            onClick={() => decreaseQuantity(cartItem)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M18 12H6"
                              />
                            </svg>
                          </button>
                          <div className="text-center flex-1 min-w-[33.333%] border-t border-b border-zinc-300 grid place-content-center">
                            <span className="">{cartItem.quantity}</span>
                          </div>
                          <button
                            className="flex-1 border border-zinc-300 grid place-content-center"
                            onClick={() => increaseQuantity(cartItem)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v12m6-6H6"
                              />
                            </svg>
                          </button>
                        </div>
                        <button
                          className="flex items-center text-sm border-zinc-300 p-1"
                          onClick={() => {
                            dispatch(removeProductFromCart(cartItem.product));
                            if (userInfo) {
                              dispatch(
                                removeCartItem({
                                  productId: cartItem.product._id,
                                  userId: userInfo?._id,
                                })
                              );
                            }
                            handleLocalSelectedItem(cartItem);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill=""
                            viewBox="0 0 24 24"
                            className="h-4 w-4"
                          >
                            <path
                              fill="currentColor"
                              d="M19.643 9.488c0 .068-.533 6.81-.837 9.646-.19 1.741-1.313 2.797-2.997 2.827-1.293.029-2.56.039-3.805.039-1.323 0-2.616-.01-3.872-.039-1.627-.039-2.75-1.116-2.931-2.827-.313-2.847-.837-9.578-.846-9.646a.794.794 0 0 1 .19-.558.71.71 0 0 1 .524-.234h13.87c.2 0 .38.088.523.234.134.158.2.353.181.558Z"
                              opacity=".4"
                              className="color200E32 svgShape"
                            ></path>
                            <path
                              fill="currentColor"
                              d="M21 5.977a.722.722 0 0 0-.713-.733h-2.916a1.281 1.281 0 0 1-1.24-1.017l-.164-.73C15.738 2.618 14.95 2 14.065 2H9.936c-.895 0-1.675.617-1.913 1.546l-.152.682A1.283 1.283 0 0 1 6.63 5.244H3.714A.722.722 0 0 0 3 5.977v.38c0 .4.324.733.714.733h16.573A.729.729 0 0 0 21 6.357v-.38Z"
                              className="color200E32 svgShape"
                            ></path>
                          </svg>
                          remove
                        </button>
                      </div>
                      <div className="text-right">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(cartItem.product._id)}
                          onChange={() =>
                            handleItemSelection(cartItem.product._id)
                          }
                          className="mr-8 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-4xl absolute top-1/2 left-1/2 transform -translate-1/2">
                  <motion.div
                    variants={containerVarient}
                    initial="hidden"
                    animate="show"
                    transition={{ staggerChildren: 0.1 }}
                    className="flex gap-2 p-3"
                  >
                    <motion.span
                      variants={childrenVariants}
                      transition={childrenTransition}
                      className="h-3 w-3 rounded-full bg-black"
                    ></motion.span>
                    <motion.span
                      variants={childrenVariants}
                      transition={childrenTransition}
                      className="h-3 w-3 rounded-full bg-black"
                    ></motion.span>
                    <motion.span
                      variants={childrenVariants}
                      transition={childrenTransition}
                      className="h-3 w-3 rounded-full bg-black"
                    ></motion.span>
                  </motion.div>
                </div>
              )}
            </div>
            {!loading && (
              <div className="flex-1 flex-grow h-fit bg-[#dddddd2f] dark:bg-black/20 dark:text-white shadow-md sticky top-[185px] p-5 max-[920px]:mb-10">
                <div className="text-center font-semibold text-xl pb-3 border-b dark:border-white/30">
                  <span>Order Summary</span>
                </div>
                <div className="flex mt-3 text-sm">
                  <div className="flex-1 flex flex-col">
                    <span>Price:</span>
                    <span>Delivery:</span>
                    <span>Discount:</span>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <span>${totalOriginalPrice}</span>
                    <span className="text-green-500">Free</span>
                    <span className="text-red-500">-${totalDiscount}</span>
                  </div>
                </div>
                <div className="flex my-2 py-1 relative">
                  <div className="absolute h-[1px] w-full top-0 left-0 from-transparent via-black/20 dark:via-white/30 to-transparent bg-gradient-to-r"></div>
                  <span className="flex-1 text-xl font-medium">Subtotal: </span>
                  <span className="flex-1 text-xl font-medium">
                    ${subtotal}
                  </span>
                </div>
                <div>
                  <button
                    className="text-sm bg-slate-700 dark:bg-red-500 dark:hover:bg-red-600 text-white p-2 rounded-md hover:bg-slate-800 transition-colors"
                    onClick={handleCheckout}
                  >
                    procced to pay
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex sticky top-48 flex-col items-center justify-between">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 1500 1500"
              viewBox="0 0 1500 1500"
              className="h-72 w-72"
            >
              <g
                transform="scale(1.875)"
                fill="#000000"
                className="color000 svgShape"
              >
                <rect width="800" height="800" fill="none"></rect>
                <circle
                  cx="750"
                  cy="750"
                  r="540.5"
                  fill="#e0e9f9"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  transform="translate(-23.64 -23.64) scale(.56485)"
                  className="colore0e9f9 svgShape"
                ></circle>
                <g
                  transform="rotate(3.884 1246.644 76.259) scale(1.0884)"
                  fill="#000000"
                  className="color000 svgShape"
                >
                  <polygon
                    fill="#3594dc"
                    fillRule="evenodd"
                    points="4089 2804.5 4175.2 2804.5 4175.2 2961.2 4089 2961.2"
                    clipRule="evenodd"
                    transform="matrix(.33483 0 -.1488 .88359 -425.458 -2019.43)"
                    className="color3594dc svgShape"
                  ></polygon>
                  <path
                    fill="#3594dc"
                    fillRule="evenodd"
                    d="M4234,2697.2c0,0,49-290.9,65.6-389.7c3.1-18.7,19.4-32.4,38.3-32.4h85.4c4.5,0,8.7,2,11.6,5.4					c2.9,3.4,4.1,7.9,3.4,12.3c-1.1,6.6-2.4,14.1-3.4,20.1c-1.2,7.3-7.6,12.7-15,12.7c-23.1,0-69.2,0-69.2,0l-62.6,371.7H4234z"
                    clipRule="evenodd"
                    transform="translate(-1731.77 -979.943) scale(.53333)"
                    className="color3594dc svgShape"
                  ></path>
                  <polygon
                    fill="#3594dc"
                    fillRule="evenodd"
                    points="4089 2804.5 4175.2 2804.5 4175.2 2961.2 4089 2961.2"
                    clipRule="evenodd"
                    transform="matrix(2.74912 0 -.02522 .14973 -10871.5 153.666)"
                    className="color3594dc svgShape"
                  ></polygon>
                  <path
                    fill="#4fb4f3"
                    fillRule="evenodd"
                    d="M4283,2410.7l-586.3,0c0,0,37.6,224.2,53.3,317.4c3.9,23.1,23.8,40,47.2,40c88.3,0,297,0,385.3,0					c23.4,0,43.4-16.9,47.2-40C4245.4,2634.9,4283,2410.7,4283,2410.7z"
                    clipRule="evenodd"
                    transform="translate(-2164.2 -1260.6) scale(.64172)"
                    className="color4fb4f3 svgShape"
                  ></path>
                  <path
                    fill="#1d77c7"
                    fillRule="evenodd"
                    d="M3821.7,2489.9l34.4,197.7c2.4,13.6,15.3,22.7,28.9,20.3c13.6-2.4,22.7-15.3,20.4-28.9l-34.4-197.6					c-2.4-13.6-15.3-22.7-28.9-20.4C3828.5,2463.3,3819.4,2476.3,3821.7,2489.9z"
                    clipRule="evenodd"
                    transform="translate(-1717.29 -978.37) scale(.53333)"
                    className="color1d77c7 svgShape"
                  ></path>
                  <path
                    fill="#3594dc"
                    fillRule="evenodd"
                    d="M3824.9,2508.2l31.2,179.4c2.4,13.6,15.3,22.7,28.9,20.3c13.6-2.4,22.7-15.3,20.4-28.9l-31.2-179.4					c-2.4-13.6-15.3-22.7-28.9-20.4C3831.7,2481.6,3822.6,2494.6,3824.9,2508.2z"
                    clipRule="evenodd"
                    transform="translate(-1717.29 -978.37) scale(.53333)"
                    className="color3594dc svgShape"
                  ></path>
                  <path
                    fill="#1d77c7"
                    fillRule="evenodd"
                    d="M3871,2481.3l34.3,197.6c2.4,13.6-6.8,26.6-20.4,28.9c-13.6,2.4-26.6-6.8-28.9-20.3l-34.3-197.7					c-2.4-13.6,6.8-26.5,20.4-28.9C3855.7,2458.6,3868.6,2467.7,3871,2481.3z"
                    clipRule="evenodd"
                    transform="matrix(-.53333 0 0 .53333 2509.6 -978.37)"
                    className="color1d77c7 svgShape"
                  ></path>
                  <path
                    fill="#3594dc"
                    fillRule="evenodd"
                    d="M3874.2,2500l31.1,179c2.4,13.6-6.8,26.6-20.4,28.9c-13.6,2.4-26.6-6.8-28.9-20.3l-31.1-179					c-2.4-13.6,6.8-26.6,20.4-28.9C3858.9,2477.3,3871.9,2486.4,3874.2,2500z"
                    clipRule="evenodd"
                    transform="matrix(-.53333 0 0 .53333 2509.6 -978.37)"
                    className="color3594dc svgShape"
                  ></path>
                  <circle
                    cx="4221.5"
                    cy="2934.9"
                    r="74.1"
                    fill="#4fb4f3"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    transform="rotate(-86.116 887.879 2212.744) scale(.58893)"
                    className="color4fb4f3 svgShape"
                  ></circle>
                  <circle
                    cx="4221.5"
                    cy="2934.9"
                    r="41.5"
                    fill="#ffffff"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    transform="rotate(-86.116 748.041 1248.217) scale(.33009)"
                    className="colorfff svgShape"
                  ></circle>
                  <g
                    transform="translate(-214.555)"
                    fill="#000000"
                    className="color000 svgShape"
                  >
                    <circle
                      cx="4221.5"
                      cy="2934.9"
                      r="74.1"
                      fill="#4fb4f3"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      transform="rotate(-86.116 887.879 2212.744) scale(.58893)"
                      className="color4fb4f3 svgShape"
                    ></circle>
                    <circle
                      cx="4221.5"
                      cy="2934.9"
                      r="41.5"
                      fill="#ffffff"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      transform="rotate(-86.116 748.041 1248.217) scale(.33009)"
                      className="colorfff svgShape"
                    ></circle>
                  </g>
                </g>
                <path
                  fill="#3594dc"
                  fillRule="evenodd"
                  d="M3815.9,2374.4c0,91.2-62.5,167.9-147,189.5l-31.8-189.5H3815.9z"
                  clipRule="evenodd"
                  transform="rotate(3.885 17917.271 -27187.194) scale(.58048)"
                  className="color3594dc svgShape"
                ></path>
                <g
                  transform="translate(-401.968 -24.545)"
                  fill="#000000"
                  className="color000 svgShape"
                >
                  <circle
                    cx="2723.5"
                    cy="2299.7"
                    r="171"
                    fill="#f2763d"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    transform="translate(-852.633 -964.234) scale(.53333)"
                    className="colorf2763d svgShape"
                  ></circle>
                  <path
                    fill="#ed3f07"
                    d="M2771.9,2305.3c0-4.6-0.7-8.1-2-10.6c-1.3-2.5-3.2-3.8-5.7-3.8c-2.4,0-4.3,1.2-5.6,3.8					c-1.3,2.5-1.9,6-1.9,10.6s0.6,8.1,1.9,10.7c1.3,2.5,3.1,3.8,5.6,3.8c2.4,0,4.3-1.3,5.7-3.8					C2771.2,2313.4,2771.9,2309.9,2771.9,2305.3z M2785.2,2305.3c0,4-0.5,7.6-1.6,10.7c-1,3.1-2.5,5.7-4.3,7.9					c-1.9,2.1-4.1,3.7-6.6,4.8c-2.6,1.1-5.4,1.6-8.4,1.6c-3.1,0-5.9-0.5-8.5-1.6c-2.6-1.1-4.8-2.7-6.6-4.8c-1.8-2.1-3.3-4.7-4.3-7.9					c-1-3.1-1.5-6.7-1.5-10.7s0.5-7.6,1.5-10.7c1-3.1,2.5-5.7,4.3-7.8c1.9-2.1,4.1-3.7,6.6-4.8c2.6-1.1,5.4-1.6,8.5-1.6					c3,0,5.8,0.6,8.4,1.6c2.6,1.1,4.8,2.7,6.6,4.8c1.8,2.1,3.3,4.7,4.3,7.8C2784.7,2297.7,2785.2,2301.3,2785.2,2305.3z"
                    transform="translate(-5171.21 -4548.84) scale(2.0901)"
                    className="colored3f07 svgShape"
                  ></path>
                  <path
                    fill="#ffffff"
                    d="M2771.9,2305.3c0-4.6-0.7-8.1-2-10.6c-1.3-2.5-3.2-3.8-5.7-3.8c-2.4,0-4.3,1.2-5.6,3.8					c-1.3,2.5-1.9,6-1.9,10.6s0.6,8.1,1.9,10.7c1.3,2.5,3.1,3.8,5.6,3.8c2.4,0,4.3-1.3,5.7-3.8					C2771.2,2313.4,2771.9,2309.9,2771.9,2305.3z M2785.2,2305.3c0,4-0.5,7.6-1.6,10.7c-1,3.1-2.5,5.7-4.3,7.9					c-1.9,2.1-4.1,3.7-6.6,4.8c-2.6,1.1-5.4,1.6-8.4,1.6c-3.1,0-5.9-0.5-8.5-1.6c-2.6-1.1-4.8-2.7-6.6-4.8c-1.8-2.1-3.3-4.7-4.3-7.9					c-1-3.1-1.5-6.7-1.5-10.7s0.5-7.6,1.5-10.7c1-3.1,2.5-5.7,4.3-7.8c1.9-2.1,4.1-3.7,6.6-4.8c2.6-1.1,5.4-1.6,8.5-1.6					c3,0,5.8,0.6,8.4,1.6c2.6,1.1,4.8,2.7,6.6,4.8c1.8,2.1,3.3,4.7,4.3,7.8C2784.7,2297.7,2785.2,2301.3,2785.2,2305.3z"
                    transform="translate(-5176.68 -4558.37) scale(2.0901)"
                    className="colorfff svgShape"
                  ></path>
                </g>
                <g
                  transform="translate(-1430.73 1262.04) scale(.7358)"
                  fill="#000000"
                  className="color000 svgShape"
                >
                  <path
                    fill="#f2763d"
                    d="M3631.3,244.3c-0.5,0-1.1-0.1-1.6-0.2l-97.7-23.7c-3.7-0.9-6-4.6-5.1-8.3c0.9-3.7,4.6-6,8.3-5.1l97.7,23.7					c3.7,0.9,6,4.6,5.1,8.3C3637.2,242.2,3634.4,244.3,3631.3,244.3z"
                    transform="translate(-631.561 -1639.04) scale(.73655)"
                    className="colorf2763d svgShape"
                  ></path>
                  <path
                    fill="#f2763d"
                    d="M3621.4,260.8c-2.8,0-5.4-1.7-6.4-4.4l-29.7-77.5c-1.4-3.6,0.4-7.5,4-8.9c3.6-1.4,7.5,0.4,8.9,4l29.7,77.5					c1.4,3.6-0.4,7.5-4,8.9C3623.1,260.6,3622.2,260.8,3621.4,260.8z"
                    transform="translate(-543.978 -1733.64) scale(.73655)"
                    className="colorf2763d svgShape"
                  ></path>
                  <path
                    fill="#f2763d"
                    d="M3631.3,244.3c-1.8,0-3.5-0.7-4.9-2l-92.7-92.7c-2.7-2.7-2.7-7.1,0-9.7c2.7-2.7,7.1-2.7,9.7,0l92.7,92.7					c2.7,2.7,2.7,7.1,0,9.7C3634.8,243.6,3633.1,244.3,3631.3,244.3z"
                    transform="translate(-606.998 -1687.36) scale(.73655)"
                    className="colorf2763d svgShape"
                  ></path>
                </g>
              </g>
            </svg>
            <h1 className="text-2xl font-medium -mt-5 dark:text-white">your cart is empty</h1>
            <button
              className="flex items-center gap-1 self-start ml-5 mt-5 border px-2 py-[5px] bg-slate-800 hover:bg-slate-900 text-sm text-white rounded-md group transition-colors"
              onClick={() => navigate("/")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 group-hover:-translate-x-[2px] transition-transform mt-[3px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
              continue shopping
            </button>
          </div>
        )}
      </div>
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetails
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Cart;
