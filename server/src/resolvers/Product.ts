import {
  getAllProducts,
  createProduct,
  updateProduct,
  getAllInventories,
} from "../data/Product_Data.ts";
import {
  ProductCreateInput,
  ProductUpdateInput,
} from "../generated/resolvers-types.ts";

export const resolvers = {
  Query: {
    products: (_: any, { criteria }: any) => {
      if (criteria.id) {
        return getAllProducts().filter((p) => p.id === criteria.id);
      }
      return getAllProducts().filter(
        (p) =>
          (!criteria.name || p.name.includes(criteria.name)) &&
          (!criteria.code || p.code === criteria.code)
      );
    },
    product: (_: any, { id }: any) => getAllProducts().find((p) => p.id === id),
  },
  Mutation: {
    createProduct: (_: any, { input }: { input: ProductCreateInput }) =>
      createProduct(input),
    updateProduct: (_: any, { input }: { input: ProductUpdateInput }) =>
      updateProduct(input),
  },
  Product: {
    inventory: (parent: { id: string }, args: any, context: any, info: any) => {
      return getAllInventories().find((i) => i.product_id === parent.id);
    },
  },
};
