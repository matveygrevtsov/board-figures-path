export const mapTableCoordinatesToCellId = (
  rowIndex: number,
  columnIndex: number,
  tableSize: number
): number => {
  return rowIndex * tableSize + columnIndex;
};
