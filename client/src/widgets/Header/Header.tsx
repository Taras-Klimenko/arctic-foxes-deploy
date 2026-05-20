import React from "react";
import Link from "next/link";
import "./Header.css";
import { useAppDispatch } from "@/shared/hooks/useReduxHooks";
import { logoutThunk } from "@/entities/user/api/UserApiThunk";
import { useAppSelector } from "@/shared/hooks/useReduxHooks";
import { useRouter } from "next/navigation";
import { CLIENT_ROUTES } from "@/shared/consts/clientRouts";

export default function Header() {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
  async function handleLogout() {
    dispatch(logoutThunk());
    router.replace(CLIENT_ROUTES.AUTH);
  }

  return (
    <header>
      <nav>
        <Link href={CLIENT_ROUTES.HOME} className="navlink">
          Домашняя
        </Link>
        <Link href={CLIENT_ROUTES.TASKS} className="navlink">
          Задачи
        </Link>
        <Link href={CLIENT_ROUTES.COUNTER} className="navlink">
          Микроволновки
        </Link>
        <Link href={CLIENT_ROUTES.TIMER} className="navlink">
          Таймер
        </Link>
        <Link href={CLIENT_ROUTES.CHAT} className="navlink">
          Чат
        </Link>
        {user?.id ? (
          <>
            <Link
              href={CLIENT_ROUTES.AUTH}
              className="navlink"
              onClick={handleLogout}
            >
              Выход
            </Link>
            <p>{user.name}</p>
          </>
        ) : (
          <Link href={CLIENT_ROUTES.AUTH} className="navlink">
            Вход
          </Link>
        )}
      </nav>
    </header>
  );
}
