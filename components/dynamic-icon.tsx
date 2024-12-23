import dynamic from "next/dynamic";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { IconProps } from "@/lib/types";

const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name]);

  return <LucideIcon {...props} />;
};

export default Icon;
