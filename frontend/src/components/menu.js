import React from "react";
import { Link } from "react-router-dom";
import "./auth";

export default function MenuList(props) {
    return (
        <header>
            <ul className="menu">
                <li>
                    <Link to="/">Все пользователи</Link>
                </li>
                <li>
                    <Link to="/projects">Проекты</Link>
                </li>
                <li>
                    <Link to="/todo">TODO</Link>
                </li>
                <li>
                    {props.is_auth ? (
                        <button onClick={props.logout}>
                            Hello, {props.username}! Logout
                        </button>
                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                </li>
            </ul>
        </header>
    );
}
