import React from "react";

const MenuList = ({}) => {
    return (
        <table className="menu-main">
            <th>
                <form action="">
                <input type="submit" value="Все пользователи"/>
                </form>
            </th>
            <th>
                <form action="">
                <input type="submit" value="Проекты"/>
                </form>
            </th>
            <th>
               <form action="">
                <input type="submit" value="TODO"/>
                </form>
            </th>
        </table>
    )
}
export default MenuList