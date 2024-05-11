import { IGraphNode, IVisitedGraphNode } from "../types";

export const getNodeOutputs = (
  node: IVisitedGraphNode,
  graph: IGraphNode[]
): IVisitedGraphNode[] => {
  return node.outputs
    .filter((id) => !node.input.includes(id)) // Если вершина уже встречалась на пути - не рассматриваем её.
    .map((id) => ({
      ...graph[id],
      input: [...node.input, id],
    }));
};
