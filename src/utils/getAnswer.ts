import { IAnswer, ICompletedCell, IVisitedGraphNode } from "../types";
import { buildGraph } from "./buildGraph";
import { getNodeOutputs } from "./getNodeOutputs";

export const getAnswer = (cells: ICompletedCell[]): IAnswer | undefined => {
  const timeStart = new Date().getMilliseconds();
  const graph = buildGraph(cells);

  for (let i = 0; i < graph.length; i++) {
    const startNode = graph[i];

    const visitedNodes: IVisitedGraphNode[] = [
      {
        ...startNode,
        input: [startNode.id],
      },
    ];

    while (visitedNodes.length) {
      const currentNode = visitedNodes.pop()!;

      if (currentNode.input.length === cells.length) {
        return {
          answer: currentNode.input,
          time_ms: new Date().getMilliseconds() - timeStart,
        };
      }

      // Отсеиваем те дочерние вершины, которые уже встречались по пути к этой.
      const outputs = getNodeOutputs(
        currentNode,
        Math.sqrt(cells.length),
        graph
      );

      visitedNodes.push(...outputs);
    }
  }
  alert(
    "Для такого набора ячеек пути не существует. Пожалуйста, проверьте корректность заполнения ячеек."
  );

  return undefined;
};
