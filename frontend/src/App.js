import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserList from "./components/users";
import axios from "axios";
import MenuList from "./components/menu";
import FooterList from "./components/footer";
import ProjectList from "./components/project";
import TodoList from "./components/todo";
import LoginForm from "./components/auth";
import ProjectForm from "./components/projectForm";
import TodoForm from "./components/todoForm";
import Cookies from "universal-cookie";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            projects: [],
            todo: [],
            token: "",
            auth: false,
            username: "",
        };
    }

    load_data() {
        const headers = this.get_headers();
        axios
            .get("http://127.0.0.1:8000/api/v1/users", { headers })
            .then((response) => {
                const users = response.data.results;
                this.setState({
                    users: users,
                });
            })
            .catch((error) => console.log(error));

        axios
            .get("http://127.0.0.1:8000/api/project", { headers })
            .then((response) => {
                const projects = response.data.results;
                this.setState({
                    projects: projects,
                });
            })
            .catch((error) => console.log(error));

        axios
            .get("http://127.0.0.1:8000/api/todo", { headers })
            .then((response) => {
                const todo = response.data.results;
                this.setState({
                    todo: todo,
                });
            })
            .catch((error) => console.log(error));
    }

    delete_project(id) {
        const headers = this.get_headers();
        axios
            .delete(`http://127.0.0.1:8000/api/project/${id}`, { headers, headers })
            .then((response) => {
                this.setState({
                    projects: this.state.projects.filter((item) => item.id !== id),
                    todo: this.state.todo.filter((item) => item.project !== id),
                });
            })
            .catch((error) => console.log(error));
    }

    delete_todo(id) {
        const headers = this.get_headers();
        axios
            .delete(`http://127.0.0.1:8000/api/todo/${id}`, { headers, headers })
            .then((response) => {
                this.setState({
                    todo: this.state.todo,
                });
            })
            .catch((error) => console.log(error));
    }

    create_project(name, link, users) {
        const headers = this.get_headers();
        const data = { name: name, link: link, users: [parseInt(users)] };
        axios
            .post(`http://127.0.0.1:8000/api/project/`, data, { headers, headers })
            .then((response) => {
                let new_project = response.data;
                this.setState({ projects: [...this.state.projects, new_project] });
            })
            .catch((error) => console.log(error));
    }

    create_todo(text, active, project, user) {
        const headers = this.get_headers();
        const data = { text: text, active: active, project: project, user_created: user };
        axios
            .post(`http://127.0.0.1:8000/api/todo/`, data, { headers, headers })
            .then((response) => {
                let new_todo = response.data;
                this.setState({ todo: [...this.state.todo, new_todo] });
            })
            .catch((error) => console.log(error));
    }

    search_project(project_name) {
        const headers = this.get_headers();
        axios
            .get(`http://127.0.0.1:8000/api/project/?name=${project_name}`, { headers, headers })
            .then((response) => {
                this.setState({
                    projects: response.data.results,
                });
            })
            .catch((error) => console.log(error));
    }

    get_token(username, password) {
        axios
            .post("http://127.0.0.1:8000/api-token-auth/", {
                username: username,
                password: password,
            })
            .then((response) => {
                this.setState({ username: username });
                this.set_token(response.data["token"]);
            })
            .catch((error) => alert("Не верный логин или пароль"));
    }

    set_token(token) {
        const cookies = new Cookies();
        cookies.set("token", token);
        this.setState({ token: token }, () => this.load_data());
    }

    is_auth() {
        this.setState({ auth: !!this.state.token });
        return this.state.auth;
    }

    get_headers() {
        let headers = {
            "Content-Type": "application/json",
        };
        if (this.is_auth()) {
            headers["Authorization"] = `Token ${this.state.token}`;
        }
        return headers;
    }

    logout() {
        this.set_token("");
    }

    get_token_from_cookies() {
        const cookies = new Cookies();
        const token = cookies.get("token");

        this.setState({ token: token }, () => this.load_data());
    }

    componentDidMount() {
        this.get_token_from_cookies();
    }

    render() {
        return (
            <div>

                <BrowserRouter>
                    <MenuList
                        is_auth={this.state.auth}
                        username={this.state.username}
                        logout={() => this.logout()}
                    />
                    <Routes>
                        <Route path="/" element={<UserList users={this.state.users} />} />
                        <Route
                            path="/projects"
                            element={
                                <ProjectList
                                    projects={this.state.projects}
                                    search_project={(project_name) => this.search_project(project_name)}
                                    delete_project={(id) => this.delete_project(id)}
                                />
                            }
                        />
                        <Route
                            path="/todo"
                            element={
                                <TodoList
                                    todos={this.state.todo}
                                    delete_todo={(id) => this.delete_todo(id)}
                                />
                            }
                        />
                        <Route
                            path="/projects/create"
                            element={
                                <ProjectForm
                                    users={this.state.users}
                                    create_project={(name, link, users) =>
                                        this.create_project(name, link, users)
                                    }
                                />
                            }
                        />
                        <Route
                            path="/todo/create"
                            element={
                                <TodoForm
                                    users={this.state.users}
                                    projects={this.state.projects}
                                    create_todo={(text, active, project, user) =>
                                        this.create_todo(text, active, project, user)
                                    }
                                />
                            }
                        />

                        <Route
                            path="/login"
                            element={
                                <LoginForm
                                    get_token={(username, password) =>
                                        this.get_token(username, password)
                                    }
                                />
                            }
                        />
                    </Routes>
                    <br />
                    <hr align={"left"} width="100%" />
                    <FooterList />
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
