import { useState, useEffect } from 'react'
import Button from './components/Button'
import Counter from './components/Counter'
import Title from './components/Title'

import './App.css'

function App() {
  const titleText = 'Fancy Counter';
  const [count, setCount] = useState(0)
  const [stateButtonReset, setStateButtonReset] = useState(false);
  const [stateButtonSubstract, setStateButtonSubstract] = useState(false);
  const [stateButtonAdd, setStateButtonAdd] = useState(false);
  const [title, setTitle] = useState(titleText);
 
  function handlerReset(){
    setCount((count) => count = 0);
  }

  function handlerAdd(){
    setCount((count) => count + 1);
  }

  function handlerSubtract(){
    setCount((count) => count - 1);
  }

  useEffect(() => {
    if(count === 0){
      setStateButtonReset((stateButtonReset) => stateButtonReset = true);
      setStateButtonSubstract((stateButtonSubstract) => stateButtonSubstract = true);
      setStateButtonAdd((stateButtonAdd) => stateButtonAdd = false);
      setTitle((title) => title = titleText);

    } else if(count === 10){
      setStateButtonAdd((stateButtonAdd) => stateButtonAdd = true);
      setTitle((title) => title = 'I bought the premium version');

    } else {
      setStateButtonReset((stateButtonReset) => stateButtonReset = false);
      setStateButtonSubstract((stateButtonSubstract) => stateButtonSubstract = false);
      setStateButtonAdd((stateButtonAdd) => stateButtonAdd = false)
      setTitle((title) => title = titleText);
    }
  }, [count])

  return (
    <div className="container-card">
      <div className='card'>
        <Title id='title'>{title}</Title>
        <Counter id='counter'>{count}</Counter>
        <Button action={handlerReset} id='buttonReset' state={stateButtonReset}>Reset</Button>
      </div>
      <div className="containerAddSubstract">
        <Button action={handlerSubtract} id='buttonSubstract' state={stateButtonSubstract}>Substract</Button>
        <Button action={handlerAdd} id='buttonAdd' state={stateButtonAdd}>Add</Button>
      </div>
    </div>
  )
}

export default App
