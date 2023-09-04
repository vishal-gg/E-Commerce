import { createContext, useContext, useState, ReactNode } from "react";
import {data} from '../types/productType'

type DetailContextType = {
    selectedProduct: data | null;
    setSelectedProduct: React.Dispatch<React.SetStateAction<data | null>>;
};

const DetailContext = createContext<DetailContextType | undefined>(
  undefined
);

export const useDetail = () => {
  return useContext(DetailContext);
};

export const DetailProvider = ({ children }: { children: ReactNode }) => {
    const [selectedProduct, setSelectedProduct] = useState<data | null>(null);

  return (
    <DetailContext.Provider value={{ selectedProduct, setSelectedProduct }}>
      {children}
    </DetailContext.Provider>
  );
};