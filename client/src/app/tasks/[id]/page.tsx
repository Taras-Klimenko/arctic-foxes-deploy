"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import TaskApi from "@/entities/task/api/TaskApi";
import { TaskType } from "@/entities/task/model";

export default function OneTaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState<TaskType | null>(null);
  const router = useRouter();

  async function fetchTask() {
    const { data } = await TaskApi.getOneTask(Number(id));
    setTask(data);
  }

  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <div className="app-container">
      <h2>{task?.title}</h2>
      <p>{task?.text}</p>
      <button onClick={() => router.back()}>Назад</button>
    </div>
  );
}
