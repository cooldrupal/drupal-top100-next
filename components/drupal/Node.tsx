import { Organization } from "@/components/nodes/Organization";
import { BasicPage } from "@/components/nodes/BasicPage";

interface NodeProps {
  node: any;
}

const componentsMap: Record<string, React.ComponentType<NodeProps>> = {
  "node--page": BasicPage,
  "node--organization": Organization,
};

export function Node({ node }: NodeProps) {
  const Component = componentsMap[node.type];
  return Component ? <Component node={node} /> : null;
}

export function getNodeTypes(): string[] {
  return Object.keys(componentsMap);
}
