import React, { useMemo, useState } from "react";
import "./TaskCard.css";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import { Trash, Pencil, ChevronRight, X, Check, Bot } from "lucide-react";
import { axiosInstance } from "@/shared/lib/axiosInstance";
import { useTasks } from "../../hooks/useTasks";
import Spinner from "@/shared/ui/Spinner/Spinner";
import { TaskType } from "../../model";
import { UserType } from "@/entities/user/model";

const ReactMarkdown = dynamic(() => import("react-markdown"), { ssr: false, loading: () => <Spinner/> });

// по умолчнию - eager loading (загружаем всё сразу), ленивая загрузка - lazy loading (загружаем только когда нужно)
type TaskCardProps = {
  task: TaskType;
  user: UserType | null;
}

function TaskCard({ task, user }: TaskCardProps) {
  const router = useRouter();

  const [edit, setEdit] = useState(false);
  const [aiPlan, setAiPlan] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({
    title: task.title,
    text: task.text,
  });

  const { deleteTask, updateTask } = useTasks();

  function inputHandler(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setUpdatedTask((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  async function updateHandler(id:number) {
    await updateTask(id, updatedTask);

    setEdit(false);
  }

  const calculateDate = useMemo(() => {
    return new Date(task.createdAt).toLocaleString("ru-RU");
  }, [task.createdAt])

  async function getAiPlan() {
    setAiLoading(true);
    const { data } = await axiosInstance.post("/ai/generate", {
      title: task.title,
      text: task.text,
    });
    if (data.statusCode === 200) {
      setAiPlan(data.data);
    }
    setAiLoading(false);
  }

  return (
    <div className="task">
      <div className="task-title">
        {edit ? (
          <input
            type="text"
            name="title"
            className="task-title-input"
            value={updatedTask.title}
            onChange={inputHandler}
          />
        ) : (
          <h2 className="task-name">{task.title}</h2>
        )}
        <small>Добавлено: {calculateDate}</small>
      </div>

      <div className="task-content">
        {edit ? (
          <textarea
            rows={2}
            cols={55}
            name="text"
            className="task-text-input"
            value={updatedTask.text}
            onChange={inputHandler}
          />
        ) : (
          <p className="task-text">{task.text}</p>
        )}

        <div className="task-controls">
          {user?.id === task.user_id ? (
            edit ? (
              <>
                <button
                  className="task-control-button save-task-button"
                  title="Сохранить"
                  onClick={() => updateHandler(task.id)}
                >
                  <Check color="white" />
                </button>
                <button
                  onClick={() => {
                    setEdit(false);
                  }}
                  className="task-control-button delete-task-button"
                  title="Отменить"
                >
                  <X color="white" />
                </button>
              </>
            ) : (
              <>
                <button
                  className="edit-task-button task-control-button"
                  title="Редактировать"
                  onClick={() => setEdit(true)}
                >
                  <Pencil color="white" />
                </button>
                <button
                  className="delete-task-button task-control-button"
                  onClick={() => deleteTask(task.id)}
                  title="Удалить"
                >
                  <Trash color="white" />
                </button>
                <button
                  className="task-control-button details-button"
                  onClick={() => router.push(`/tasks/${task.id}`)}
                  title="Подробнее"
                >
                  <ChevronRight />
                </button>
              </>
            )
          ) : (
            <>
              <button
                className="task-control-button details-button"
                onClick={() => router.push(`/tasks/${task.id}`)}
                title="Подробнее"
              >
                <ChevronRight />
              </button>
              <button
                className="task-control-button ai-button"
                onClick={getAiPlan}
                title="Генерировать план выполнения задачи"
              >
                <Bot color="black" />
              </button>
            </>
          )}
        </div>
      </div>
      {aiLoading && <Spinner />}
      {aiPlan && !aiLoading && (
        <div className="plan">
          <h3>План выполнения задачи</h3>
          <ReactMarkdown>{aiPlan}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default React.memo(TaskCard);
