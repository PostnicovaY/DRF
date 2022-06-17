import './App.css';
import logo from './logo.svg';
import React from "react";
import UserList from "./components/users";
import axios from 'axios';
import MenuList from "./components/menu";
import FooterList from "./components/footer";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
   axios.get('http://127.0.0.1:8000/api/users')
       .then(response => {
           const users = response.data
               this.setState(
               {
                   'users': users
               }
           )
       }).catch(error => console.log(error))
}


    render() {
        return (
            <div>
                <MenuList/>
                <UserList users={this.state.users}/>
                <br/>
                <hr align={'left'} width="100%"/>
                <FooterList/>
            </div>);
    }


}

export default App;