import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import {render} from 'react-dom';
import {checkDom} from './actions';

class App extends Component {
    constructor(){
        super()
    }
    
}

const Display = () => {
      return (
        <div>
            <form id = "pass_form" method = "post" onSubmit = "postData(event)" action="/">
                <label id = "title">PASSWORD GENERATOR</label><p/>
                <label for = "pass_length">Password length:</label>
                <select name = "pass_length" id = "pass_length"></select><br/>

                <label for = "pass_symbol">Include Symbols:</label>
                <input type = "checkbox" name = "pass_symbol" id = "pass_symbol"/>( e.g. @#$% )<br/>

                <label for = "pass_number">Include Numbers:</label>
                <input type = "checkbox" name = "pass_number" id = "pass_number"/> ( e.g. 123456 )<br/>

                <label for = "pass_low">Include Lowercase Letters:</label>
                <input type = "checkbox" name = "pass_low" id = "pass_low"/> ( e.g. abcdefgh )<br/>

                <label for = "pass_high">Include Uppercase Letters:</label>
                <input type = "checkbox" name = "pass_high" id = "pass_high"/> ( e.g. ABCDEFGH )<br/>

                <label for = "ex_pass_char">Exclude Similar Characters:</label>
                <input type = "checkbox" name = "ex_pass_char" id = "ex_pass_char"/> ( e.g. i, l, 1, L, o, 0, O )<br/>

                <label for = "ex_pass_amb">Exclude Ambiguous Characters:</label>
                <input type = "checkbox" name = "ex_pass_amb" id = "ex_pass_amb"/> ( { } [ ] ( ) / \ ' " ` ~ , ; : . &#60; &#62; )<br/>

                <input type = "submit" value = "Submit"/>

                <p id = "p1">Your password: <input type = "text" id = "myPass"/></p>
                <p id = "p2">Remember your password: <label id = "rem"></label></p>
            </form>
        </div>
      );
    };

export default Display;