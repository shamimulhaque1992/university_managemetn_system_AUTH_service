import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { managementDepartmentFilterableFields } from './managementDepartment.constants';
import { ManagementDepartmentService } from './managementDepartment.service';
import { IManagementDepartment } from './managementDepartment.interface';

const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...departmentData } = req.body;
    const result = await ManagementDepartmentService.createManagementDepartment(
      departmentData
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department Created Successfully!',
      data: result,
    });
  }
);
const getSingleManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await ManagementDepartmentService.getSingleManagementDepartment(id);

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department Retrieved Successfully!',
      data: result,
    });
  }
);
const deleteManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ManagementDepartmentService.deleteManagementDepartment(
      id
    );
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department Deleted Successfully!',
      data: result,
    });
  }
);
const updateManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { updatedDepartmentData } = req.body;
    const result = await ManagementDepartmentService.updateManagementDepartment(
      id,
      updatedDepartmentData
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department Updated Successfully!',
      data: result,
    });
  }
);
const getAllManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, managementDepartmentFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await ManagementDepartmentService.getAllManagementDepartment(
      filters,
      paginationOptions
    );
    sendResponse<IManagementDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department Retrieved Successfully!',
      data: result.data,
      meta: result.meta,
    });
  }
);

export const ManagementDepartmentController = {
  createManagementDepartment,
  getSingleManagementDepartment,
  deleteManagementDepartment,
  updateManagementDepartment,
  getAllManagementDepartment,
};
