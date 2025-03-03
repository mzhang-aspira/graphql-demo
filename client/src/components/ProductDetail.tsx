import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  ProductCreateInput,
  InventoryInput,
  useGetProductDetailQuery,
  useUpdateProductMutation,
  useCreateProductMutation,
} from "../generated/graphql";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{
    id: string | "";
    name: string | "";
    code: string | "";
    price: number | 0;
    inventory: InventoryInput;
  }>({
    id: "",
    name: "",
    code: "",
    price: 0,
    inventory: {
      stock: 0,
      location: "",
      product_id: "",
    },
  });

  const { data, isLoading, error } = useGetProductDetailQuery(
    {
      endpoint: "http://localhost:4000/graphql",
      fetchParams: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    },
    { productId: id || "" },
    { enabled: !!id }
  );
  const updateProductMutation = useUpdateProductMutation({
    endpoint: "http://localhost:4000/graphql",
    fetchParams: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  const createProductMutation = useCreateProductMutation({
    endpoint: "http://localhost:4000/graphql",
    fetchParams: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  });

  useEffect(() => {
    if (id && data?.product) {
      setFormData({
        id: data.product.id || "",
        name: data.product.name || "",
        code: data.product.code || "",
        price: data.product.price || 0,
        inventory: {
          product_id: data.product.inventory?.product_id || "",
          stock: data.product.inventory?.stock || 0,
          location: data.product.inventory?.location || "",
        },
      });
    } else if (!id) {
      setFormData({
        id: "",
        name: "",
        code: "",
        price: 0,
        inventory: {
          stock: 0,
          location: "",
          product_id: "",
        },
      });
    }
  }, [id, data]);

  const handleSubmit = async (action: "save" | "apply") => {
    try {
      if (id) {
        await updateProductMutation.mutateAsync({
          input: {
            id: formData.id,
            name: formData.name,
            code: formData.code,
            price: formData.price,
            inventory: formData.inventory,
          },
        });
      } else {
        const createInput: ProductCreateInput = {
          name: formData.name,
          code: formData.code,
          price: formData.price,
        };
        await createProductMutation.mutateAsync({ input: createInput });
      }

      if (action === "save") {
        navigate("/");
      }
    } catch (err) {
      console.error("Error:", err);
    }
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
    <Box sx={{ p: 3, maxWidth: 800, margin: "0 auto" }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Product Details
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Product Name"
              fullWidth
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Product Code"
              fullWidth
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Price"
              type="number"
              fullWidth
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: Number(e.target.value) })
              }
              variant="outlined"
              margin="normal"
              InputProps={{
                startAdornment: <Typography>$</Typography>,
              }}
            />
          </Grid>

          {id && (
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Inventory
              </Typography>
              <TextField
                label="Stock"
                type="number"
                fullWidth
                value={formData.inventory.stock}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    inventory: {
                      ...formData.inventory,
                      stock: Number(e.target.value),
                    },
                  })
                }
                variant="outlined"
                margin="normal"
              />
              <TextField
                label="Location"
                fullWidth
                value={formData.inventory.location}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    inventory: {
                      ...formData.inventory,
                      location: e.target.value,
                    },
                  })
                }
                variant="outlined"
                margin="normal"
              />
            </Grid>
          )}
        </Grid>

        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSubmit("save")}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
          {id && (
            <Button
              variant="contained"
              color="success"
              onClick={() => handleSubmit("apply")}
            >
              Apply
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
