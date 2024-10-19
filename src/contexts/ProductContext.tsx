import React, { createContext, useContext, ReactNode } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../utils/db';

export interface Product {
  id?: string;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
  tags: string[];
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => Promise<string>;
  updateProduct: (id: string, changes: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const products = useLiveQuery(() => db.products.toArray()) ?? [];

  const addProduct = async (product: Product) => {
    return await db.products.add(product);
  };

  const updateProduct = async (id: string, changes: Partial<Product>) => {
    await db.products.update(id, changes);
  };

  const deleteProduct = async (id: string) => {
    await db.products.delete(id);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};