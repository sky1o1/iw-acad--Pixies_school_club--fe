import React, { Component } from 'react';

import ContactForm from './ContactForm'
import {postRequest} from '../config/axios.config'

class Message extends Component{
    render(){
        return(
            <div className="container">
                <ContactForm/>
            </div>
        );
    }
}

export default Message