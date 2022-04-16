import React, { useEffect, useState } from "react";
import { Navbar, Products, Cart } from "./components";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    console.log("here i am");
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log("cart is", cart);

  return (
    <Router>
      <Navbar totalItems={cart.total_items} />
      <Routes>
        <Route path="/" element={<Products products={products} onAddToCart={handleAddToCart} />}/>
        <Route path="/cart" element={<Cart cart={cart} />}/>
      </Routes>
    </Router>
  );
};

export default App;
