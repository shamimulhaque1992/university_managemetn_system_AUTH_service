import { Model } from 'mongoose';

export type IAcademicFaculty = {
  code: string;
  title: string;
};

export type AcademicFacultyModel = Model<
  IAcademicFaculty,
  Record<string, unknown>
>;
export type IAcademicFacultyFilter = { searchTerm?: string };
