import { useQuery, useInfiniteQuery, useMutation, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData, UseMutationOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Inventory = {
  __typename?: 'Inventory';
  location?: Maybe<Scalars['String']['output']>;
  product_id: Scalars['ID']['output'];
  stock: Scalars['Int']['output'];
};

export type InventoryInput = {
  location: Scalars['String']['input'];
  product_id: Scalars['String']['input'];
  stock: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProduct: Product;
  updateProduct: Product;
};


export type MutationCreateProductArgs = {
  input: ProductCreateInput;
};


export type MutationUpdateProductArgs = {
  input: ProductUpdateInput;
};

export type Product = {
  __typename?: 'Product';
  code?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  inventory: Inventory;
  name: Scalars['String']['output'];
  price?: Maybe<Scalars['Float']['output']>;
};

export type ProductCreateInput = {
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
};

export type ProductSearchCriteria = {
  code?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ProductUpdateInput = {
  code: Scalars['String']['input'];
  id: Scalars['String']['input'];
  inventory: InventoryInput;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
};

export type Query = {
  __typename?: 'Query';
  product?: Maybe<Product>;
  products?: Maybe<Array<Product>>;
};


export type QueryProductArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProductsArgs = {
  criteria?: InputMaybe<ProductSearchCriteria>;
};

export type GetProductsQueryVariables = Exact<{
  criteria?: InputMaybe<ProductSearchCriteria>;
}>;


export type GetProductsQuery = { __typename?: 'Query', products?: Array<{ __typename?: 'Product', id: string, name: string, code?: string | null, price?: number | null }> | null };

export type GetProductDetailQueryVariables = Exact<{
  productId: Scalars['ID']['input'];
}>;


export type GetProductDetailQuery = { __typename?: 'Query', product?: { __typename?: 'Product', id: string, name: string, code?: string | null, price?: number | null, inventory: { __typename?: 'Inventory', product_id: string, stock: number, location?: string | null } } | null };

export type CreateProductMutationVariables = Exact<{
  input: ProductCreateInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', id: string, name: string, code?: string | null, price?: number | null } };

export type UpdateProductMutationVariables = Exact<{
  input: ProductUpdateInput;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct: { __typename?: 'Product', id: string, name: string, code?: string | null, price?: number | null, inventory: { __typename?: 'Inventory', product_id: string, stock: number, location?: string | null } } };



export const GetProductsDocument = `
    query GetProducts($criteria: ProductSearchCriteria) {
  products(criteria: $criteria) {
    id
    name
    code
    price
  }
}
    `;

export const useGetProductsQuery = <
      TData = GetProductsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetProductsQueryVariables,
      options?: Omit<UseQueryOptions<GetProductsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetProductsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetProductsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetProducts'] : ['GetProducts', variables],
    queryFn: fetcher<GetProductsQuery, GetProductsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetProductsDocument, variables),
    ...options
  }
    )};

useGetProductsQuery.document = GetProductsDocument;

useGetProductsQuery.getKey = (variables?: GetProductsQueryVariables) => variables === undefined ? ['GetProducts'] : ['GetProducts', variables];

export const useInfiniteGetProductsQuery = <
      TData = InfiniteData<GetProductsQuery>,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetProductsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetProductsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetProductsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetProductsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetProducts.infinite'] : ['GetProducts.infinite', variables],
      queryFn: (metaData) => fetcher<GetProductsQuery, GetProductsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetProductsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetProductsQuery.getKey = (variables?: GetProductsQueryVariables) => variables === undefined ? ['GetProducts.infinite'] : ['GetProducts.infinite', variables];


useGetProductsQuery.fetcher = (dataSource: { endpoint: string, fetchParams?: RequestInit }, variables?: GetProductsQueryVariables) => fetcher<GetProductsQuery, GetProductsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetProductsDocument, variables);

export const GetProductDetailDocument = `
    query GetProductDetail($productId: ID!) {
  product(id: $productId) {
    id
    name
    code
    price
    inventory {
      product_id
      stock
      location
    }
  }
}
    `;

export const useGetProductDetailQuery = <
      TData = GetProductDetailQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetProductDetailQueryVariables,
      options?: Omit<UseQueryOptions<GetProductDetailQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetProductDetailQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetProductDetailQuery, TError, TData>(
      {
    queryKey: ['GetProductDetail', variables],
    queryFn: fetcher<GetProductDetailQuery, GetProductDetailQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetProductDetailDocument, variables),
    ...options
  }
    )};

useGetProductDetailQuery.document = GetProductDetailDocument;

useGetProductDetailQuery.getKey = (variables: GetProductDetailQueryVariables) => ['GetProductDetail', variables];

export const useInfiniteGetProductDetailQuery = <
      TData = InfiniteData<GetProductDetailQuery>,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetProductDetailQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetProductDetailQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetProductDetailQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetProductDetailQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['GetProductDetail.infinite', variables],
      queryFn: (metaData) => fetcher<GetProductDetailQuery, GetProductDetailQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetProductDetailDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetProductDetailQuery.getKey = (variables: GetProductDetailQueryVariables) => ['GetProductDetail.infinite', variables];


useGetProductDetailQuery.fetcher = (dataSource: { endpoint: string, fetchParams?: RequestInit }, variables: GetProductDetailQueryVariables) => fetcher<GetProductDetailQuery, GetProductDetailQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetProductDetailDocument, variables);

export const CreateProductDocument = `
    mutation CreateProduct($input: ProductCreateInput!) {
  createProduct(input: $input) {
    id
    name
    code
    price
  }
}
    `;

export const useCreateProductMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateProductMutation, TError, CreateProductMutationVariables, TContext>
    ) => {
    
    return useMutation<CreateProductMutation, TError, CreateProductMutationVariables, TContext>(
      {
    mutationKey: ['CreateProduct'],
    mutationFn: (variables?: CreateProductMutationVariables) => fetcher<CreateProductMutation, CreateProductMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateProductDocument, variables)(),
    ...options
  }
    )};


useCreateProductMutation.fetcher = (dataSource: { endpoint: string, fetchParams?: RequestInit }, variables: CreateProductMutationVariables) => fetcher<CreateProductMutation, CreateProductMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateProductDocument, variables);

export const UpdateProductDocument = `
    mutation UpdateProduct($input: ProductUpdateInput!) {
  updateProduct(input: $input) {
    id
    name
    code
    price
    inventory {
      product_id
      stock
      location
    }
  }
}
    `;

export const useUpdateProductMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateProductMutation, TError, UpdateProductMutationVariables, TContext>
    ) => {
    
    return useMutation<UpdateProductMutation, TError, UpdateProductMutationVariables, TContext>(
      {
    mutationKey: ['UpdateProduct'],
    mutationFn: (variables?: UpdateProductMutationVariables) => fetcher<UpdateProductMutation, UpdateProductMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateProductDocument, variables)(),
    ...options
  }
    )};


useUpdateProductMutation.fetcher = (dataSource: { endpoint: string, fetchParams?: RequestInit }, variables: UpdateProductMutationVariables) => fetcher<UpdateProductMutation, UpdateProductMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateProductDocument, variables);
