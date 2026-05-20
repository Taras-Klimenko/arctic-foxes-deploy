import { useState, useEffect, useRef } from "react";
import { Play, Pause, TimerReset } from "lucide-react";
import "./Timer.css";

export default function Timer({ duration = 60 }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Параметры окружности
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / duration) * circumference;

  // Запустить таймер
  const startTimer = () => {
    if (isRunning) return;
    setIsRunning(true);
  };

  // Пауза
  const pauseTimer = () => {
    setIsRunning(false);
  };

  // Сброс
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(duration);
  };

  // Интервал таймера
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => Math.max(prev - 1, 0));
      }, 1000);
    }

    return () => {
      // console.log('Компонент покинул DOM');
      clearInterval(timerRef.current);
    };
  }, [isRunning]);

  // Останавливаем, когда дошли до нуля
  useEffect(() => {
    if (timeLeft === 0) {
      setIsRunning(false);
      clearInterval(timerRef.current);
    }
  }, [timeLeft]);

  return (
    <div className="timer-container">
      <svg className="timer-ring" width="150" height="150">
        <circle className="timer-ring-bg" cx="75" cy="75" r={radius} />
        <circle
          className={
            timeLeft <= 10
              ? "timer-ring-progress running-out"
              : "timer-ring-progress"
          }
          cx="75"
          cy="75"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
        />
      </svg>
      <div className="timer-value">{timeLeft}</div>

      <div className="timer-controls">
        {!isRunning ? (
          <button onClick={startTimer}>
            <Play fill="white"></Play>
          </button>
        ) : (
          <button onClick={pauseTimer}>
            <Pause fill="white"></Pause>
          </button>
        )}
        <button onClick={resetTimer}>
          <TimerReset></TimerReset>
        </button>
      </div>
    </div>
  );
}
