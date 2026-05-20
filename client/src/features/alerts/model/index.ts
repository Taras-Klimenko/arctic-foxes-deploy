import { Dispatch } from "react";

export type AlertStatusType = 'success' | 'error' | 'info' | 'warning';

export type AlertType = {
    id: number;
    message: string;
    status: AlertStatusType;
}

export type AlertActionType =
    | { type: 'SHOW_SUCCESS', payload: { message: string } }
    | { type: 'SHOW_ERROR', payload: { message: string } }
    | { type: 'SHOW_INFO', payload: { message: string } }
    | { type: 'SHOW_WARNING', payload: { message: string } }
    | { type: 'HIDE_ALERT', payload: { id: number } }
    | { type: 'CLEAR_ALERTS' };


export type AlertStateType = {
    alerts: AlertType[];
}

export type AlertContextType = {
    alerts: AlertType[];
    dispatch: Dispatch<AlertActionType>
}

export const initialAlertState: AlertStateType = {
    alerts: []
}