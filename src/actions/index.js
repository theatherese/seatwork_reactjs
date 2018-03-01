import * as axios from 'axios';

export function checkCharacter(character){
    let result = "";
    
    if(character.match(/[abcdefghijklmnopqrstuvwxyz]/g) || character.match(/[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/g)){
        result = "letter";
    }else if(character.match(/[1234567890]/g)){
        result = "number";
    }else if(character.match(/[!@#$%^&*()_+~`|?.,-=<>:{}[\]\\/;]/g)){
        result = "character";
    }
    return result;
}

export function loadJSON(){
    return axios.get('/assets/equivalent.json')
        .then(function (response,data) {
            return response.data;
    }).catch(function (response) {
            console.log(response);
    });
}

export function selectLetters(){
    let letters = "abcdefghijklmnopqrstuvwxyz";
    let letter_choice = Math.ceil(letters.length * Math.random()* 2);

    return letters.charAt(letter_choice);
}

export function selectNumber(){
    let numbers = "1234567890";
    let number_choice = Math.ceil(numbers.length * Math.random()* 2);

    return numbers.charAt(number_choice);
}

export function selectSymbol(){
    let symbols = "!@#$%^&*()_+~`|{}[]\\/?:;<>,.-=";
    let symbol_choice = Math.ceil(symbols.length * Math.random()* 2);

    return symbols.charAt(symbol_choice);
}

export function dataEquivalent(shuffled){
    var result = loadJSON();
        // console.log(rsesult);
        var equiv = shuffled.split(""), letterDesc = "";
        result.then(function(res) {

            for(var i = 0; i < equiv.length; i++){
                var lett = equiv[i].toLowerCase();
                var me2 = equiv[i];
                
                for(var j = 0; j < res.length; j++){
                            
                    if(lett === res[j].letter){
                        if(me2.match(/[ABCDEFGHIJKLMNOPQESTUVWXYZ]/g)){
                          equiv[i] = res[j].description.toUpperCase();
                        }
                        else if(me2.match(/[abcdefghijklmnopqrstuvwxyz]/g)){
                            equiv[i] = res[j].description.toLowerCase();
                        }
                    }
                    equiv[i] += " ";
                }
            }
            letterDesc = equiv.join("");
            document.getElementById("p2").style.visibility = "visible";
            document.getElementById("rem").innerHTML = letterDesc;
        });
}

export function generatePass(e){
    e.preventDefault();  
    var s = document.getElementById("pass_length");
    var pass_length = s.options[s.selectedIndex].text;
    var pass_symbol = document.getElementById("pass_symbol").checked;
    var pass_number = document.getElementById("pass_number").checked;
    var pass_low = document.getElementById("pass_low").checked;
    var pass_high = document.getElementById("pass_high").checked;
    var ex_pass_char = document.getElementById("ex_pass_char").checked;
    var ex_pass_amb = document.getElementById("ex_pass_amb").checked;

    //validation
    if((!pass_symbol && !pass_number && !pass_low && !pass_high)){
        alert("Please select the requirements of your password!");
    }
    else{
        // alert("good");
        var random_pass="", character="", previous="";
        //loop for password length
      while(random_pass.length < pass_length){
            //check length
            if(character.length < pass_length){
                var symbol = selectSymbol();
                var number = selectNumber();
                var letter = selectLetters();

                var unamb_char = /^[!@#$%^&*|?+=._-]+$/g;
                var upper = /^([A-Z])+$/g;
                var lower = /^([a-z])+$/g;
                if(pass_symbol && ex_pass_amb){
                    if(unamb_char.test(symbol)){
                        character += symbol;
                    }
                }
                else if(pass_symbol){
                    character += symbol;
                }

                //check if number
                if(pass_number){
                    character += number;
                }

                //check if upper and lower letters
                if(pass_low && pass_high){
                    if(previous !== ""){
                        if(upper.test(letter)){
                            letter = letter.toLowerCase();
                          }
                          else if(lower.test(letter)){
                            letter = letter.toUpperCase();
                          }
                        }
                    previous = letter;
                    character += letter;
                }
                //check if upper
                else if(pass_high){
                    character += letter.toUpperCase();
                }

                //check if lower
                else if(pass_low){
                    character += letter.toLowerCase();
                }

                //transfer characters
                random_pass = character;
                //shuffling the order
                var shuffled = random_pass.split('').sort(function(){return 0.5-Math.random()}).join('');

                //checking the length
                if(random_pass.length === pass_length){
                    if(ex_pass_char){
                        var splitChar = shuffled.split(""),  newSymbol = selectSymbol(), newNumber = selectNumber(),
                        newLetter = selectLetters();

                        for(var i =0; i < splitChar.length; i++){
                            if(splitChar[i] ===  splitChar[i+1]){
                                var checker = checkCharacter(splitChar[i]);
                                //changing characters if similar
                                if(checker === "letter"){
                                    if(newLetter === splitChar[i]){
                                        newLetter = selectLetters();
                                    }
                                    if(newSymbol === splitChar[i]){
                                        newSymbol = selectSymbol();
                                    }
                                    if(pass_low && pass_high){
                                        newLetter = (newLetter.length %2===0)?(newLetter.toUpperCase()):(newLetter);
                                        if(upper.test(splitChar[i+1])){
                                            newLetter = newLetter.toLowerCase();
                                        }
                                        else if(lower.test(splitChar[i+1])){
                                            newLetter = newLetter.toUpperCase();
                                        }
                                        splitChar[i] = newLetter;
                                    } 
                                    else if(pass_high){
                                        splitChar[i] = newLetter.toUpperCase();
                                      } 
                                      
                                    else if(pass_low){
                                        splitChar[i] = newLetter.toLowerCase();
                                    }
                                }
                                else if(checker === "number"){
                                    if(newNumber === splitChar[i]){
                                      newNumber = selectNumber();
                                    }
                                    splitChar[i] = newNumber;
                                }

                                else if(checker === "character"){
                                    if(pass_symbol && ex_pass_amb){
                                        if(unamb_char.test(newSymbol)){ 
                                          splitChar[i] = newSymbol;
                                        }
                                    } else if(pass_symbol){
                                        splitChar[i] = newSymbol;
                                    }
                                }
                            //end if
                            }
                        //end of for loop
                        }
                        shuffled = splitChar.join("");
                    //end of if similar
                    }
                //end of if equal length
                }
            //end of if length
            }
        //end of while
        }
        document.getElementById("p1").style.visibility = "visible";
        document.getElementById("myPass").value = shuffled;
        
        dataEquivalent(shuffled);
        
        
    //end of else
    }
  }

  
