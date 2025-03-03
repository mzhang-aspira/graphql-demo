import React, { useState } from "react";
import {
  ProductSearchCriteria,
  useGetProductsQuery,
  GetProductsQuery,
} from "../generated/graphql";
import {
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./ProductList.css";

export default function ProductList() {
  const navigate = useNavigate();
  const [searchCriteria, setSearchCriteria] = useState<ProductSearchCriteria>({
    id: "",
    name: "",
    code: "",
  });

  const { data, isLoading, error, refetch } = useGetProductsQuery(
    {
      endpoint: "http://localhost:4000/graphql",
      fetchParams: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    },
    { criteria: searchCriteria },
    {
      enabled: false,
      queryKey: ["GetProducts", searchCriteria],
    }
  );

  const handleSearch = () => {
    refetch();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCriteria({
      ...searchCriteria,
      [e.target.name]: e.target.value,
    });
  };

  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error instanceof Error ? error.message : "Operation failed"}
      </Alert>
    );

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>
        Product Search
      </Typography>

      <Box
        component="form"
        sx={{ mb: 4, "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      >
        <TextField
          label="Product ID"
          name="id"
          value={searchCriteria.id}
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          label="Product Name"
          name="name"
          value={searchCriteria.name}
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          label="Product Code"
          name="code"
          value={searchCriteria.code}
          onChange={handleInputChange}
          variant="outlined"
        />

        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{ mr: 2 }}
          >
            Search
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/product/new")}
          >
            Add New
          </Button>
        </Box>
      </Box>

      {data && "products" in data ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="product table">
            <TableHead sx={{ bgcolor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Code</TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(data as GetProductsQuery).products?.map((product) => (
                <TableRow
                  key={product.id}
                  hover
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Button
                      component={Link}
                      to={`/product/${product.id}`}
                      color="primary"
                    >
                      {product.id}
                    </Button>
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.code || "N/A"}</TableCell>
                  <TableCell align="right">
                    ${product.price?.toFixed(2) || "0.00"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        ""
      )}
    </Box>
  );
}
