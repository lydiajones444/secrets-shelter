import { Key } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
  activeApi: number;
  onApiSelect: (api: number) => void;
}

const DashboardSidebar = ({ activeApi, onApiSelect }: DashboardSidebarProps) => {
  const menuItems = [
    { id: 1, label: "API 1" },
    { id: 2, label: "API 2" },
    { id: 3, label: "API 3" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-sidebar text-sidebar-foreground flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <Key className="h-5 w-5" />
          API Dashboard
        </h1>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onApiSelect(item.id)}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-lg transition-colors font-medium",
                  activeApi === item.id
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                )}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <p className="text-xs text-sidebar-muted">Manage your API keys</p>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
