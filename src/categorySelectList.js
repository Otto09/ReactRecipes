import React from 'react';
import AnOptionCategory from "./anOptionCategory";

const CategorySelectList = (props) => {

  const { categoriesCards } = props;

  const categorySelectList = categoriesCards.map((item) => (
      
    <AnOptionCategory                     
      category={item.category} 
      id_category={item.id_category}
      key={item.id_category}  
    />
  ));

  return (
    <> 
      {categorySelectList} 
    </>  
  );
}
 
export default CategorySelectList;