"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, GitCommit } from "lucide-react";

interface TaskCardProps {
  name: string;
  gitUrl: string;
  gitCommitId: string;
  path: string;
}

function buildGitLink(gitUrl: string, commitId: string, path: string): string {
  // Remove .git suffix if present
  let baseUrl = gitUrl.replace(/\.git$/, "");

  // Handle GitHub URLs
  if (baseUrl.includes("github.com")) {
    return `${baseUrl}/blob/${commitId}/${path}`;
  }

  // Handle GitLab URLs
  if (baseUrl.includes("gitlab.com")) {
    return `${baseUrl}/-/blob/${commitId}/${path}`;
  }

  // Default: just link to the repo at the commit
  return `${baseUrl}/tree/${commitId}`;
}

export function TaskCard({ name, gitUrl, gitCommitId, path }: TaskCardProps) {
  const gitLink = buildGitLink(gitUrl, gitCommitId, path);
  const shortCommit = gitCommitId.slice(0, 7);

  return (
    <a
      href={gitLink}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <Card className="shadow-none rounded-none -mr-px -mt-px h-full hover:bg-accent/50 transition-colors group">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-code truncate flex items-center gap-2">
            <span className="truncate">{name}</span>
            <ExternalLink className="h-3 w-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-code">
            <GitCommit className="h-3 w-3 shrink-0" />
            <span>{shortCommit}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 truncate" title={path}>
            {path}
          </p>
        </CardContent>
      </Card>
    </a>
  );
}
