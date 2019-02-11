import React from "react";
import { Helmet } from "react-helmet";
import { APPLICATION_QUIT } from '../../common/constants';
import DataCard2 from '../components/DataCard2';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserActions from '../components/UserActions';

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      one: {value:"",description:"",color:"",icon:"1"},
      two: {value:"",description:"",color:"",icon:"2"},
      three: {value:"",description:"",color:"",icon:"3"},
      four: {value:"",description:"",color:"",icon:"4"},
    };
    this.applicationQuit = this.applicationQuit.bind(this);
  }
  componentDidMount() {
    this.setState(Object.assign(this.state.one,{value:"1234",description:"Description",color:"#51b2b6"}));
    this.setState(Object.assign(this.state.two,{value:"1234",description:"Description",color:"#ee7d8a"}));
    this.setState(Object.assign(this.state.three,{value:"1234",description:"Description",color:"#62cf9e"}));
    this.setState(Object.assign(this.state.four,{value:"1234",description:"Description",color:"#f3ab84"}));
    ipcRenderer.on(APPLICATION_QUIT, this.applicationQuit);
  }
  componentWillUnmount() {
    ipcRenderer.removeListener(APPLICATION_QUIT,this.applicationQuit);
  }
  applicationQuit() {
    var response = ipcRenderer.sendSync(APPLICATION_QUIT,"APP");
  }
  handleNewReportClick() {
    alert("HELLO");
  }
  render () {
    return (
        <div className="App">
          <Helmet>
              <meta charSet="utf-8" />
              <title>My Title</title>
              <link rel="canonical" href="http://mysite.com/example" />
          </Helmet>
          <Header/>
          <div className="display-4 text-center text-muted" style={{height: '86px'}}>
            Assistance Provided
          </div>
          <div style={{height: `calc(100vh - 340px)`}}>
            <div className="mt-1 mb-1" style={{height: `calc((100vh - 340px) / 3)`}}>
              <div className="row w100 h-100"> 
              <DataCard2 value={this.state.one.value} description={this.state.one.description} color={this.state.one.color} icon={this.state.one.icon} />
              <DataCard2 value={this.state.two.value} description={this.state.two.description} color={this.state.two.color} icon={this.state.two.icon} />
              <DataCard2 value={this.state.three.value} description={this.state.three.description} color={this.state.three.color} icon={this.state.three.icon} />
              <DataCard2 value={this.state.four.value} description={this.state.four.description} color={this.state.four.color} icon={this.state.four.icon} />
              </div>
            </div>
            <div className="text-center" style={{height: `calc((100vh - 350px) - (100vh - 350px) / 3)`}}>
              <UserActions onClick={this.handleNewReportClick}/>
            </div>
          </div>
          <Footer/>
        </div>
    );
  }
};

export default Home;
