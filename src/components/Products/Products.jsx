import React from "react";
import { Grid } from "@material-ui/core";
import useStyles from "./Styles";
import Product from "./Product/Product";

const Products = () => {
  const products = [
    {
      id: 1,
      name: "Shoes",
      description: "Running Shoes",
      price: "$5",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXxlbnwwfHwwfHw%3D&w=1000&q=80",
    },
    {
      id: 2,
      name: "Macbook",
      description: "Laptop for Work",
      price: "$10",
      image:
        "https://www.cnet.com/a/img/At7JXOb2erGg-eOdKylQhFKfeJY=/2021/10/23/80425069-0d3e-4c67-9085-a66e6177fc60/macbook-pro-2021-cnet-review-12.jpg",
    },
  ];

  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
