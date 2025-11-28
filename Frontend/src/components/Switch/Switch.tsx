import "./Switch.css"
import { useState, useEffect } from "react"

type SwitchProps = {
  defaultChecked?: boolean;
  onToggle?: (checked: boolean) => void;
  // ===== ДОБАВЛЯЕМ НОВЫЙ ПРОПС =====
  id?: string; // Уникальный ID для сохранения
  // ===============================
};

export default function Switch({ 
  defaultChecked = false, 
  onToggle,
  id // <-- ПОЛУЧАЕМ ID
}: SwitchProps) {
  // ===== ЛОГИКА СОХРАНЕНИЯ В localStorage =====
  const [isOn, setIsOn] = useState(() => {
    if (id) {
      const saved = localStorage.getItem(`rec_${id}`);
      return saved !== null ? JSON.parse(saved) : defaultChecked;
    }
    return defaultChecked;
  });

  useEffect(() => {
    if (id) {
      localStorage.setItem(`rec_${id}`, JSON.stringify(isOn));
    }
  }, [id, isOn]);
  // ========================================

  const handleChange = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    if (onToggle) onToggle(newValue);
  };

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={isOn}
        onChange={handleChange}
        aria-label={id ? `Toggle ${id}` : "Toggle switch"}
      />
      <span className="slider"></span>
    </label>
  );
}