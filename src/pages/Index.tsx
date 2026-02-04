import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import ApiKeysTable, { ApiKeyEntry } from "@/components/ApiKeysTable";
import AddApiKeyForm from "@/components/AddApiKeyForm";

const Index = () => {
  const [activeApi, setActiveApi] = useState(1);
  const [apiKeys, setApiKeys] = useState<ApiKeyEntry[]>([]);

  const handleAddKey = (key: string) => {
    const newEntry: ApiKeyEntry = {
      id: crypto.randomUUID(),
      apiName: `API ${activeApi}`,
      key,
      createdAt: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "active",
    };
    setApiKeys((prev) => [newEntry, ...prev]);
  };

  const handleDeleteKey = (id: string) => {
    setApiKeys((prev) => prev.filter((entry) => entry.id !== id));
  };

  // Filter keys for the active API
  const filteredKeys = apiKeys.filter((entry) => entry.apiName === `API ${activeApi}`);

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar activeApi={activeApi} onApiSelect={setActiveApi} />
      
      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">API {activeApi}</h2>
            <p className="text-muted-foreground mt-1">
              Manage and view your API {activeApi} keys
            </p>
          </div>

          <div className="bg-card rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Add New Key</h3>
            <AddApiKeyForm activeApi={activeApi} onAdd={handleAddKey} />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              Your Keys ({filteredKeys.length})
            </h3>
            <ApiKeysTable entries={filteredKeys} onDelete={handleDeleteKey} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
