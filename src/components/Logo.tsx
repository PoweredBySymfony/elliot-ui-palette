interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ className = "", size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      className={`${sizeClasses[size]} ${className}`}
    >
      {/* Main qui fait coucou (couleur orange) */}
      <g fill="#EC7D24" stroke="none">
        <path d="M2 15c0-1.1.9-2 2-2h1m0 0c.6 0 1 .4 1 1v3c0 .6-.4 1-1 1H4c-1.1 0-2-.9-2-2v-1z"/>
        <path d="M0 13.5c.8.8 1.5 1 2 1" stroke="#EC7D24" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M0 15.5c.8-.8 1.5-1 2-1" stroke="#EC7D24" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      </g>
      {/* Tête du robot (couleur bleue) */}
      <g fill="#004380" stroke="none">
        <rect x="5" y="5" width="14" height="10" rx="3"/>
        <path d="M5 10h14" stroke="#FFF" strokeWidth="0.5"></path>
        {/* Oeil (couleur orange) */}
        <circle cx="12" cy="10" r="2.5" fill="#FFF"></circle>
        <circle cx="12" cy="10" r="1" fill="#EC7D24"></circle>
        {/* Antenne */}
        <line x1="12" y1="5" x2="12" y2="2" stroke="#004380" strokeWidth="2"></line>
        <circle cx="12" cy="2" r="1" fill="#004380"></circle>
        {/* Cou */}
        <rect x="10" y="15" width="4" height="3"></rect>
      </g>
    </svg>
  );
};

export default Logo;
