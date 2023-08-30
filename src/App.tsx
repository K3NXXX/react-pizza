import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Header from "./scss/components/Header"
import Cart from "./pages/Cart"
import "./scss/app.scss"

const App:React.FC = () => {
    return (
        <div className="App">
            <div className="wrapper">
                <Header/>
                    <div className="content">
                        <Routes>
                            <Route path="/react-pizza" element={<Home/>} />
                            <Route path="/react-pizza/cart" element={<Cart/>} />
                            <Route path="*" element={<NotFound/>} />
                        </Routes>
                    </div>
            </div>
        </div>
    );
}

export default App;
