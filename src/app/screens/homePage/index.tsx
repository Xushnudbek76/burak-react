import React, {  useEffect } from "react";
import ActiveUsers from "./ActiveUsers";
import Advertisement from "./Advertisement";
import Events from "./Events";
import NewDishes from "./NewDishes";
import PopularDishes from "./PopularDishes";
import Statistics from "./Statistics";
 // @ts-ignore
import "../../../css/home.css";
import { Dispatch } from "@reduxjs/toolkit";
import { setPopularDishes } from "./slice";
import { Product } from "../../../lib/types/product";
import { useDispatch } from "react-redux";


    const actionDispatch = (dispatch: Dispatch) => ({
        setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
    }) 

export default function HomePage() {
    const { setPopularDishes } = actionDispatch(useDispatch());

    useEffect(() => {

    }, [])

    return <div className="homepage">
    <Statistics/>
    <PopularDishes/>
    <NewDishes/>
    <Advertisement/>
    <ActiveUsers/>
    <Events/>
    </div>
}