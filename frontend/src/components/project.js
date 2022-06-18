import React from "react";

const ProjectItem = ({ project }) => {
    return (<tr>

        <td>
            {project.id}
        </td>
        <td>
            {project.name}
        </td>
        <td>
            {project.link}
        </td>
        <td>
            {project.users}
        </td>
    </tr>)
}

const ProjectList = ({ projects }) => {
    return (<table className="fa-user">
        <tr>
            <thead>
                <td>
                    ID
                </td>
                <td>
                    Name
                </td>
                <td>
                    Link
                </td>
                <td>
                    Users
                </td>
            </thead>
            <tbody>
                {projects.map((project) => <ProjectItem project={project} />)}
            </tbody>
        </tr>
    </table>)
}

export default ProjectList;