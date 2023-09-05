import { Link } from "react-scroll";
import { useCategory } from "../hooks/CategoryContext";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Sidebar = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const categoryContext = useCategory();

  if (!categoryContext) {
    // Handle the case where the context is not available
    throw new Error("useCategory must be used within a CategoryProvider");
  }

  const { selectedCategory, setSelectedCategory } = categoryContext;

  const tabs = ["Tv", "Audio", "Laptop", "Mobile", "Gaming", "Appliances"];

  return (
    <>
      <div className="fixed top-16 bottom-0 left-0 w-40 bg-black hidden min-[578px]:dark:block"></div>
      <div className="fixed bg-rose-400 w-40 h-[30%] opacity-30 rounded-full top-5 left-0 max-[578px]:hidden"></div>
      <div className="fixed bg-blue-400 w-40 h-[60%] opacity-20 rounded-full -bottom-20 left-0 max-[578px]:hidden"></div>
      <div className="fixed left-0 top-16 z-30 w-40 h-screen backdrop-blur-3xl max-[578px]:hidden">
        <div className="mt-5">
          <h1 className="font-bold text-center dark:text-white">Categories</h1>
          <ul className="grid mt-2 relative dark:text-white">
            {tabs.map((tab, index) => (
              <li
                className={`text-sm font-medium px-10 hover:bg-white/50 dark:hover:bg-white/10 transition-colors cursor-pointer py-3 relative ${
                  selectedCategory === tab && "text-orange-500 dark:text-yellow-500"
                }`}
                key={index}
              >
                <Link
                  className="absolute inset-0"
                  to="product_list"
                  smooth
                  duration={300}
                  offset={-90}
                  onClick={() => {
                    setActiveCategory(tab);
                    setSelectedCategory(tab);
                  }}
                ></Link>
                {tab}
                <AnimatePresence>
                  {activeCategory === tab && selectedCategory && (
                    <motion.span
                      layoutId="active-category"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, type: "spring" }}
                      className="absolute -right-[2px] bottom-0 h-full w-1 bg-orange-500 dark:bg-yellow-500 inline-block rounded-full"
                    ></motion.span>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className="min-[578px]:hidden fixed top-5 left-2 z-50"
        onClick={() => setToggleSidebar((prev) => !prev)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 dark:text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
          />
        </svg>
      </div>

      <motion.div
        variants={{
          hide: { opacity: 0, pointerEvents: "none" },
          show: toggleSidebar ? { opacity: 1, pointerEvents: "initial" } : {},
        }}
        initial="hide"
        animate="show"
        onClick={() => setToggleSidebar(false)}
        className="bg-black/50 fixed inset-0 z-20 min-[578px]:hidden"
      >
        <motion.div
          initial={{ translateX: "-100%" }}
          animate={toggleSidebar ? { translateX: 0 } : {}}
          transition={{ type: "tween" }}
          onClick={(e) => e.stopPropagation()}
          className="fixed left-0 top-16 z-30 w-fit h-screen bg-blue-100 dark:bg-zinc-800 dark:text-white"
        >
          <div className="mt-5">
            <h1 className="font-bold text-center">Categories</h1>
            <ul className="grid mt-2 relative">
              {tabs.map((tab, index) => (
                <li
                  className={`text-sm font-medium px-10 transition-colors cursor-pointer py-3 relative ${
                    selectedCategory === tab && "text-orange-500"
                  }`}
                  key={index}
                  onClick={() => {}}
                >
                  <Link
                    className="absolute inset-0"
                    to="product_list"
                    smooth
                    duration={300}
                    offset={-90}
                    onClick={() => {
                      setActiveCategory(tab);
                      setSelectedCategory(tab);
                      setToggleSidebar(false);
                    }}
                  ></Link>
                  {tab}
                  <AnimatePresence>
                    {activeCategory === tab && selectedCategory && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="absolute -right-[2px] bottom-0 h-full w-1 bg-orange-500 inline-block rounded-full"
                      ></motion.span>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Sidebar;
