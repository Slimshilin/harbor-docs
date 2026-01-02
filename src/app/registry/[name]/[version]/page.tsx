import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/lib/supabase/types";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TaskCard } from "./task-card";

type Dataset = Tables<"dataset">;
type DatasetTask = Tables<"dataset_task">;

interface DatasetPageProps {
  params: Promise<{
    name: string;
    version: string;
  }>;
}

async function getDataset(name: string, version: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("dataset")
    .select("*")
    .eq("name", name)
    .eq("version", version)
    .single();

  if (error || !data) {
    return null;
  }

  return data as Dataset;
}

async function getDatasetTasks(name: string, version: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("dataset_task")
    .select("*")
    .eq("dataset_name", name)
    .eq("dataset_version", version)
    .order("name", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data as DatasetTask[];
}

export async function generateMetadata({
  params,
}: DatasetPageProps): Promise<Metadata> {
  const { name, version } = await params;
  const decodedName = decodeURIComponent(name);
  const decodedVersion = decodeURIComponent(version);

  const dataset = await getDataset(decodedName, decodedVersion);

  if (!dataset) {
    return {
      title: "Dataset Not Found",
    };
  }

  return {
    title: `${dataset.name}@${dataset.version} - Harbor Registry`,
    description: dataset.description || `View tasks for ${dataset.name}`,
  };
}

export default async function DatasetPage({ params }: DatasetPageProps) {
  const { name, version } = await params;
  const decodedName = decodeURIComponent(name);
  const decodedVersion = decodeURIComponent(version);

  const [dataset, tasks] = await Promise.all([
    getDataset(decodedName, decodedVersion),
    getDatasetTasks(decodedName, decodedVersion),
  ]);

  if (!dataset) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col max-w-6xl w-full mx-auto px-4 py-12">
      <div className="space-y-6">
        <div>
          <Link
            href="/registry"
            className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block"
          >
            &larr; Back to Registry
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-5xl tracking-tighter font-code">
              {dataset.name}
            </h1>
            <Badge variant="secondary" className="font-code text-lg px-3 py-1">
              v{dataset.version}
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground">
            {dataset.description || "No description available"}
          </p>
        </div>

        <div>
          <CodeBlock
            lang="bash"
            code={`harbor run -d ${dataset.name}@${dataset.version}`}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-code">
            Tasks{" "}
            <span className="text-muted-foreground">({tasks.length})</span>
          </h2>

          {tasks.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  No tasks available for this dataset.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="border rounded-xl overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 -m-px bg-card">
                {tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    name={task.name}
                    gitUrl={task.git_url}
                    gitCommitId={task.git_commit_id}
                    path={task.path}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
