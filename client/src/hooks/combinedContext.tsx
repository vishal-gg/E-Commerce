import { createContext, useContext, useState, ReactNode } from "react";
import { data } from '../types/productType';

type CombinedContextType = {
  activeSignInModel: boolean;
  setActiveSignInModel: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCategory: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
  selectedProduct: data | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<data | null>>;
};

const CombinedContext = createContext<CombinedContextType | undefined>(
  undefined
);

export const useCombinedContext = () => {
  const context = useContext(CombinedContext);
  if (!context) {
    throw new Error('useCombinedContext must be used within CombinedProvider');
  }
  return context;
};

export const CombinedProvider = ({ children }: { children: ReactNode }) => {
  const [activeSignInModel, setActiveSignInModel] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<data | null>(null);

  return (
    <CombinedContext.Provider 
      value={{ 
        activeSignInModel, 
        setActiveSignInModel, 
        selectedCategory, 
        setSelectedCategory, 
        selectedProduct, 
        setSelectedProduct 
      }}>
      {children}
    </CombinedContext.Provider>
  )
};
