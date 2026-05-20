"use client";
import Counter from "@/widgets/Counter/Counter";
import { useAlerts } from "@/features/alerts";
import { useTasks } from "@/entities/task";
import { useAppSelector } from "@/shared/hooks/useReduxHooks";
import { useRouter } from "next/navigation";
import { CLIENT_ROUTES } from "@/shared/consts/clientRouts";
import { useEffect } from "react";

export default function CounterPage() {
  const { dispatch } = useAlerts();

  const router = useRouter();

  const { user, isInitialized } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (isInitialized && !user) {
      router.replace(CLIENT_ROUTES.AUTH);
    }
  }, [isInitialized, user]);

  const { state } = useTasks();
  console.log(state.tasks);

  if (!isInitialized) {
    return null;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="app-container">
      <Counter counterName={"Биба"} />
      <Counter counterName={"Лупа"} />
      <Counter />

      <button
        onClick={() =>
          dispatch({ type: "SHOW_SUCCESS", payload: { message: "Успешно!" } })
        }
      >
        Успешно
      </button>
      <button
        onClick={() =>
          dispatch({ type: "SHOW_ERROR", payload: { message: "Ошибка!" } })
        }
      >
        Ошибка
      </button>
      <button
        onClick={() =>
          dispatch({
            type: "SHOW_WARNING",
            payload: { message: "Предупреждение!" },
          })
        }
      >
        Предупреждение
      </button>
      <button
        onClick={() =>
          dispatch({ type: "SHOW_INFO", payload: { message: "Информация!" } })
        }
      >
        Информация
      </button>
    </div>
  );
}
