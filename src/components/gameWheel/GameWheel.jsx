import React, { useRef, useState, useEffect, useContext } from "react";
import WheelItem from "./WheelItem.jsx";
import styles from "./gameWheelStyles.module.css";
import { GlobalContext } from "../../context/GlobalContext.jsx";

export function GameWheel({ items = null }) {

  const {setWheelRasult} =useContext(GlobalContext)

  // Default items con colores (puedes pasar items por props si quieres)
  const defaultItems = [
    { label: "reto", color: "var(--main-color-2)" },
    { label: "verdad", color: "var(--main-color-1)" },
    { label: "premio", color: "var(--main-color-2)" },
    { label: "castigo", color: "var(--main-color-1)" },
    
  ];
  const slices = items ?? defaultItems;

  const TRANS_MS = 3000; // duración de la animación (ms) -> coincide con CSS por defecto

  const [rotation, setRotation] = useState(0); // grados acumulados (puede ser grande)
  const [isSpinning, setIsSpinning] = useState(false);
  const [tickActive, setTickActive] = useState(false);

  const wheelRef = useRef(null);
  const rotationRef = useRef(rotation);      // lectura inmediata del valor aplicado
  const prevRotationRef = useRef(0);         // para calcular crossing segments
  const tickTimerRef = useRef(null);         // guarda setInterval id

  useEffect(() => { rotationRef.current = rotation; }, [rotation]);

  // Lee el ángulo real (0..360) desde la matrix CSS del elemento
  function getRotationDegreesFromElement(el) {
    if (!el) return 0;
    const st = window.getComputedStyle(el);
    const tr = st.transform || st.webkitTransform;
    if (!tr || tr === "none") return 0;

    // matrix(a, b, c, d, tx, ty)  -> angle = atan2(b, a)
    const mat = tr.match(/matrix(3d)?\((.+)\)/);
    if (!mat) return 0;
    const values = mat[2].split(",").map(v => parseFloat(v.trim()));
    // tanto matrix como matrix3d ponen a = values[0], b = values[1]
    const a = values[0];
    const b = values[1];
    let angle = Math.atan2(b, a) * (180 / Math.PI);
    if (angle < 0) angle += 360;
    return angle % 360;
  }

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    // Preparar valores previos
    prevRotationRef.current = rotationRef.current;

    // Cantidad aleatoria de giro (mínimo 2 vueltas + aleatorio)
    const extra = Math.floor(Math.random() * 3600) + 720;
    const newRotation = rotationRef.current + extra;

    // Aseguramos que transition (isSpinning=true) se aplique primero,
    // luego en el siguiente frame cambiamos la rotación para que haya animación.
    requestAnimationFrame(() => {
      // programar la rotación (esto hará que la rueda se anime)
      setRotation(newRotation);
      rotationRef.current = newRotation;
    });

    // Simulación de ticks visuales (opcional, solo visual)
    const segmentAngle = 360 / slices.length;
    const segmentsToCross = Math.max(
      1,
      Math.floor((newRotation - prevRotationRef.current) / segmentAngle)
    );
    // intervalo entre ticks, limitado para no ser demasiado rápido/lento
    const rawInterval = TRANS_MS / segmentsToCross;
    const tickInterval = Math.min(Math.max(rawInterval, 30), 250);

    // Limpiamos timer anterior si existe
    if (tickTimerRef.current) {
      clearInterval(tickTimerRef.current);
      tickTimerRef.current = null;
    }

    let tickCount = 0;
    tickTimerRef.current = setInterval(() => {
      setTickActive(true);
      setTimeout(() => setTickActive(false), 80);
      tickCount++;
      if (tickCount >= segmentsToCross) {
        clearInterval(tickTimerRef.current);
        tickTimerRef.current = null;
      }
    }, tickInterval);
  };

  const handleTransitionEnd = () => {
    // Asegurar limpieza de tick timer
    if (tickTimerRef.current) {
      clearInterval(tickTimerRef.current);
      tickTimerRef.current = null;
      setTickActive(false);
    }

    // Desactivar estado de giro
    setIsSpinning(false);

    // Leer ángulo final real aplicado por el navegador (0..360)
    const degrees = getRotationDegreesFromElement(wheelRef.current);

    // Calcular índice ganador (centrando en mitad de segmento para evitar errores en bordes)
    const segmentAngle = 360 / slices.length;
    const target = (360 - degrees + segmentAngle / 2) % 360;
    const index = Math.floor(target / segmentAngle) % slices.length;
    const selected = slices[index];

    // Opcional: puedes actualizar un estado con el resultado en vez de alert
    // console.log({ degrees: degrees.toFixed(2), index, selected });
    if((selected.label  == "castigo" || selected.label == "reto" || selected.label == "premio" || selected.label == "verdad")){
     
       setWheelRasult(selected.label)
    }
    
  };

  // Cleanup de timers al desmontar
  useEffect(() => {
    return () => {
      if (tickTimerRef.current) clearInterval(tickTimerRef.current);
    };
  }, []);

  return (
    <div className={styles.containerGameWheel}>
      <div
        ref={wheelRef}
        className={styles.wheel}
        onClick={spin}
        onTransitionEnd={handleTransitionEnd}
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning ? `transform ${TRANS_MS / 1000}s cubic-bezier(0.2, 0.1, 0.10, 1)` : "none",
          cursor: isSpinning ? "wait" : "pointer",
        }}
      >
        {slices.map((s, i) => (
          <WheelItem
            key={i}
            index={i}
            total={slices.length}
            color={s.color}
          >
            {s.label}
          </WheelItem>
        ))}
      </div>
      <div className={styles.wheelCenter}><h4>GIRAR</h4></div>

      <div className={styles.containerSelectorPoint}>
        <div className={`${styles.selectorPoint} ${tickActive ? styles.tick : ""}`} />
      </div>
    </div>
  );
}
