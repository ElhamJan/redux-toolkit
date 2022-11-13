import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../features/counter/CounterSlice";

const CounterComponent = () => {
  const [inputVal, setInputVal] = useState("");

  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter state</h1>
      <h2>Counter: {counter.value}</h2>
      <input
        type="text"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      />
      <button onClick={() => dispatch(increment(Number(inputVal) || 1))}>
        +
      </button>
      <button onClick={() => dispatch(decrement(Number(inputVal) || 1))}>
        -
      </button>
    </div>
  );
};

export default CounterComponent;
