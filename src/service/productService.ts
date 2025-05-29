import axios from 'axios';
import type { Product } from '@/models/product';

export const productService = {
  async fetchAllProducts(): Promise<Product[]> {
    const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
    return response.data;
  },

  async fetchProductById(id: number): Promise<Product> {
    const response = await axios.get<Product>(`https://fakestoreapi.com/products/${id}`);
    return response.data;
  },
};
