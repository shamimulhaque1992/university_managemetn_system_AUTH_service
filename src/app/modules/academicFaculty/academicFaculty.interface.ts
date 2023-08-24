import { Model } from 'mongoose';

export type IAcademicFaculty = {
  id: string;
  name: string;
};

export type AcademicFacultyModel = Model<
  IAcademicFaculty,
  Record<string, unknown>
>;
