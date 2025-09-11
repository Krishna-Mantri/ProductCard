import styles from './ProductCard.module.css';
import { useState } from 'react';


export function ProductCard({product,background='slategray',onClick, onFavorite,isFavorite}) {
    const[showmore, setShowMore] = useState(false);

    function  handleClick(){
        // setStockCount(stockCount-1);
        onClick(product.id, product.stockCount-1);
        
    }
    
    return (
        <article className={styles.Container} style={{background}}>
            <button className={styles.Favorite} onClick={()=>onFavorite(product.id)}>
                {isFavorite?'❤️':'🤍'}
            </button>

            <img
            src={product.imageSrc}
            alt={product.name}
            width="128px"
            height="128px"
            />
            <h2>{product.name}</h2>
            <p>Prduct description:{' '}
                <button onClick={()=>setShowMore(!showmore)}>{showmore ? 'Less' : 'More'}</button>
            </p>
            {showmore && <ul className={styles.Description}>
                {product.description.map((spec, index) => (
                    <li key={index}>{spec}</li>
                ))}

            </ul>}
            
            <Status stock={product.stockCount}/>
            {product.stockCount >0 && (
                <button onClick={handleClick}>Buy @{product.price}</button>
            )}
        </article>
    );

    function Status({stock}){
        const notAvailableTemplate = (
            <p className={styles.NotAvailableStatus}>Out of Stock</p>
        )
        const AvailableTemplate = (
            <p className={styles.AvailableStatus}>In Stock: {product.stockCount}</p>
        )
    
    
        return stock>0 ?  AvailableTemplate : notAvailableTemplate;
    }
}

