import { Option } from './Option';

export interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}
