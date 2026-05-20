"use client";

import { ReactNode, useReducer } from "react";
import {
  initialTaskState,
  NewTaskDataType,
  TaskActionType,
  TaskContextType,
  TaskStateType,
} from "../model";
import TaskApi from "../api/TaskApi";
import { TaskContext } from "../context/TaskContext";

function taskReducer(
  state: TaskStateType,
  action: TaskActionType,
): TaskStateType {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    case "CLEAR_ERROR":
      return { ...state, error: null };

    case "SET_TASKS":
      return { ...state, tasks: action.payload };

    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task,
        ),
      };

    default:
      return state;
  }
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  async function getTasks() {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const { statusCode, data } = await TaskApi.getAllTasks();

      if (statusCode === 200) {
        dispatch({ type: "SET_TASKS", payload: data });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: (error as Error).message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  async function addTask(task: NewTaskDataType) {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const { statusCode, data } = await TaskApi.createTask(task);

      if (statusCode === 201) {
        dispatch({ type: "ADD_TASK", payload: data });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: (error as Error).message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  async function deleteTask(id: number) {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const { statusCode } = await TaskApi.deleteTask(id);

      if (statusCode === 200) {
        dispatch({ type: "DELETE_TASK", payload: id });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: (error as Error).message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  async function updateTask(id: number, task: NewTaskDataType) {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const { statusCode, data } = await TaskApi.updateTask(id, task);
      if (statusCode === 200) {
        dispatch({ type: "UPDATE_TASK", payload: data });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: (error as Error).message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  const contextValue: TaskContextType = {
    state,
    dispatch,
    getTasks,
    addTask,
    deleteTask,
    updateTask,
  };

  return (
    <TaskContext.Provider value={contextValue}>
      {children}</TaskContext.Provider>
  );
}
