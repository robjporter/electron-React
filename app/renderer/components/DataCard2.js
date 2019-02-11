import React from 'react';
import { FaFileInvoice, FaMoneyBill, FaMarker, FaLockOpen } from "react-icons/fa";

class DataCard2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {color: 'red'};
    }
    componentDidMount() {
        if (this.props.color !== undefined) {
            this.setState((state,props) =>({color: `${props.color}`}));
        }
    }
    render () {
        let icon;
        if(this.props.icon === "1") {
            icon = <FaFileInvoice size="3em"/>
        } else if(this.props.icon === "2") {
            icon = <FaMoneyBill size="3em"/>
        } else if(this.props.icon === "3") {
            icon = <FaMarker size="3em"/>
        } else if(this.props.icon === "4") {
            icon = <FaLockOpen size="3em"/>
        }
        return (
        <div className="col-xl-3 col-lg-3 col-12 text-white">
            <div className="card" style={{backgroundColor: this.state.color}}>
                <div className="card-content">
                    <div className="card-body">
                        <div className="media d-flex">
                            <div className="align-self-center">
                                {icon}
                            </div>
                            <div className="media-body white text-right">
                                <h3><b>{this.props.value}</b></h3>
                                <span>{this.props.description}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );}
}

export default DataCard2;

/*

        <div class="col-xl-3 col-lg-6 col-12">
            <div class="card bg-danger">
                <div class="card-content">
                    <div class="card-body">
                        <div class="media d-flex">
                            <div class="align-self-center">
                                <i class="icon-speech white font-large-2 float-left"></i>
                            </div>
                            <div class="media-body white text-right">
                                <h3>156</h3>
                                <span>New Comments</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-lg-6 col-12">
            <div class="card bg-success">
                <div class="card-content">
                    <div class="card-body">
                        <div class="media d-flex">
                            <div class="align-self-center">
                                <i class="icon-graph white font-large-2 float-left"></i>
                            </div>
                            <div class="media-body white text-right">
                                <h3>64.89 %</h3>
                                <span>Bounce Rate</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-lg-6 col-12">
            <div class="card bg-warning">
                <div class="card-content">
                    <div class="card-body">
                        <div class="media d-flex">
                            <div class="align-self-center">
                                <i class="icon-pointer white font-large-2 float-left"></i>
                            </div>
                            <div class="media-body white text-right">
                                <h3>423</h3>
                                <span>Total Visits</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
*/