import Dexie, { Table } from 'dexie';
import { Product } from '../contexts/ProductContext';
import { User } from './auth';

export interface Campaign {
  id?: number;
  productId: string;
  platform: string;
  content: string;
  createdAt: Date;
}

export class RaqamlyDB extends Dexie {
  products!: Table<Product>;
  users!: Table<User>;
  campaigns!: Table<Campaign>;

  constructor() {
    super('RaqamlyDB');
    this.version(1).stores({
      products: '++id, name, category',
      users: '++id, email',
      campaigns: '++id, productId, platform, createdAt'
    });
  }
}

export const db = new RaqamlyDB();