
import '../../Styles/Category.css'


const Category = ({ name,image,onCategoryClick}) => {

    return (
      <div className={`category`} onClick={()=>onCategoryClick(name)}>
        <img src={image} alt={name} />
        <h2>{name}</h2>
        
      </div>
    );
  };

export default Category;