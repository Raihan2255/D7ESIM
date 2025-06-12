type Props = {
  value: number; // current step
  total?: number; // total steps
  label?: string; // optional top label (e.g. "Status")
  progressColor?: string; // Tailwind class or HEX (e.g. "text-blue-600" or "#1D4ED8")
  trackColor?: string; // Tailwind class or HEX (e.g. "text-blue-100" or "#DBEAFE")
}

export default function CircularProgress({ total = 100, value, progressColor = "#1D4ED8", trackColor = "#DBEAFE" }: Props) {
  const radius = 50;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = (value / total) * circumference;
  const strokeDashoffset = circumference - progress;

  return (
    <div className="flex items-center justify-center">
      <svg height={radius * 2} width={radius * 2} className="block">
        {/* Background track */}
        <circle
          stroke={trackColor}
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Progress ring */}
        <circle
          stroke={progressColor}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          transform={`rotate(-90 ${radius} ${radius})`}
        />
        {/* Value */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          className="fill-black text-[14px] font-semibold"
          dy=".3em"
        >
          {value}%
        </text>
      </svg>
    </div>
  )
}