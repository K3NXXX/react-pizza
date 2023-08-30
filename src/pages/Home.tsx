import "../scss/app.scss"
import Categories from "../scss/components/Categories";
import PizzaBlock from "../scss/components/PizzaBlock/PizzaBlock";
import Skeleton from "../scss/components/PizzaBlock/Skeleton";
import { useEffect, useState, useContext, useRef } from "react";
import Pagination from "../scss/components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { FilterSliceState, setCategoryId, setFilters, setPageCount } from "../redux/slices/filterSlice";
import qs from "qs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setItems } from "../redux/slices/pizzasSlice";
import { RootState } from "../redux/store";

const Home:React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSearch = useRef(false)
    const isMounted = useRef(false)
    const categoryId = useSelector((state:RootState) => state.filterSlice.categoryId)
    const currentPage = useSelector((state: RootState) => state.filterSlice.currentPage)
    const {items} = useSelector((state: RootState) => state.pizzasSlice)
    const searchValue = useSelector((state:RootState) => state.filterSlice.searchValue)
    const [isloading, setIsLoading] = useState(true)
    const onChangePage = (page:number) => {
      dispatch(setPageCount(page))
    }
    const fetchPizzas = async () => { 
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
    
    useEffect(() => {
      if (window.location.search) {
        const parsedParams: qs.ParsedQs = qs.parse(window.location.search.substring(1));
        const mappedParams: Partial<FilterSliceState> = {
          searchValue: parsedParams.searchValue as string || '',
          categoryId: Number(parsedParams.categoryId) || 0,
          currentPage: Number(parsedParams.currentPage) || 1,
        };
    
        dispatch(setFilters(mappedParams as FilterSliceState));
        isSearch.current = true;
      }
    }, [dispatch]);
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
    const pizzas = items.map((pizza:any) => <li  key={pizza.id}><PizzaBlock {...pizza} /></li>)
    const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory = {(id) => {
          dispatch(setCategoryId(id))
        }}  />
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
