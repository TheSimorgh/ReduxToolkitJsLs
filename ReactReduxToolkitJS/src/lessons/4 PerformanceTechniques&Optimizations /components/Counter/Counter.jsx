import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, decrementByOne, increment, incrementByOne, reset } from '../../redux/features/counter/counter.slice'
const Counter = () => {
const dispatch = useDispatch()
const {count}=useSelector(state=>state.counter)
const [amount,setAmount]=useState(0)
const addValue =Number(amount)|| 0
const resetAll=()=>{
    setAmount(0)
    dispatch(reset())
}

    return (
    <div>
      <h1>{count}</h1>
      <div>
        <button onClick={()=>dispatch(incrementByOne())}>IncrementByOne</button>
        <button onClick={()=>dispatch(decrementByOne())}>DecrementByOne</button>
        <button onClick={()=>dispatch(reset())}>Reset</button>

      </div>
      <div>
        <button onClick={()=>dispatch(increment(Number(prompt())))}>Increment</button>
        <button onClick={()=>dispatch(decrement(Number(prompt())))}>Decrement</button>
        <button onClick={()=>dispatch(reset())}>Reset</button>

      </div>

      <div>
        <input type='number' value={amount} onChange={(e)=>setAmount(e.target.value)} />
        <div>
        <button  onClick={()=>dispatch(increment(addValue))}>Increment</button>
        <button onClick={()=>dispatch(decrement(addValue))}>Decrement</button>
        <button onClick={resetAll}>Reset</button>

        </div>
      </div>
    </div>
  )
}

export default Counter
