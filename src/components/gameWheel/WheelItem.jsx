import styles from "./gameWheelStyles.module.css";

export default function WheelItem({ children, index = 0, total = 4, color }) {
  const angle = 360 / total;
  const rotateDeg = index * angle;
  return (
    <div
      className={styles.wheelItem}
      style={{
        transform: `rotate(${rotateDeg}deg)`,
        backgroundColor: color || "#a22a58",
      }}
    >
      <div
        className={styles.textWheelItem}
        
      >
        {children}
      </div>
    </div>
  );
}