export interface StatisticByDates {
  date: Date;
  cost_sum: number;
  unique_client: number;
  unique_pets: number;
}

export interface Statistic {
  cost_sum: number;
  unique_client: number;
  unique_pets: number;
}
