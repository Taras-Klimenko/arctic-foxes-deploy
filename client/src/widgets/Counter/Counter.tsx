import { useState } from "react";
import "./Counter.css";

type CounterProps = {
  counterName?: string;
};

export default function Counter({ counterName }: CounterProps) {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count === 0) {
      return;
    }
    setCount((current) => current - 1);
  };

  const resetCounter = () => {
    setCount(0);
  };

  return (
    <>
      <h2>{counterName ? counterName + "-счётчик" : ""}</h2>
      <div className="counter-container">
        <div className="counter">{count}</div>
        <div className="counter-controls">
          <button className="increment" onClick={increment}>
            +
          </button>
          <button className="decrement" onClick={decrement}>
            -
          </button>
        </div>
        <button className="reset" onClick={resetCounter}>
          сброс
        </button>
      </div>
    </>
  );
}
