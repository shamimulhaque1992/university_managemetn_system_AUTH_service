import { AcademicFaculty } from './academicFaculty.model';

export const findLastFaculty = async () => {
  const lastFaculty = await AcademicFaculty.findOne({}, { code: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.code;
};

export const generateFacultyId = async () => {
  const currentCode =
    (await findLastFaculty()) || (0).toString().padStart(5, '0');
  const incrementedCode = (parseInt(currentCode) + 1)
    .toString()
    .padStart(5, '0');
  return incrementedCode;
};
