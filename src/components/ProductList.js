import styles from './ProdctList.module.css';

export function ProductList(props){
    return(
        <>
            <h2>Product List</h2>
            <div className={styles.List}>{props.children}</div>
        </>
    );
}