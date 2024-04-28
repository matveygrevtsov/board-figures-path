import { ICompletedCell, IGraphNode } from "../types";
import { mapCellIdToTableCoordinates } from "./mapCellIdToTableCoordinates";
import { mapTableCoordinatesToCellId } from "./mapTableCoordinatesToCellId";

export const buildGraph = (cells: ICompletedCell[]): IGraphNode[] => {
  const graph: IGraphNode[] = [];

  const tableSize = Math.sqrt(cells.length); // Ширина (равная высоте) таблицы.

  cells.forEach((cell, cellId) => {
    const newGraphNode: IGraphNode = {
      id: cellId,
      outputs: [],
    };

    const [rowIndex, columnIndex] = mapCellIdToTableCoordinates(
      cellId,
      tableSize
    );

    // Проверяем все ячейки, лежащие на той же строке.
    for (let j = 0; j < tableSize; j++) {
      // Чтобы не сравнивать текущую ячейку с самой собой.
      if (j !== columnIndex) {
        const idOfCellOnTheSameRow = mapTableCoordinatesToCellId(
          rowIndex,
          j,
          tableSize
        );
        const cellOnTheSameRow = cells[idOfCellOnTheSameRow];

        if (
          cellOnTheSameRow.color === cell.color ||
          cellOnTheSameRow.figure === cell.figure
        ) {
          newGraphNode.outputs.push(idOfCellOnTheSameRow);
        }
      }
    }

    // Проверяем все ячейки, лежащие в том же столбце.
    for (let i = 0; i < tableSize; i++) {
      // Чтобы не сравнивать текущую ячейку с самой собой.
      if (i !== rowIndex) {
        const idOfCellOnTheSameColumn = mapTableCoordinatesToCellId(
          i,
          columnIndex,
          tableSize
        );
        const cellOnTheSameColumn = cells[idOfCellOnTheSameColumn];

        if (
          cellOnTheSameColumn.color === cell.color ||
          cellOnTheSameColumn.figure === cell.figure
        ) {
          newGraphNode.outputs.push(idOfCellOnTheSameColumn);
        }
      }
    }

    graph.push(newGraphNode);
  });

  return graph;
};
