import { CodeBlock } from "@/components/code-block";
import { CreateTasks } from "./components/create-tasks";
import { Registry } from "./components/registry";
import { Rollouts } from "./components/rollouts";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center space-y-12 max-w-6xl mx-auto px-4">
      <div className="space-y-6 flex flex-col items-center mt-36">
        <h1 className="font-serif text-8xl tracking-tight">Harbor</h1>
        <p className="text-sm px-3 rounded-lg border py-1 bg-muted">
          From the makers of Terminal-Bench.
        </p>
        <p className="text-lg text-muted-foreground">
          A framework for evals and training using agentic environments.
        </p>
        <CodeBlock lang="bash" code={`uv tool install harbor`} />
      </div>
      <Registry />
      <Rollouts />
      <CreateTasks />
    </main>
  );
}
