import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import "./scss/app.scss"
import Header from "./scss/components/Header"
import Cart from "./pages/Cart"
import { createContext, useState } from "react";
import FullPizza from "./pages/FullPizza";
export const SearchContext = createContext()

function App() {
    const [searchValue, setSearchValue] = useState("")
    return (
        <div className="App">
            <div className="wrapper">
                   <SearchContext.Provider value={{ searchValue, setSearchValue }}>
                    <Header/>
                        <div className="content">
                            <Routes>
                                <Route path="/" element={<Home searchValue = {searchValue}/>} />
                                <Route path="/cart" element={<Cart/>} />
                                {/* <Route path="/pizza/:id" element={<FullPizza/>} /> */}
                                <Route path="*" element={<NotFound/>} />
                            </Routes>
                        </div>
                    </SearchContext.Provider>
            </div>
        </div>
    );
}

export default App;
