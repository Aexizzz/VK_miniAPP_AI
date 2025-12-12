import "./Card.css"
import { Link } from "react-router-dom"
// Components
import Button from "../Button/Button";
import ListControl from "../List/ListControls/ListControls"
import ListItem from "../List/llistItem/ListItem"

type CardProps = {
    type: "Default" | "ListItem"
    size: "Small" | "Medium" | "Large"

    title: string
    subtitle?: string

    showIcon?: boolean
    icon?: React.ReactNode

    cover?: string

    showButtons?: boolean
    showSecondaryButton?: boolean
    primaryButtonLabel?: string
    primaryButtonLink? : string
    secondaryButtonLabel?: string
    // ===== ДОБАВЛЕНА ЭТА СТРОКА =====
    onSecondaryClick?: () => void; // <-- Обработчик для кнопки "Не интересно"
    // ==============================

    showCardList?: boolean
    cardListType?: "Rounded" | "Circle" | "Video"
    items?: CardListItem[]

    cardLink?: boolean
    link?: string
}

type CardListItem = {
    id: number
    title: string
    subtitle: string
    cover: string
    avatar?: string
    itemLink: string
}

export default function Card({
    type,
    size,
    title,
    subtitle,
    showIcon,
    icon,
    cover,
    showButtons,
    showSecondaryButton,
    primaryButtonLabel,
    secondaryButtonLabel,
    primaryButtonLink,
    // ===== ДОБАВЛЕНО ЗДЕСЬ =====
    onSecondaryClick, // <-- Деструктуризация пропса
    // =========================
    showCardList,
    cardListType,
    items,
    cardLink,
    link,
}: CardProps) {

    const titleSize =
        size === "Small" ? "ttp-Headline" : size === "Medium" ? "ttp-Title_3-emphaized" : "ttp-Title_2-emphaized";

    const subTitleSize =
        size === "Small" ? "ttp-Caption_1" : size === "Medium" ? "ttp-Subheadline" : "ttp-Body";

    const CardListItemSize =
        size === "Small" ? "Small" : size === "Medium" ? "Medium" : "Large";

  return (
    <div className={`Card Card-${type} Card-${size} Shadow-Soft`}>
        {cardLink && (
            <Link className="Card-Link" to={`${link}`}></Link>
        )}
        
        <div className="Card-Default-Content">
            <div className="Material-Regular"></div>
            { showIcon && (
                <div className="Card-Icon">{icon}</div>
            )}

            <div className="Card-Info">
                <h3 className={`Card-Title ${titleSize}`}>{title}</h3>

                <p className={`Card-Subtitle ${subTitleSize}`}>{subtitle}</p>
            </div>

            {showCardList && (
                <div className="HorList">
                    <ListControl/>
                    <div className="HorList-Scroll">
                        <div className="HorList-Items">
                            {items?.map((item) => (
                                <ListItem
                                    type={cardListType}
                                    size='Medium'
                                    title={item.title}
                                    subtitle={item.subtitle}
                                    avatar={item.avatar}
                                    cover={item.cover}
                                    coverLink={item.itemLink}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {showButtons && (
                <div className="Card-Buttons">
                    <Button 
                        type="Primary"
                        size="Small"
                        label={`${primaryButtonLabel}`}
                        link
                        buttonLink={primaryButtonLink}
                    />

                    {showSecondaryButton && (
                        <Button 
                            type="Secondary"
                            size="Small"
                            label={`${secondaryButtonLabel}`}
                            // ===== ДОБАВЛЕНО ЗДЕСЬ =====
                            onClick={onSecondaryClick} // <-- Передача обработчика
                            // =========================
                        />
                    )}
                </div>
            )}
        </div>

        <div className="Card-ListItem-Content">
            <div className="Material-Regular"></div>
            <ListItem
                type={cardListType}
                size={CardListItemSize}
                title={title}
                subtitle={`${subtitle}`}
                cover={`${cover}`}
            />
        </div>
    </div>
  );
}