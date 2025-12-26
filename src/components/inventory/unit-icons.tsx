import { Scale, Beaker, Box, Package } from "lucide-react";
import { cn } from "@/lib/utils";

export type UnitType = "weight" | "volume" | "count" | "package";

interface UnitIconProps {
  type: UnitType;
  className?: string;
  size?: number;
}

export function UnitIcon({ type, className, size = 20 }: UnitIconProps) {
  const iconProps = {
    className: cn("text-muted-foreground", className),
    size,
  };

  switch (type) {
    case "weight":
      return <Scale {...iconProps} />;
    case "volume":
      return <Beaker {...iconProps} />;
    case "count":
      return <Box {...iconProps} />;
    case "package":
      return <Package {...iconProps} />;
    default:
      return <Package {...iconProps} />;
  }
}

