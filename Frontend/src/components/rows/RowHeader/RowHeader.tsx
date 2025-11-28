import "./RowHeader.css"

type RowHeaderProps = {
    title: string
    subtitle: string
    showIcon?: boolean
    Icon?: React.ReactNode
}

export default function RowHeader({
    title,
    subtitle,
    showIcon,
    Icon
}: RowHeaderProps) {

  return (
    <div className="Row-Header">
        {showIcon &&(
            <div className="Row-Header-Icon">
                {Icon}
            </div>
        )}
        <div className="Row-Header-Info">
            <h3 className="ttp-Title_2-emphaized Row-Header-Info-Title">{title}</h3>
            <p className="ttp-Body Row-Header-Info-Subtitle">{subtitle}</p>
        </div>
    </div>
  );
}
