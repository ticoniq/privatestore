import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PasswordInputProps extends Omit<React.ComponentProps<typeof Input>, 'type'> {
  className?: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [show, setShow] = React.useState<boolean>(false);

    const toggleVisibility = React.useCallback(() => {
      setShow((prev) => !prev);
    }, []);

    return (
      <div className="relative">
        <Input
          type={show ? "text" : "password"}
          className={cn("pr-10", className ?? "")}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          onClick={toggleVisibility}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 transform text-muted-foreground hover:text-foreground focus:outline-none"
        >
          {show ? (
            <Eye size={20} />
          ) : (
            <EyeOff size={20} />
          )}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };