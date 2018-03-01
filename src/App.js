import React, { Component } from 'react';
import { generatePass } from './actions';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {value: ''}
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  createSelectItems() {
    let items = [];         
    for (let i = 6; i <= 32; i++) {             
         items.push(<option key={i} value={i}>{i}</option>);   
    }
    return items;
  }

  handleSubmit(e){
    generatePass(e);
  }
    
  render() {
    return (
      <div>
            <form id = "pass_form" onSubmit = { this.handleSubmit }>
                <label id = "title">PASSWORD GENERATOR</label><p/>
                <label>Password length:</label>
                <select name = "pass_length" id = "pass_length">
                  {this.createSelectItems()}
                </select><br/>

                <label>Include Symbols:</label>
                <input type = "checkbox" name = "pass_symbol" id = "pass_symbol"/>( e.g. @#$% )<br/>

                <label>Include Numbers:</label>
                <input type = "checkbox" name = "pass_number" id = "pass_number"/> ( e.g. 123456 )<br/>

                <label>Include Lowercase Letters:</label>
                <input type = "checkbox" name = "pass_low" id = "pass_low"/> ( e.g. abcdefgh )<br/>

                <label>Include Uppercase Letters:</label>
                <input type = "checkbox" name = "pass_high" id = "pass_high"/> ( e.g. ABCDEFGH )<br/>

                <label>Exclude Similar Characters:</label>
                <input type = "checkbox" name = "ex_pass_char" id = "ex_pass_char"/> ( e.g. i, l, 1, L, o, 0, O )<br/>

                <label>Exclude Ambiguous Characters:</label>
                <input type = "checkbox" name = "ex_pass_amb" id = "ex_pass_amb"/> ( { } [ ] ( ) / \ ' " ` ~ , ; : . &#60; &#62; )<br/>

                <input type = "submit" value = "Submit"/>

                <p id = "p1">Your password: <input type = "text" id = "myPass"/></p>
                <p id = "p2">Remember your password: <label id = "rem"></label></p>
            </form>
        </div>
    );
  }

  
}

export default App;
