import "./ListControls.css"
import { useEffect, useRef } from "react"
// Icons
import {
  Icon24ChevronLeftOutline,
  Icon24ChevronRightOutline,
} from "@vkontakte/icons"

export default function ListControl() {
  const controlRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const control = controlRef.current;
    if (!control) return

    // Находим ближайший родительский блок .HorList
    const horList = control.closest(".HorList")
    if (!horList) return

    // Находим саму прокручиваемую область
    const scrollContainer = horList.querySelector<HTMLDivElement>(".HorList-Scroll")
    if (!scrollContainer) return;

    const prevBtn = control.querySelector<HTMLButtonElement>(".HorList-Btn-Prev")
    const nextBtn = control.querySelector<HTMLButtonElement>(".HorList-Btn-Next")

    if (!prevBtn || !nextBtn) return

    const scrollAmount = 300;

    const handlePrev = () => {
      scrollContainer.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    };

    const handleNext = () => {
      scrollContainer.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    };

    prevBtn.addEventListener("click", handlePrev)
    nextBtn.addEventListener("click", handleNext)

    // Очистка при размонтировании
    return () => {
      prevBtn.removeEventListener("click", handlePrev)
      nextBtn.removeEventListener("click", handleNext)
    };
  }, []);

  return (
    <div className="HorList-Controls" ref={controlRef}>
      <button className="HorList-Btn HorList-Btn-Prev Shadow-Regular">
        <Icon24ChevronLeftOutline />
      </button>

      <button className="HorList-Btn HorList-Btn-Next Shadow-Regular">
        <Icon24ChevronRightOutline />
      </button>
    </div>
  );
}
