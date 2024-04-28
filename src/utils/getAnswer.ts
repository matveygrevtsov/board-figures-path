import { ICompletedCell, IVisitedGraphNode } from "../types";
import { buildGraph } from "./buildGraph";

export const getAnswer = (cells: ICompletedCell[]): number[] | undefined => {
  const graph = buildGraph(cells);

  console.log(graph);

  for (let i = 0; i < graph.length; i++) {
    const startNode = graph[i];

    const visitedNodes: IVisitedGraphNode[] = [
      {
        ...startNode,
        input: [startNode.id],
      },
    ];

    while (visitedNodes.length) {
      if (visitedNodes[0].input.length === cells.length) {
        console.log(visitedNodes[0].input);
        return visitedNodes[0].input;
      }

      // Отсеиваем те дочерние вершины, которые уже встречались по пути к этой.
      const outputs: IVisitedGraphNode[] = visitedNodes[0].outputs
        .filter((id) => !visitedNodes[0].input.includes(id))
        .map((id) => ({
          ...graph[id],
          input: [...visitedNodes[0].input, id],
        }));

      visitedNodes.shift();

      visitedNodes.push(...outputs);
    }
  }

  return undefined;
};
