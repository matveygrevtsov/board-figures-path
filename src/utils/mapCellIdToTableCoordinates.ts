export const mapCellIdToTableCoordinates = (
  cellId: number,
  tableSize: number
): [number, number] => {
  const rowIndex = Math.floor(cellId / tableSize);
  const columnIndex = cellId % tableSize;
  return [rowIndex, columnIndex];
};
