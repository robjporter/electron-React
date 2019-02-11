import React from 'react';

//<DataCard value="999k" description="The total number of reports that have been run on this system." descriptionTitle="Reports Generated"/>

class DataCard extends React.Component {
    render () {
    return (
        <div className="card mr-1 text-center" style={{width:'24.25%'}}>
            <div className="row ml-0 h-100">
                <div className="col-4 bg-ciscoblue1 text-white h-100" style={{fontSize:'1.1em'}}>
                    <table style={{height:'100%'}}>
                    <tbody>
                        <tr>
                        <td className="text-center align-middle">
                            <b>{this.props.value}</b>
                        </td>
                        </tr>
                    </tbody>
                    </table> 
                </div>
                <div className="col">
                    <table style={{height:'100%'}}>
                    <tbody>
                        <tr>
                        <td className="align-middle">
                            <b>{this.props.descriptionTitle}</b>
                            <p style={{fontSize:'0.7em'}}>{this.props.description}</p>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
    }
}

export default DataCard;