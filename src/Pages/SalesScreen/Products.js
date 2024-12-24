import React, { useState, useContext } from "react";
import Barcode from "./Barcode";
import ProductsContext from "../../Context/ProuductsContext";
import ProductList from "./ProductList";
import CategoryList from "./CategoryList";
import MyButton from "../../Components/MyButton";
import { useTranslation } from "react-i18next";

const Products = () => {

  const { products, categories } = useContext(ProductsContext);
  const [showCategories, setShowCategories] = useState(true);
  const [selectedButton, setSelectedButton] = useState("category");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const {t}=useTranslation();


  const handleCategoryButtonClick = () => {
    setShowCategories(true);
    setSelectedButton("category");
  };

  const handleProductButtonClick = () => {
    const withBarcodeProducts = products.filter((product) => product.barcode !== null);
    setShowCategories(false);
    setFilteredProducts(withBarcodeProducts)
    setSelectedButton("product");
  };

  const handleBarcodelessButtonClick = () => {
    const withoutBarcodes = products.filter((product) => product.barcode === null);
    setFilteredProducts(withoutBarcodes);
    setSelectedButton("barcodeless");
    setShowCategories(false);
  }

  const handleCategoryClick = (categoryName) => {

    const filtered = products.filter(product => product.category === categoryName);
    const hasBarcode = filtered.some((product) => product.barcode !== null);
    if (hasBarcode) {
      setSelectedButton("product");
    }
    else {
      setSelectedButton("barcodeless")
    }
    setFilteredProducts(filtered);
    setShowCategories(false);
  };

  const handleAddToCart = "addtocart"

  return (
    <div>
    <h1>{t('products_title')}</h1>
    <Barcode onScan={handleAddToCart} />
    <div>
      <MyButton onClick={handleCategoryButtonClick} active={selectedButton === "category"} style={{ marginLeft: "15px" }}>
        {t('category_button_text')}
      </MyButton>
      <MyButton onClick={handleProductButtonClick} active={selectedButton === "product"} style={{ marginLeft: "15px" }}>
        {t('barcode_products_button_text')}
      </MyButton>
      <MyButton onClick={handleBarcodelessButtonClick} active={selectedButton === "barcodeless"} style={{ marginLeft: "15px" }}>
        {t('barcodeless_products_button_text')}
      </MyButton>
      <div style={{ overflow: 'auto', height: "400px" }}>
        {showCategories ? <CategoryList categories={categories} onCategoryClick={handleCategoryClick} />
          : <ProductList products={filteredProducts} />}
      </div>
    </div>
  </div>
  );
};

export default Products;
