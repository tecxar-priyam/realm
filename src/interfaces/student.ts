
export type IGrade = 'A' | 'B' | 'C' | 'D'

export interface IStudent {
    name: string;
    rollNo: string;
    className: string;
    mobile: string | null;
    grade: IGrade | string;
    score: string;
}