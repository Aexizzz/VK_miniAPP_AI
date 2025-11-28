import "./StatisticCard.css"

type StatisticCardProps = {
  title: string
  subtitle?: string

}

export default function StatisticCard({
  title,
  subtitle
}: StatisticCardProps) {
  return (
    <div className="StatisticCard Shadow-Soft">
        <div className="StatisticCard-Content">
            
        </div>
        <div className="StatisticCard-Info">
            <h5 className="StatisticCard-Info-Title ttp-Headline">{title}</h5>
            <h6 className="StatisticCard-Info-Subtitle ttp-Subheadline">{subtitle}</h6>
        </div>
    </div>
  );
}
