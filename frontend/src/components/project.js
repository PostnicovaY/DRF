import React from "react";
import { Link } from "react-router-dom";

const ProjectItem = ({ project, delete_project }) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.link}</td>
            <td>{project.users.join(", ")}</td>
            <td>
                <button onClick={() => delete_project(project.id)} type="button">
                    Delete
                </button>
            </td>
        </tr>
    );
};

const ProjectList = ({ projects, delete_project, search_project }) => {
    let project_name = ''
    function handleSubmit(event) {
        search_project(project_name)
        event.preventDefault()
    }

    function handleChange(event) {
        project_name = event.target.value
    }

    return (
        <div class="table">
            <form onSubmit={(event) => handleSubmit(event)}>
                <div className="form-group">
                    <input className='form-control' type="text" placeholder='Project name'
                        onChange={(event) => handleChange(event)} />
                    <input className='btn btn-warning' type="submit" value='GO!' />
                </div>
            </form>
            <table className="fa-user">
                <thead>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Link</td>
                    <td>Users</td>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <ProjectItem project={project} delete_project={delete_project} />
                    ))}
                </tbody>
                <Link to="/projects/create">
                    <button type="button">
                        Create Project
                    </button>
                </Link>
            </table>
        </div>
    );
};

export default ProjectList;
