// // export default function Databindingcomponent()
// // {
// //     var product = {
// //         Name:"Amazon",
// //         Price:45000,
// //         Stock:'Available'
// //     }
// //     return(
// //         <div className="netflix-background main-content text-center text-white">
// //             <div className="bg-black text-white p-4 rounded w-50">
// //                 <h2>Product Details </h2>
// //                 <dl>
// //                     <dt>Name</dt>
// //                     <dt>{product.Name}</dt>
// //                 </dl>
// //                 <dl>
// //                     <dt>Price</dt>
// //                     <dt>{product.Price}</dt>
// //                 </dl>
// //                 <dl>
// //                     <dt>Stock</dt>
// //                     <dt>{product.Stock}</dt>
// //                 </dl>
// //             </div>
// //         </div>
// //     )
// // }

// export default function Databindingcomponent()
// {
//     var categories = ["samsung","vivo","oppo","nokia","redmi"];
//     return(
//         <div className="container">
//             <h2>Categoies</h2>
//             <ol>
//                 {
//                     categories.map(category => 
//                         <li>
//                             {
//                                 category
//                             }
//                         </li>
//                     )
                
// }
//             </ol>
//                 <h2>
//                     Select category
//                 </h2>
//                 <select>
//                     {
//                         categories.map(
//                             category => 
//                         <option value={categories}>
//                             {
//                                 category
//                             }
//                         </option>
//                         )
//                     }
//                 </select>
//         </div>
//     )
// }


// export default function Databindingcomponent()
// {
    
//     var product = [
//         {Name:"Samsung",Price:57000},
//         {Name:"LG",Price:43000},
//         {Name:"Sony",Price:69000},
//         {Name:"Redmi",Price:40000},
//         {Name:"Panasonic",Price:57000}
//     ];  
//     return (
//         <div className="container">
//             <table className="table table-hover">
//                 <thead>

//                     <tr>
//                         <th>Name</th>
//                         <th>Price</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         product.map(product =>
//                             <tr>
//                                 <td>{product.Name}</td>
//                                 <td>{product.Price}</td>
//                             </tr>
//                         )
//                     }
//                 </tbody>
//             </table>
//         </div>
//     )
// }

//.find() --> will return only Single Value

// .map() --> will return all values

// .join() --> it will return and join the values

// .slice() --> it will return the element from 
// specified index to other

// .toString()  --> will return all element and separated
// with comma 

// .filter() --> will read every element and return if it 
// is matching the given conditions 

// import { when } from "jquery";
// import { useState } from "react";
// export default function Databindingcomponent(){
//     const [product, setProduct] = useState({Name:'', Price:0, Quantity:0, City:'', Stock:false});
//     const [newProduct, setNewProduct] = useState({Name:'', Price:0, Quantity:0, City:'', Stock:false});

//     function handleName(e){
//         setProduct({
//             Name: e.target.value,
//             Price: product.Price,
//             Quantity: product.Quantity,
//             City: product.City,
//             Stock: product.Stock
//         })
//     }
//     function handlePrice(e){
//         setProduct({
//             Name: product.Name,
//             Price: e.target.value,
//             Quantity: product.Quantity,
//             City: product.City,
//             Stock: product.Stock
//         })
//     }
//     function handleQuantity(e)
//     {
//         setProduct(
//             {
//                 Name: product.Name,
//                 Price: product.Price,
//                 Quantity: e.target.value,
//                 City: product.City,
//                 Stock: product.Stock
//             }
//         )
//     }
//     function handleCity(e){
//         setProduct({
//             Name: product.Name,
//             Price: product.Price,
//             Quantity: product.Quantity,
//             City: e.target.value,
//             Stock: product.Stock
//         })
//     }
//     function handleStock(e){
//         setProduct({
//             Name: product.Name,
//             Price: product.Price,
//             Quantity: product.Quantity,
//             City: product.City,
//             Stock: e.target.checked
//         })
//     }

//     function handleRegisterClick(){
//         setNewProduct(product);
//     }

//     return(
//         <div className="container-fluid">
//             <div className="row">
//                 <div className="col-3">
//                     <h2>Register Product</h2>
//                     <dl>
//                         <dt>Name</dt>
//                         <dd><input className="form-control" onChange={handleName} type="text"/></dd>
//                         <dt>Price</dt>
//                         <dd><input className="form-control" onChange={handlePrice} type="text"/></dd>
//                         <dt>Quantity</dt>
//                         <dd><input className="form-control" onChange={handleQuantity} type="text"/></dd>
//                         <dt>City</dt>
//                         <dd>
//                             <select onChange={handleCity} className="form-select">
//                                <option>Chennai</option>
//                                 <option>Bangalore</option>
//                                 <option>Delhi</option>
//                                 <option>Hyderabad</option>
//                                 <option>Mumbai</option>
//                             </select>
//                         </dd>
//                         <dt>Stock</dt>
//                         <dd className="form-switch">
//                             <input onChange={handleStock} className="form-check-input" type="checkbox" /> Available
//                         </dd>
//                     </dl>
//                     <button onClick={handleRegisterClick} className="btn btn-primary w-100">Register</button>
//                 </div>
//                 <div className="col-9">
//                     <h2>Product Details</h2>
//                     <dl>
//                         <dt>Name</dt>
//                         <dd>{newProduct.Name}</dd>
//                         <dt>Price</dt>
//                         <dd>{newProduct.Price}</dd>
//                         <dt>Quantity</dt>
//                         <dd>{newProduct.Quantity}</dd>
//                         <dt>City</dt>
//                         <dd>{newProduct.City}</dd>
//                         <dt>Stock</dt>
//                         <dd>{(newProduct.Stock==true)?"Available":"Out of Stock"}</dd>
//                     </dl>
//                 </div>
//             </div>
//         </div>
//     )
// }

// 

// import { useState, useEffect } from "react";

// export default function Databindingcomponent() {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [cartItems, setCartItems] = useState([]);
//   const [itemsCount, setItemsCount] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0); // New state for total price

//   function GetCartItemsCount() {
//     setItemsCount(cartItems.length);
//   }

//   function CalculateTotalPrice() {
//     const total = cartItems.reduce((sum, item) => sum + item.price, 0); // Calculate the total price
//     setTotalPrice(total.toFixed(2)); // Set total price with two decimal places
//   }

//   function LoadCategories() {
//     fetch("https://fakestoreapi.com/products/categories")
//       .then((response) => response.json())
//       .then((data) => {
//         data.unshift("all");
//         setCategories(data);
//       });
//   }

//   function LoadProducts(url) {
//     fetch(url)
//       .then((response) => response.json())
//       .then((data) => {
//         setProducts(data);
//       });
//   }

//   useEffect(() => {
//     LoadCategories();
//     LoadProducts("https://fakestoreapi.com/products");
//   }, []);

//   useEffect(() => {
//     CalculateTotalPrice(); // Recalculate total price when cart items change
//     GetCartItemsCount(); // Update the items count when cart changes
//   }, [cartItems]);

//   function handleCategoryChange(e) {
//     if (e.target.value === "all") {
//       LoadProducts("https://fakestoreapi.com/products");
//     } else {
//       LoadProducts(`https://fakestoreapi.com/products/category/${e.target.value}`);
//     }
//   }

//   function handleAddtoCart(e) {
//     alert("Item Added to Cart");
//     fetch(`https://fakestoreapi.com/products/${e.target.id}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setCartItems((prevItems) => [...prevItems, data]); // Add item to cartItems array
//       });
//   }

//   return (
//     <div className="container-fluid">
//       <header className="bg-danger text-white text-center p-2">
//         <h1>
//           <span className="bi bi-cart"></span> Shopping Home
//         </h1>
//       </header>
//       <section className="row mt-3">
//         <nav className="col-2">
//           <div>
//             <label>Select a Category</label>
//             <div>
//               <select onChange={handleCategoryChange} className="form-select">
//                 {categories.map((category) => (
//                   <option value={category} key={category}>
//                     {category.toUpperCase()}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </nav>
//         <main
//           className="col-6 d-flex flex-wrap overflow-auto"
//           style={{ height: "600px" }}
//         >
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="card m-2 p-2"
//               style={{ width: "200px" }}
//             >
//               <img
//                 src={product.image}
//                 className="card-img-top"
//                 height="150"
//                 alt="product"
//               />
//               <div className="card-header" style={{ height: "160px" }}>
//                 <p>{product.title}</p>
//               </div>
//               <div className="card-body">
//                 <dl>
//                   <dt>Price</dt>
//                   <dd>{product.price}</dd>
//                   <dt>Rating</dt>
//                   <dd>
//                     <span className="bi bi-star-fill text-success"></span>
//                     {product.rating.rate} <span>[{product.rating.count}]</span>
//                   </dd>
//                 </dl>
//               </div>
//               <div className="card-footer">
//                 <button
//                   id={product.id}
//                   onClick={handleAddtoCart}
//                   className="btn btn-danger w-100"
//                 >
//                   <span className="bi bi-cart4"></span> Add to Cart
//                 </button>
//               </div>
//             </div>
//           ))}
//         </main>
//         <aside className="col-4">
//           <button className="btn btn-danger w-100">
//             <span className="bi bi-cart3"></span> [{itemsCount}] Your Cart Items
//           </button>
//           <table className="table table-hover">
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>Price</th>
//                 <th>Preview</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cartItems.map((item) => (
//                 <tr key={item.id}>
//                   <td>{item.title}</td>
//                   <td>{item.price}</td>
//                   <td>
//                     <img src={item.image} width="50" height="50" alt="preview" />
//                   </td>
//                   <td>
//                     <button className="btn btn-danger">
//                       <span className="bi bi-trash"></span>
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {/* Display Total Price Below the Table */}
//           <div className="mt-3 text-end">
//             <h4>Total: ${totalPrice}</h4>
//           </div>
//         </aside>
//       </section>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";

// export default function Databindingcomponent() {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [cartItems, setCartItems] = useState([]);
//   const [itemsCount, setItemsCount] = useState(0);

//   // Calculate the total items count
//   function GetCartItemsCount() {
//     const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
//     setItemsCount(totalQuantity);
//   }

//   // Load categories from API
//   function LoadCategories() {
//     fetch("https://fakestoreapi.com/products/categories")
//       .then((response) => response.json())
//       .then((data) => {
//         data.unshift("all");
//         setCategories(data);
//       });
//   }

//   // Load products from API
//   function LoadProducts(url) {
//     fetch(url)
//       .then((response) => response.json())
//       .then((data) => {
//         setProducts(data);
//       });
//   }

//   // Initial load
//   useEffect(() => {
//     LoadCategories();
//     LoadProducts("https://fakestoreapi.com/products");
//   }, []);

//   // Handle category change
//   function handleCategoryChange(e) {
//     if (e.target.value === "all") {
//       LoadProducts("https://fakestoreapi.com/products");
//     } else {
//       LoadProducts(`https://fakestoreapi.com/products/category/${e.target.value}`);
//     }
//   }

//   // Handle adding product to cart
//   function handleAddToCart(e) {
//     const productId = e.target.id;

//     fetch(`https://fakestoreapi.com/products/${productId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         // Check if the product is already in the cart
//         const existingProduct = cartItems.find((item) => item.id === data.id);

//         if (existingProduct) {
//           // Increment the quantity of the existing product
//           existingProduct.quantity += 1;
//           setCartItems([...cartItems]);
//         } else {
//           // Add new product to the cart with quantity 1
//           const newItem = { ...data, quantity: 1 };
//           setCartItems([...cartItems, newItem]);
//         }

//         GetCartItemsCount();
//       });
//   }

//   // Calculate the total price of items in the cart
//   const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//   return (
//     <div className="container-fluid">
//       <header className="bg-danger text-white text-center p-2">
//         <h1>
//           <span className="bi bi-cart"></span> Shopping Home
//         </h1>
//       </header>
//       <section className="row mt-3">
//         {/* Sidebar for categories */}
//         <nav className="col-2">
//           <div>
//             <label>Select a Category</label>
//             <div>
//               <select onChange={handleCategoryChange} className="form-select">
//                 {categories.map((category) => (
//                   <option value={category} key={category}>
//                     {category.toUpperCase()}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </nav>

//         {/* Main product listing */}
//         <main className="col-6 d-flex flex-wrap overflow-auto" style={{ height: "600px" }}>
//           {products.map((product) => (
//             <div key={product.id} className="card m-2 p-2" style={{ width: "200px" }}>
//               <img src={product.image} className="card-img-top" height="150" alt={product.title} />
//               <div className="card-header" style={{ height: "160px" }}>
//                 <p>{product.title}</p>
//               </div>
//               <div className="card-body">
//                 <dl>
//                   <dt>Price</dt>
//                   <dd>${product.price}</dd>
//                   <dt>Rating</dt>
//                   <dd>
//                     <span className="bi bi-star-fill text-success"></span>
//                     {product.rating.rate} <span>[{product.rating.count}]</span>
//                   </dd>
//                 </dl>
//               </div>
//               <div className="card-footer">
//                 <button id={product.id} onClick={handleAddToCart} className="btn btn-danger w-100">
//                   <span className="bi bi-cart4"></span> Add to Cart
//                 </button>
//               </div>
//             </div>
//           ))}
//         </main>

//         {/* Cart section */}
//         <aside className="col-4">
//           <button className="btn btn-danger w-100">
//             <span className="bi bi-cart3"></span> [{itemsCount}] Your Cart Items
//           </button>
//           <table className="table table-hover mt-2">
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>Price</th>
//                 <th>Quantity</th>
//                 <th>Preview</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cartItems.map((item) => (
//                 <tr key={item.id}>
//                   <td>{item.title}</td>
//                   <td>${item.price.toFixed(2)}</td>
//                   <td>{item.quantity}</td>
//                   <td>
//                     <img src={item.image} width="50" height="50" alt={item.title} />
//                   </td>
//                   <td>
//                     <button className="btn btn-danger">
//                       <span className="bi bi-trash"></span>
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//             <tfoot>
//               <tr>
//                 <td colSpan="2" className="text-end">
//                   <strong>Total:</strong>
//                 </td>
//                 <td colSpan="3">${totalPrice.toFixed(2)}</td>
//               </tr>
//             </tfoot>
//           </table>
//         </aside>
//       </section>
//     </div>
//   );
// }

// import { useState, useEffect, useCallback, useMemo } from "react";

// const ProductCard = ({ product, onAddToCart }) => (
//   <div className="card m-2 p-2" style={{ width: '200px' }}>
//     <img src={product.image} className="card-img-top" height="150" alt={product.title} />
//     <div className="card-header" style={{ height: '160px' }}>
//       <p>{product.title}</p>
//     </div>
//     <div className="card-body">
//       <dl>
//         <dt>Price</dt>
//         <dd>${product.price}</dd>
//         <dt>Rating</dt>
//         <dd>
//           <span className="bi bi-star-fill text-success"></span>
//           {product.rating.rate} <span>[{product.rating.count}]</span>
//         </dd>
//       </dl>
//     </div>
//     <div className="card-footer">
//       <button id={product.id} onClick={onAddToCart} className="btn btn-danger w-100">
//         <span className="bi bi-cart4"></span> Add to Cart
//       </button>
//     </div>
//   </div>
// );

// const CartItem = ({ item, onRemove, onUpdateQuantity }) => (
//   <tr key={item.product.id}>
//     <td>{item.product.title}</td>
//     <td>${item.product.price}</td>
//     <td>
//       <img src={item.product.image} width="50" height="50" alt={item.product.title} />
//     </td>
//     <td>
//       <div className="d-flex align-items-center">
//         <button
//           onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
//           className="btn btn-sm btn-secondary me-2"
//           disabled={item.quantity === 1}
//         >
//           -
//         </button>
//         <span>{item.quantity}</span>
//         <button
//           onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
//           className="btn btn-sm btn-secondary ms-2"
//         >
//           +
//         </button>
//       </div>
//     </td>
//     <td>
//       <button onClick={() => onRemove(item.product.id)} className="btn btn-danger">
//         <span className="bi bi-trash"></span>
//       </button>
//     </td>
//   </tr>
// );

// export default function DatabindingComponent() {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const itemsCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);

//   const totalAmount = useMemo(() => {
//     return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2);
//   }, [cartItems]);

//   const loadCategories = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('https://fakestoreapi.com/products/categories');
//       const data = await response.json();
//       data.unshift('all');
//       setCategories(data);
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const loadProducts = useCallback(async (url) => {
//     setLoading(true);
//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       setProducts(data);
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadCategories();
//     loadProducts('https://fakestoreapi.com/products');
//   }, [loadCategories, loadProducts]);

//   const handleCategoryChange = useCallback((e) => {
//     const url = e.target.value === 'all' 
//       ? 'https://fakestoreapi.com/products' 
//       : `https://fakestoreapi.com/products/category/${e.target.value}`;
//     loadProducts(url);
//   }, [loadProducts]);

//   const handleAddToCart = useCallback(async (e) => {
//     const productId = e.target.id;
//     try {
//       const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
//       const product = await response.json();
      
//       setCartItems(prev => {
//         const existingItem = prev.find(item => item.product.id === productId);
//         if (existingItem) {
//           return prev.map(item =>
//             item.product.id === productId
//               ? { ...item, quantity: item.quantity + 1 }
//               : item
//           );
//         }
//         return [...prev, { product, quantity: 1 }];
//       });

//       alert("Item Added to Cart");
//     } catch (err) {
//       setError(err);
//     }
//   }, []);

//   const handleRemoveFromCart = useCallback((itemId) => {
//     setCartItems(prev => prev.filter(item => item.product.id !== itemId));
//   }, []);

//   const handleUpdateQuantity = useCallback((itemId, newQuantity) => {
//     setCartItems(prev =>
//       prev.map(item =>
//         item.product.id === itemId
//           ? { ...item, quantity: newQuantity }
//           : item
//       )
//     );
//   }, []);

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div className="container">
//       <header className="bg-danger text-white text-center p-2">
//         <h1><span className="bi bi-cart"></span> Shopping Home</h1>
//       </header>
//       <section className="row mt-3">
//         <nav className="col-2">
//           <div>
//             <label>Select a Category</label>
//             <div>
//               <select onChange={handleCategoryChange} className="form-select">
//                 {categories.map(category => (
//                   <option value={category} key={category}>{category.toUpperCase()}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </nav>
//         <main className="col-6 d-flex flex-wrap overflow-auto" style={{ height: '600px' }}>
//           {loading ? <p>Loading...</p> : products.map(product => (
//             <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
//           ))}
//         </main>
//         <aside className="col-4">
//           <button className="btn btn-danger w-100 mb-2">
//             <span className="bi bi-cart3"></span> [{itemsCount}] Your Cart Items
//           </button>
//           <table className="table table-hover">
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>Price</th>
//                 <th>Preview</th>
//                 <th>Quantity</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cartItems.map(item => (
//                 <CartItem
//                   key={item.product.id}
//                   item={item}
//                   onRemove={handleRemoveFromCart}
//                   onUpdateQuantity={handleUpdateQuantity}
//                 />
//               ))}
//             </tbody>
//           </table>
//           <div className="mt-3">
//             <h4>Total Amount: ${totalAmount}</h4>
//           </div>
//         </aside>
//       </section>
//     </div>
//   );
// }

// 

