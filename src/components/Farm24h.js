import React, {Component} from 'react';
import { Carousel, Row, Col} from 'react-bootstrap';
import bannerpiswap1 from '../asset/banner-piswap1.png'
import bannerpiswap2 from '../asset/banner-piswap2.png'
import bannerpiswap3 from '../asset/banner-piswap3.png'
import bannerpiswap4 from '../asset/banner-piswap4.png'
import Footer from './Footer'
import { v4 as uuidv4 } from 'uuid';
import {INFURA, WALLET_LPPIS, WALLET_PIS, CONTRACT_LPPIS, DECIMAL,TOTAL_APPROVE, CONTRACT_OWNER, TIME_3days} from '../constants'
export default class Farm24h extends Component{
    constructor(props) {
        super(props)
        this.state = { 
           amount:0,
           balancelppis: 0,
           walletlppis:WALLET_LPPIS,
           allowanlppid: 0,
           listenchange: false,
           statesethistory: false,
           controltransaction: false,
           datause24h:[],
           enableuse: false,
           totalapprove: TOTAL_APPROVE,
           statestake: true,
           stateapprove: true,
           modalsuccess: false,
           stakewithdraw: true,
           currentpage: 1,
           totalpage: 1,
           listcurrentpage: 0,
           currentpageall: 1,
           totalpageall: 1,
           listcurrentpageall: 0,
           stateenable: false
        }
        this.handleChangeamount = this.handleChangeamount.bind(this);
    }
    handleChangeamount(event) { this.setState({amount: event.target.value})}
   
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
            if(allowan > 0) {this.setState({showapprove : 1,allowanlppid: allowan/ (10**DECIMAL)})}
            const balancelppis = web3.utils.fromWei(this.props.balanceLPPIS.toString(), 'ether') 
            
            console.log("enable 24h" + this.props.enable24h)
            const datause24h=[]
            if(this.props.enable24h){
                for(var i=0; i< this.props.data24h.length;i++){
                    if(this.props.data24h[i].staker == this.props.account){
                        datause24h.push(this.props.data24h[i])
                    }
                }
            }
            if(datause24h.length >0){
                var totalpage = (Math.floor(datause24h.length / 10) > 0) ? (((datause24h.length % 10) > 0) ? Math.floor(datause24h.length / 10) +1 : Math.floor(datause24h.length / 10))  :  1;
                var listcurrentpage = (totalpage > 1) ? datause24h.slice(0, 10) : datause24h;
                this.setState({
                    enableuse: true,
                    totalpage, 
                    listcurrentpage,
                })
            }
            
            this.setState({balancelppis,datause24h})
            // for(var i=0; i<this.props.data)
        }
        var totalpageall = (Math.floor(this.props.data24h.length / 10) > 0) ? (((this.props.data24h.length % 10) > 0) ? Math.floor(this.props.data24h.length / 10) +1 : Math.floor(this.props.data24h.length / 10))  :  1;
        var listcurrentpageall = (totalpageall > 1) ? this.props.data24h.slice(0, 10) : this.props.data24h;
        console.log("listcurrentpageall")
        console.log(listcurrentpageall)
        this.setState({totalpageall, listcurrentpageall, stateenable: this.props.enable24h})
        
    }
    async approve(){
        // alert("approve")
        const web3 = window.web3; 
        var abi = require('human-standard-token-abi')
        var tokenLppis = new web3.eth.Contract(abi, this.state.walletlppis)
        const totalapprove = web3.utils.toWei(TOTAL_APPROVE.toString(), 'ether')
        this.setState({stateapprove: false})
        tokenLppis.methods.approve(this.props.addressPiswap, totalapprove ).send({ from: this.props.account }).on('confirmation', (confNumber, receipt) => {
            this.setState({listenchange: true, stateapprove: true})
          }).on('error', (error) => {this.setState({listenchange: false, stateapprove: true})})
    }
    stake(){
        const web3 = window.web3
        var themeazstake = localStorage.getItem("sponsor");
        var sponsor='';
        var confirm=0;
        if(themeazstake == null){sponsor = CONTRACT_OWNER;}else{sponsor = themeazstake;}
        console.log("sponsor")
        console.log(sponsor)
        const UUI = uuidv4();
        this.setState({statestake: false})
        var balanceinput =Number(this.state.amount).toFixed(18);
        const balance = web3.utils.toWei(balanceinput.toString(), 'ether')
        this.props.contractPiswap.methods.stake(UUI, balance, 1, this.props.addressRef, sponsor).send({ from: this.props.account }).on('confirmation', (confNumber, receipt) => {
            if(confirm==0){
                this.setState({statestake: true,modalsuccess: true})
                confirm =1;
            }
           
        }).on('error', (error) => {this.setState({statestake: true})})
    }
    async showhistory(id){ this.setState({statesethistory: id}) }
    closesuccess(){ this.setState({modalsuccess: false})}
    async withdraw(id, choice){
        this.setState({stakewithdraw: false})
        this.props.contractPiswap.methods.withdraw(this.props.addressRef,id, choice).send({ from: this.props.account }).on('confirmation', (confNumber, receipt) => {
            this.setState({stakewithdraw: true})
        }).on('error', (error) => {this.setState({stakewithdraw: true})})
    }
    prevPage(){
        if(this.state.currentpage > 1){
            var listcurrentpage = this.state.datause24h.slice(10*(this.state.currentpage-2), 10*(this.state.currentpage-1))
            this.setState({currentpage : this.state.currentpage -1 , listcurrentpage})
        }
      }
      nextPage(){
        if(this.state.currentpage < this.state.totalpage){
            var  listcurrentpage = this.state.datause24h.slice(10*this.state.currentpage, 10*this.state.currentpage +10)
            this.setState({currentpage : this.state.currentpage +1 , listcurrentpage})
        }
      }
      prevPageall(){
        if(this.state.currentpageall > 1){
            var listcurrentpageall = this.props.data24h.slice(10*(this.state.currentpageall-2), 10*(this.state.currentpageall-1))
            this.setState({currentpageall : this.state.currentpageall -1 , listcurrentpageall})
        }
      }
      nextPageall(){
        if(this.state.currentpageall < this.state.totalpageall){
            var  listcurrentpageall = this.props.data24h.slice(10*this.state.currentpageall, 10*this.state.currentpageall +10)
            this.setState({currentpageall : this.state.currentpageall +1 , listcurrentpageall})
        }
      }
      convert(n){
        var sign = +n < 0 ? "-" : "",
            toStr = n.toString();
        if (!/e/i.test(toStr)) {return n;}
        var [lead,decimal,pow] = n.toString()
            .replace(/^-/,"")
            .replace(/^([0-9]+)(e.*)/,"$1.$2")
            .split(/e|\./);
        return +pow < 0 
            ? sign + "0." + "0".repeat(Math.max(Math.abs(pow)-1 || 0, 0)) + lead + decimal
            : sign + lead + (+pow >= decimal.length ? (decimal + "0".repeat(Math.max(+pow-decimal.length || 0, 0))) : (decimal.slice(0,+pow)+"."+decimal.slice(+pow)))
      }
      percent(idpercent){
         const balance =(idpercent * this.state.balancelppis / 100).toFixed(18);
         const balanceadd = this.convert(balance)
         this.setState({amount : balanceadd})
      }

    render(){
        let showwithdraw;
        if(this.state.stakewithdraw){showwithdraw ="Withdrawal"}else{showwithdraw ="Withdrawal"}
        let listhistory;
       if(this.props.stateconnect){
            if(this.state.enableuse){
                listhistory = this.state.listcurrentpage.map((list) => {
                    const web3 = window.web3
                    const amount = web3.utils.fromWei(list.constamount.toString(), 'ether');
                    const timeregis = Number(list.timewithdraw) - TIME_3days;
                    const timewithdraw = Number(list.timewithdraw);
                    console.log("timewithdraw " + timewithdraw)
                    const timenow = Math.floor(Date.now() / 1000);
                    console.log("timenow " + timenow)
                    const statuswithdraw = list.withdrawstatus;
                    var dateNow = '';
                    const distance = timenow - timeregis;
                    const day = Math.floor(distance/86400);
                    if(distance>0){
                        if(day > 0) {
                            dateNow = day.toString() + " day ago";
                            } else {
                            const hour = Math.floor(distance/3600);
                            if(hour > 0) {
                                dateNow = hour.toString() + " hour ago";
                            }else{
                                const minutes = Math.floor(distance/60);
                                if(minutes > 0) {
                                dateNow = minutes.toString() + " minutes ago"
                                }else{
                                dateNow = distance.toString() + " second ago";
                                }
                            }          
                            }
                    }else{
                        dateNow = "Pre-register";
                    }
                    
                    let status;
                    if(timenow < timewithdraw){
                        status =<button className="btn btn-primary">Locked</button>
                    }else{
                        if(statuswithdraw == true){
                            status = <button className="btn btn-success">Success</button>
                        }else{
                            status = <button className="btn btn-info"
                            onClick={(event) => {
                                event.preventDefault()
                                this.withdraw(list.stakeID ,list.choice)
                            }}>{showwithdraw}</button>
                        }
                    }
                    return(
                         <div className="main-collect-history">
                            <Row>
                                    <Col md={3}><b>Farm 3 Days</b></Col>
                                    <Col md={3}><b>{amount} UNI-V2</b></Col>
                                    <Col md={3}><b>{status}</b></Col>
                                    <Col md={3}><b>{dateNow}</b></Col>
                            </Row>
                        </div>
                    )
                })
            }else{
                listhistory=<div style={{textAlign:"center"}}>No History</div>
            }
       }else{
        listhistory=<div style={{textAlign:"center"}}>No History</div>
       }
       let listallhistory;
       if(this.props.loadingdata){
        if(this.state.stateenable){
            listallhistory = this.state.listcurrentpageall.map((list)=>{
                const web3 = window.web3
                const amount = web3.utils.fromWei(list.constamount.toString(), 'ether');
                const addressuser = list.staker;
                const firstaddress = addressuser.substring(0,7)
                const lastaddress = addressuser.substring(addressuser.length -7, addressuser.length)
                const addresslast = firstaddress + "..." + lastaddress
                const timeregis = Number(list.timewithdraw) - TIME_3days;
                const timenow = Math.floor(Date.now() / 1000);
                var dateNow = '';
                const distance = timenow - timeregis;
                const day = Math.floor(distance/86400);
                if(distance>0){
                    if(day > 0) {
                        dateNow = day.toString() + " day ago";
                    } else {
                        const hour = Math.floor(distance/3600);
                        if(hour > 0) {
                            dateNow = hour.toString() + " hour ago";
                        }else{
                            const minutes = Math.floor(distance/60);
                            if(minutes > 0) {
                                dateNow = minutes.toString() + " minutes ago"
                            }else{
                                dateNow = distance.toString() + " second ago";
                                }
                            }          
                    }
                }else{
                    dateNow = "Pre-register";
                }
                return(
                    <div className="main-collect-history">
                        <Row>
                            <Col md={3}><b>Farm 3 Days</b></Col>
                            <Col md={3}><b>{addresslast}</b></Col>
                            <Col md={3}><b>{amount} UNI-V2</b></Col>
                            <Col md={3}><b>{dateNow}</b></Col>
                        </Row>
                        
                    </div>
                )
            })
           }else{
            listallhistory=<div style={{textAlign:"center"}}>No History</div>
           }
       }else{
        listallhistory=<div style={{textAlign:"center"}}>Waiting...</div>
       }
       
        let history;
        if(this.state.statesethistory){
            //My history
            history=<div>
                <div className="main-my-history">
                          <div className="header-my-history">
                          <Row>
                            <Col md={3}><b>Pool</b></Col>
                            <Col md={3}><b>Amount</b></Col>
                            <Col md={3}><b>Status</b></Col>
                            <Col md={3}><b>Age</b></Col>
                          </Row>
                          </div>
                          <div >
                              {listhistory}                          
                          </div>
                          <table className="ulprevandnext">
                                    <tr>
                                        {/* <th><button >Prev</button></th>
                                        <th><button >Next</button></th> */}
                                        <th className="arrow-page"
                                        onClick={(event) => {
                                        event.preventDefault()
                                        this.prevPage()
                                        }}>
                                        <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-arrow-left-short" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                                        </svg>
                                        </th>
                                    <th>{this.state.currentpage} / {this.state.totalpage}</th>
                                        <th className="arrow-page"
                                        onClick={(event) => {
                                        event.preventDefault()
                                        this.nextPage()
                                        }}>
                                        <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-arrow-right-short" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                                        </svg>
                                        </th>
                                    </tr>
                                </table>
                </div>
            </div>
        }else{
            history=<div>
            <div className="main-my-history">
                      <div className="header-my-history">
                      <Row>
                        <Col md={3}><b>Pool</b></Col>
                        <Col md={3}><b>Address</b></Col>
                        <Col md={3}><b>Amount</b></Col>
                        <Col md={3}><b>Age</b></Col>
                      </Row>
                      </div>
                      <div >
                          {listallhistory}                          
                      </div>
                      <table className="ulprevandnext">
                                    <tr>
                                        {/* <th><button >Prev</button></th>
                                        <th><button >Next</button></th> */}
                                        <th className="arrow-page"
                                        onClick={(event) => {
                                        event.preventDefault()
                                        this.prevPageall()
                                        }}>
                                        <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-arrow-left-short" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                                        </svg>
                                        </th>
                                    <th>{this.state.currentpageall} / {this.state.totalpageall}</th>
                                        <th className="arrow-page"
                                        onClick={(event) => {
                                        event.preventDefault()
                                        this.nextPageall()
                                        }}>
                                        <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-arrow-right-short" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                                        </svg>
                                        </th>
                                    </tr>
                                </table>
            </div>
        </div>

        }

        let popupsuccess;
      if(this.state.modalsuccess){
        popupsuccess = <div class="alert alert-success alert-dismissible size-success-farm">
        <a href="#" class="close" data-dismiss="alert" aria-label="close"
        onClick={(event) => {
          event.preventDefault()
          this.closesuccess()
        }}>&times;</a>
        <strong>Success!</strong> You have successfully participated in farming
      </div>
      }

        let showapprove;
        if(this.state.stateapprove){showapprove = "1. Approve"}else{showapprove = "Waiting ..."}
        let showstake, showonlystake;
        if(this.state.statestake){
            showstake="2. Stake"
            showonlystake = "Stake"
        }else{showstake=showonlystake="Waiting ..."}

        let details;
        if(this.props.stateconnect){
            if(this.state.allowanlppid > this.state.amount){
                details = <button  
                // type="submit" 
                className="add-code"
                onClick={(event) => {
                    event.preventDefault()
                    this.stake()
                  }}
                >{showonlystake}</button>
            }else{
                details = <Row>
                    <Col>
                        <button 
                        className="button-approve"
                        style={{
                            backgroundColor: this.state.listenchange ? "#8395a7" : "#f69220",
                            }}
                        disabled={this.state.listenchange}
                        onClick={(event) => {
                            event.preventDefault()
                            this.approve()
                        }}>{showapprove}</button>
                    </Col>
                    <Col>
                        <button
                        className="button-approve"
                        style={{
                            backgroundColor: this.state.listenchange ? "#f69220" : "#8395a7",
                            }}
                        disabled={!this.state.listenchange}
                        onClick={(event) => {
                            event.preventDefault()
                            this.stake()
                        }}>{showstake}</button>
                    </Col>
                </Row>
            }
           
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
                    <div className="form-contract">
                        {/* <form onSubmit={this.handleSubmit} className="form-contract" > */}
                                  <div className="header-input-farm">
                                    <label className="float-left"><b>Stake</b></label>
                                    <span className="float-right text-muted p-content-pool">
                                    Available Amount: {this.state.balancelppis} UNI-V2
                                    </span>
                                 </div>
                                <div className="mb-2 div-input-farm">
                                    <input
                                        type="number"
                                        className="input-farm"
                                        placeholder="0"
                                        value={this.state.amount}
                                        onChange={this.handleChangeamount}
                                        />
                                    <table className="table-persion">
                                        <tr>
                                            <th>
                                            <button 
                                                className="input-percent" 
                                                onClick={(event) => {
                                                    event.preventDefault()
                                                    this.percent(25)
                                                }}>25 %</button>
                                            </th>
                                            <th>
                                            <button 
                                                className="input-percent" 
                                                onClick={(event) => {
                                                    event.preventDefault()
                                                    this.percent(50)
                                                }}>50 %</button>
                                            </th>
                                            <th>
                                            <button 
                                                className="input-percent" 
                                                onClick={(event) => {
                                                    event.preventDefault()
                                                    this.percent(75)
                                                }}>75 %</button>
                                            </th>
                                            <th>
                                                <button 
                                                className="input-percent" 
                                                onClick={(event) => {
                                                    event.preventDefault()
                                                    this.percent(100)
                                                }}>100 %</button>
                                            </th>
                                        </tr>
                                    </table>
                                </div>
                                <div class="div-viewether">
                                    <a href={CONTRACT_LPPIS} target="_blank" className="veiwetherscan">
                                    View LP token on Etherscan 
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-up-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z"/>
                                        </svg>
                                    </a>
                                </div>
                            <div style={{textAlign:"center"}}>
                            {details}                              
                            </div>   
                    </div> 
                    {popupsuccess}
                    <div className="my-history">
                        {/* <h3>My History</h3>
                        <div className="main-my-history">
                          <div className="header-my-history">
                          <Row>
                            <Col md={3}><b>Pool</b></Col>
                            <Col md={3}><b>Amount</b></Col>
                            <Col md={2}><b>Receive</b></Col>
                            <Col md={2}><b>Status</b></Col>
                            <Col md={2}><b>Age</b></Col>
                          </Row>
                          </div>
                          <div >
                              {listhistory}                          
                          </div>
                      </div>    */}
                      <table>
                          <tr>
                              <th>
                                  <button className="button-remove-backgroud"
                                  style={{color: this.state.statesethistory ? "#ecf0f1" :  "#f69220"}}
                                  onClick={(event) => {
                                    event.preventDefault()
                                    this.showhistory(false)
                                  }}>All History</button>
                              </th>
                              <th>
                                  <button className="button-remove-backgroud"
                                  style={{color: !this.state.statesethistory ? "#ecf0f1" :  "#f69220"}}
                                  onClick={(event) => {
                                    event.preventDefault()
                                    this.showhistory(true)
                                  }}>My History</button>
                              </th>
                          </tr>
                      </table>
                      <div className="history">
                          {history}
                      </div>
                    </div> 
                    <Footer/>   
            </div>
        )
    }
}