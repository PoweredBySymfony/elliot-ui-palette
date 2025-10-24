import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'accent';
}

const DashboardCard = ({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  trend,
  variant = 'default' 
}: DashboardCardProps) => {
  const variantStyles = {
    default: "bg-card hover:bg-card/80",
    primary: "bg-gradient-primary text-white",
    accent: "bg-gradient-accent text-white"
  };

  const iconVariantStyles = {
    default: "bg-primary/10 text-primary",
    primary: "bg-white/20 text-white",
    accent: "bg-white/20 text-white"
  };

  return (
    <div className={`${variantStyles[variant]} rounded-2xl p-6 card-shadow transition-smooth hover:-translate-y-1 elevated-shadow`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={`text-sm font-medium ${variant === 'default' ? 'text-muted-foreground' : 'text-white/80'}`}>
            {title}
          </p>
          <h3 className="mt-2 text-3xl font-bold">{value}</h3>
          {description && (
            <p className={`mt-2 text-sm ${variant === 'default' ? 'text-muted-foreground' : 'text-white/70'}`}>
              {description}
            </p>
          )}
          {trend && (
            <div className="mt-3 flex items-center gap-1">
              <span className={`text-sm font-medium ${
                trend.isPositive 
                  ? variant === 'default' ? 'text-green-600' : 'text-green-200'
                  : variant === 'default' ? 'text-red-600' : 'text-red-200'
              }`}>
                {trend.isPositive ? '↑' : '↓'} {trend.value}
              </span>
              <span className={`text-xs ${variant === 'default' ? 'text-muted-foreground' : 'text-white/60'}`}>
                vs. mois dernier
              </span>
            </div>
          )}
        </div>
        <div className={`${iconVariantStyles[variant]} rounded-xl p-3 transition-smooth`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
