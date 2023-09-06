import { useAppSelector, useAppDispatch } from "../types/storeType";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { clearAllCartItems } from "../features/cartSlice";
import { useMemo, useState, useEffect } from "react";
import { AnimatePresence, Variants } from "framer-motion";
import { motion } from "framer-motion";
import LoginScreen from "./Login";
import { toast } from "react-hot-toast";
import {useCombinedContext} from '../hooks/combinedContext';

const Header = () => {
  const navigate = useNavigate();
  const { items } = useAppSelector((state) => state.Cart);
  const { userInfo, loading, error } = useAppSelector(
    (state) => state.Authentication
  );
  const { products } = useAppSelector((state) => state.Products);
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");
  const [activeModel, setActiveModel] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [userDrawerOpen, setUserDrawerOpen] = useState(false);
  const [closeOnBlur, setCloseOnBlur] = useState(true);
  const {activeSignInModel, setActiveSignInModel, setSelectedProduct} = useCombinedContext();
  const [themePreference, setThemePreference] = useState(()=>{
    const selectedTheme = localStorage.getItem('themePreference')
    return selectedTheme ? selectedTheme  : 'light';
  });

  const handleThemePreference = () => {
    setThemePreference((prev: string) => {
      if(prev === 'light') {
        localStorage.setItem('themePreference', 'dark')
        return 'dark'
      } else {
        localStorage.setItem('themePreference', 'light')
        return 'light'
      }
    })
  }

  const searchedProduct = useMemo(() => {
    if (query.trim() === "") return [];

    return products?.filter((item) => {
      return item?.title.toLowerCase().includes(query.toLowerCase());
    });
  }, [query, products]);

  const itemVariants: Variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 200, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  const [notifications, setNotifications] = useState([
    "Welcome to my shop. Please buy everything.",
    "Happy shopping 😊!",
  ]);

  useEffect(() => {
    loading ? toast.loading("Loading..") : toast.dismiss();
    error && toast.error(error.toLocaleLowerCase());
    return () => toast.dismiss();
  }, [loading, error]);


  useEffect(()=> {
    const html = document.querySelector('html')
    themePreference === 'dark' ? html?.setAttribute('class', 'dark') : html?.setAttribute('class', 'light')
  }, [themePreference])

  return (
    <header
      onClick={() => setActiveModel(false)}
      className="bg-white dark:bg-gray-900 dark:text-white fixed top-0 left-0 z-40 w-full h-16 flex items-center shadow-md"
    >
      <div className="flex justify-between w-[min(100%-6rem,1380px)] mx-auto h-[70%]">
        <div className="flex items-end gap-1 text-sm mb-2">
          <span className="w-8 h-8" 
          onClick={() => navigate('/')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.36 48.82">
              <g
                data-name="Layer 2"
                fill="#000000"
                className="color000 svgShape"
              >
                <g
                  data-name="Layer 1"
                  fill="#000000"
                  className="color000 svgShape"
                >
                  <path
                    fill="#ff491f"
                    d="M37.17 48.82H0L3.77 12.5H33.4l.6 6.06Z"
                    className="colorff491f svgShape"
                  ></path>
                  <path
                    fill="#ed3618"
                    d="M19.09 24.24h20.59l2.62 24.58H16.47Z"
                    className="colored3618 svgShape"
                  ></path>
                  <path
                    fill="#ffe14d"
                    d="M21.15 24.24h20.59l2.62 24.58H18.53Z"
                    className="colorffe14d svgShape"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M26.58 16.79a.74.74 0 0 1-.74-.74V8.73a7.26 7.26 0 1 0-14.51 0v7.33a.74.74 0 1 1-1.47 0V8.73a8.73 8.73 0 0 1 17.46 0v7.33a.74.74 0 0 1-.74.73zM31.45 39a5.51 5.51 0 0 1-5.51-5.51v-4.76a.74.74 0 1 1 1.47 0v4.77a4 4 0 0 0 8.07 0v-4.77a.74.74 0 0 1 1.47 0v4.77a5.51 5.51 0 0 1-5.5 5.5z"
                    className="dark:text-white text-slate-700 svgShape"
                  ></path>
                </g>
              </g>
            </svg>
          </span>
          <span>eShop</span>
          <span onClick={handleThemePreference} className="text-sm font-semibold">{themePreference}</span>
        </div>
        <div
          className="w-[55%] flex relative 378:mx-6 mx-2"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            className="pl-12 pr-10 w-full border rounded-xl outline-orange-300 dark:outline-slate-800 dark:border-none outline-offset-1 dark:bg-gray-800"
            type="search"
            placeholder="Search the product"
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setActiveModel(true)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 absolute left-2 top-[10px] ${
              activeModel && "rotate-90"
            } transition-transform`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <AnimatePresence>
          {activeModel && (
            <>
              {searchedProduct && searchedProduct.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 w-full top-16 bg-black/50 backdrop-blur-sm pr-20 md:pl-0 pl-20 max-[375px]:p-0"
                  onClick={() => setActiveModel(false)}
                >
                  <div
                    className="md:w-1/2 w-full mx-auto pb-14 overflow-auto h-screen backdrop-blur-lg searchScrollBar"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {searchedProduct.slice(0, 10).map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ y: -5, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.04 }}
                        className="w-full flex gap-2 items-center cursor-pointer hover:bg-black/30 group transition-colors relative py-2 px-5"
                        onClick={() => {
                          setActiveModel(false);
                          setSelectedProduct(item);
                        }}
                      >
                        <img
                          src={item.image}
                          alt="404"
                          className="w-[10%] min-w-[80px] group-hover:scale-[1.03] transition-transform"
                        />
                        <div className="flex flex-col text-sm text-white">
                          <span className="line-clamp-1">{item.title}</span>
                          <span className="text-xl">
                            <span className="text-green-500">$</span>
                            {item.price}
                          </span>
                          <span className="absolute h-[1px] w-full bottom-0 left-0 from-transparent via-white/50 to-transparent bg-gradient-to-r"></span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                query && (
                  <motion.div
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 w-full top-16 bg-black/50 backdrop-blur-sm pr-20"
                  >
                    <div className="w-1/2 mx-auto pb-14 overflow-auto h-1/2 backdrop-blur-lg grid place-content-center text-white text-sm font-medium">
                      <motion.span
                        initial={{ y: 20 }}
                        animate={{ y: 10 }}
                        className="flex flex-col justify-center items-center gap-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          className="h-16 w-16 mr-2"
                        >
                          <path
                            fill="#ebebed"
                            d="M18.6188 4.85133C14.817 1.04956 8.65311 1.04956 4.85133 4.85133C1.04956 8.65311 1.04956 14.817 4.85133 18.6188C8.41438 22.1818 14.0522 22.4056 17.8758 19.29L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L19.29 17.8758C22.4056 14.0522 22.1818 8.41438 18.6188 4.85133Z"
                            className="colorEBEBED svgShape"
                          ></path>
                          <path
                            fill="#fa1228"
                            d="M9.73222 15.182C9.3417 15.5725 8.70853 15.5725 8.31801 15.182C7.92748 14.7915 7.92748 14.1583 8.31801 13.7678L10.0858 12L8.31803 10.2322C7.92751 9.84171 7.92751 9.20855 8.31803 8.81802C8.70856 8.4275 9.34172 8.4275 9.73225 8.81802L11.5 10.5858L13.2678 8.81802C13.6583 8.42749 14.2914 8.42749 14.682 8.81802C15.0725 9.20854 15.0725 9.84171 14.682 10.2322L12.9142 12L14.682 13.7678C15.0725 14.1583 15.0725 14.7915 14.682 15.182C14.2915 15.5725 13.6583 15.5725 13.2678 15.182L11.5 13.4142L9.73222 15.182Z"
                            className="colorFA1228 svgShape"
                          ></path>
                        </svg>
                        No Item Found !
                      </motion.span>
                    </div>
                  </motion.div>
                )
              )}
            </>
          )}
        </AnimatePresence>
        <div className="flex items-center gap-4 sm:gap-10 relative">
          <motion.div
            className="relative cursor-pointer"
            tabIndex={0}
            whileTap={{ scale: 0.85 }}
            onClick={() => setNotifyOpen(!notifyOpen)}
            onBlur={() => closeOnBlur && setNotifyOpen(false)}
          >
            <motion.svg
              className="h-6 w-6 outline-none pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
            >
              <g
                data-name="Layer 24"
                fill="#000000"
                className="color000 svgShape"
              >
                <path
                  fill="#f4b442"
                  d="M19.66,26.34A3.66,3.66,0,1,1,16,22.68,3.66,3.66,0,0,1,19.66,26.34Z"
                  className="colorf4b442 svgShape"
                ></path>
                <path
                  fill="#ffd066"
                  d="M28.19,25.32a2.07,2.07,0,0,1-1.84,1H5.65A2,2,0,0,1,4.09,22.9L5.86,21a1,1,0,0,0,.27-.68V12.78a7.32,7.32,0,0,1,7.32-7.32h0V4.55A2.55,2.55,0,0,1,16,2h0a2.55,2.55,0,0,1,2.55,2.55v.91h0a7.32,7.32,0,0,1,7.32,7.32v7.54a1,1,0,0,0,.27.68l1.77,1.9A2.07,2.07,0,0,1,28.19,25.32Z"
                  className="colorffd066 svgShape"
                ></path>
              </g>
            </motion.svg>
            {notifications.length > 0 && (
              <span className="bg-red-500 absolute right-[3px] top-1 h-[6px] w-[6px] rounded-full"></span>
            )}
          </motion.div>
          <motion.div
            onMouseEnter={() => setCloseOnBlur(false)}
            onMouseLeave={() => setCloseOnBlur(true)}
            layout
            className={`absolute -left-24 top-[122%] backdrop-blur-md bg-black/5 dark:bg-black/40 overflow-hidden shadow-md w-[150%] rounded-b-sm selection:bg-none`}
            initial={false}
            animate={notifyOpen ? "open" : "closed"}
          >
            <motion.ul
              variants={{
                open: {
                  height: "auto",
                  transition: {
                    type: "spring",
                    bounce: 0,
                    duration: 0.7,
                    delayChildren: 0.05,
                    staggerChildren: 0.05,
                  },
                },
                closed: {
                  height: 0,
                  transition: {
                    type: "spring",
                    bounce: 0,
                    duration: 0.3,
                  },
                },
              }}
              style={{ pointerEvents: notifyOpen ? "auto" : "none" }}
            >
              {notifications.length > 0 ? (
                notifications.map((msg, i) => (
                  <motion.li
                    key={i}
                    className="px-5 pt-3"
                    variants={itemVariants}
                  >
                    <p className="text-sm leading-[1.1rem]">{msg}</p>
                  </motion.li>
                ))
              ) : (
                <motion.li
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm pb-5 text-center font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="h-28 w-28 mx-auto"
                  >
                    <g
                      data-name="no notification"
                      fill="#000000"
                      className="color000 svgShape"
                    >
                      <path
                        fill="none"
                        d="M416 512H96a96 96 0 0 1-96-96V96A96 96 0 0 1 96 0h320a96 96 0 0 1 96 96v320a96 96 0 0 1-96 96Zm0 0"
                        data-name="Path 28"
                      ></path>
                      <path
                        fill="#ffd200"
                        d="M256 384a40.052 40.052 0 0 0 39.184-32H216.8a40.082 40.082 0 0 0 39.2 32Zm0 0"
                        data-name="Path 29"
                        className="colorffd200 svgShape"
                      ></path>
                      <path
                        fill="#ffd200"
                        d="M356.031 308.4a71.451 71.451 0 0 1-25.375-54.672V224a74.721 74.721 0 0 0-64-73.809v-11.52a10.664 10.664 0 1 0-21.328 0v11.52a74.708 74.708 0 0 0-64 73.809v29.742a71.552 71.552 0 0 1-25.473 54.758A18.667 18.667 0 0 0 168 341.343h176a18.668 18.668 0 0 0 12.031-32.943Zm0 0"
                        data-name="Path 30"
                        className="colorffd200 svgShape"
                      ></path>
                      <path
                        fill="#ffe466"
                        d="M373.328 384a10.6 10.6 0 0 1-7.535-3.121L131.121 146.207a10.667 10.667 0 0 1 15.086-15.086l234.672 234.672A10.664 10.664 0 0 1 373.328 384Zm0 0"
                        data-name="Path 31"
                        className="colorffe466 svgShape"
                      ></path>
                    </g>
                  </svg>
                  <p className="-mt-5">empty</p>
                </motion.li>
              )}
              {notifications.length > 0 ? (
                <motion.button
                  onClick={() => {
                    setNotifications([]);
                    setTimeout(() => {
                      setNotifyOpen(false);
                    }, 1000);
                  }}
                  variants={itemVariants}
                  className="text-right py-2 w-full mb-2"
                >
                  <span className="text-xs font-medium bg-slate-800 dark:bg-red-500 py-[6px] px-2 mr-5 rounded-sm text-white">
                    dismiss
                  </span>
                </motion.button>
              ) : null}
            </motion.ul>
          </motion.div>
          <motion.span
            whileTap={{ scale: 0.85 }}
            onClick={() => navigate("/cart")}
            className="relative"
          >
            <svg
              className="h-6 w-6 cursor-pointer outline-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 92 92"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 0 }}
                d="M91.8 27.3 81.1 61c-.8 2.4-2.9 4-5.4 4H34.4c-2.4 0-4.7-1.5-5.5-3.7L13.1 19H4c-2.2 0-4-1.8-4-4s1.8-4 4-4h11.9c1.7 0 3.2 1.1 3.8 2.7L36 57h38l8.5-27H35.4c-2.2 0-4-1.8-4-4s1.8-4 4-4H88c1.3 0 2.5.7 3.2 1.7.8 1 1 2.4.6 3.6zm-55.4 43c-1.7 0-3.4.7-4.6 1.9-1.2 1.2-1.9 2.9-1.9 4.6 0 1.7.7 3.4 1.9 4.6 1.2 1.2 2.9 1.9 4.6 1.9s3.4-.7 4.6-1.9c1.2-1.2 1.9-2.9 1.9-4.6 0-1.7-.7-3.4-1.9-4.6-1.2-1.2-2.9-1.9-4.6-1.9zm35.9 0c-1.7 0-3.4.7-4.6 1.9s-1.9 2.9-1.9 4.6c0 1.7.7 3.4 1.9 4.6 1.2 1.2 2.9 1.9 4.6 1.9 1.7 0 3.4-.7 4.6-1.9 1.2-1.2 1.9-2.9 1.9-4.6 0-1.7-.7-3.4-1.9-4.6s-2.9-1.9-4.6-1.9z"
                fill="currentColor"
              ></motion.path>
            </svg>
            <AnimatePresence>
              {items.length > 0 && (
                <motion.span
                  key={items.reduce((total, item) => total + item.quantity, 0)}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  style={{ aspectRatio: 1 }}
                  className="bg-red-400 w-5 rounded-full text-white text-xs flex items-center justify-center absolute -top-2 -right-2 pointer-events-none"
                >
                  <span className="absolute">
                    {items.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.span>
          <motion.div
            className="relative cursor-pointer"
            tabIndex={0}
            whileTap={{ scale: 0.85 }}
            onClick={() => setUserDrawerOpen((prev) => !prev)}
            onBlur={() => closeOnBlur && setUserDrawerOpen(false)}
          >
            <svg
              className="h-6 w-6 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
            >
              <rect width="256" height="256" fill="none"></rect>
              <circle
                cx="128"
                cy="96"
                r="64"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="20"
                className="dark:stroke-white colorStroke000 svgStroke"
              ></circle>
              <path
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="20"
                d="M30.989,215.99064a112.03731,112.03731,0,0,1,194.02311.002"
                className="dark:stroke-white colorStroke000 svgStroke"
              ></path>
            </svg>
            {userInfo && (
              <span className="w-[5px] h-[5px] bg-green-500 rounded-full inline-block absolute top-1 -right-[2px]"></span>
            )}
          </motion.div>
          <motion.div
            onMouseEnter={() => setCloseOnBlur(false)}
            onMouseLeave={() => setCloseOnBlur(true)}
            layout
            className={`absolute left-8 top-[122%] backdrop-blur-md bg-black/5 dark:hover:bg-black/40 overflow-hidden shadow-md w-full rounded-b-sm selection:bg-none`}
            initial={false}
            animate={userDrawerOpen ? "open" : "closed"}
          >
            <motion.div
              variants={{
                open: {
                  height: "auto",
                  transition: {
                    type: "spring",
                    bounce: 0,
                    duration: 0.7,
                    delayChildren: 0.05,
                    staggerChildren: 0.05,
                  },
                },
                closed: {
                  height: 0,
                  transition: {
                    type: "spring",
                    bounce: 0,
                    duration: 0.3,
                  },
                },
              }}
            >
              {userInfo ? (
                <motion.button
                  variants={itemVariants}
                  className="text-sm p-3 text-center font-medium w-full hover:bg-white/50 dark:bg-black/30 transition-colors duration-100"
                  onClick={async () => {
                    setUserDrawerOpen(false);
                    toast.loading("loading..");
                    const res = await dispatch(logout());
                    toast.dismiss();
                    if (res.type.split("/").pop() === "fulfilled") {
                      dispatch(clearAllCartItems());
                      localStorage.removeItem("selectedItems");
                      setUserDrawerOpen(false);
                      navigate("/");
                      toast.success("logged out successfully");
                    }
                  }}
                >
                  Logout
                </motion.button>
              ) : (
                <motion.button
                  variants={itemVariants}
                  className={`text-sm p-3 text-center font-medium w-full hover:bg-white/50 transition-colors duration-100 dark:bg-black/30`}
                  onClick={() => {
                    setActiveSignInModel(true);
                    setUserDrawerOpen(false);
                  }}
                >
                  sign In
                  {/* <div className="flex justify-center items-center gap-1">
                    <span>sign In</span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="h-6 w-6 mt-1"
                      >
                        <path
                          fill="#fa1228"
                          d="M14.2929 9.29289C13.9024 9.68342 13.9024 10.3166 14.2929 10.7071L17.2929 13.7071C17.6834 14.0976 18.3166 14.0976 18.7071 13.7071C19.0976 13.3166 19.0976 12.6834 18.7071 12.2929L17.4142 11L21 11C21.5523 11 22 10.5523 22 10C22 9.44772 21.5523 9 21 9L17.4142 9L18.7071 7.70711C19.0976 7.31658 19.0976 6.68342 18.7071 6.29289C18.3166 5.90237 17.6834 5.90237 17.2929 6.29289L14.2929 9.29289Z"
                          className="colorFA1228 svgShape"
                        ></path>
                        <path
                          fill="#ebebed"
                          d="M5 2C3.34315 2 2 3.34315 2 5V15.439C2 16.5105 2.50641 17.5451 3.39946 18.1451L8.39946 21.5041C9.41576 22.1868 10.6011 22.1229 11.5031 21.5668C12.3957 21.0165 13 19.9998 13 18.7979V18C14.6569 18 16 16.6569 16 15V13.5H14V15C14 15.5523 13.5523 16 13 16V9.56102C13 8.48946 12.4936 6.45486 11.6005 5.85492L8.83941 4H13C13.5523 4 14 4.44772 14 5V6.5H16V5C16 3.34315 14.6569 2 13 2H5Z"
                          className="colorEBEBED svgShape"
                        ></path>
                      </svg>
                    </span>
                  </div> */}
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
      {activeSignInModel && (
        <LoginScreen setActiveSignInModel={setActiveSignInModel} />
      )}
    </header>
  );
};

export default Header;
