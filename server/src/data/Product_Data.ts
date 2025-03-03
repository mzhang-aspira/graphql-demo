import {
  ProductCreateInput,
  ProductUpdateInput,
} from "../generated/resolvers-types.ts";

interface Product {
  id: string;
  name: string;
  code: string;
  price: number;
}

interface Inventory {
  product_id: string;
  stock: number;
  location: string;
}

let products: Product[] = [
  {
    id: "1",
    name: "Site 001",
    code: "S01",
    price: 10,
  },
  {
    id: "2",
    name: "Site 002",
    code: "S02",
    price: 20,
  },
  {
    id: "3",
    name: "Site 003",
    code: "S03",
    price: 30,
  },
  {
    id: "4",
    name: "Site 004",
    code: "S04",
    price: 40,
  },
  {
    id: "5",
    name: "Site 005",
    code: "S05",
    price: 50,
  },
];

let inventories: Inventory[] = [
  {
    product_id: "1",
    stock: 10,
    location: "Ridgeway State Park",
  },
  {
    product_id: "2",
    stock: 20,
    location: "Ridgeway State Park",
  },
  {
    product_id: "3",
    stock: 30,
    location: "Eleven Miles State Park",
  },
  {
    product_id: "4",
    stock: 40,
    location: "Eleven Miles State Park",
  },
  {
    product_id: "5",
    stock: 50,
    location: "Eleven Miles State Park",
  },
];

export const getAllProducts = () => products;
export const getAllInventories = () => inventories;
export const createProduct = (input: ProductCreateInput) => {
  const newProduct = {
    id: String(products.length + 1),
    ...input,
  };
  const newInventory = {
    product_id: String(products.length + 1),
    stock: 0,
    location: "Default",
  };
  products.push(newProduct);
  inventories.push(newInventory);
  return newProduct;
};
export const updateProduct = (input: ProductUpdateInput) => {
  const productIndex = products.findIndex((p) => p.id === input.id);
  if (productIndex === -1) throw new Error("Product not found");
  products[productIndex] = { ...products[productIndex], ...input };

  const inventoryIndex = inventories.findIndex(
    (i) => i.product_id === input.id
  );
  if (inventoryIndex === -1) throw new Error("Inventory not found");
  inventories[inventoryIndex] = {
    ...inventories[inventoryIndex],
    ...input.inventory,
  };
  return products[productIndex];
};
