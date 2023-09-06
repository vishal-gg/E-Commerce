import Products from "./Products";
import { useAppSelector } from "../types/storeType";
import { useEffect, useState } from "react";
import { data } from "../types/productType";
import { calculateDiscount } from "../utils/calculateDiscounts";
import { useCombinedContext } from "../hooks/combinedContext";
import Carousel from "./Carousel";

const Home = () => {
  const {selectedProduct, setSelectedProduct} = useCombinedContext();

  const [productsOnSale, setProductsOnSale] = useState<data[]>();
  const [imageOnLoad, setImageOnLoad] = useState(true);

  const { products } = useAppSelector((state) => state.Products);

  useEffect(() => {
    const onSale = products?.filter((product) => product.onSale === true);
    setProductsOnSale(onSale);
  }, [products]);

  return (
    <div className="px-10 py-5 dark:text-white">
      <div>
        <h4 className="font-medium text-slate-700 dark:text-slate-200 pb-3 text-sm ml-1">
          HOT SALE
        </h4>
        <div className="flex gap-5 text-sm font-medium">
          <div className="flex gap-5 w-full">
            <div className="flex-1">
              <div className="w-full h-60 bg-rose-300 rounded-xl relative overflow-hidden">
                <Carousel />
              </div>
              <div className="flex-grow gap-2 xl:hidden">
                <div className="text-[10px] text-zinc-400 dark:text-zinc-200 mt-5 mb-1">
                  BEST SELLERS
                </div>
                <div className="flex gap-5 text-center text-xs">
                  <div className="flex flex-col items-center gap-1">
                    <div className="bg-black h-8 w-8 rounded-lg flex items-center justify-center">
                      <svg
                        className="h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                      >
                        <g
                          fillRule="evenodd"
                          fill="currentColor"
                          className="color000 svgShape"
                        >
                          <path
                            d="M11.6218,4.7571c-0.0193291,-2.02332 1.65317,-2.99846 1.72865,-3.04467c-0.939167,-1.37684 -2.40442,-1.56532 -2.92624,-1.58735c-1.24564,-0.125075 -2.431,0.734352 -3.06342,0.734352c-0.630702,0 -1.60726,-0.7153 -2.63953,-0.694961c-1.35921,0.0188997 -2.61125,0.789063 -3.31105,2.00483c-1.41025,2.44865 -0.360481,6.07511 1.01479,8.0616c0.671226,0.970026 1.47351,2.06429 2.52553,2.02476c1.0148,-0.0397892 1.39689,-0.654453 2.62078,-0.654453c1.22488,0 1.56888,0.654453 2.64224,0.634268c1.08898,-0.0196037 1.78139,-0.990762 2.44848,-1.96475c0.771157,-1.12822 1.0887,-2.22035 1.10719,-2.27707c-0.0234604,-0.0085233 -2.12539,-0.815491 -2.14743,-3.23655v0Z"
                            transform="translate(.745 3.743)"
                            fill="currentColor"
                            className="color000 svgShape"
                          ></path>
                          <path
                            d="M2.49696,2.55553c0.559066,-0.677623 0.934193,-1.61793 0.831414,-2.55553c-0.804695,0.031969 -1.78039,0.537152 -2.3568,1.21266c-0.51813,0.599437 -0.97158,1.55665 -0.848624,2.47462c0.897671,0.0697992 1.81466,-0.455431 2.37401,-1.13175v0Z"
                            transform="translate(7.857)"
                            fill="currentColor"
                            className="color000 svgShape"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <span>Apple</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1">
                    <div className="bg-blue-700 h-8 w-8 rounded-lg flex items-center justify-center overflow-hidden">
                      <svg
                        className="text-white h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        enableBackground="new 0 0 24 24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M.455 16.209c-.862.637-.546 1.748 1.346 2.281 2.188.72 4.262.804 6.413.416v-2.032L6.28 17.579c-.712.258-1.763.312-2.341.121-.579-.191-.471-.553.242-.807l4.033-1.44v-2.268l-5.604 1.99C2.609 15.173 1.251 15.618.455 16.209zM14.358 4.223c-1.299-.437-3.721-1.165-5.383-1.473v17.26l3.908 1.24V6.77c0-.678.305-1.132.792-.974.637.179.763.804.763 1.482v5.785c2.437 1.174 4.354-.004 4.354-3.105C18.792 6.774 17.671 5.359 14.358 4.223z"
                          fill="currentColor"
                          className="color000 svgShape"
                        ></path>
                        <path
                          d="M22.205,14.878c-1.637-0.621-3.721-0.833-5.425-0.645c-1.191,0.133-2.188,0.375-3.154,0.7v2.348l4.188-1.478c0.712-0.258,1.762-0.312,2.341-0.121c0.583,0.191,0.471,0.553-0.242,0.807l-6.287,2.239v2.26l8.546-3.063c0,0,1.146-0.42,1.617-1.011h-0.001C24.254,16.323,24.046,15.461,22.205,14.878z"
                          fill="currentColor"
                          className="color000 svgShape"
                        ></path>
                      </svg>
                    </div>
                    <span>Sony</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="bg-[#f57921] h-8 w-8 rounded-lg flex justify-center items-center">
                      <svg
                        className="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                      >
                        <g fill="#fb8c00" className="colorFB8C00 svgShape">
                          <path
                            d="M6.5 3H0v11h2V5h4.5C7.327 5 8 5.673 8 6.5V14h2V6.5C10 4.57 8.43 3 6.5 3z"
                            fill="white"
                            className="color000 svgShape"
                          ></path>
                          <path
                            d="M4 7h2v7H4zM12 3h2v11h-2z"
                            fill="white"
                            className="color000 svgShape"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <span>Xiaomi</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 max-h-full px-2 rounded-xl md:block hidden">
              <div className="grid grid-cols-2 gap-3 justify-between h-full">
                {productsOnSale
                  ? productsOnSale.slice(0, 4).map((product) => (
                      <div
                        key={product._id}
                        className="flex gap-3 xl:flex-row flex-col items-center overflow-hidden cursor-pointer group"
                        onClick={() => {
                          setSelectedProduct(product);
                        }}
                      >
                        <div
                          className="flex-grow bg-slate-100 min-w-[110px] max-w-[110px] rounded-xl shadow-md overflow-hidden relative"
                          style={{ aspectRatio: 1 }}
                        >
                          <img
                            className={`w-full h-full object-cover ${
                              imageOnLoad && "scale-[200%] opacity-0"
                            } transition duration-300 group-hover:scale-105`}
                            src={product.image}
                            draggable={false}
                            onLoad={() => setImageOnLoad(false)}
                          />
                          {imageOnLoad && (
                            <span className="absolute inset-0 bg-white blur-2xl animateLoading"></span>
                          )}
                        </div>
                        <div className={`flex-grow`}>
                          <div className="line-clamp-2 text-xs">
                            {product.title}
                          </div>
                          {product.discount !== undefined ? (
                            <div className="flex xl:flex-col xl:gap-0 gap-2">
                              <div>
                                <span className="text-xs line-through pr-2 text-zinc-400 dark:text-zinc-200">
                                  {product.price}
                                </span>
                                <span className="text-base">
                                  <span className="text-green-500">$</span>
                                  {calculateDiscount(
                                    product.price,
                                    product.discount
                                  )?.newAmount || product.price}
                                </span>
                              </div>
                              <div className="flex items-center gap-[2px]">
                                <span className="bg-red-500 text-white text-[10px] h-5 w-5 rounded-full text-center inline-block">
                                  {product.discount}%
                                </span>
                                <span className="text-xs font-semibold">
                                  off
                                </span>
                              </div>
                            </div>
                          ) : (
                            <>
                              <span className="text-lg">
                                <span className="text-green-500">$</span>
                                {product.price}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    ))
                  : [1, 2, 3, 4].map((product) => (
                      <div
                        key={product}
                        className="gap-3 items-center flex xl:flex-row flex-col"
                      >
                        <div
                          className={`flex-grow bg-slate-100 min-w-[110px] max-w-[110px] rounded-xl shadow-md overflow-hidden relative`}
                          style={{ aspectRatio: 1 }}
                        >
                          <span className="absolute inset-0 bg-white blur-2xl animateLoading"></span>
                        </div>
                        <div className="flex-grow grid gap-2 w-full">
                          <span className="bg-slate-300 rounded-xl w-full h-5 opacity-70"></span>
                          <span className="bg-slate-200 rounded-xl w-10/12 h-5 opacity-60"></span>
                          <span className="bg-slate-100 rounded-xl w-1/2 h-5 xl:block hidden"></span>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
          <div className="xl:flex flex-grow gap-2 flex-col  border-red-400 pl-5 max-w hidden relative text-xs">
            <span className="absolute left-0 rounded-full inline-block h-full w-[1px] bg-gradient-to-b from-transparent dark:via-zinc-100 via-zinc-500 to-transparent opacity-50"></span>
            <div className="text-[10px] text-zinc-400 dark:text-zinc-200 whitespace-nowrap">
              BEST SELLERS
            </div>
            <div className="flex gap-2 items-center">
              <div className="bg-black h-8 w-8 rounded-lg flex justify-center items-center">
                <svg
                  className="h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                >
                  <g
                    fillRule="evenodd"
                    fill="currentColor"
                    className="color000 svgShape"
                  >
                    <path
                      d="M11.6218,4.7571c-0.0193291,-2.02332 1.65317,-2.99846 1.72865,-3.04467c-0.939167,-1.37684 -2.40442,-1.56532 -2.92624,-1.58735c-1.24564,-0.125075 -2.431,0.734352 -3.06342,0.734352c-0.630702,0 -1.60726,-0.7153 -2.63953,-0.694961c-1.35921,0.0188997 -2.61125,0.789063 -3.31105,2.00483c-1.41025,2.44865 -0.360481,6.07511 1.01479,8.0616c0.671226,0.970026 1.47351,2.06429 2.52553,2.02476c1.0148,-0.0397892 1.39689,-0.654453 2.62078,-0.654453c1.22488,0 1.56888,0.654453 2.64224,0.634268c1.08898,-0.0196037 1.78139,-0.990762 2.44848,-1.96475c0.771157,-1.12822 1.0887,-2.22035 1.10719,-2.27707c-0.0234604,-0.0085233 -2.12539,-0.815491 -2.14743,-3.23655v0Z"
                      transform="translate(.745 3.743)"
                      fill="currentColor"
                      className="color000 svgShape"
                    ></path>
                    <path
                      d="M2.49696,2.55553c0.559066,-0.677623 0.934193,-1.61793 0.831414,-2.55553c-0.804695,0.031969 -1.78039,0.537152 -2.3568,1.21266c-0.51813,0.599437 -0.97158,1.55665 -0.848624,2.47462c0.897671,0.0697992 1.81466,-0.455431 2.37401,-1.13175v0Z"
                      transform="translate(7.857)"
                      fill="currentColor"
                      className="color000 svgShape"
                    ></path>
                  </g>
                </svg>
              </div>
              <div className="flex flex-col text-center">
                <span>Apple</span>
                <span className="border border-gray-300 rounded-md text-[10px] font-medium w-fit px-1">
                  98%
                </span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="bg-blue-600 h-8 w-8 rounded-lg flex justify-center items-center">
                <svg
                  className="text-white h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 24 24"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M.455 16.209c-.862.637-.546 1.748 1.346 2.281 2.188.72 4.262.804 6.413.416v-2.032L6.28 17.579c-.712.258-1.763.312-2.341.121-.579-.191-.471-.553.242-.807l4.033-1.44v-2.268l-5.604 1.99C2.609 15.173 1.251 15.618.455 16.209zM14.358 4.223c-1.299-.437-3.721-1.165-5.383-1.473v17.26l3.908 1.24V6.77c0-.678.305-1.132.792-.974.637.179.763.804.763 1.482v5.785c2.437 1.174 4.354-.004 4.354-3.105C18.792 6.774 17.671 5.359 14.358 4.223z"
                    fill="currentColor"
                    className="color000 svgShape"
                  ></path>
                  <path
                    d="M22.205,14.878c-1.637-0.621-3.721-0.833-5.425-0.645c-1.191,0.133-2.188,0.375-3.154,0.7v2.348l4.188-1.478c0.712-0.258,1.762-0.312,2.341-0.121c0.583,0.191,0.471,0.553-0.242,0.807l-6.287,2.239v2.26l8.546-3.063c0,0,1.146-0.42,1.617-1.011h-0.001C24.254,16.323,24.046,15.461,22.205,14.878z"
                    fill="currentColor"
                    className="color000 svgShape"
                  ></path>
                </svg>
              </div>
              <div>
                <div className="flex flex-col text-center">
                  <span>sony</span>
                  <span className="border border-gray-300 px-1 rounded-md text-[10px] font-medium w-fit">
                    96%
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="bg-[#f57921] h-8 w-8 rounded-lg flex justify-center items-center">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                >
                  <g fill="#fb8c00" className="colorFB8C00 svgShape">
                    <path
                      d="M6.5 3H0v11h2V5h4.5C7.327 5 8 5.673 8 6.5V14h2V6.5C10 4.57 8.43 3 6.5 3z"
                      fill="white"
                      className="color000 svgShape"
                    ></path>
                    <path
                      d="M4 7h2v7H4zM12 3h2v11h-2z"
                      fill="white"
                      className="color000 svgShape"
                    ></path>
                  </g>
                </svg>
              </div>
              <div className="flex flex-col text-center">
                <span>Xiaomi</span>
                <span className="border border-gray-300 rounded-md text-[10px] font-medium w-fit px-1">
                  91%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Products
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
    </div>
  );
};

export default Home;
