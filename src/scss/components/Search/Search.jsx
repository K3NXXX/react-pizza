import style from "./Search.module.scss"
import search from "../../../assets/img/search-icon.png"
import close from "../../../assets/img/cross-icon.png"
import debounce from "lodash.debounce"
import { useCallback, useContext, useRef, useState } from "react"
import { SearchContext } from "../../../App"
const Search = () => {
    const { searchValue, setSearchValue } = useContext(SearchContext);
    const [value,setValue] = useState("")

    const updateSearchValue =  useCallback( // callback створи один раз функцію і більше не перестворюй її
    debounce((value) => {
        setSearchValue(value)
    }, 350), [])

    const onChangeInput = event => {
        setValue(event.target.value)
        updateSearchValue(event.target.value)
    }
    const inputRef = useRef() // витягуємо посилання дом обєкт ref={inputRef}
    const onClickClear = () => {
        setSearchValue("")
        setValue("")
        inputRef.current.focus()
    }
    return (
        <div className={style.root}>
            <input ref={inputRef} value={value} onChange={onChangeInput} className={style.input} type="text" placeholder="Пошук" />
            <img className={style.search}  src={search} alt="" />
            {value && (<img className={style.close} onClick={onClickClear}  src={close} alt="" />)}
        </div>
      );
}
 
export default Search;