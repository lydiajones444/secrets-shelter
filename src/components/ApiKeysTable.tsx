import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ApiKeyEntry {
  id: string;
  apiName: string;
  key: string;
  createdAt: string;
  status: "active" | "expired";
}

interface ApiKeysTableProps {
  entries: ApiKeyEntry[];
  onDelete: (id: string) => void;
}

const ApiKeysTable = ({ entries, onDelete }: ApiKeysTableProps) => {
  const maskKey = (key: string) => {
    if (key.length <= 8) return key;
    return `${key.slice(0, 4)}${"•".repeat(key.length - 8)}${key.slice(-4)}`;
  };

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">API</TableHead>
            <TableHead>Key</TableHead>
            <TableHead className="w-[180px]">Created</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                No API keys added yet. Add your first key above.
              </TableCell>
            </TableRow>
          ) : (
            entries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="font-medium">{entry.apiName}</TableCell>
                <TableCell>
                  <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                    {maskKey(entry.key)}
                  </code>
                </TableCell>
                <TableCell className="text-muted-foreground">{entry.createdAt}</TableCell>
                <TableCell>
                  <Badge variant={entry.status === "active" ? "default" : "secondary"}>
                    {entry.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(entry.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApiKeysTable;
