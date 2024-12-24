import Product from "./Product";

const ProductList = ({ products }) => {
  return (
    <div className="product-list" style={{padding:"15px"}}>
      {products.map((product,index) => (
        <Product
          key={index}
          id={product.id}
          name={product.name}
          category={product.category}
          price={product.price ? product.price : product.price_per_kg}
          stock={product.stock ? product.stock : product.stock_kg}
          image={product.image}
          barcode={product.barcode}
          description={product.description}
        />
      ))}
    </div>
  );
};

export default ProductList;