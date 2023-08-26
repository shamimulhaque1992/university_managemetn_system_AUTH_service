import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { academicFacultySearchableFields } from './academicFaculty.constants';
import {
  IAcademicFaculty,
  IAcademicFacultyFilter,
} from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';
import { generateFacultyId } from './academicFaculty.utils';
import httpStatus from 'http-status';

const createAcademicFaculty = async (
  academicFaculty: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  const code = await generateFacultyId();
  academicFaculty.code = code;

  const createAcademicFaculty = await AcademicFaculty.create(academicFaculty);

  if (!createAcademicFaculty) {
    throw new ApiError(400, 'Failed to create user!');
  }
  return createAcademicFaculty;
};
const getSingleAcademicFaculty = async (
  id: string
): Promise<IAcademicFaculty | null | undefined> => {
  const result = await AcademicFaculty.findById(id);
  return result;
};
const getAllAcademicFaculty = async (
  filters: IAcademicFacultyFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicFacultySearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await AcademicFaculty.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicFaculty.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
      sortBy,
      sortOrder,
    },
    data: result,
  };
};

const updateAcademicFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null | undefined> => {
  const existingFaculty = await AcademicFaculty.findOne({
    _id: { $eq: id }, // Exclude the current document being updated
    $or: [{ code: payload.code }, { title: payload.title }],
  });

  if (existingFaculty) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Faculty with the same code or title already exists!'
    );
  }

  const result = await AcademicFaculty.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deleteAcademicFaculty = async (
  id: string
): Promise<IAcademicFaculty | null | undefined> => {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};
export const AcademicFacultyService = {
  createAcademicFaculty,
  getSingleAcademicFaculty,
  getAllAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
};
