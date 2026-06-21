export function RiseLogo({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="24" cy="24" r="24" fill="#0a0a0a" />
      
      {/* Stylized R with upward arrow */}
      <path
        d="M14 34V14h8.5c4.1 0 7 2.9 7 6.5 0 2.8-1.7 5.1-4.2 6.1l5.2 7.4h-5.4l-4.5-6.5H18.5V34H14zm4.5-10.5h3.5c2 0 3.5-1.3 3.5-3s-1.5-3-3.5-3h-3.5v6z"
        fill="#d4a017"
      />
      
      {/* Upward arrow accent */}
      <path
        d="M30 14l4-4 4 4h-2.5v8h-3v-8H30z"
        fill="#e8b923"
      />
      
      {/* Subtle ring */}
      <circle
        cx="24"
        cy="24"
        r="22"
        stroke="#d4a017"
        strokeWidth="1"
        strokeOpacity="0.3"
      />
    </svg>
  )
}
