import React, {useState, useEffect} from 'react';
import axios from 'axios';
const Landing = () => {

    const [number1, setNumber1] = useState(0);
    const [number2, setNumber2] = useState(0);
    const [sum, setSum] = useState(0);
    const [sub, setSub] = useState(0);
   
    // const addfun = () => {
    //     let num1 = parseInt(number1);
    //     let num2 = parseInt(number2);
    //     setSum(num1 + num2);
    // }
  
    const subtractFrontend = () => {
      let num1 = parseInt(number1);
      let num2 = parseInt(number2);
      setSub(num1 - num2);
    }
 
  const addBackend = async () => {
    try {
        const response = await axios.post('/api/add', {num1: number1, num2: number2});
        setSum(response.data)
        console.log("the res from the backend:", response.data)
    } catch (e) {
        console.log("some error from backend...: ", e);
    }
  };
    
    return (
        <div className="ml-5">
          <div className="mt-4">
            This is the home page:
            <form>
              <div className="form-group col-sm-4">
              <input 
              className="form-control" type="text" placeholder="num1"
              onChange={(e) => setNumber1(e.target.value)}/>
              </div>
              <div className="form-group col-sm-4">
              <input 
              className="form-control" type="text" placeholder="num2"
              onChange={(e) => setNumber2(e.target.value)}/>
              </div>
            </form>
            
            <button className="btn btn-primary ml-3" onClick={() => {addBackend()}}>
              add
            </button>
            <button className="btn btn-primary ml-4" onClick={() => {subtractFrontend()}}>
              subtract
            </button>
          </div>
        <div className="mt-3">
          <p>The sum of the numbers: {sum}</p>
          <p>The difference of the numbers: {sub}</p>
        </div>
        </div>
      );
   
}

export default Landing;