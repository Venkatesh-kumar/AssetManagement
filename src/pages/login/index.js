import React from "react"
import "./style.css"


export default class login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            UserNameEntered:'',
            PasswordEntered:'',
            UserNameEmpty:0,
            PasswordEmpty:0,
            UserNotExists:0,
            IncorrectPassword:0
        }
        this.handlePasswordChange=this.handlePasswordChange.bind(this);
        this.handleUserNameChange=this.handleUserNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleUserNameChange(event){
        this.setState({
            UserNameEmpty:0,
            UserNameEntered:event.target.value
        })
    }
    handlePasswordChange(event){
        this.setState({
            PasswordEmpty:0,
            IncorrectPassword:0,
            PasswordEntered:event.target.value
        })
    }
    handleSubmit(){
        if(this.state.UserNameEntered === '')
        {
            this.setState({UserNameEmpty:1})
        }
        if(this.state.PasswordEntered === '')
        {
            this.setState({PasswordEmpty:1})
        }
        if(this.state.UserNameEntered !== ''){
            localStorage.setItem("AM-isLogged",true);
            localStorage.setItem("AM-user",this.state.UserNameEntered);
            window.location = `/asset/${this.props.match.params.id}`
        }
    }



    render(){
        return(
            <div>
                 <div className="loginbody">
                        <div className="row container">
                            <div className="logincontainer center">
                                <h5 className="center brand-logo"><b>Login to Asset Management</b></h5>
                                <div className="loginfields">
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input id="user_name" type="text" onChange={this.handleUserNameChange} className="validate"></input>
                                            <label htmlFor="user_name">NT ID</label>
                                            {this.state.UserNameEmpty?
                                            <div className="red-text left">User name should not be empty</div>    :null
                                        }
                                        {
                                            this.state.UserNotExists?
                                            <div className="red-text left">User does not exists</div>:null
                                        }
                                        </div>    
                                    </div>
                                    
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input id="password" type="password" onChange={this.handlePasswordChange} className="validate"></input>
                                            <label htmlFor="password">Password</label>
                                            {this.state.PasswordEmpty?
                                            <div className="red-text left">Password should not be empty</div>    :null
                                        }
                                        {
                                            this.state.IncorrectPassword?
                                            <div className="red-text left">Incorrect Password</div>:null
                                        }
                                        </div> 
                                    </div>
                                    <div className="row">
                                        <button className="btn waves-effect waves-light blue" type="button" onClick={this.handleSubmit} >Login</button>
                                    </div>
                                   
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}