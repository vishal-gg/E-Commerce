// import Lottie from "react-lottie";
// import animationData from "../lotties/failed.json";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

const PaymentFailed = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // const defaultOptions = {
  //   loop: false,
  //   autoplay: true,
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };

  useEffect(() => {
    let timer: number;
    timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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

  return (
    <>
      <div className="fixed inset-0 top-16 backdrop-blur-3xl z-30 flex flex-col justify-center items-center">
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs font-medium flex flex-col items-center">
          <span className="text-gray-500 dark:text-white/50">All rights reserved.</span>
          <div className="flex gap-1">
            <span>💌</span>
          </div>
          </div>
        {!loading ? (
          <motion.div
          initial={{opacity: .5, scale: .9}}
          animate={{opacity: 1, scale: 1}}
          transition={{type: 'tween', duration: 1}}
          className="flex flex-col gap-2 items-center py-8 px-28 bg-zinc-100 rounded-md shadow-md">
            <div className="relative w-fit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                data-name="Layer 1"
                viewBox="0 0 500 500"
                className="w-28 h-28"
              >
                <defs>
                  <linearGradient
                    id="a"
                    x1="-8.48"
                    x2="-8.48"
                    y1="430.19"
                    y2="429.23"
                    gradientTransform="matrix(368.9 0 0 -333.33 3376.66 143549.17)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      offset="0"
                      stopColor="#ffca4f"
                      className="stopColorffca4f svgShape"
                    ></stop>
                    <stop
                      offset="1"
                      stopColor="#f7ae30"
                      className="stopColorf7ae30 svgShape"
                    ></stop>
                  </linearGradient>
                  <linearGradient
                    id="b"
                    x1="-8.33"
                    x2="-8.33"
                    y1="431.32"
                    y2="430.35"
                    gradientTransform="matrix(52.08 0 0 -52.08 595.17 22611.67)"
                  ></linearGradient>
                  <linearGradient
                    id="c"
                    x1="-8.33"
                    x2="-8.33"
                    y1="431.32"
                    y2="430.35"
                    gradientTransform="matrix(52.08 0 0 -52.08 772.25 22611.67)"
                  ></linearGradient>
                  <linearGradient
                    id="d"
                    x1="-8.46"
                    x2="-8.46"
                    y1="430.4"
                    y2="429.43"
                    gradientTransform="matrix(208.33 0 0 -166.67 2011.83 71757.5)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      offset="0"
                      stopColor="#3f4c56"
                      className="stopColor3f4c56 svgShape"
                    ></stop>
                    <stop
                      offset="1"
                      stopColor="#27333e"
                      className="stopColor27333e svgShape"
                    ></stop>
                  </linearGradient>
                  <linearGradient
                    id="e"
                    x1="-8.48"
                    x2="-8.48"
                    y1="431.1"
                    y2="430.14"
                    gradientTransform="matrix(367.86 0 0 -62.5 3367.29 27361.67)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      offset="0"
                      stopColor="#ffca4f"
                      stopOpacity="0"
                      className="stopColorffca4f svgShape"
                    ></stop>
                    <stop
                      offset="1"
                      stopColor="#f4901f"
                      className="stopColorf4901f svgShape"
                    ></stop>
                  </linearGradient>
                </defs>
                <g
                  data-name="Shopping Bag"
                  fill="#000000"
                  className="color000 svgShape"
                >
                  <path
                    fill="url(#a)"
                    d="M413.54,479.17H86.46a20.81,20.81,0,0,1-20.83-22.92L93.75,164.58a21.31,21.31,0,0,1,20.83-18.75H385.42a21.31,21.31,0,0,1,20.83,18.75l28.13,291.67C435.42,468.75,425,479.17,413.54,479.17Z"
                  ></path>
                  <g
                    data-name="Path"
                    fill="#000000"
                    className="color000 svgShape"
                  >
                    <path
                      fill="url(#b)"
                      d="M161.46,197.92a25.79,25.79,0,0,0,26-26v-26H135.42v26A25.79,25.79,0,0,0,161.46,197.92Z"
                    ></path>
                    <path
                      fill="url(#c)"
                      d="M338.54,197.92a25.79,25.79,0,0,0,26-26v-26H312.5v26A25.79,25.79,0,0,0,338.54,197.92Z"
                    ></path>
                  </g>
                  <path
                    fill="url(#d)"
                    d="M145.83,125v46.88a16,16,0,0,0,15.63,15.63h0a16,16,0,0,0,15.63-15.62V125A72.47,72.47,0,0,1,250,52.08h0A72.47,72.47,0,0,1,322.92,125v46.88a16,16,0,0,0,15.63,15.63h0a16,16,0,0,0,15.63-15.62V125c0-57.29-46.87-104.17-104.17-104.17h0C192.71,20.83,145.83,67.71,145.83,125Z"
                    data-name="Path"
                  ></path>
                  <path
                    fill="url(#e)"
                    d="M69.79,416.67l-4.17,39.58c-1,12.5,9.38,22.92,20.83,22.92h326a20.81,20.81,0,0,0,20.83-22.92l-3.12-39.58Z"
                    data-name="Path"
                  ></path>
                </g>
              </svg>
              {/* <Lottie
                options={defaultOptions}
                height={90}
                width={90}
                style={{ position: "absolute", inset: 0, marginTop: "2rem" }}
              /> */}
            </div>
            <div className="text-center flex flex-col gap-1">
              <h1 className="text-4xl font-bold text-slate-800">
                Your order was not confirmed
              </h1>
              <p className="text-sm font-medium text-gray-500"> Please check your email for further details.</p>
              <button
                className="mx-auto mt-5 flex items-center justify-center gap-1 px-2 py-1 bg-red-500 hover:bg-red-600 text-sm text-white rounded-md group transition-colors"
                onClick={() => navigate("/", { replace: true })}
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
                back to shopping
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="text-4xl absolute top-1/2 left-1/2 -translate-x-1/2">
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
    </>
  );
};

export default PaymentFailed;
