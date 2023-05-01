import { Database } from "./supabase";

export type ProfileT = Database["public"]["Tables"]["profiles"]["Row"];
export type ProfileT_I = Database["public"]["Tables"]["re100run_run"]["Insert"];


export type R100PowerT = Database["public"]["Tables"]["re100run_power"]["Row"];


export type R100RunT = Database["public"]["Tables"]["re100run_run"]["Row"];
export type R100RunT_I = Database["public"]["Tables"]["re100run_run"]["Insert"];



