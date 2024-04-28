import { IGraphNode, IVisitedGraphNode } from "../types";
import { mapCellIdToTableCoordinates } from "./mapCellIdToTableCoordinates";

export const getNodeOutputs = (
  node: IVisitedGraphNode,
  tableSize: number,
  graph: IGraphNode[]
): IVisitedGraphNode[] => {
  return node.outputs
    .filter((id) => {
      // Если вершина уже встречалась на пути - не рассматриваем её.
      if (node.input.includes(id)) {
        return false;
      }

      if (node.input.length === 1) {
        return true;
      }

      const [nextRowIndex, nextColumnIndex] = mapCellIdToTableCoordinates(
        id,
        tableSize
      );

      const [prevRowIndex, prevColumnIndex] = mapCellIdToTableCoordinates(
        node.input[node.input.length - 1],
        tableSize
      );

      const [prevPrevRowIndex, prevPrevColumnIndex] =
        mapCellIdToTableCoordinates(
          node.input[node.input.length - 2],
          tableSize
        );

      if (nextRowIndex === prevRowIndex && prevRowIndex === prevPrevRowIndex) {
        // Движение вправо.
        if (prevColumnIndex > prevPrevColumnIndex) {
          return nextColumnIndex > prevColumnIndex;
        }
        // Движение влево.
        else {
          return nextColumnIndex < prevColumnIndex;
        }
      }

      if (
        nextColumnIndex === prevColumnIndex &&
        prevColumnIndex === prevPrevColumnIndex
      ) {
        // Движение вверх.
        if (prevRowIndex > prevPrevRowIndex) {
          return nextRowIndex > prevRowIndex;
        }
        // Движение вниз.
        else {
          return nextRowIndex < prevRowIndex;
        }
      }

      return true;
    })
    .map((id) => ({
      ...graph[id],
      input: [...node.input, id],
    }));
};
