import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Key, ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import AddApiKeyForm from "@/components/AddApiKeyForm";
import ApiKeysTable from "@/components/ApiKeysTable";
import { useApiKeys } from "@/hooks/useApiKeys";

const Dashboard = () => {
  const [activeApi, setActiveApi] = useState<1 | 2 | 3>(1);
  const { entries, loading, addApiKey, deleteApiKey } = useApiKeys();

  const apiTabs = [
    { id: 1, name: "API 1", description: "Primary API integration keys" },
    { id: 2, name: "API 2", description: "Secondary API integration keys" },
    { id: 3, name: "API 3", description: "Tertiary API integration keys" },
  ];

  const handleAddKey = async (keyValue: string) => {
    const apiCategory = `API ${activeApi}` as "API 1" | "API 2" | "API 3";
    await addApiKey(apiCategory, keyValue);
  };

  const filteredEntries = entries.filter(
    (entry) => entry.apiName === `API ${activeApi}`
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Key className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">API Dashboard</span>
              </div>
            </div>
            <Badge variant="secondary">
              {entries.length} Total Keys
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-8 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Manage API Keys
              </CardTitle>
              <CardDescription>
                Add and manage your API keys across different integrations. Keys are stored securely in the cloud.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                value={`api-${activeApi}`}
                onValueChange={(value) => setActiveApi(parseInt(value.split("-")[1]) as 1 | 2 | 3)}
              >
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  {apiTabs.map((tab) => (
                    <TabsTrigger key={tab.id} value={`api-${tab.id}`}>
                      {tab.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {apiTabs.map((tab) => (
                  <TabsContent key={tab.id} value={`api-${tab.id}`} className="space-y-6">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h3 className="font-medium mb-1">{tab.name}</h3>
                      <p className="text-sm text-muted-foreground">{tab.description}</p>
                    </div>

                    <AddApiKeyForm activeApi={tab.id} onAdd={handleAddKey} />
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API {activeApi} Keys</CardTitle>
              <CardDescription>
                Showing {filteredEntries.length} key{filteredEntries.length !== 1 ? "s" : ""} for API {activeApi}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <ApiKeysTable entries={filteredEntries} onDelete={deleteApiKey} />
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
