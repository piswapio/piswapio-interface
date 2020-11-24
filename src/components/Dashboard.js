import React, {Component} from 'react';
import bannerpiswap1 from '../asset/banner-piswap1.png'
import bannerpiswap2 from '../asset/banner-piswap2.png'
import bannerpiswap3 from '../asset/banner-piswap3.png'
import bannerpiswap4 from '../asset/banner-piswap4.png'
import { Carousel, Row, Col} from 'react-bootstrap';
import Footer from './Footer'
import Piswap from '../abis/Piswapnew.json'
import Ref from '../abis/Ref.json'
import {OPEN_TIME, END_TIME, WEB} from '../constants'
export default class Dashboard extends Component{
    constructor(props) {
        super(props)
        this.state = {
            currentpage: 1,
            totalpage: 1,
            totalreward: 0,
            totalcollect: 0,
            totalsales: 0,
            statecollect: true,
            loadingdata: false,
            openref: false,
            datalistcollection: [],
            enablecollect:false
        }
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
            var timenow = Math.floor(Date.now() / 1000);
            var lasttime3day = Number(this.props.lasttime3day)
            var lasttime15day = Number(this.props.lasttime15day)
            var lasttime30day = Number(this.props.lasttime30day)
            var blcollect =0;
            var arrayinterest =[5,4,3,2,1,1,1,1,1,1]
            // Get total reward
            if(timenow > OPEN_TIME){
                // var timechoice = 0;
                if(timenow > END_TIME){timenow = END_TIME}
                for(var i=0; i<this.props.dataliststake.length; i++){
                    var lasttime=0;
                    if(this.props.dataliststake[i].choice ==1){
                        lasttime = lasttime3day;
                    }else if(this.props.dataliststake[i].choice ==2){
                        lasttime = lasttime15day;
                    }else if(this.props.dataliststake[i].choice ==3){
                        lasttime = lasttime30day;
                    }
                    console.log("staker" + this.props.dataliststake[i].staker)
                    console.log("ratio " + this.props.dataliststake[i].ratio)
                    console.log("amount" + this.props.dataliststake[i].amount)
                    console.log("choice " + this.props.dataliststake[i].choice)
                    if(Number(this.props.dataliststake[i].timewithdraw)<lasttime && this.props.dataliststake[i].staker == this.props.account){
                        blcollect += Number(this.props.dataliststake[i].reward70)
                    }
                    if(Number(this.props.dataliststake[i].timewithdraw)>lasttime){
                        var timef = 0;                        
                        if(Number(this.props.dataliststake[i].timewithdraw) > timenow){timef = timenow}else{timef = Number(this.props.dataliststake[i].timewithdraw)}
                        if(this.props.dataliststake[i].staker == this.props.account){                         
                            blcollect += Number(this.props.dataliststake[i].reward70) + 0.7 * Number(this.props.dataliststake[i].ratio) * (timef - lasttime)/60
                        }
                        // else{
                        //     console.log("hasRef")
                        //     console.log(this.props.hasRef)
                        //         var sponsor = this.props.listf.find(a=>a.f1 == this.props.dataliststake[i].staker).sponsor;
                        //         console.log("sponsor 1" + sponsor)
                        //         for(var x=0; x<10; x++){ 
                        //             var checksponsor = sponsor;                              
                        //             if(checksponsor == this.props.account){
                        //                 blcollect += arrayinterest[x] * 0.7 * Number(this.props.dataliststake[i].ratio) * (timef - lasttime)/6000
                        //                 console.log("Balance Ref: " + arrayinterest[x] * 0.7 * Number(this.props.dataliststake[i].ratio) * (timef - lasttime)/6000)
                        //             }
                        //             try{
                        //                 sponsor = this.props.listf.find(a=>a.f1 == checksponsor).sponsor;
                        //             }catch{
                        //                 x=10;
                        //             }
                                    
                        //         }
                        // }
                        

                    } 
                }
                // var blref = await this.props.contractRef.methods.balanceaccount(this.props.account).call()
                blcollect += Number(this.props.blref);
                console.log("this.props.blref")
                console.log(this.props.blref)
                const amount = blcollect / 10**8;
                this.setState({totalreward: amount})
            }

            //GET LIST COLLECTED
            const datalistcollection =[];
            for(var cl = 0; cl < this.props.listcollection.length; cl++){
                if(this.props.listcollection[cl].staker == this.props.account){
                    datalistcollection.push(this.props.listcollection[cl])
                }
            }
            console.log("this.props.listcollection")
                console.log(this.props.listcollection)
            if(datalistcollection.length >0){
                var totalpage = (Math.floor(datalistcollection.length / 5) > 0) ? (((datalistcollection.length % 5) > 0) ? Math.floor(datalistcollection.length / 5) +1 : Math.floor(datalistcollection.length / 5))  :  1;
                var listcurrentpage = (totalpage > 1) ? datalistcollection.slice(0, 5) : datalistcollection;
                console.log("listcurrentpage")
                console.log(listcurrentpage)
                this.setState({
                    enablecollect: true,
                    totalpage, 
                    listcurrentpage,
                    datalistcollection
                })
            }
            //Get total collected
            var totalcollected =0;
            for(var j=0; j< this.props.listcollection.length; j++){
                if(this.props.listcollection[j].staker == this.props.account){
                    totalcollected += Number(this.props.listcollection[j].balance);
                }
            }
            const amountrf = totalcollected/10**8;
            console.log("amountrf " + amountrf)
            this.setState({totalcollect : amountrf})
            
            //Get Total Sales
            var totalsales = await this.props.contractRef.methods.totalsales(this.props.account).call()
            console.log("totalsales")
            console.log(Number(totalsales))
            const amountsales = web3.utils.fromWei(totalsales.toString(), 'ether');

            //check ref link
            var reflink = await this.props.contractRef.methods.hasRefuse(this.props.account).call();
            if(reflink){this.setState({openref: true})}
            this.setState({loadingdata: true, totalsales : amountsales})
        }
    }
    prevPage(){
        if(this.state.currentpage > 1){
            var listcurrentpage = this.state.datalistcollection.slice(5*(this.state.currentpage-2), 5*(this.state.currentpage-1))
            this.setState({currentpage : this.state.currentpage -1 , listcurrentpage})
        }
      }
    nextPage(){
        if(this.state.currentpage < this.state.totalpage){
            var  listcurrentpage = this.state.datalistcollection.slice(5*this.state.currentpage, 5*this.state.currentpage +5)
            this.setState({currentpage : this.state.currentpage +1 , listcurrentpage})
        }
    }
    collect(){
        console.log("wallet ref: " + this.props.addressRef)
        this.setState({statecollect: false})
        this.props.contractPiswap.methods.collection(this.props.addressRef).send({ from: this.props.account }).on('confirmation', (confNumber, receipt) => {
            this.setState({statecollect: true})
        }).on('error', (error) => {this.setState({statecollect: true})})
    }
    render(){
        let history;
        if(this.props.loadingdata){
            if(this.state.enablecollect){
                history = this.state.listcurrentpage.map((list)=> {
                    var balancollec = Number(list.balance)/10**8
                    var dateNow = '';
                    const timenow = Math.floor(Date.now() / 1000);
                    const timecollec = Number(list.timecollect);
                    const distance = timenow - timecollec;
                    const day = Math.floor(distance/86400);                   
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
                   
                    return(
                        <div className="main-collect-history">
                        <Row>
                    <Col><b>{balancollec} PIS</b></Col>
                            <Col><b>{dateNow}</b></Col>
                        </Row>
                        
                    </div>
                    )
                })
            }else{
                history=<div style={{textAlign:"center"}}>No History</div>
            }
        }else{
            history=<div style={{textAlign:"center"}}>Waiting...</div>
        }
        
        let linkref;
        if(this.props.stateconnect){
            if(this.state.loadingdata){
                if(this.state.openref){
                    linkref = <div className="ref-link size-refferal">
                        {WEB}refferal/{this.props.account}
                    </div> 
                }else{
                    linkref = <div className="ref-link">You have to join farming for 30 days with more than 1 LPPIS to get refferal link</div>
                }
            }else{
                linkref = <div className="ref-link">Waiting...</div>
            }
            
        }else{
            linkref = <div className="ref-link">Please connect wallet to see refferal link</div>
        }
       
        let showcollect;
        if(this.state.statecollect){showcollect="Collect"}else{showcollect="Waiting..."}
        let collect;
        if(this.props.stateconnect){
            collect =<button
                className="button-collect"
                onClick={(event) => {
                event.preventDefault()
                this.collect()
                }}>{showcollect}</button>
        }else{
            collect = <button 
            className="add-code" 
            onClick={(event) => {
                event.preventDefault()
                this.props.conect()
              }}>Connect Wallet</button>
        }
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
                        <Carousel.Item interval={300}>
                            <img
                            className="d-block w-100"
                            src={bannerpiswap4}
                            alt="Third slide"
                            style={{width: "100%", height: "auto"}} 
                            />
                        </Carousel.Item>
                    </Carousel>
                <div className="main-farm-dashboard">
                    <Row>
                        <Col md={6} xs={12}>
                            <div className="left-dashboard">
                                <div className="header-dashboard">
                                    My PIS Reward
                                </div>
                                <div className="main-dashboard">
                                    <p>Total Reward</p>
                                    <p className="total-reward">{this.state.totalreward}</p>
                                    <p>Total Collected</p>
                                    <p className="total-reward">{this.state.totalcollect}</p>
                                    {collect}
                                    
                                </div> 
                                <div className="history-collect">
                                    <Row>
                                        <Col>Amount</Col>
                                        <Col>Age</Col>
                                    </Row>
                                    <div className="details-history">
                                        {history}
                                        
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
                            </div>
                        </Col>
                        <Col md={6} xs={12}>
                            <div className="right-dashboard">
                                <div className="header-dashboard">
                                    Refferal Link
                                </div>
                                {linkref}

                                <div className="header-dashboard">
                                 Total Sales                         
                                </div>
                                <p className="total-reward">{this.state.totalsales}</p>
                            </div>
                        </Col>
                    </Row>
                </div>
                 <Footer/>
            </div>
        )
    }
}