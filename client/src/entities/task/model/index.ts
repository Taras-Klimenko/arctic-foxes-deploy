import { Dispatch } from "react";

export type TaskType = {
    id: number;
    title: string;
    text: string;
    user_id: number;
    createdAt: string;
    updatedAt: string;
}

export type NewTaskDataType = {
    title: string;
    text: string;
}

export type TaskStateType = {
    tasks: TaskType[];
    isLoading: boolean;
    error: string | null;
}

export type TaskActionType =
    | { type: "SET_LOADING", payload: boolean }
    | { type: "SET_ERROR", payload: string | null }
    | { type: "CLEAR_ERROR" }
    | { type: "SET_TASKS", payload: TaskType[] }
    | { type: "ADD_TASK", payload: TaskType }
    | { type: "DELETE_TASK", payload: number }
    | { type: "UPDATE_TASK", payload: TaskType }

export type TaskContextType = {
    state: TaskStateType;
    dispatch: Dispatch<TaskActionType>
    getTasks: () => Promise<void>
    addTask: (task: NewTaskDataType) => Promise<void>
    deleteTask: (id: number) => Promise<void>
    updateTask: (id: number, task: NewTaskDataType) => Promise<void>
}

export const initialTaskState: TaskStateType = {
    tasks: [],
    isLoading: false,
    error: null
}