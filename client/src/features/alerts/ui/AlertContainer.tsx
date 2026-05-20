"use client";
import { useEffect, useState } from "react";
import { AlertType } from "../model";
import { useAlerts } from "../hooks/useAlerts";
import styles from "./AlertContainer.module.css";

function AlertItem({ alert }: { alert: AlertType }) {
  const { dispatch } = useAlerts();

  const [isOut, setIsOut] = useState(false);

  useEffect(() => {
    setIsOut(true);

    const timer = setTimeout(() => {
      setIsOut(false);
    }, 2700);

    const removeTimer = setTimeout(() => {
      dispatch({ type: "HIDE_ALERT", payload: { id: alert.id } });
    }, 3100);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [alert.id]);

  return (
    <div
      className={`${styles.alert} ${styles[alert.status]} ${isOut ? styles.enter : styles.exit}`}
    >
      <span>{alert.message}</span>
    </div>
  );
}

export function AlertContainer() {
  const { alerts } = useAlerts();

  return (
    <div className={styles.container}>
      {alerts.map((alert) => (
        <AlertItem alert={alert} key={alert.id} />
      ))}
    </div>
  );
}
