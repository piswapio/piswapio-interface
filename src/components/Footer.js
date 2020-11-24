import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom"; 
import '../css/App.css'
import { Row, Col,Navbar, Nav} from 'react-bootstrap';
import {PAIR_PISUSDT, CONTRACT_PIS, twitter, telegram, medium,github, CONTRACT_LPPIS} from '../constants'
export default class Footer extends Component{
    render(){
        return(
            <div className="main-header">
                <div className="notic-uniswap">
                    <button className="uniswap">
                    You may need to input UNI-V2 token contract address <a href={CONTRACT_LPPIS} target="_blank">0x31ffe9a7859d12c335570db37b7fdf198cfbe185</a> to reveal the asset in your wallet  
                    </button>
                </div>
               <nav className="navbar navbar-expand-sm  navbar-default header">
                    2020 PiSwap.io
                    <div className="bar-footer">
                    <ul class="navbar-nav ml-auto">    
                        <li className="header-button">
                           <a className="link-piswap" href={CONTRACT_PIS} target="_blank">Contact</a>
                         </li>                 
                         <li className="header-button">
                           <a className="link-piswap" href={github} target="_blank">Github</a>
                         </li>
                         <li className="header-button">
                            <a className="link-piswap" href={twitter} target="_blank">Twitter</a>
                         </li>
                         <li className="header-button">
                           <a className="link-piswap" href={telegram} target="_blank">Telegram</a>
                         </li>
                         <li className="header-button">
                             <a className="link-piswap" href={medium} target="_blank">Medium</a>
                         </li>
                     </ul>
                     </div>
                </nav>
                <div className="table-footer-mobile">
                        <Row>
                            <Col xs={6}>
                                <a className="link-piswap" href={CONTRACT_PIS} target="_blank">Contact</a>    
                            </Col>
                            <Col xs={6}>
                                <a className="link-piswap" href={github} target="_blank">Github</a>    
                            </Col>
                            <Col xs={6}>
                                <a className="link-piswap" href={twitter} target="_blank">Twitter</a>     
                            </Col>
                            <Col xs={6}>
                               <a className="link-piswap" href={telegram} target="_blank">Telegram</a>     
                            </Col>
                            <Col xs={6}>
                                <a className="link-piswap" href={medium} target="_blank">Medium</a>    
                            </Col>
                            
                        </Row>
                    </div>
            </div>
        )
    }
}