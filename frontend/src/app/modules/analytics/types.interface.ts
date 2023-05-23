import { TuiDay } from "@taiga-ui/cdk";

export interface StatisticByDates {
    date: Date;
    cost_sum: number;
    unique_client: number;
    unique_pets: number;
}
  
export interface EarnByDatesTuiDay {
    date: TuiDay;
    sum: number;
}
