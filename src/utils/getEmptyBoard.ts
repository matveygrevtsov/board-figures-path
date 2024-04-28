import { ICell } from "../types";

export const getEmptyBoard = (boardSize: number): ICell[] => {
  return Array.from(Array(boardSize * boardSize).keys()).map(() => ({}));
};
