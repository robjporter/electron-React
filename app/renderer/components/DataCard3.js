import React from 'react';
import { FaFileInvoice, FaMoneyBill, FaMarker, FaLockOpen } from "react-icons/fa";

class DataCard3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {bgColor: 'red'};
    }
    componentDidMount() {
        if (this.props.bgColor) {
            this.setState({bgColor: `${this.props.bgColor}`});
        }
    }
    render () {
        const style = {
            backgroundColor: this.state.bgColor
        }
        let icon;
        if(this.props.icon === "1") {
            icon = <FaFileInvoice size="3em" color={this.props.bgColor}/>
        } else if(this.props.icon === "2") {
            icon = <FaMoneyBill size="3em" color={this.props.bgColor}/>
        } else if(this.props.icon === "3") {
            icon = <FaMarker size="3em" color={this.props.bgColor}/>
        } else if(this.props.icon === "4") {
            icon = <FaLockOpen size="3em" color={this.props.bgColor}/>
        }
        return (
        <div className="col-xl-3 col-lg-6 col-12">
            <div className="card overflow-hidden">
                <div className="card-content">
                    <div className="card-body cleartfix">
                        <div className="media align-items-stretch">
                            <div className="align-self-center">
                                <span className="mr-2">{icon}</span>
                            </div>
                            <div className="media-body">
                                <h4>{this.props.descriptionTitle}</h4>
                                <span>{this.props.description}</span>
                            </div>
                            <div className="align-self-center">
                                <h1>{this.props.value}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );}
}

export default DataCard3;

