import "./ListItem.css"
import { Link } from "react-router-dom"
// Assets
import defaultCover from "../../../assets/default/cover.svg"
import defaultAvatar from "../../../assets/default/avatar.svg"

type ListItemProps = {
  type: "Rounded" | "Circle" | "Video" | React.ReactNode
  size: "Small" | "Medium" | "Large"
  title: string
  subtitle?: string
  cover: string
  avatar?: string
  coverLink?: string
}

export default function ListItem({
    type,
    size,
    title,
    subtitle,
    cover,
    avatar,
    coverLink
}: ListItemProps) {

    const titleSize =
        size === "Small" ? "ttp-Footnote-emphaized" : "ttp-Subheadline-emphaized"

    return (
        <Link to={coverLink ?? "#"} className={`Cover Cover-${type} Cover-${size}`}>
            <img className="Cover-Cover Shadow-Soft" src={cover} alt={title} onError={(e) => { e.currentTarget.src = defaultCover; }}/>
            <div className="Cover-Info">
                <img className="Cover-Info-Avatar" src={avatar} alt={subtitle} onError={(e) => { e.currentTarget.src = defaultAvatar; }}/>
                <div className="Cover-Info-Title">
                    <h6 className={`${titleSize} Cover-Info-Title-Title`}>{title}</h6>
                    <p className="ttp-Caption_1 Cover-Info-Title-Subtitle">{subtitle}</p>
                </div>
            </div>
        </Link>
    );
}
