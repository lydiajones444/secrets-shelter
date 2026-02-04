import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AddApiKeyFormProps {
  activeApi: number;
  onAdd: (key: string) => void;
}

const AddApiKeyForm = ({ activeApi, onAdd }: AddApiKeyFormProps) => {
  const [keyValue, setKeyValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyValue.trim()) {
      onAdd(keyValue.trim());
      setKeyValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <Input
        type="text"
        placeholder={`Enter API ${activeApi} key...`}
        value={keyValue}
        onChange={(e) => setKeyValue(e.target.value)}
        className="flex-1 bg-card"
      />
      <Button type="submit" disabled={!keyValue.trim()}>
        <Plus className="h-4 w-4 mr-2" />
        Add Key
      </Button>
    </form>
  );
};

export default AddApiKeyForm;
