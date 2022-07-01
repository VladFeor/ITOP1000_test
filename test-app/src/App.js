import './App.css';
import CurrencyInput from "./CurrencyInput";
import {useState, useEffect} from "react";
import axios from "axios";
import HeaderNews from "./HeaderNews";

function App() {

  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState('UAH');
  const [currency2, setCurrency2] = useState('EUR');
  const [rates, setRates] = useState([]);
  let str = {};

  useEffect(() => {
    axios.get('https://api.fastforex.io/fetch-multi?from=UAH&to=UAH,EUR,USD&api_key=c7a85aec64-f6656892be-recrfs')
        .then(response => {
          setRates(response.data.results);
        })



    // for (const [key, value] of Object.entries(rates)) {
    //  str = str.push(`${key}: ${value}`);
    //  console.log(str)
    // }
  }, []);

  useEffect(() => {
    if (!!rates) {
      function init() {
        handleAmount1Change(1);
      }
      init();
    }
  }, [rates]);



  function format(number) {
    return number.toFixed(4);
  }

  function handleAmount1Change(amount1) {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setAmount1(amount1);
  }

  function handleCurrency1Change(currency1) {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2) {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2) {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setCurrency2(currency2);
  }


  return (
      <div>

       <div className="value" >
         {
           Object.entries(rates).map(([key, value]) => <HeaderNews name={key} value={value}/>)
         }
       </div>

        <h1>Test task from ITOP1000</h1>
        <CurrencyInput
            onAmountChange={handleAmount1Change}
            onCurrencyChange={handleCurrency1Change}
            currencies={Object.keys(rates)}
            amount={amount1}
            currency={currency1} />
        <CurrencyInput
            onAmountChange={handleAmount2Change}
            onCurrencyChange={handleCurrency2Change}
            currencies={Object.keys(rates)}
            amount={amount2}
            currency={currency2} />
      </div>
  );
}

export default App;
