export type WinBy =
  | "KO/TKO"
  | "Decision - Unanimous"
  | "Decision - Split"
  | "Could Not Continue"
  | "Submission"
  | "DQ"
  | "Decision - Majority"
  | "TKO - Doctor's Stoppage"
  | "Overturned"
  | "Other";

export interface FightStats {
  win_by: WinBy;
  date: Date;
  last_round: number;
  last_round_time: number;
  total_fight_minutes: number; // custom calculation
  location: string;
  R_fighter: string;
  B_fighter: string;
  Winner: string;
}
