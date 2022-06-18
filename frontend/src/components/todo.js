import React from "react";

const TodoIteam = ({ todo }) => {
    return (<tr>

        <td>
            {todo.id}
        </td>
        <td>
            {todo.text}
        </td>
        <td>
            {todo.createDate}
        </td>
        <td>
            {todo.editDate}
        </td>
        <td>
            {todo.active.toString()}
        </td>
        <td>
            {todo.project}
        </td>
        <td>
            {todo.userCreated}
        </td>
    </tr>)
}


const TodoList = ({ todos }) => {
    return (
        <table className="fa-user">
            <tr>
                <thead>
                    <td>
                        ID
                    </td>
                    <td>
                        Text
                    </td>
                    <td>
                        Create Date
                    </td>
                    <td>
                        Edit Date
                    </td>
                    <td>
                        Active
                    </td>
                    <td>
                        Project
                    </td>
                    <td>
                        User Created
                    </td>
                </thead>
                <tbody>
                    {todos.map((todo) => <TodoIteam todo={todo} />)}
                </tbody>
            </tr>
        </table>)
}

export default TodoList;