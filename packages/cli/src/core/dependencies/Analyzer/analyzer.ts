import { ResolverFactory } from "../factory/resover";

export function AnalyzerFactory(root: string, depthLimit: number) {
  // resolve factory
  console.log(123);

  const factory = new ResolverFactory();
  factory.getDependenciesGraph(root);
}
