import React, { useMemo, useState } from "react";
import { boardSizes } from "./config";
import { getEmptyBoard } from "./utils/getEmptyBoard";
import { Board } from "./componnets/Board/Board";
import { Button, Select, Tooltip } from "antd";
import { getAnswer } from "./utils/getAnswer";
import { IAnswer, ICell, ICompletedCell } from "./types";

import styles from "./App.module.css";

interface IState {
  boardSize: number;
  cells: ICell[];
  answer?: IAnswer;
}

const initialState: IState = {
  boardSize: boardSizes[0],
  cells: getEmptyBoard(boardSizes[0]),
};

function App() {
  const [state, setState] = useState<IState>(initialState);

  const isShowAnswerButtonDisabled = useMemo(
    () =>
      state.cells.some(
        ({ figure, color }) => figure === undefined || color === undefined
      ),
    [state.cells]
  );

  const handleBoardSizeChange = (newBoardSize: number) => {
    setState({
      boardSize: newBoardSize,
      cells: getEmptyBoard(newBoardSize),
    });
  };

  const handleBoardClear = () => {
    setState((prevState) => ({
      boardSize: prevState.boardSize,
      cells: getEmptyBoard(prevState.boardSize),
    }));
  };

  const handleShowAnswerClick = () => {
    if (state.answer) {
      setState((prevState) => ({
        ...prevState,
        answer: undefined,
      }));

      return;
    }

    const answer = getAnswer(state.cells as ICompletedCell[]);

    setState((prevState) => ({
      ...prevState,
      answer,
    }));
  };

  function handleCellChange<Field extends keyof ICell>(
    cellId: number,
    field: Field,
    newValue: ICell[Field]
  ) {
    setState((prevState) => ({
      ...prevState,
      cells: prevState.cells.reduce<ICell[]>(
        (accumulator, cell, index) => [
          ...accumulator,
          index === cellId
            ? {
                ...cell,
                [field]: newValue,
              }
            : cell,
        ],
        []
      ),
    }));
  }

  const handleCellColorChange = (cellId: number, color: number) => {
    handleCellChange(cellId, "color", color);
  };

  const handleCellFigureChange = (cellId: number, figure: number) => {
    handleCellChange(cellId, "figure", figure);
  };

  return (
    <div className={styles.root}>
      <div className={styles.actions}>
        <Select
          placeholder="Размер таблицы"
          value={state.boardSize}
          options={boardSizes.map((value) => ({
            value,
            label: `${value}x${value}`,
          }))}
          onChange={handleBoardSizeChange}
        />

        <Button onClick={handleBoardClear}>Очистить</Button>

        <Tooltip
          placement="bottom"
          title={
            isShowAnswerButtonDisabled
              ? "Сначала заполните все ячейки"
              : undefined
          }
        >
          <Button
            onClick={handleShowAnswerClick}
            disabled={isShowAnswerButtonDisabled}
          >
            {state.answer ? "Спрятать ответ" : "Показать ответ"}
          </Button>
        </Tooltip>
      </div>

      <Board
        cells={state.cells}
        onColorChange={handleCellColorChange}
        onFigureChange={handleCellFigureChange}
        answer={state.answer?.answer}
      />

      {state.answer?.time_ms !== undefined && (
        <div>{`Время выполнения: ${(state.answer.time_ms / 1000).toFixed(
          2
        )} сек`}</div>
      )}
    </div>
  );
}

export default App;
