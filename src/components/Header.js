import React, {Component} from 'react';
import iconpiswap from '../asset/logo-pi.png'
import Piswap from '../abis/Piswapnew.json'
import Ref from '../abis/Ref.json'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Home from './Home'
import Litepaper from './Litepaper'
import Swap from './Swap'
import Assetpools from './Assetpools'
import Dashboard from './Dashboard'
import Proposals from './Proposals'
import Farm24h from './Farm24h'
import Farm15days from './Farm15days'
import Farm30days from './Farm30days'
import Refpage from './Refpage'
import '../css/App.css'
import { Row, Col,Navbar, Nav} from 'react-bootstrap';
import {INFURA, WALLET_LPPIS, WALLET_PIS} from '../constants'
import Web3 from 'web3'
export default class Header extends Component{
    constructor(props) {
        super(props)
        this.state = { 
            reflink: '',
            account: '0x00',
            metamaskconnect: false,
            stateconnect: false,
            contractPiswap: {},
            addressPiswap:'',
            total24h: 0,
            total15day: 0,
            total30day: 0,
            walletpis: WALLET_PIS,
            walletlppis: WALLET_LPPIS,
            balanceLPPIS: 0,
            connectwallet: "Connect Wallet",
            enable24h: false,
            enable15days: false,
            enable30days: false,
            data24h:[],
            data15days:[],
            data30days:[],
            contractRef:{},
            addressRef:'',
            loadingdata: false,
            datahistory3day: [],
            datahistory15day: [],
            datahistory30day: [],
            dataliststake: [],
            lasttime3day:0,
            lasttime15day:0,
            lasttime30day:0,
            listcollection: [],
            blref:0,
            listf: [],
            hasRef: false
        }
        this.conect =  this.conect.bind(this);
    }

    async loadWeb3() {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
          const infura = INFURA;
          window.web3 = new Web3(new Web3.providers.HttpProvider(infura));
          this.setState({metamaskconnect: true})
        }
    }
    async checkRefresh() {
        if(window.ethereum) {
          window.ethereum.on('accountsChanged', function () {
              window.location.reload();
          });
      }
    }

    async componentDidMount() {
        await this.loadWeb3();
        await this.loadBlockchainData()
        await this.checkRefresh()
    }

    async checkRefresh() {
      if(window.ethereum) {
        window.ethereum.on('accountsChanged', function () {
            window.location.reload();
        });
    }
    }
    async loadBlockchainData(){
      const web3 = window.web3
      const networkId = await web3.eth.net.getId()    
      const piswap = Piswap.networks[networkId]
      const data24h=[];
      const data15days=[];
      const data30days=[];
      const datalist=[]
      if(piswap){
        const contractPiswap = new web3.eth.Contract(Piswap.abi, piswap.address)
        const lasttime3day = await contractPiswap.methods.lasttimeStake3day().call();
        const lasttime15day = await contractPiswap.methods.lasttimeStake15day().call();
        const lasttime30day = await contractPiswap.methods.lasttimeStake30day().call();
        const dataliststake = await contractPiswap.methods.getListstake().call();
        const listcollection = await contractPiswap.methods.getListCollection().call();
        // const has30 = await contractPiswap.methods.hasOpentransfer().call();
        // console.log("has30")
        // console.log(has30)
        console.log(dataliststake)
        console.log("listcollection")
        console.log(listcollection)
        for(var i =0; i< dataliststake.length; i++){
          datalist.push(dataliststake[i])
          if(Number(dataliststake[i].choice) == 1){
            //data 24h
            data24h.push(dataliststake[i])
            console.log("24h")
            console.log(data24h)
          }else if(Number(dataliststake[i].choice) == 2){
            //data 15 days
            data15days.push(dataliststake[i])
            console.log("data15days")
            console.log(data15days)
          }
          else if(Number(dataliststake[i].choice) == 3){
            //data 30 days
            data30days.push(dataliststake[i])
            console.log("data30days")
            console.log(data30days)
          }
        }
        console.log("address PISWAP: " + piswap.address)
        data24h.sort((a, b) => parseFloat(b.timewithdraw) - parseFloat(a.timewithdraw));
        data15days.sort((a, b) => parseFloat(b.timewithdraw) - parseFloat(a.timewithdraw));
        data30days.sort((a, b) => parseFloat(b.timewithdraw) - parseFloat(a.timewithdraw));
        if(data24h.length>0){this.setState({enable24h: true})}
        if(data15days.length>0){this.setState({enable15days: true})}
        if(data30days.length>0){this.setState({enable30days: true})}
        data24h.sort((a, b) => parseFloat(b.timewithdraw) - parseFloat(a.timewithdraw));
        data15days.sort((a, b) => parseFloat(b.timewithdraw) - parseFloat(a.timewithdraw));
        data30days.sort((a, b) => parseFloat(b.timewithdraw) - parseFloat(a.timewithdraw));
        this.setState({contractPiswap, addressPiswap: piswap.address,data24h, data15days, data30days, loadingdata: true, dataliststake : datalist, lasttime3day, lasttime30day, lasttime15day, listcollection})
      }
      const ref = Ref.networks[networkId]
      if(ref){
        const contractRef = new web3.eth.Contract(Ref.abi, ref.address)
        const listf = await contractRef.methods.getListf().call()
        console.log("listf")
        console.log(listf)
        console.log("ref.address")
        console.log(ref.address)
        
        this.setState({contractRef, addressRef: ref.address, listf})
      } 
    }
    
    async conect(){
        if(this.state.metamaskconnect){
            window.alert('You should consider trying MetaMask!')
          }else{
            const web3 = new Web3(window.ethereum)
            const check = await window.ethereum.enable()
            .then(res => {
              console.log("connect success")
              const address = web3.utils.toChecksumAddress(res.toString())
              const sortaddress = address.substring(0,7)
              const sortaddressfinish = sortaddress + "..."
              // const reflink = 'piswap/' + address
              var abi = require('human-standard-token-abi')
              var tokenLppis = new web3.eth.Contract(abi, this.state.walletlppis)
              tokenLppis.methods.balanceOf(address).call().then(respone =>{this.setState({balanceLPPIS: respone}); console.log("balanceLPPIS: " + respone) });
              this.state.contractRef.methods.balanceaccount(address).call().then(respone =>{this.setState({blref: respone}); });
              this.state.contractRef.methods.hasRefuse(address).call().then(respone =>{this.setState({hasRef: respone}); })
              this.setState({ account: address , stateconnect: true, connectwallet: sortaddressfinish}) 
              
            }) 
            .catch(err => {
              console.log("Error: " + err)
            })  
          }
    }
    render(){
        return(
            <Router>
            <div className="main-header hidden-mobile">
               <nav className="navbar navbar-expand-sm  navbar-default header">
                   <Link to="/">
                     <img src={iconpiswap} width="auto" height="40px" className="d-inline-block align-top " alt="" />             
                   </Link>
                   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                   <svg class="bi bi-grid-3x3-gap-fill color-white" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                     <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2z"/>
                   </svg>
                   </button>

                   <div class="connect-wallet" >
                       <div className="bar-connect-wallet">
                       <Row>
                           <Col md={8}>
                               {/* <div className="ref-link">
                               {this.state.reflink}
                               </div> */}
                           </Col>
                           <Col md={4}>
                           <button 
                              className="button-wallet" 
                                onClick={(event) => {
                                    event.preventDefault()
                                    this.conect()
                                  }}
                                  >
                                  {this.state.connectwallet}
                             </button>   
                           </Col>
                       </Row>
                       </div>
                     <ul class="navbar-nav ml-auto">                     
                         <li className="header-button">
                           <Link className="link-piswap" to="/litepaper">Litepaper</Link>
                         </li>
                         <li className="header-button">
                           <Link className="link-piswap" to="/swap">Swap</Link>
                         </li>
                         <li className="header-button">
                           <Link className="link-piswap" to="/assetpools">Asset Pools</Link>
                         </li>
                         <li className="header-button">
                           <Link className="link-piswap" to="/proposals">Proposals</Link>
                         </li>
                         <li className="header-button">
                           <Link className="link-piswap" to="/dashboard">Dashboard</Link>
                         </li>
                     </ul>
                     </div>
               </nav>
           </div>
           <div className="show-mobile">
           <Navbar bg="dark" expand="lg">
              <Navbar.Brand href="/">
                      <img src={iconpiswap} width="auto" height="60px" className="d-inline-block align-top " alt="" />             
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Link className="link-piswap" to="/litepaper">Litepaper</Link>
                  <Link className="link-piswap" to="/swap">Swap</Link>
                  <Link className="link-piswap" to="/assetpools">Asset Pools</Link>
                  <Link className="link-piswap" to="/proposals">Proposals</Link>
                  <Link className="link-piswap" to="/dashboard">Dashboard</Link>
                  <button 
                              className="button-wallet" 
                                onClick={(event) => {
                                    event.preventDefault()
                                    this.conect()
                                  }}
                                  >
                                  {this.state.connectwallet}
                             </button>  
                </Nav>
                
              </Navbar.Collapse>
            </Navbar>     
           </div>
           <Switch>
             <Route exact path="/">
               <Home 
                 total24h ={this.state.total24h}
                 total15day ={this.state.total15day}
                 total30day ={this.state.total30day}
                 />
             </Route>    
             <Route path="/refferal/:id">
               <Refpage 
                 total24h ={this.state.total24h}
                 total15day ={this.state.total15day}
                 total30day ={this.state.total30day}
                 />
             </Route>       
             <Route exact path="/litepaper">
               <Litepaper   
               /> 
             </Route>
             <Route exact path="/swap">
               <Swap   
               /> 
            </Route>
             <Route exact path="/assetpools">
               <Assetpools   
               /> 
             </Route>
             <Route exact path="/proposals">
               <Proposals   
               /> 
             </Route>
             <Route exact path="/dashboard">
               <Dashboard   
                  conect = {this.conect}
                  account = {this.state.account}   
                  stateconnect = {this.state.stateconnect}               
                  contractPiswap={this.state.contractPiswap} 
                  contractRef={this.state.contractRef}
                  dataliststake = {this.state.dataliststake}
                  lasttime3day={this.state.lasttime3day}
                  lasttime15day={this.state.lasttime15day}
                  lasttime30day={this.state.lasttime30day}
                  listcollection={this.state.listcollection}
                  blref={this.state.blref}
                  listf={this.state.listf}
                  hasRef={this.state.hasRef}
                  loadingdata={this.state.loadingdata}
                  addressRef={this.state.addressRef}
               /> 
             </Route>
             <Route exact path="/farm-3days">
               <Farm24h      
               account = {this.state.account}               
               stateconnect = {this.state.stateconnect}  
               conect = {this.conect} 
               balanceLPPIS={this.state.balanceLPPIS}
               addressPiswap={this.state.addressPiswap}
               contractPiswap={this.state.contractPiswap}  
               enable24h={this.state.enable24h} 
               data24h={this.state.data24h} 
               addressRef={this.state.addressRef} 
               loadingdata={this.state.loadingdata}
              //  datahistory3day={this.state.datahistory3day}
               /> 
             </Route>
             <Route exact path="/farm-15days">
               <Farm15days  
                account = {this.state.account}               
                stateconnect = {this.state.stateconnect}  
                conect = {this.conect} 
                balanceLPPIS={this.state.balanceLPPIS}
                addressPiswap={this.state.addressPiswap}
                contractPiswap={this.state.contractPiswap}  
                enable24h={this.state.enable15days} 
                data24h = {this.state.data15days}
                addressRef={this.state.addressRef}    
                loadingdata={this.state.loadingdata}  
                // datahistory3day={this.state.datahistory15day}    
               /> 
             </Route>
             <Route exact path="/farm-30days">
               <Farm30days   
                account = {this.state.account}               
                stateconnect = {this.state.stateconnect}  
                conect = {this.conect} 
                balanceLPPIS={this.state.balanceLPPIS}
                addressPiswap={this.state.addressPiswap}
                contractPiswap={this.state.contractPiswap}   
                enable24h={this.state.enable30days} 
                data24h = {this.state.data30days}   
                addressRef={this.state.addressRef}   
                loadingdata={this.state.loadingdata}    
                // datahistory3day={this.state.datahistory30day} 
               /> 
             </Route>
           </Switch>
           </Router>
        )
    }
}