import { RequestHandler } from 'express';
import { AcademicSemesterService } from './academicSemester.service';

const createSemester: RequestHandler = async (req, res, next) => {
  try {
    //req-validation

    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );
    res.status(200).json({
      success: true,
      message: 'Academic Semester created successfully',
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const AcademicSemesterController = {
  createSemester,
};
