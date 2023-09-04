import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAppSelector } from "../types/storeType";
import {data} from '../types/productType'

const Select = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<data | null>(null)
  const { products } = useAppSelector((state) => state.Products);
  return (
    <div>
      <div
        className="grid gap-5"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          aspectRatio: 1,
        }}
      >
        {products?.map((product) => (
          <motion.div
          transition={{duration: 5}}
          key={product._id}
          layoutId={product._id}
          className="border rounded-xl shadow-md cursor-pointer transition-transform active:scale-95 bg-rose-300"
          onClick={() => {
            setSelectedId(product._id)
            setSelectedProduct(product)
          }}
          >
            {/* <img src={product.image} className='h-full w-full object-cover' /> */}
          </motion.div>
        ))}
      </div>
            {selectedId && (
              <motion.div
              transition={{duration: 5}}
              className="ml-20 fixed inset-40 top-32 bottom-32 backdrop-blur-md border rounded-2xl shadow-md bg-rose-400"
              layoutId={selectedId}
              onClick={()=>setSelectedId(null)}
              >
                {/* <span
                  className="absolute top-3 right-3 cursor-pointer hover:scale-105"
                  onClick={() => setSelectedId(null)}
                >
                  ❌
                </span>
                <div className="h-full flex">
                  <img src={selectedProduct?.image} className="h-full w-1/2 object-cover mr-auto flex-1" />
                  <div className="bg-green-400 flex-1">
                    <span>{selectedProduct?.title}</span>
                  </div>
                </div> */}
              </motion.div>
            )}
    </div>
  );
};

export default Select;
