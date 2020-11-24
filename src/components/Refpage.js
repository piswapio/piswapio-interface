import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import bannerpiswap1 from '../asset/banner-piswap1.png'
import bannerpiswap2 from '../asset/banner-piswap2.png'
import bannerpiswap3 from '../asset/banner-piswap3.png'
import bannerpiswap4 from '../asset/banner-piswap4.png'
import { Carousel, Row, Col} from 'react-bootstrap';
import imageheader from '../asset/image-header.png'
import tether from '../asset/tether.png'
import Ref from '../abis/Ref.json'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Footer from './Footer'
import {WEB} from '../constants'
class Refpage extends Component{
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            contractRef: {}
        }
    }
    async componentDidMount() {
        // console.log("Open component Dit Mount")
          const id = this.props.match.params.id;
          this.setState({id})
          await this.checktimepool()
          await this.loaddata()
          await this.saveref(id)
    }
    async loaddata(){
        const web3 = window.web3
        const networkId = await web3.eth.net.getId()    
        const ref = Ref.networks[networkId]
        if(ref){
            const contractRef = new web3.eth.Contract(Ref.abi, ref.address)
            this.setState({contractRef})
        }
    }
    async saveref(id){
        try{
            const refid = await this.state.contractRef.methods.hasRefuse(id).call()
            // alert(refid)
            if(refid){
                localStorage.setItem("sponsor", id)
                // var themeazstake = localStorage.getItem("sponsor");
                // if(themeazstake == null){localStorage.setItem("sponsor", id);}
            }else{
                alert("Refferal code does not exist")
                window.location.replace(WEB);
            }
        }catch{
            alert("Refferal code does not exist")
            window.location.replace(WEB);
        }
        
    }
    async checktimepool(){
        var timestart = 1605952460;
        var timeend =1605981260;
        var timenow = Math.floor(Date.now() / 1000);
        console.log("timenow " + timenow)
        if(timestart > timenow){
            this.setState({starttime : "Pool will start after " + (timestart - timenow) + " Seconds"})
            
        }else{
            if(timenow < timeend){
                this.setState({starttime : 'Ongoing'})
            }else{
                this.setState({starttime : 'PoolEnd'})
            }
            
        }
    }
    render(){
          return(
            <div>
            <Carousel indicators ={false} controls={false}>
                    <Carousel.Item interval={300}>
                        <img
                        className="d-block w-100"
                        src={bannerpiswap1}
                        alt="First slide"
                        style={{width: "100%", height: "auto"}} 
                        />
                    </Carousel.Item>
                    {/* <Carousel.Item interval={300}>
                        <img
                        className="d-block w-100"
                        src={bannerpiswap2}
                        alt="Third slide"
                        style={{width: "100%", height: "auto"}} 
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={300}>
                        <img
                        className="d-block w-100"
                        src={bannerpiswap3}
                        alt="Third slide"
                        style={{width: "100%", height: "auto"}} 
                        />
                    </Carousel.Item> */}
                    <Carousel.Item interval={300}>
                        <img
                        className="d-block w-100"
                        src={bannerpiswap4}
                        alt="Third slide"
                        style={{width: "100%", height: "auto"}} 
                        />
                    </Carousel.Item>
                </Carousel>
                <div className="main-farm">
                    <p>Status Pool:  {this.state.starttime}</p>
                    <h3 className="h3-farm">FARM</h3>
                    <button className="p-notice-farm">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-bell-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
                        </svg>
                        <span className="span-notice">This project is in beta. Use at your own risk.</span></button>
                    <Row style={{marginLeft: "0", marginRight: "0"}}>
                    <Col md={4} xs={12}>
                        <Link to="/farm-3days" style={{ textDecoration: 'none' }}>
                            <div className="main-farm-details">                              
                                   <div className="image-header">
                                       <img src={imageheader} className="img-logo-header"/>
                                       <img src={tether} className="img-logo-header"/>
                                    </div>   
                                    <div className="content-main-pool">
                                        <h3 className="h3-farm">PIS - USDT</h3> 
                                        <p className="p-tittle">Farm Lock 3 Days</p>
                                        <p className="p-deposit">Deposit PIS-USDT LP Earn PIS</p>
                                        <button className="button-lock">Choice</button>
                                        <div className="main-infomation-detalis">
                                            <label className="float-left">Total Locked</label>
                                            <span className="float-right text-muted">
                                                0 LPPIS
                                            </span>
                                        </div>
                                        <div className="main-infomation-detalis">
                                            <label className="float-left">APY</label>
                                            <span className="float-right text-muted p-content-pool">
                                            5000 %
                                            </span>
                                        </div>
                                        <p className="p-ongoing">Ongoing</p>
                                    </div>
                                                    
                            </div>
                        </Link>
                    </Col>

                    <Col md={4} xs={12}>
                        <Link to="/farm-15days" style={{ textDecoration: 'none' }}>
                            <div className="main-farm-details">                              
                                   <div className="image-header">
                                       <img src={imageheader} className="img-logo-header"/>
                                       <img src={tether} className="img-logo-header"/>
                                    </div>   
                                    <div className="content-main-pool">
                                        <h3 className="h3-farm">PIS - USDT</h3> 
                                        <p className="p-tittle">Farm Lock 15 Days</p>
                                        <p className="p-deposit">Deposit PIS-USDT LP Earn PIS</p>
                                        <button className="button-lock">Choice</button>
                                        <div className="main-infomation-detalis">
                                            <label className="float-left">Total Locked</label>
                                            <span className="float-right text-muted">
                                                0 LPPIS
                                            </span>
                                        </div>
                                        <div className="main-infomation-detalis">
                                            <label className="float-left">APY</label>
                                            <span className="float-right text-muted p-content-pool">
                                            5000 %
                                            </span>
                                        </div>
                                        <p className="p-ongoing">Ongoing</p>
                                    </div>
                                                    
                            </div>
                        </Link>
                    </Col>

                    <Col md={4} xs={12}>
                        <Link to="/farm-30days" style={{ textDecoration: 'none' }}>
                            <div className="main-farm-details">                              
                                   <div className="image-header">
                                       <img src={imageheader} className="img-logo-header"/>
                                       <img src={tether} className="img-logo-header"/>
                                    </div>   
                                    <div className="content-main-pool">
                                        <h3 className="h3-farm">PIS - USDT</h3> 
                                        <p className="p-tittle">Farm Lock 30 Days</p>
                                        <p className="p-deposit">Deposit PIS-USDT LP Earn PIS</p>
                                        <button className="button-lock">Choice</button>
                                        <div className="main-infomation-detalis">
                                            <label className="float-left">Total Locked</label>
                                            <span className="float-right text-muted">
                                                0 LPPIS
                                            </span>
                                        </div>
                                        <div className="main-infomation-detalis">
                                            <label className="float-left">APY</label>
                                            <span className="float-right text-muted p-content-pool">
                                            5000 %
                                            </span>
                                        </div>
                                        <p className="p-ongoing">Ongoing</p>
                                    </div>
                                                    
                            </div>
                        </Link>
                    </Col>

                   
                    
                    </Row>
                    
                </div>
                
                <Footer/>
        </div>
          )
    }
}
export default withRouter(Refpage)
// export default Refpage;