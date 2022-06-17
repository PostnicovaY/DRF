import React from "react";


const UsersItem = ({user}) => {

    return (<tr>

        <td>
            {user.first_name}
        </td>
        <td>
            {user.last_name}
        </td>
        <td>
            {user.username}
        </td>
        <td>
            {user.email}
        </td>

    </tr>)
}
const UserList = ({users}) => {
    return (<table className="fa-user">
        <thead>
        <th>
            First name
        </th>
        <th>
            Last Name
        </th>
        <th>
            Username
        </th>
        <th>
            Email
        </th>
        </thead>
        <tbody>
        {users.map((user) => <UsersItem user={user}/>)}
        </tbody>
    </table>)
}
export default UserList;