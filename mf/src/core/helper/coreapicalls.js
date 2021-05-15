import { API } from "../../backend";

export const getProducts = () => {
  return fetch(`${API}/products`, { method: "GET" })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};


// // router.get("/product/:productId", getProduct);

/*  export const getProductById = (productId) => {
   return fetch(`${API}/product/:${productId}`, { method: "GET" })
     .then(response => {
       return response.json();
     })
     .catch(err => { console.log(err) })

 } */