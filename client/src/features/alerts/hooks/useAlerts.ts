import { useContext } from "react";
import { AlertContext } from "../context/AlertContext";


export function useAlerts() {

    const context = useContext(AlertContext);

    if (!context) {
        throw new Error('useAlerts должен использоваться внутри AlertProvider');
    }

    return context;
}