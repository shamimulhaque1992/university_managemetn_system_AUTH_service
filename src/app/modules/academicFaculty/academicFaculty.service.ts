import ApiError from '../../../errors/ApiError';
import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';
import { generateFacultyId } from './academicFaculty.utils';

const createAcademicFaculty = async (
  academicFaculty: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  console.log(academicFaculty);
  const id = await generateFacultyId();
  academicFaculty.id = id;

  const createAcademicFaculty = await AcademicFaculty.create(academicFaculty);

  if (!createAcademicFaculty) {
    throw new ApiError(400, 'Failed to create user!');
  }
  return createAcademicFaculty;
};

export const AcademicFacultyService = {
  createAcademicFaculty,
};
