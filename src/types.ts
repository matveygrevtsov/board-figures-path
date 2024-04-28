export interface ICell {
  color?: number;
  figure?: number;
}

// Интерфейс, описывающий ячейку ЗАПОЛНЕННОЙ таблицы. Здесь важно, что все поля обязательные, поскольку нет смысла строить граф, пока не будет полностью заполнена таблица.
export interface ICompletedCell {
  color: number;
  figure: number;
}

// Интерфейс, описывающий узел графа.
export interface IGraphNode {
  id: number;
  outputs: number[]; // Массив айдишников тех узлов, в которые можно попасть из этого.
}

export interface IVisitedGraphNode extends IGraphNode {
  input: number[]; // Массив айдишников тех вершин, по которым нужно пройтись, чтобы попасть в эту.
}

export interface IAnswer {
  answer: number[];
  time_ms: number; // Время выполнения алгоритма в миллисекундах.
}
