"use client";
import { ReactNode, useReducer } from "react";
import { AlertContext } from "../context/AlertContext";
import {
  AlertStateType,
  AlertActionType,
  initialAlertState,
  AlertContextType,
} from "../model";

function alertReducer(
  state: AlertStateType,
  action: AlertActionType,
): AlertStateType {
  switch (action.type) {
    case "SHOW_SUCCESS":
      return {
        ...state,
        alerts: [
          ...state.alerts,
          {
            id: Date.now(),
            message: action.payload.message,
            status: "success",
          },
        ],
      };

    case "SHOW_ERROR":
      return {
        ...state,
        alerts: [
          ...state.alerts,
          { id: Date.now(), message: action.payload.message, status: "error" },
        ],
      };

    case "SHOW_INFO":
      return {
        ...state,
        alerts: [
          ...state.alerts,
          { id: Date.now(), message: action.payload.message, status: "info" },
        ],
      };
    case "SHOW_WARNING":
      return {
        ...state,
        alerts: [
          ...state.alerts,
          {
            id: Date.now(),
            message: action.payload.message,
            status: "warning",
          },
        ],
      };

    case "HIDE_ALERT":
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.id !== action.payload.id),
      };

    case "CLEAR_ALERTS":
      return { ...state, alerts: [] };

    default:
      return state;
  }
}

export function AlertProvider({ children }: { children: ReactNode }) {
  // const [state, setState ] = useState(initialValue)

  const [state, dispatch] = useReducer(alertReducer, initialAlertState);

  const contextValue: AlertContextType = {
    alerts: state.alerts,
    dispatch,
  };

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
    </AlertContext.Provider>
  );
}
