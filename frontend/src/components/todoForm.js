import React from "react";

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: "", active: true, project: this.props.projects[0].id, user: this.props.users[0].id };
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit(event) {
        this.props.create_todo(
            this.state.text,
            this.state.active,
            this.state.project,
            this.state.user
        );
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <ul>
                        <li>
                            <textarea
                                type="text"
                                name="text"
                                placeholder="Text"
                                value={this.state.text}
                                onChange={(event) => this.handleChange(event)}
                            />
                        </li>
                        <li>
                            <select
                                name="project"
                                className="form-control"
                                onChange={(event) => this.handleChange(event)}
                            >
                                {this.props.projects.map((item) => (
                                    <option value={parseInt(item.id)}>{item.name}</option>
                                ))}
                            </select>
                        </li>
                        <li>
                            <label htmlFor="user">Пользователь </label>
                            <select
                                name="user"
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

export default TodoForm;
