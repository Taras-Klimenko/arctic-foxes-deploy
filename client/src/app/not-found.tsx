import React from "react";
import Link from "next/link";
import "./not-found.css";

export default function NotFoundPage() {
  return (
    <section className="page_404 app-container">
      <h1 className="four_zero_title">404</h1>
      <div className="four_zero_four_bg"></div>

      <div className="contant_box_404">
        <p>Страница не найдена</p>

        <Link className="navlink" href="/">
          Назад
        </Link>
      </div>
    </section>
  );
}
