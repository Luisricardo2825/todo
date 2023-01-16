interface Todo {
  id?: string;
  startDate?: string;
  endDate?: string;
  title?: string;
  description?: string;
  backgroundImage?: string;
  done: boolean;
  procastinated: boolean;
  firstEndDate?: string;
  passToNextDay: boolean;
  deleteAfter: number;
  deleted: boolean;
}
