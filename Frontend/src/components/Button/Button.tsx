import { Link } from "react-router-dom";
import "./Button.css";

type ButtonProps = {
  type: "Primary" | "Secondary" | "Tertiary" | "Outlined";
  size: "Small" | "Medium" | "Large";
  label: string;
  showIcon?: boolean;
  icon?: React.ReactNode;
  
  // Для обычных кнопок
  onClick?: () => void; // <-- ДОБАВЛЯЕМ ЭТОТ ПРОПС
  
  // Для ссылок
  link?: boolean;
  buttonLink?: string;
};

export default function Button({
  type,
  size,
  label,
  showIcon,
  icon,
  onClick, // <-- ДЕСТРУКТУРИРУЕМ
  link,
  buttonLink
}: ButtonProps) {
  const textClass = size === "Large" ? "ttp-Body" : "ttp-Subheadline";

  // ===== ИСПРАВЛЯЕМ АРХИТЕКТУРУ: РАЗДЕЛЯЕМ ССЫЛКИ И КНОПКИ =====
  if (link && buttonLink) {
    return (
      <Link 
        to={buttonLink} 
        className={`Btn-Type-${type} Btn-Size-${size} Button-Link`}
      >
        {showIcon && <div className="Btn-Icon">{icon}</div>}
        <span className={textClass}>{label}</span>
      </Link>
    );
  }

  return (
    <button 
      className={`Btn-Type-${type} Btn-Size-${size}`} 
      onClick={onClick} // <-- ПОДКЛЮЧАЕМ ОБРАБОТЧИК
    >
      {showIcon && <div className="Btn-Icon">{icon}</div>}
      <span className={textClass}>{label}</span> {/* ЗАМЕНЯЕМ <p> НА <span> */}
    </button>
  );
}