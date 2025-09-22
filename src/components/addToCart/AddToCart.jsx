import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Box,
  useMediaQuery,
  Divider,
  Snackbar,
  Alert,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
  clearCart,
} from "./addToCartSlice";

import product1 from "../../assets/images/products/OIP-1.jpeg";
import product2 from "../../assets/images/products/OIP-2.jpeg";
import product3 from "../../assets/images/products/OIP-3.jpeg";
import product4 from "../../assets/images/products/OIP-4.jpeg";
import product5 from "../../assets/images/products/OIP-5.jpeg";
import product6 from "../../assets/images/products/OIP-6.jpeg";
import product7 from "../../assets/images/products/OIP-7.jpeg";

const products = [
  {
    id: 1,
    productImg: product1,
    productName: "Product 1",
    about: "Lorem ipsum dolor sit amet...",
    productPrice: 100,
  },
  {
    id: 2,
    productImg: product2,
    productName: "Product 2",
    about: "Lorem ipsum dolor sit amet...",
    productPrice: 60,
  },
  {
    id: 3,
    productImg: product3,
    productName: "Product 3",
    about: "Lorem ipsum dolor sit amet...",
    productPrice: 30000,
  },
  {
    id: 4,
    productImg: product4,
    productName: "Product 4",
    about: "Lorem ipsum dolor sit amet...",
    productPrice: 600,
  },
  {
    id: 5,
    productImg: product5,
    productName: "Product 5",
    about: "Lorem ipsum dolor sit amet...",
    productPrice: 3000,
  },
  {
    id: 6,
    productImg: product6,
    productName: "Product 6",
    about: "Lorem ipsum dolor sit amet...",
    productPrice: 400,
  },
  {
    id: 7,
    productImg: product7,
    productName: "Product 7",
    about: "Lorem ipsum dolor sit amet...",
    productPrice: 1500,
  },
];

const AddToCart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [cartOpen, setCartOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  const isMobile = useMediaQuery("(max-width:700px)");

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.productPrice * item.quantity,
    0
  );

  const handleAdd = (product) => {
    dispatch(addToCart(product));
    setSnackbarMsg(`${product.productName} added to cart!`);
    setSnackbarOpen(true);
  };

  return (
    <>
      <AppBar position="sticky" color="primary">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
            Shopping Center
          </Typography>
          <IconButton color="inherit" onClick={() => setCartOpen(true)}>
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4 }}>
        <Grid container spacing={5} sx={{ justifyContent: "space-evenly" }}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card
                sx={{
                  width: "100%",
                  height: "100%",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    boxShadow: 6,
                    "& .MuiCardMedia-root": { transform: "scale(1.1)" },
                  },
                }}
              >
                <Box sx={{ overflow: "hidden" }}>
                  <CardMedia
                    sx={{ height: 200, transition: "transform 0.3s" }}
                    image={product.productImg}
                    title={product.productName}
                  />
                </Box>
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    {product.productName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {product.about}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    Price: ₹{product.productPrice}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    sx={{ width: "100%" }}
                    variant="contained"
                    size="small"
                    onClick={() => handleAdd(product)}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        PaperProps={{ sx: { width: isMobile ? "100%" : 600 } }}
      >
        <Container
          sx={{
            width: "100%",
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              sx={{ display: "flex", alignItems: "center", gap: "10px" }}
              variant="h6"
            >
              {cartItems.length === 0 ? (
                <RemoveShoppingCartIcon />
              ) : (
                <ShoppingCartIcon />
              )}{" "}
              Your Cart
            </Typography>
            <Button
              onClick={() => dispatch(clearCart())}
              // size={{ xs: "small", sm: "medium" }}
              sx={{
                width: { xs: "120px", sm: "150px" },
                fontSize: { xs: "12px" },
              }}
              variant="outlined"
            >
              Remove All
            </Button>
            <IconButton onClick={() => setCartOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {cartItems.length === 0 ? (
            <Typography variant="body1">Cart is empty</Typography>
          ) : (
            <List sx={{ flexGrow: 1, overflowY: "auto" }}>
              {cartItems.map((item) => (
                <ListItem
                  key={item.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={() => dispatch(deleteItem(item.id))}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" }, // Column on mobile, row on small+ screens
                    alignItems: { xs: "flex-start", sm: "center" }, // Optional for better alignment
                    gap: 1, // Space between elements
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={item.productImg} alt={item.productName} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.productName}
                    secondary={`Price: ₹${item.productPrice} | Qty: ${
                      item.quantity
                    } | Total: ₹${item.productPrice * item.quantity}`}
                  />
                  <Box
                    sx={{ display: "flex", gap: 1, ml: { xs: "0", sm: "2" } }}
                  >
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                    >
                      <RemoveCircleOutlineIcon />
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => dispatch(increaseQuantity(item.id))}
                    >
                      <AddCircleOutlineIcon />
                    </Button>
                  </Box>
                </ListItem>
              ))}
            </List>
          )}

          {cartItems.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Divider sx={{ mb: 1 }} />
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Total: ₹{totalPrice}
              </Typography>
              <Button variant="contained" color="primary" fullWidth>
                Checkout
              </Button>
            </Box>
          )}
        </Container>
      </Drawer>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddToCart;
