import React from "react";

const UsersItem = ({ user }) => {
    return (
        <tr>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
        </tr>
    );
};
const UserList = ({ users }) => {
    return (
        <table className="fa-user">
            <thead>
                <td>First name</td>
                <td>Last Name</td>
                <td>Username</td>
                <td>Email</td>
            </thead>
            <tbody>
                {users.map((user) => (
                    <UsersItem user={user} />
                ))}
            </tbody>
        </table>
    );
};
export default UserList;
