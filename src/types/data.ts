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

export type FightType =
  | "Strawweight"
  | "Flyweight"
  | "Bantamweight"
  | "Featherweight"
  | "Lightweight"
  | "Welterweight"
  | "Middleweight"
  | "Light Heavyweight"
  | "Heavyweight"
  | "Other";
export interface FightStats {
  win_by: WinBy;
  date: string;
  last_round: number;
  last_round_time: string;
  location: string;
  R_fighter: string;
  B_fighter: string;
  Winner: string;
  Fight_type: string;
  total_fight_minutes?: number; // custom calculation
  cleaned_fight_type?: string; // custom calculation
}
