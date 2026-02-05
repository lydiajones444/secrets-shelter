import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ApiKeyEntry {
  id: string;
  apiName: string;
  key: string;
  createdAt: string;
  status: "active" | "expired";
}

type ApiCategory = "API 1" | "API 2" | "API 3";

export function useApiKeys() {
  const [entries, setEntries] = useState<ApiKeyEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchApiKeys = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("api_keys")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const formattedData: ApiKeyEntry[] = (data || []).map((item) => ({
        id: item.id,
        apiName: item.api_category,
        key: item.key_value,
        createdAt: new Date(item.created_at).toLocaleString(),
        status: item.status as "active" | "expired",
      }));

      setEntries(formattedData);
    } catch (error: any) {
      console.error("Error fetching API keys:", error);
      toast({
        title: "Error",
        description: "Failed to load API keys",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addApiKey = async (apiCategory: ApiCategory, keyValue: string) => {
    try {
      const { data, error } = await supabase
        .from("api_keys")
        .insert({
          api_category: apiCategory,
          key_value: keyValue,
          status: "active",
        })
        .select()
        .single();

      if (error) throw error;

      const newEntry: ApiKeyEntry = {
        id: data.id,
        apiName: data.api_category,
        key: data.key_value,
        createdAt: new Date(data.created_at).toLocaleString(),
        status: data.status as "active" | "expired",
      };

      setEntries((prev) => [newEntry, ...prev]);
      
      toast({
        title: "Success",
        description: `${apiCategory} key added successfully`,
      });

      return true;
    } catch (error: any) {
      console.error("Error adding API key:", error);
      toast({
        title: "Error",
        description: "Failed to add API key",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteApiKey = async (id: string) => {
    try {
      const { error } = await supabase
        .from("api_keys")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setEntries((prev) => prev.filter((entry) => entry.id !== id));
      
      toast({
        title: "Deleted",
        description: "API key removed successfully",
      });

      return true;
    } catch (error: any) {
      console.error("Error deleting API key:", error);
      toast({
        title: "Error",
        description: "Failed to delete API key",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    fetchApiKeys();
  }, []);

  return {
    entries,
    loading,
    addApiKey,
    deleteApiKey,
    refetch: fetchApiKeys,
  };
}
