"use client";

import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { toast } from "sonner";

interface DatasetCardProps {
  name: string;
  version: string;
  description: string | null;
  taskCount: number;
}

export function DatasetCard({
  name,
  version,
  description,
  taskCount,
}: DatasetCardProps) {
  const handleCopyDataset = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const datasetString = `${name}@${version}`;
    try {
      await navigator.clipboard.writeText(datasetString);
      toast.success("Copied to clipboard", {
        description: (
          <span className="font-mono text-muted-foreground">
            {datasetString}
          </span>
        ),
      });
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <Link href={`/registry/${encodeURIComponent(name)}/${encodeURIComponent(version)}`}>
      <Card className="shadow-none rounded-none -mr-px -mt-px h-full hover:bg-accent/50 transition-colors">
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle
              className="truncate font-code cursor-pointer hover:underline"
              onClick={handleCopyDataset}
            >
              {name}
            </CardTitle>
            <Badge
              variant="secondary"
              className="shrink-0 font-code cursor-pointer hover:bg-secondary/80"
              onClick={handleCopyDataset}
            >
              v{version}
            </Badge>
          </div>
          <CardDescription className="line-clamp-2">
            {description || "No description available"}
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-4 flex-1 flex flex-col justify-between">
          <div onClick={(e) => e.stopPropagation()}>
            <CodeBlock lang="bash" code={`harbor run -d ${name}@${version}`} />
          </div>
          <p className="text-sm text-muted-foreground font-code">
            {taskCount} tasks
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
