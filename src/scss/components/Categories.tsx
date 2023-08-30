type CategoriesProps = {
    categoryId: number;
    onClickCategory: (index:number) => void
}
const Categories: React.FC<CategoriesProps> = ({categoryId, onClickCategory}) => {
   const categoriesList = [
        "Всі",
        "М'ясні",
        "Вегетаріанські",
        "Гриль",
        "Гострі",
        "Закриті"
   ]
    return (
        <div className="categories">
            <ul>
                {categoriesList.map((category,index) => (
                    <li key={category} onClick={() => onClickCategory(index)} className={categoryId === index ? "active" : ""}>{category}</li>
                ))}
            </ul>
      </div>
    )
}
export default Categories