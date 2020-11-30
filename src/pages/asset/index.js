import React from "react";
import "./style.css";
import firebase from "firebase";
import M from "materialize-css"


export default class Asset extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isAddCatModalOpen:false,
            isLogged: false,
            AssetLocation:"null ",
            AssetOwner:" null",
            AssetNumber:"null ",
            AssetName:" null",
            AssetDescription:" ",
            AssetState:"null",
            CommentUser:"",
            CommentTime:"",
            Comment:"",
            newComment:"",
            newState:""
        }
        this.updateHandle = this.updateHandle.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleUpdateClick = this.handleUpdateClick.bind(this);

    }

    componentDidMount(){
       firebase.firestore().collection('12345').doc('Asset').get()
       .then(doc=>{
           if(doc.exists)
           {
               this.setState({
                   AssetLocation:doc.data().AssetLocation,
                   AssetOwner:doc.data().AssetOwner,
                   AssetName:doc.data().AssetName,
                   AssetNumber:doc.data().AssetNumber,
                   AssetDescription:doc.data().Desc,
                   AssetState:doc.data().AssetState,
                   CommentUser:doc.data().CommentUser,
                   CommentTime:doc.data().CommentTime,
                   Comment:doc.data().Comment,
                   isLogged: localStorage.getItem("AM-isLogged"),
                   UserId: localStorage.getItem("AM-user")
               })
           }
           else
           {
               alert("document does not exist");
           }
       }) 
       .catch(err =>{
           console.log(err);
           alert("Something went wrong")
       })
    }

    togglemodal(){
        var instance = M.Modal.getInstance(('#modal1'))
        instance.open();
    }

    updateHandle(){
        if(localStorage.getItem("AM-isLogged") === "true")
        {
            this.setState({isAddCatModalOpen:true});
        }
        else
        {
            window.location = `/asset/login/${this.props.match.params.id}`
        }
        
    }

    handleCommentChange(Event)
    {
       this.setState({newComment:Event.target.value})
    }
    handleStateChange(Event)
    {
       this.setState({newState:Event.target.value})
    }
    handleUpdateClick(Event){
        Event.preventDefault();
        let [month, date, year]    = new Date().toLocaleDateString("en-US").split("/")
        let stringdate = `${date}-${month}-${year}`;
        firebase.firestore().collection('12345').doc('Asset').update({
            AssetState:this.state.newState,
            CommentUser:this.state.UserId,
            Comment:this.state.newComment,
            CommentTime:stringdate,
        })
        .then(doc => {
            window.location.reload();
        })
        .catch(err => console.log(err))
    }

    updateAssignHandle(){
        alert("Your request successfully sent!!")
    }

    render(){
        return(
            <div className="container body-container">
                <div className="row s12 center head-container">
                    <h5 className="head-text">Bosch Asset Management</h5>
                </div>
                <table style={{width:"100%"}}>
                    <tr>
                        <th>Asset Number</th>
                        <td>{this.props.match.params.id}</td>
                    </tr>
                    <tr>
                        <th>Asset Name</th>
                        <td>{this.state.AssetName}</td>
                      
                    </tr>
                    <tr>
                        <th>Asset Location</th>
                        <td>{this.state.AssetLocation}</td> 
                    </tr>
                    <tr>
                        <th>Asset Responsible</th>
                        <td>{this.state.AssetOwner}</td> 
                    </tr>
                    <tr>
                        <th>Asset State</th>
                         <td>{this.state.AssetState}</td> 
                    </tr>
                </table>
                <br/>

                <h5>Asset Description/ Information:</h5>
                <br/>
                <div className="asset-desc-container">
                    <p>{this.state.AssetDescription.replaceAll("\n","\n")}</p>
                </div>
                <br/>
                <h5>Associates Comments:</h5>
                <br/>
                <table style={{width:"100%"}}>
                    <tr>
                        <th style={{width:"20%"}}>{this.state.CommentUser}</th>
                        <th style={{width:"20%"}}>{this.state.CommentTime}</th>
                        <td>{this.state.Comment}</td>
                    </tr>
                    
                </table>
                <section className="ffab">
                    <div className="fixed-action-btn">
                        <button className="btn wave-effect modal-trigger" data-target="modal1" onClick={this.updateHandle}>Update</button>
                        <button className="btn wave-effect black-text yellow" onClick={this.updateAssignHandle}>Assign to me</button>
                        <ul>
                        </ul>
                    </div>
                </section>


                <div id="modal1" className="modal">
                    <div className="modal-content">
                    <div className="row container">
                        <form className="col s12 center">
                            <div className="row">
                                <div className="input-field col s12">
                                    <input placeholder="" id="first_name" type="text" className="validate" onChange={(Event)=>this.handleStateChange(Event)}/>
                                    <label htmlFor="first_name">Asset State, example: Active, Not Working</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input placeholder="" id="first_name" type="text" className="validate" onChange={(Event)=>this.handleCommentChange(Event)} />
                                    <label htmlFor="first_name">Enter Detailed Comment:</label>
                                </div>
                            </div>
                            <button className="modal-close btn wave-effect" onClick={event => this.handleUpdateClick(event)}>Update</button>
                        </form>
                        
                    </div>
                    </div>
                </div>


                
            </div>
        )
    }
}