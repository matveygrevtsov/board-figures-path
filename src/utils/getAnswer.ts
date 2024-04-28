import { iterationCountLimit } from "../config";
import { ICompletedCell, IVisitedGraphNode } from "../types";
import { buildGraph } from "./buildGraph";
import { getNodeOutputs } from "./getNodeOutputs";

export const getAnswer = (cells: ICompletedCell[]): number[] | undefined => {
  const graph = buildGraph(cells);

  for (let i = 0; i < graph.length; i++) {
    const startNode = graph[i];

    const visitedNodes: IVisitedGraphNode[] = [
      {
        ...startNode,
        input: [startNode.id],
      },
    ];

    let iterationCount = 0;

    while (visitedNodes.length) {
      if (iterationCount === iterationCountLimit) {
        console.error(visitedNodes);
        return undefined;
      }

      if (visitedNodes[0].input.length === cells.length) {
        return visitedNodes[0].input;
      }

      // Отсеиваем те дочерние вершины, которые уже встречались по пути к этой.
      const outputs = getNodeOutputs(
        visitedNodes[0],
        Math.sqrt(cells.length),
        graph
      );

      visitedNodes.shift();

      visitedNodes.push(...outputs);

      ++iterationCount;
    }
  }

  return undefined;
};
