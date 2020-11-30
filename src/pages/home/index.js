import React from "react";
import "./style.css"
import BarcodeScannerComponent from "react-webcam-barcode-scanner";

export default class Home extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            ScannerOpen:false
        }
        this.handleScanClick = this.handleScanClick.bind(this);
    }
    handleScanClick(){
        this.setState({ScannerOpen:true})
    }
    render(){
        return(
            <div> 
                {this.state.ScannerOpen? 
                <BarcodeScannerComponent
                width={500}
                height={500}
                onUpdate={(err, result) => {
                  if (result) 
                    {
                        window.location = `/asset/${result}`
                    }
                }}
              />
                :
                <div  className="home-container">
                    <h3>Welcome to Bosch Asset Management Prototype</h3>
                    <button className="btn waves-effect" onClick={this.handleScanClick}> Scan the barcode</button>
                </div>
                }
            </div>
        )
    }
}