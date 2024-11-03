import { Link } from "@mongez/react-router";
import { cn } from "shared/lib/utils";

type RouteType = {
  label: string;
  path: string;
  icon: React.ReactNode;
  data?: number | null;
  onClick?: () => void;
};

interface AccountSidebarRouteProps {
  route: RouteType;
}

export default function AccountSidebarRoute({
  route,
}: AccountSidebarRouteProps) {
  const { label, path, icon, data, onClick } = route;

  return (
    <Link
      onClick={onClick}
      href={path}
      className={cn(
        "w-full px-2 py-3 flex items-center justify-start gap-2 text-slate-700 bg-[#f6f6f6]",
        "hover:bg-slate-900 hover:text-white transition-all rounded-sm text-sm",
        label === "Dashboard" && "bg-blue text-white",
      )}>
      {icon}
      <p className="font-semibold">{label.toUpperCase()}</p>
      {data !== undefined && data !== null && (
        <span className="font-semibold">({data})</span>
      )}
    </Link>
  );
}
