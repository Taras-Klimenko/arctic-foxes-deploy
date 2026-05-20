"use client";
import React, { useCallback, useEffect, useState } from "react";
import "./page.css";
import TaskCard from "@/entities/task/ui/TaskCard/TaskCard";
import { useTasks } from "@/entities/task";
import { useAppSelector } from "@/shared/hooks/useReduxHooks";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskSchema, taskSchema } from "@/entities/task/model/taskSchema";

export default function TasksPage() {
  const { state, getTasks, addTask } = useTasks();
  const { tasks } = state;

  const { user } = useAppSelector((state) => state.user);

  // const [newTask, setNewTask] = useState({ title: "", text: "" });

  // function handleNewTask(event: React.ChangeEvent<HTMLInputElement>) {
  //   setNewTask((current) => ({
  //     ...current,
  //     [event.target.name]: event.target.value,
  //   }));
  // }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    mode: "onChange",
    defaultValues: { title: "", text: "" },
  });

  useEffect(() => {
    getTasks();
  }, []);

  // useEffect(() => {}, []) - пустой массив зависимостей, callback в useEffect отработает один единственный раз, при загрузке нашего компонента
  // useEffect(() => {}) - без массива зависимостей - callback срабатывает при каждом изменении состояния
  // useEffect(() => {}, [state]) - callback в useEffect отработает каждый раз, при изменении в массиве зависимостей
  // callback в useEffect может возвращать функцию очистки, которая выполнится при размонтировании компонента (когда компонент покинет DOM)

  // async function addNewTask(event: React.SubmitEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   await addTask(newTask);
  //   setNewTask({ title: "", text: "" });
  // }

  const onSubmit: SubmitHandler<TaskSchema> = async (data) => {
    await addTask(data);
    reset();
  };

  return (
    <div className="app-container">
      <div className="task-form">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <input type="text" {...register("title")} />
          {errors.title && <p>{errors.title.message}</p>}
          <input type="text" {...register("text")} />
          {errors.text && <p>{errors.text.message}</p>}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Создание..." : "Создать"}
          </button>
        </form>
      </div>
      <div className="todo-container">
        {tasks.map((task) => (
          <TaskCard user={user} key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
