import React from "react";

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: "", link: "", users: this.props.users[0].id };
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit(event) {
        this.props.create_project(this.state.name, this.state.link, this.state.users);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <ul>
                        <li><label htmlFor="project">Project </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={this.state.name}
                                onChange={(event) => this.handleChange(event)}
                            />
                        </li>
                        <li><label htmlFor="link">Ссылка на проект </label>
                            <input
                                type="text"
                                name="link"
                                placeholder="Link"
                                value={this.state.link}
                                onChange={(event) => this.handleChange(event)}
                            />
                        </li>
                        <li><label htmlFor="users">Пользователь </label>
                            <select
                                name="users"
                                className="form-control"
                                onChange={(event) => this.handleChange(event)}
                            >
                                {this.props.users.map((item) => (
                                    <option value={parseInt(item.id)}>{item.username}</option>
                                ))}
                            </select>
                        </li>
                    </ul>
                    <input type="submit" value="Create" />
                </div>
            </form>
        );
    }
}

export default ProjectForm;
