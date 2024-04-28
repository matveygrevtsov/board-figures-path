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
        alert(
          `Кажется, задача слишком трудоёмкая :( Попробуйте увеличить значение ${iterationCountLimit} и попробовать ещё раз.`
        );

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
  alert(
    "Для такого набора ячеек пути не существует. Пожалуйста, проверьте корректность заполнения ячеек."
  );

  return undefined;
};
