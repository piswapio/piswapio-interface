import React, {Component} from 'react';
import { Carousel} from 'react-bootstrap';
import banner1 from '../asset/banner-1.png'
import {INFURA, WALLET_LPPIS, WALLET_PIS} from '../constants'
export default class Howtouse extends Component{
    constructor(props) {
        super(props)
        this.state = { 
           amount:0,
           balancelppis: 0,
           walletlppis:WALLET_LPPIS,
           allowanlppid: 0
        }
        this.handleChangeamount = this.handleChangeamount.bind(this);
    }
    handleChangeamount(event) { this.setState({amount: event.target.value})}
    stake(){
        alert("ôk")
    }
    async componentDidMount(){
        await this.loaddata()
    }
    async componentWillReceiveProps(){
        await this.loaddata()
    }

    async loaddata(){
        if(this.props.account != "0x00"){
            const web3 = window.web3 
            var abi = require('human-standard-token-abi')
            var tokenlppis = new web3.eth.Contract(abi, this.state.walletlppis)
            var allowan = await tokenlppis.methods.allowance(this.props.account,this.props.addressPiswap).call()
            .catch(err => {console.log("Error: " + err)})          
            if(allowan > 0) {this.setState({showapprove : 1,allowanlppid: allowan/ (10**6)})}
            const balancelppis = web3.utils.fromWei(this.props.balanceLPPIS.toString(), 'ether') 
            this.setState({balancelppis})
        }
    }
    render(){
        let details;
        if(this.props.stateconnect){
            details = <button  
                        // type="submit" 
                        className="add-code"
                        onClick={(event) => {
                            event.preventDefault()
                            this.stake()
                          }}
                        >Stake</button>
        }else{
            details = <button 
            className="add-code" 
            onClick={(event) => {
                event.preventDefault()
                this.props.conect()
              }}>
                Connect Wallet</button>
        }
        return(
            <div>
                <Carousel indicators ={false} controls={false}>
                        <Carousel.Item interval={300}>
                            <img
                            className="d-block w-100"
                            src={banner1}
                            alt="First slide"
                            style={{width: "100%", height: "auto"}} 
                            />
                        </Carousel.Item>
                        <Carousel.Item interval={300}>
                            <img
                            className="d-block w-100"
                            src={banner1}
                            alt="Third slide"
                            style={{width: "100%", height: "auto"}} 
                            />
                        </Carousel.Item>
                        <Carousel.Item interval={300}>
                            <img
                            className="d-block w-100"
                            src={banner1}
                            alt="Third slide"
                            style={{width: "100%", height: "auto"}} 
                            />
                        </Carousel.Item>
                    </Carousel>
                    <div className="form-contract">
                        {/* <form onSubmit={this.handleSubmit} className="form-contract" > */}
                                  <div>
                                    <label className="float-left"><b>Stake</b></label>
                                    <span className="float-right text-muted p-content-pool">
                                    Available Swap: {this.state.balancelppis} LPPIS
                                    </span>
                                </div>
                                <div className="input-group mb-2">
                                    <input
                                        type="number"
                                        className="form-control form-control-lg"
                                        placeholder="0"
                                        value={this.state.amount}
                                        onChange={this.handleChangeamount}
                                        />
                                </div>
                            <div style={{textAlign:"center"}}>
                            {details}
                                
                            </div>   
                    </div>     
            </div>
        )
    }
}