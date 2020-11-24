import React, {Component} from 'react';
import litepaper from '../documents/PiSwap_Litepaper_V06.pdf'
import Footer from './Footer'
export default class Litepaper extends Component{
    render(){
        return(
            <div>
                <iframe src={litepaper} height="1000px" width="100%">
                </iframe>
               
               <Footer />
            </div>
        )
    }
} 