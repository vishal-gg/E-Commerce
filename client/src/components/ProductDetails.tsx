import { AnimatePresence, easeInOut, motion } from "framer-motion";
import { data } from "../types/productType";
import { useAppDispatch, useAppSelector } from "../types/storeType";
import { addProductToCart, addToCart } from "../features/cartSlice";
import { CartItem } from "../features/cartSlice";
import { useEffect, useState } from "react";
import { calculateDiscount } from "../utils/calculateDiscounts";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { loadStripe } from "@stripe/stripe-js";

interface propsType {
  selectedProduct: data | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<data | null>>;
}
const ProductDetails = ({ selectedProduct, setSelectedProduct }: propsType) => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.Cart);
  const { userInfo } = useAppSelector((state) => state.Authentication);
  const [ifItemExistsOnCart, setIfItemExistsOnCart] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const item = items.find(
      (item) => item.product._id === selectedProduct?._id
    );
    setIfItemExistsOnCart(!!item);
  }, [items.length]);

  const handleProductDispatch = (product: data | null) => {
    if (!product) return;

    const item = items.find(
      (item) => item.product._id === selectedProduct?._id
    );

    dispatch(addProductToCart(product));
    if (userInfo) {
      dispatch(
        addToCart({
          productId: product._id,
          userId: userInfo._id,
          quantity: item?.quantity,
        })
      );
    }

    // persist cart items to local storage
    const cart = localStorage.getItem("cart");
    let cartItems: CartItem[] = cart ? JSON.parse(cart) : [];

    const productIndex = cartItems.findIndex(
      (item) => item.product._id === product._id
    );

    // If the product is already in the cart, increase the quantity
    if (productIndex !== -1) {
      cartItems[productIndex].quantity += 1;
    }
    // Otherwise, add the product with a quantity of 1
    else {
      cartItems.push({ product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  const location = useLocation();
  const isCartPage = location.pathname === "/cart";

  // const handleBuyProduct = async () => {
  //   if (!userInfo) return toast.error('sign In to procced');
  //   const itemsToCheckout = [{ product: selectedProduct, quantity: 1 }];

  //   try {
  //     toast.loading("loading..");
  //     const stripePromise = loadStripe(
  //       "pk_test_51NietrSCComPL4dLLvGZWGEBRtYC7XauF1qoDhIYTJGjNJ2f3oqzTcMkQPsPk837Lkmfmg6IwwL0XXmf59y5T3WP008P7lZS66"
  //     );
  //     const stripe = await stripePromise;
  //     const res = await axios.post(
  //       "http://localhost:5000/create-checkout-session",
  //       { itemsToCheckout }
  //     );

  //     if (res.status === 200) {
  //       toast.dismiss();
  //       stripe?.redirectToCheckout({ sessionId: res.data.session_id });
  //     }
  //   } catch (err: any) {
  //     console.log(err.message);
  //     toast.dismiss()
  //   }
  // };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-black/50 backdrop-blur-sm fixed inset-0 z-50 w-full"
      onClick={() => setSelectedProduct(null)}
    >
      <motion.div
        className="fixed inset-40 max-[1300px]:left-20 max-[1300px]:right-20 top-5 bottom-5 min-[1300px]:bottom-16 min-[1300px]:top-16 backdrop-blur-md rounded-2xl shadow-md max-[1300px]:overflow-y-scroll bg-white productDetailScrollBar"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className="absolute top-3 right-3 cursor-pointer hover:bg-red-500 text-red-500 hover:text-white transition-colors rounded-sm px-1"
          onClick={() => setSelectedProduct(null)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
        <div className="h-full flex max-[1300px]:flex-col items-center min-[1300px]:justify-center p-5">
          <motion.img
          initial={{translateX: -5, opacity: 0}}
          animate={{translateX: 0, opacity: 1}}
          transition={{delay: .1, ease: easeInOut}}
            src={selectedProduct?.image}
            className="w-1/2 max-h-full object-contain mr-auto flex-1 min-w-[50%] max-[1300px]:mx-auto"
            draggable={false}
          />
          <hr className="bg-gradient-to-b from-transparent via-zinc-300 to-transparent h-full w-[1px] hidden sm:block" />
          <motion.div
          variants={{hidden: {opacity: 0, scale: .99}, show: {opacity: 1, scale: 1}}}
          initial="hidden"
          animate="show"
          transition={{delay: .2, ease: easeInOut}}
          className="flex flex-col gap-5 flex-1 p-5 pl-10 origin-center w-[80%]">
            <span className="text-xl font-semibold line-clamp-3">
              {selectedProduct?.title}
            </span>
            {selectedProduct?.discount !== undefined ? (
              <div className="flex gap-2">
                <div>
                  <span className="text-lg line-through pr-2 text-zinc-400">
                    {selectedProduct?.price}
                  </span>
                  <span className="text-3xl font-medium">
                    <span className="text-green-500">$</span>
                    {calculateDiscount(
                      selectedProduct?.price,
                      selectedProduct?.discount
                    )?.newAmount || selectedProduct.price}
                  </span>
                </div>
                <div className="flex items-center gap-[2px]">
                  <span className="flex justify-center items-center bg-red-500 text-white text-[12px] h-5 w-5 rounded-full p-[12px]">
                    {selectedProduct?.discount}%
                  </span>
                  <span className="font-medium text-zinc-500">off</span>
                </div>
              </div>
            ) : (
              <>
                <div className="text-3xl font-medium">
                  <span className="text-green-500">$</span>
                  {selectedProduct?.price}
                </div>
              </>
            )}
            <div className="text-sm">
              <div className="flex gap-5">
                <div className="flex flex-col">
                  <span className="font-semibold">Brand:</span>
                  <span className="font-semibold">Model:</span>
                  {selectedProduct?.color && (
                    <span className="font-semibold">Color:</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <span>{selectedProduct?.brand.toUpperCase()}</span>
                  <span>{selectedProduct?.model.toUpperCase()}</span>
                  {selectedProduct?.color && (
                    <span>{selectedProduct?.color.toUpperCase()}</span>
                  )}
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-1 text-sm">
                About this product:
              </h3>
              <span className="whitespace-break-spaces line-clamp-5 text-sm">
                {selectedProduct?.description}
              </span>
            </div>
            <div className="flex gap-3 w-[100%] xl:w-[60%]">
              <div className="w-full lg:w-[60%] relative h-8">
                <AnimatePresence>
                  {!ifItemExistsOnCart ? (
                    <motion.button
                    key="AddToCart"
                    exit={{rotateX: 90, opacity: 0, scale: .9}}
                    transition={{duration: .1, ease: 'easeInOut'}}
                      className={`p-1 bg-[#3F4E4F] hover:bg-[#2C3639] ${
                        ifItemExistsOnCart && "bg-blue-600"
                      } transition-colors flex items-center gap-1 text-white px-3 text-sm rounded-full shadow-md absolute inset-0`}
                      onClick={() => {
                        handleProductDispatch(selectedProduct);
                        toast.success("added to cart");
                        if (isCartPage) {
                          setSelectedProduct(null);
                        }
                        let item = localStorage.getItem("selectedItems");
                        let selectedItems = item && JSON.parse(item);
                        let updatedItem = selectedItems.push(selectedProduct?._id);
                        localStorage.setItem(
                          "selectedItems",
                          JSON.stringify(updatedItem)
                        );
                      }}
                    >
                      <div className="absolute inset-0 flex justify-center items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 mb-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                          />
                        </svg>
                        <span className="whitespace-nowrap">Add to Cart</span>
                      </div>
                    </motion.button>
                  ) : (
                    <motion.button
                    initial={{rotateX: -90, opacity: 0, scale: .9}}
                    animate={{rotateX: 0, opacity: 1, scale: 1}}
                    transition={{duration: .1, delay: .1, ease: 'easeInOut'}}
                    key="GoToCart"
                      className={`p-1 bg-[#5C5470] hover:bg-[#352F44] transition-colors flex items-center gap-1 text-white px-3 text-sm rounded-full shadow-md absolute inset-0`}
                      onClick={() => {
                        navigate("/cart");
                        isCartPage && setSelectedProduct(null);
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 mb-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                          />
                        </svg>
                        <span className="whitespace-nowrap">Go to Cart</span>
                      </div>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
              {/* <button
                onClick={() => {
                  if (!userInfo) handleProductDispatch(selectedProduct);
                  handleBuyProduct();
                }}
                className="p-1 px-3 rounded-full text-sm font-medium border border-black/30 hover:border-black transition-colors flex-1 whitespace-nowrap"
              >
                Buy Now
              </button> */}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductDetails;
