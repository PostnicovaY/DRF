import './App.css';
import logo from './logo.svg';
import React from "react";
import {
    BrowserRouter,
    Route,
    Link,
    Switch,
    Redirect,
    Routes
} from 'react-router-dom'
import UserList from "./components/users";
import axios from 'axios';
import MenuList from "./components/menu";
import FooterList from "./components/footer";
import ProjectList from "./components/project";
import TodoList from "./components/todo";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todo': [],
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/project')
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo')
            .then(response => {
                const todo = response.data.results
                this.setState(
                    {
                        'todo': todo
                    }
                )
            }).catch(error => console.log(error))

    }


    render() {
        return (
            <div>
                <BrowserRouter>
                    <MenuList />
                    <Routes>
                        <Route path='/' element={<UserList users={this.state.users} />} />
                        <Route path='/projects' element={<ProjectList projects={this.state.projects} />} />
                        <Route path='/todo' element={<TodoList todos={this.state.todo} />} />
                    </Routes>
                    <br />
                    <hr align={'left'} width="100%" />
                    <FooterList />
                </BrowserRouter>;
            </div>
        )

    }


}

export default App;
