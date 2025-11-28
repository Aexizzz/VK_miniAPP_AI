import "./NavigationBar.css"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
// Icons
import { Icon24ChevronLeftOutline } from "@vkontakte/icons"

type NavBarProps = {
  title: string
}

export default function NavigationBar({ title,}: NavBarProps) {
    // Для возвращения на пред. страницу
    const navigate = useNavigate();

    return (
        <header className="NavBar">
            <div className="NavBar-Content">
                <div className="NavBar-Leading">
                    <Link to="#" onClick={(e) => { e.preventDefault(); navigate(-1); }} className="NavBar-Leading-BackButton Shadow-Soft Blur-Thin">
                        <div className="Material-Chrome"></div>
                        <Icon24ChevronLeftOutline className="NavBar-Leading-BackButton-Icon"/>
                        <p className="ttp-Callout">Назад</p>
                    </Link>
                </div>

                <h5 className="NavBar-Title">{title}</h5>

                <div className="NavBar-Margin"></div>
            </div>
        </header>
    );
}
