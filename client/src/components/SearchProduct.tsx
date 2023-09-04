import {motion} from 'framer-motion'
import {useDetail} from '../hooks/DetailContext'
import {useAppSelector} from '../types/storeType'
import { useMemo, useState } from 'react';


const SearchProduct = ({query}:{query: string}) => {
  const { products } = useAppSelector((state) => state.Products);
  const detailContext = useDetail()
  if (!detailContext) {
    // Handle the case where the context is not available
    throw new Error("useDetail must be used within a CategoryProvider");
  }
  const {setSelectedProduct} = detailContext
  const [activeModel, setActiveModel] = useState(false);

  const searchedProduct = useMemo(() => {
    if (query.trim() === "") return [];

    return products?.filter((item) => {
      return item?.title.toLowerCase().includes(query.toLowerCase());
    });
  }, [query, products]);


  return (
   activeModel && searchedProduct && searchedProduct.length > 0 ? (
    <div>
    <motion.div
    initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      className="fixed inset-0 w-full top-16 bg-black/50 backdrop-blur-sm"
      onClick={()=>setActiveModel(false)}
      >
        <div className="w-1/2 mx-auto pb-14 overflow-auto h-screen backdrop-blur-lg searchScrollBar"
        onClick={(e)=>e.stopPropagation()}
        >
          {searchedProduct && searchedProduct.slice(0, 10).map((item, i) => (
            <motion.div
            initial={{y: -5, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{delay: i*.04}}
            className="w-full flex gap-2 items-center cursor-pointer hover:bg-black/30 group transition-colors relative py-2 px-5"
            onClick={()=> {
              setActiveModel(false)
              setSelectedProduct(item)
            }}
            >
              <img src={item.image} alt="404" className="w-[10%] min-w-[80px] group-hover:scale-[1.03] transition-transform" />
              <div className="flex flex-col text-sm text-white">
              <span className="line-clamp-1">{item.title}</span>
              <span className="text-xl"><span className="text-green-500">$</span>{item.price}</span>
              <span className="absolute h-[1px] w-full bottom-0 left-0 from-transparent via-white/50 to-transparent bg-gradient-to-r"></span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>      
</div>
   ): null
  ) 
}

export default SearchProduct

