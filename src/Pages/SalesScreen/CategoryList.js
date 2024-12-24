import Category from "./Category";
import '../../Styles/Category.css'


const CategoryList = ({ categories,onCategoryClick}) => {

  return (
    <div className="category-list" style={{padding:"15px"}}>
      {categories.map((c,index) => (
        <Category
          key={index}
          name={c.name}
          image={c.image}
          onCategoryClick={onCategoryClick}
        />
      ))}
    </div>
  );
};

export default CategoryList;
