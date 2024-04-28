import {
  CaretDownOutlined,
  MehOutlined,
  MoonOutlined,
} from "@ant-design/icons";
import { ReactNode } from "react";

export const iterationCountLimit = 100000;

export const boardSizes: number[] = [2, 3, 4, 5, 6];

export const figures: ReactNode[] = [
  <MoonOutlined />,
  <CaretDownOutlined />,
  <MehOutlined />,
];

export const colors: string[] = [
  "black",
  "white",
  "red",
  "blue",
  "yellow",
  "green",
];
