import "./Row.css"
import { Link } from "react-router-dom"
// Components
import Switch from "../../Switch/Switch" // Ваш существующий Switch
// Icons
import { Icon24ChevronRightOutline } from "@vkontakte/icons"

type RowProps = {
    type: "Default" | "Button"

    showIcon?: boolean
    icon?: React.ReactNode

    title: string

    showTrailing?: boolean
    trailingType?: "Switch" | "Detail" | "Disclosure"
    // ===== ИЗМЕНЕНИЕ: ДОБАВЛЯЕМ switchId =====
    switchId?: string; // Уникальный ID для сохранения
    switchDefaultChecked?: boolean
    switchOnToggle?: (checked: boolean) => void;
    // =====================================
    detailInfo?: string

    rowLink?: string
}


export default function Row({
    type,
    showIcon,
    icon,
    title,
    showTrailing,
    trailingType,
    switchId, // <-- НОВЫЙ ПРОПС
    switchDefaultChecked,
    switchOnToggle,
    detailInfo,
    rowLink
}: RowProps) {

  return (
    <div className={`Row Row-${type}`}>
        {showIcon && (
            <div className="Row-Icon">
                {icon}
            </div>
        )}

        <div className="Row-Content">
            <p className="Row-Content-Title">{title}</p>

            {showTrailing && (
                <div className={`Row-Trailing Row-Trailing-Type-${trailingType}`}>
                    <Link className="Row-Link" to={rowLink ?? "#"}></Link>

                    {trailingType === "Switch" && (
                      // ===== ИЗМЕНЕНИЕ: ПЕРЕДАЕМ switchId =====
                      <div className="Row-Trailing-Switch">
                        <Switch 
                          id={switchId} // <-- КЛЮЧЕВОЙ МОМЕНТ
                          defaultChecked={switchDefaultChecked}
                          onToggle={switchOnToggle}
                        />
                      </div>
                    )}

                    {trailingType === "Disclosure" && (
                      <div className="Row-Trailing-Disclosure">
                        <Icon24ChevronRightOutline/>
                      </div>
                    )}

                    {trailingType === "Detail" && (
                      <div className="Row-Trailing-Detail">
                        <p className="ttp-Body">{detailInfo}</p>
                        <Icon24ChevronRightOutline/>
                      </div>
                    )}
                </div>
            )}
        </div>
    </div>
  );
}