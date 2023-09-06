import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector } from "../types/storeType";
import { calculateDiscount } from "../utils/calculateDiscounts";
import { data } from "../types/productType";
import { Link } from "react-scroll";
import { useCombinedContext } from "../hooks/combinedContext";
import ProductDetails from "./ProductDetails";
import Paginate from "./Paginate";

interface propType {
  selectedProduct: data | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<data | null>>;
}

const Products = ({ selectedProduct, setSelectedProduct }: propType) => {
  const [imageOnLoad, setImageOnLoad] = useState(true);

  const { products } = useAppSelector((state) => state.Products);

  const { selectedCategory, setSelectedCategory } = useCombinedContext();

  const filterByCategory = (products: data[] | null, category: string) => {
    return products
      ? products.filter(
          (product) => product.category === category.toLocaleLowerCase()
        )
      : null;
  };

  const initialFilteredProducts = selectedCategory
    ? filterByCategory(products, selectedCategory)
    : products;
  const [filteredProducts, setFilteredProducts] = useState<data[] | null>(
    initialFilteredProducts
  );

  const tabs = [
    { id: 1, label: "All" },
    { id: 2, label: "Popular" },
    { id: 3, label: "Cheap" },
    { id: 4, label: "Expensive" },
    { id: 5, label: "Sale" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  // for pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, _setPostsPerPage] = useState<number>(20);

  // get all posts to show on single page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentProducts = filteredProducts?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts(filterByCategory(products, selectedCategory));
    } else {
      setFilteredProducts(products);
    }
    setActiveTab(tabs[0].id);
  }, [products, selectedCategory]);

  const handleFilter = (id: number, label: string) => {
    setActiveTab(id);

    let totalProducts = products;

    if (selectedCategory) {
      totalProducts = filterByCategory(products, selectedCategory);
    }

    switch (label) {
      case "All":
        setFilteredProducts(totalProducts);
        break;
      case "Popular":
        let popular = totalProducts
          ? totalProducts.filter((product) => product.popular !== undefined)
          : null;
        setFilteredProducts(popular);
        break;
      case "Cheap":
        let cheap = totalProducts
          ? totalProducts.filter((product) => product.price < 80)
          : null;
        setFilteredProducts(cheap);
        break;
      case "Expensive":
        let expensive = totalProducts
          ? totalProducts.filter((product) => product.price > 500)
          : null;
        setFilteredProducts(expensive);
        break;
      case "Sale":
        let sale = totalProducts
          ? totalProducts.filter((product) => product.onSale !== undefined)
          : null;
        setFilteredProducts(sale);
        break;
      default:
        break;
    }
    setCurrentPage(1);
  };

  return (
    <div className="mt-8" id="product_list">
      <div>
        <ul className="flex gap-6 mb-3 ml-2 flex-wrap text-sm font-medium">
          {tabs.map((tab) => (
            <Link
              to="product_list"
              smooth
              duration={300}
              offset={-90}
              className={`relative cursor-pointer`}
              onClick={() => handleFilter(tab.id, tab.label)}
              key={tab.id}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute -top-[2px] -bottom-[2px] -left-2 -right-2 bg-zinc-700 dark:bg-zinc-900"
                  style={{ borderRadius: "9999px" }}
                ></motion.span>
              )}
              <span
                className={`${
                  activeTab === tab.id && "relative text-white"
                } transition-colors duration-500`}
              >
                {tab.label}
              </span>
            </Link>
          ))}
        </ul>
        <AnimatePresence mode="popLayout">
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedCategory(null)}
              className="text-sm rounded-full px-2 p-[2px] shadow-md dark:bg-gray-600 transition-colors w-fit cursor-pointer flex items-center gap-[1px] group"
            >
              {selectedCategory.toLocaleLowerCase()}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 group-hover:text-red-500 transition-colors"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div
        className="grid gap-5 mt-6 relative"
        style={{ gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {currentProducts
            ? currentProducts.map((product) => (
                <motion.div
                  layoutId={product._id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  key={product._id}
                  onClick={() => {
                    setSelectedProduct(product);
                  }}
                >
                  <div
                    style={{ aspectRatio: "1" }}
                    className="w-full rounded-xl shadow-md relative overflow-hidden bg-white"
                  >
                    <img
                      className={`w-full h-full object-contain cursor-pointer ${
                        !imageOnLoad && "hover:scale-105"
                      } ${
                        imageOnLoad && "scale-75 opacity-0"
                      } transition duration-300`}
                      src={product.image}
                      loading="lazy"
                      draggable={false}
                      onLoad={() => setImageOnLoad(false)}
                    />
                  </div>
                  <div className="mt-3 px-2">
                    <div className="w-full truncate text-sm font-medium">
                      {product.title}
                    </div>
                    <div className="w-[70%] h-5 rounded-xl flex gap-2 items-center">
                      {product.discount !== undefined ? (
                        <>
                          <span className="line-through text-sm text-zinc-400">
                            {product.price}
                          </span>
                          <span className="text-xl font-semibold">
                            <span className="text-green-500">$</span>
                            {calculateDiscount(product.price, product.discount)
                              ?.newAmount || product.price}
                          </span>

                          <div className="flex items-center gap-[2px]">
                            <span className="bg-red-500 text-white text-[10px] h-5 w-5 rounded-full text-center flex justify-center items-center">
                              {product.discount}%
                            </span>
                            <span className="text-sm font-medium">off</span>
                          </div>
                        </>
                      ) : (
                        <span className="text-xl font-semibold">
                          <span className="text-green-500">$</span>
                          {product.price}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
                (skeleton) => (
                  <div key={skeleton}>
                    <div
                      style={{ aspectRatio: "1" }}
                      className="w-full bg-slate-100 rounded-xl shadow-md relative overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-white blur-2xl animateLoading"></span>
                    </div>
                    <div className="mt-3">
                      <div className="w-full h-5 rounded-xl bg-slate-200 mb-2"></div>
                      <div className="w-[70%] h-5 rounded-xl bg-slate-100"></div>
                    </div>
                  </div>
                )
              )}
          <Paginate
            postPerPage={postsPerPage}
            totalProducts={filteredProducts?.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetails
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
