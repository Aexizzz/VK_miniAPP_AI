import "./RowTitle.css"
// Assets
import defaultCover from "../../../assets/default/cover.svg"

type RowTitleProps = {
    type: "Default" | "Plus"
    title: string
    subtitle?: string
    cover?: string
}

export default function RowTitle({
    type,
    title,
    subtitle,
    cover
}: RowTitleProps) {

    const titleSize =
        type == "Default" ? "ttp-Footnote" : "ttp-Footnote-emphaized"

  return (
    <div className={`RowTitle RowTitle-${type}`}>
        <img className="RowTitle-Cover Shadow-Soft" src={cover} alt={title} onError={(e) => { e.currentTarget.src = defaultCover; }} />
        <div className="RowTitleContent">
            <p className="RowTitle-Subtitle ttp-Footnote">{subtitle}</p>
            <p className={`RowTitle-Title ${titleSize}`}>{title}</p>
        </div>
    </div>
  );
}
