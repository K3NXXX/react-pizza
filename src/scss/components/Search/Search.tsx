import { useCallback, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setSearchValue } from "../../../redux/slices/filterSlice"
import { RootState } from "../../../redux/store"
import debounce from "lodash.debounce"
import style from "./Search.module.scss"
import search from "../../../assets/img/search-icon.png"
import close from "../../../assets/img/cross-icon.png"

const Search:React.FC = () => {
    const dispatch = useDispatch()
    const searchValue = useSelector((state:RootState) => state.filterSlice.searchValue)
    const [value,setValue] = useState("")

    const updateSearchValue =  useCallback( // callback створи один раз функцію і більше не перестворюй її
    debounce((value: string) => {
        dispatch(setSearchValue(value))
    }, 350), [])

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
        updateSearchValue(event.target.value)
    }
    const inputRef = useRef<HTMLInputElement>(null) // витягуємо посилання дом обєкт ref={inputRef}
    const onClickClear = () => {
        dispatch(setSearchValue(""))
        setValue("")
        inputRef.current?.focus() // якщо inputRef.current = true тоді (?) буде спрацює .focus()
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