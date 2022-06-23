import React from "react";
import { Link } from "react-router-dom";

const TodoIteam = ({ todo, delete_todo }) => {
    return (
        <tr>
            <td>{todo.id}</td>
            <td>{todo.text}</td>
            <td>{todo.create_date}</td>
            <td>{todo.edit_date}</td>
            <td>{todo.active.toString()}</td>
            <td>{todo.project}</td>
            <td>{todo.user_created}</td>
            <td>
                <button onClick={() => { delete_todo(todo.id); todo.active = false }} type="button">
                    Delete
                </button>
            </td>
        </tr >

    );
};

const TodoList = ({ todos, delete_todo }) => {
    return (
        <table className="fa-user">
            <thead>
                <td>ID</td>
                <td>Text</td>
                <td>Create Date</td>
                <td>Edit Date</td>
                <td>Active</td>
                <td>Project</td>
                <td>User Created</td>
            </thead>
            <tbody>
                {todos.map((todo) => (
                    <TodoIteam todo={todo} delete_todo={delete_todo} />
                ))}
            </tbody>
            <Link to="/todo/create">
                <button type="button">
                    Create Todo
                </button>
            </Link>
        </table>
    );
};

export default TodoList;
