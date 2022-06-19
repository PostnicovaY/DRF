import React from "react";
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom'
import ProjectList from "./project";

const MenuList = ({ }) => {
    return (
        <header>
            <ul className="menu">
                <li>
                    <Link to='/'>Все пользователи</Link>
                </li>
                <li>
                    <Link to='/projects'>Проекты</Link>
                </li>
                <li>
                    <Link to='/todo'>TODO</Link>
                </li>
            </ul>
        </header >
    )
}
export default MenuList