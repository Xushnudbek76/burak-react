import React from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import { HomePage } from "./screens/homePage";
import { ProductsPage } from "./screens/productsPage";
import { OrdersPage } from "./screens/ordersPage";
import { UserPage } from "./screens/userPage";
import { HomeNavbar } from "./components/headers/HomeNavbar";
import { OtherNavbar } from "./components/headers/OtherNavbar";
import { Footer } from "./components/footer";
import "../css/app.css";
import "../css/navbar.css"
import { HelpPage } from "./screens/helpPage";
function App() {
  const location = useLocation();
  return (
  <>
        

{location.pathname === "/" ? <HomeNavbar></HomeNavbar> : <OtherNavbar></OtherNavbar>}
        <Switch>
          <Route path="/products">
            <ProductsPage />
          </Route>
          <Route path="/orders">
            <OrdersPage />
          </Route>
          <Route path="/member-page">
            <UserPage />
          </Route>
          <Route path="/help">
            <HelpPage />
          </Route>          
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
        <Footer></Footer>
      </>)
}

export default App;





