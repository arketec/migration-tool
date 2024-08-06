export interface IMigration {
  fileName: string;
  hash: string;
  applied: Date;
  appliedBy: string;
}
