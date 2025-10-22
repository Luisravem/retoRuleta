import { useContext, useEffect } from "react";
import gameOutcomeStayles from "./gameOutcome.module.css";
import { GlobalContext } from "../../context/GlobalContext";

export function GameOutcome() {
  const { resultData, setWheelRasult } = useContext(GlobalContext);
  console.log("ejecutando desde gameOut", resultData)
  return (
    <section className={gameOutcomeStayles.section}>
      <div className={gameOutcomeStayles.section__container}>
        <header className={gameOutcomeStayles.container__header}>
          <strong className={gameOutcomeStayles.header__strong}>
            categoria:{" "}
            <span>
              {resultData.categoria_id == 1
                ? "amigos"
                : resultData.categoria_id == 1
                ? "pareja"
                : resultData.categoria_id}
            </span>
          </strong>
          <strong className={gameOutcomeStayles.header__strong}>
            dificultad:{" "}
            <span>
              {resultData.nivel_id == 1
                ? "suave"
                : resultData.nivel_id == 2
                ? "medio"
                : resultData.nivel_id == 3
                ? "extremo"
                : resultData.nivel_id}
            </span>
          </strong>
          <strong className={gameOutcomeStayles.header__strong}>
            modo: <span>{resultData.tipo}</span>
          </strong>
        </header>
        <h2 className={gameOutcomeStayles.container__title}>
          {resultData.title}:
        </h2>
        <p className={gameOutcomeStayles.container__description}>
          {resultData.description}
        </p>
        <div className={gameOutcomeStayles.container__containerButton}>
          <button className={gameOutcomeStayles.containerButton__button}>
            aceptar
          </button>
          <button
            className={gameOutcomeStayles.containerButton__button}
            onClick={() => {
              setWheelRasult(false);
            }}
          >
            rechazar
          </button>
        </div>
      </div>
    </section>
  );
}
