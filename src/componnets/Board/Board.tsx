import { FC } from "react";
import { ICell } from "../../types";
import { Select } from "antd";
import { colors, figures } from "../../config";

import styles from "./styles.module.css";

interface IProps {
  cells: ICell[];
  onColorChange: (cellId: number, color: number) => void;
  onFigureChange: (cellId: number, figure: number) => void;
  answer?: number[];
}

export const Board: FC<IProps> = ({
  cells,
  onColorChange,
  onFigureChange,
  answer,
}) => {
  return (
    <div
      className={styles.root}
      style={{
        gridTemplateRows: `repeat(${Math.sqrt(cells.length)}, 1fr)`,
        gridTemplateColumns: `repeat(${Math.sqrt(cells.length)}, 1fr)`,
      }}
    >
      {cells.map(({}, key) => (
        <div key={key} className={styles.cell}>
          {answer && <div className={styles.answer}>{answer.indexOf(key)}</div>}

          <Select
            placeholder="Фигура"
            value={cells[key].figure}
            options={figures.map((figure, index) => ({
              value: index,
              label: figure,
            }))}
            onChange={(figure) => onFigureChange(key, figure)}
          />

          <Select
            placeholder="Цвет"
            value={cells[key].color}
            options={colors.map((color, index) => ({
              value: index,
              label: (
                <div
                  className={styles.colorLabel}
                  style={{ backgroundColor: color }}
                />
              ),
            }))}
            onChange={(color) => onColorChange(key, color)}
          />
        </div>
      ))}
    </div>
  );
};
