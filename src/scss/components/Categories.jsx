const Categories = ({categoryId, onClickCategory}) => {
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
            {/* <li onClick={() => onClickCategory(0)} className={active ===0 ? "active" : ""} >Все</li>
            <li onClick={() => onClickCategory(2)} className={active ===2 ? "active" : ""}>Вегетарианская</li>
            <li onClick={() => onClickCategory(3)} className={active ===3 ? "active" : ""}>Гриль</li>
            <li onClick={() => onClickCategory(4)} className={active ===4 ? "active" : ""}>Острые</li>
            <li onClick={() => onClickCategory(5)} className={active ===5? "active" : ""}>Закрытые</li> */}
            </ul>
      </div>
    )
}
export default Categories