import { AcademicFaculty } from './academicFaculty.model';

export const findLastFaculty = async () => {
  const lastFaculty = await AcademicFaculty.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id;
};

export const generateFacultyId = async () => {
  const currentId =
    (await findLastFaculty()) || (0).toString().padStart(5, '0');
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  return incrementedId;
};
