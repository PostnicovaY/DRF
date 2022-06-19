import './App.css';
import React from "react";
import {
    BrowserRouter,
    Route,
    Link,
    Routes
} from 'react-router-dom'
import UserList from "./components/users";
import axios from 'axios';
import MenuList from "./components/menu";
import FooterList from "./components/footer";
import ProjectList from "./components/project";
import TodoList from "./components/todo";
import LoginForm from "./components/auth";
import Cookies from "universal-cookie";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todo': [],
            'token': '',
            'auth': false,
            'username': ''
        }
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users', { headers })
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/project', { headers })
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo', { headers })
            .then(response => {
                const todo = response.data.results
                this.setState(
                    {
                        'todo': todo
                    }
                )
            }).catch(error => console.log(error))

    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/',
            { 'username': username, 'password': password })
            .then(response => {
                this.setState({ 'username': username })
                this.set_token(response.data['token'])
            }).catch(error => alert('Не верный логин или пароль'))
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({ 'token': token }, () => this.load_data())
    }

    is_auth() {
        this.setState({ 'auth': !!this.state.token })
        return this.state.auth
    }

    get_headers() {
        let headers = {
            "Content-Type": 'application/json'
        }
        if (this.is_auth()) {
            headers['Authorization'] = `Token ${this.state.token}`
        }
        return headers
    }

    logout() {
        this.set_token('')
    }

    get_token_from_cookies() {
        const cookies = new Cookies()
        const token = cookies.get('token')

        this.setState({ 'token': token }, () => this.load_data())
    }

    componentDidMount() {
        this.get_token_from_cookies()
    }


    render() {
        return (
            <div>
                <BrowserRouter>
                    <MenuList is_auth={this.state.auth} username={this.state.username} logout={() => this.logout()} />
                    <Routes>
                        <Route path='/' element={<UserList users={this.state.users} />} />
                        <Route path='/projects' element={<ProjectList projects={this.state.projects} />} />
                        <Route path='/todo' element={<TodoList todos={this.state.todo} />} />
                        <Route path='/login' element={<LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
                    </Routes>
                    <br />
                    <hr align={'left'} width="100%" />
                    <FooterList />
                </BrowserRouter>
            </div>
        )

    }


}

export default App;
