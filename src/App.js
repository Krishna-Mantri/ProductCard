import styles from './App.module.css';
import { Fragment } from 'react';
import { ProductList} from './components/ProductList';
import {ProductCard} from './components/ProductCard';
import { ProductFilter } from './components/ProductFilter';
import { useState } from 'react';
import {product as productsData }from './data/products.js'; // Assuming product.json is in the data folder


function App() {
  
  const[product, setProduct] = useState(productsData); // Using productsData from product.json

  const [filters, setFilters] = useState({
    price:{
      min: 0,
      max: 999,
    },
    other:"other value",
  });

  const[favorites,setfavorites] = useState([]);

  function priceClick(productId, stockCount) {
    setProduct((prevProducts) => 
      prevProducts.map((product) => 
        product.id === productId ? { ...product, stockCount} : product)
    );
  }

  function handleFilter(key,value) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      price: {
        ...prevFilters.price,
        [key]: value,
      },
    
    }));
  }

  function handleFavorite(productId) {
    setfavorites((prevFavorites) => {
      if (prevFavorites.includes(productId)) {
        return prevFavorites.filter((id) => id !== productId);
      } else {
        return [...prevFavorites, productId];
      }
    });
  }

  return (
    <div className={styles.App}> 
      <ProductList>
        {product.map((product) => (
          <ProductCard product={product} 
            key={product.name}
            onClick={priceClick} 
            isFavorite={favorites.includes(product.id)}
            onFavorite={handleFavorite}
          />
        ))}
      </ProductList>

      <h2>Product Filtered by price</h2>
      <ProductFilter filters={filters} onFilter={handleFilter}/>
      {product
        .filter(({price})=>
          price>=filters.price.min && price<=filters.price.max)  
        .map(({name,price})=>(
          <Fragment key={name}>
            <hr className={styles.ListDivider} />
              <p className={styles.ListTitle}>
                {name} cost INR {price}/- 
              </p>
          </Fragment>
        ))}
    </div>
  );
}

export default App;
