import React, {Component} from 'react';
import { render } from 'react-dom';
import bannerpiswap1 from '../asset/banner-piswap1.png'
import bannerpiswap2 from '../asset/banner-piswap2.png'
import bannerpiswap3 from '../asset/banner-piswap3.png'
import bannerpiswap4 from '../asset/banner-piswap4.png'
import { Carousel} from 'react-bootstrap';
import imageheader from '../asset/image-header.png'
import ethereum from '../asset/ethereum.png'
import tether from '../asset/tether.png'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { Row, Col} from 'react-bootstrap';
import Footer from './Footer'
import {OPEN_TIME, END_TIME} from '../constants'
export default class Home extends Component{
    constructor(props) {
        super(props)
        this.state = { 
            starttime: '',
        }
    }
    async componentDidMount(){
        await this.checktimepool()
    }
    async checktimepool(){
        var timestart = OPEN_TIME;
        var timeend =END_TIME;
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
                <Carousel indicators ={false} >
                        <Carousel.Item interval={2000}>
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
                        <Carousel.Item interval={2000}>
                            <img
                            className="d-block w-100"
                            src={bannerpiswap4}
                            alt="Third slide"
                            style={{width: "100%", height: "auto"}} 
                            />
                        </Carousel.Item>
                    </Carousel>
                    <div className="main-farm">
                        <p>Status Farm Pool:  {this.state.starttime}</p>
                        <h3 className="h3-farm">LP Pools – Phase0 (814,290 PIS)</h3>
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
                                            <p className="p-deposit">Stake PIS-USDT UNI-V2 LP to earn PIS</p>
                                            <button className="button-lock">Choice</button>
                                            <div className="main-infomation-detalis">
                                                <label className="float-left">Total Locked</label>
                                                <span className="float-right text-muted">
                                                    0 UNI-V2
                                                </span>
                                            </div>
                                            <div className="main-infomation-detalis">
                                                <label className="float-left">APY</label>
                                                <span className="float-right p-content-pool color-apy">
                                                50,000 %
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
                                            <p className="p-deposit">Stake PIS-USDT UNI-V2 LP to earn PIS</p>
                                            <button className="button-lock">Choice</button>
                                            <div className="main-infomation-detalis">
                                                <label className="float-left">Total Locked</label>
                                                <span className="float-right text-muted">
                                                    0 UNI-V2
                                                </span>
                                            </div>
                                            <div className="main-infomation-detalis">
                                                <label className="float-left">APY</label>
                                                <span className="float-right  p-content-pool color-apy" >
                                                50,000 %
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
                                            <p className="p-deposit">Stake PIS-USDT UNI-V2 LP to earn PIS</p>
                                            <button className="button-lock">Choice</button>
                                            <div className="main-infomation-detalis">
                                                <label className="float-left">Total Locked</label>
                                                <span className="float-right text-muted ">
                                                    0 UNI-V2
                                                </span>
                                            </div>
                                            <div className="main-infomation-detalis">
                                                <label className="float-left">APY</label>
                                                <span className="float-right  p-content-pool color-apy">
                                                50,000 %
                                                </span>
                                            </div>
                                            <p className="p-ongoing">Ongoing</p>
                                        </div>
                                                        
                                </div>
                            </Link>
                        </Col>

                       
                        
                        </Row>
                        <h3 className="h3-farm">STAKE</h3>
                        <Row>
                            <Col md={4}></Col>
                            <Col md={4} xs={12}>
                                <div className="main-farm-details">                              
                                       <div className="image-header">
                                           <img src={imageheader} className="img-logo-header"/>
                                           {/* <img src={tether} className="img-logo-header"/> */}
                                        </div>   
                                        <div className="content-main-pool">
                                            <h3 className="h3-farm">PIS</h3> 
                                            <p className="p-tittle">STAKE - Coming Soon</p>
                                            <p className="p-deposit">Stake PIS to earn PIS</p>
                                            <button className="button-lock background-comingsoon">Coming Soon</button>
                                            <div className="main-infomation-detalis">
                                                <label className="float-left">Total Locked</label>
                                                <span className="float-right text-muted">
                                                    0 UNI-V2
                                                </span>
                                            </div>
                                            <div className="main-infomation-detalis">
                                                <label className="float-left">APY</label>
                                                <span className="float-right text-muted p-content-pool">
                                                50,000 %
                                                </span>
                                            </div>
                                            <p className="p-ongoing color-prepare">Prepare</p>
                                        </div>
                                                        
                                </div>
                        </Col>
                            <Col md={4}></Col>
                        </Row>
                    </div>
                    
                    <Footer/>
            </div>
        )
    }
}