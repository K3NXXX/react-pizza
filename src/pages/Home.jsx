import "../scss/app.scss"
import Categories from "../../src/scss/components/Categories";
import PizzaBlock from "../../src/scss/components/PizzaBlock/PizzaBlock";
import Skeleton from "../../src/scss/components/PizzaBlock/Skeleton";
import { useEffect, useState, useContext, useRef } from "react";
import Pagination from "../scss/components/Pagination/Pagination";
import {SearchContext} from "../App"
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId, setFilters, setPageCount } from "../redux/slices/filterSlice";
import qs from "qs";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { setItems } from "../redux/slices/pizzasSlice";


const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSearch = useRef(false)
    const isMounted = useRef(false)
    const categoryId = useSelector((state) => state.filterSlice.categoryId)
    const currentPage = useSelector((state) => state.filterSlice.currentPage)
    const {items} = useSelector(state => state.pizzasSlice)

    const {searchValue} = useContext(SearchContext)
      
    const [isloading, setIsLoading] = useState(true)
    const onChangePage = (page) => {
      dispatch(setPageCount(page))
    }
    const fetchPizzas = async () => { // завдяки async await код з асинхронного став синхронним, тобто інший код чекає на виконання коду в async await
      setIsLoading(true)
      const category = categoryId > 0 ? `category=${categoryId}` : ""
      const search = searchValue ? `&search=${searchValue}` : ""
      // await axios.get(`https://64b38b820efb99d86267e6a2.mockapi.io/items?page=${currentPage}&limit=4&${category}${search}`)
      // .then (res => {
      //   setItems(res.data);
      //     setIsLoading(false)
      //     window.scrollTo(0,0)
      // }) так би було без async
      try {
        const res = await axios.get(`https://64b38b820efb99d86267e6a2.mockapi.io/items?page=${currentPage}&limit=4&${category}${search}`) // так з async
        dispatch(setItems(res.data))

      }catch (error){
        alert("Помилка при загрузці товарів")
        console.log("ERROR", error)
      }finally {
        setIsLoading(false)

      }
    }
    
    useEffect(() => { // при перезагрузці сторінки, щоб були ті самі дані з qs
      if(window.location.search) {
        const params = qs.parse(window.location.search.substring(1))
        dispatch(setFilters({...params}))
        isSearch.current = true
      }
    }, [dispatch])
    useEffect(() => { // useEffect дивися за цим кодом, і після 1 рендерингу ніколи його більше не викликай
      window.scrollTo(0,0)
      if (!isSearch.current) {
        fetchPizzas()

      }
      isSearch.current = false

    }, [categoryId, searchValue, currentPage])
    // -------------qs---------- вставляємо дані параметрів в url
    useEffect(() => {
      if(isMounted.current) {
        const queryString = qs.stringify({
          categoryId,
          currentPage
        })
        navigate(`?${queryString}`)
      }
      isMounted.current = true
    }, [categoryId, currentPage, navigate])
    // -------------qs----------
    const pizzas = items
    // .filter((obj) => {
    //   if(obj.title.toLowerCase().includes(searchValue)) { фільтрація
    //     return true
    //   }
    //   return false})
      .map((pizza) => <li  key={pizza.id} to={`/pizza/${pizza.id}`}><PizzaBlock {...pizza} /></li>)
    const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory = {(id) => {
          dispatch(setCategoryId(id))
        }}  />
        {/* <Sort /> */}
      </div>
      <h2 className="content__title">Всі піци</h2>
      <div className="content__items">
        {isloading
          ? skeleton : pizzas}
      </div>
      <Pagination onChangePage = {onChangePage}/>
    </div>
  );
};

export default Home;
