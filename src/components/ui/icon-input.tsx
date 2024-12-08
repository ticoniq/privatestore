import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  // Add support for icon position
  iconPosition?: 'left' | 'right';
}

export const IconInput: React.FC<IconInputProps> = ({ 
  icon, 
  iconPosition = 'right',
  className = '',
  ...props 
}) => {
  return (
    <div className="relative flex items-center">
      {icon && iconPosition === 'left' && (
        <div className="absolute left-3 text-muted-foreground">
          {icon}
        </div>
      )}
      
      <Input
        {...props}
        className={cn(
          "",
          icon && iconPosition === "left" && "pl-10",
          icon && iconPosition === "right" && "pr-10",
          className
        )}
        
      />
      
      {icon && iconPosition === 'right' && (
        <div className="absolute right-3 text-muted-foreground">
          {icon}
        </div>
      )}
    </div>
  );
};