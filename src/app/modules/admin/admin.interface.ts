import { Model, Types } from 'mongoose';
import { IManagementDepartment } from '../managementDepartment/managementDepartment.interface';

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type IAdmin = {
  id: string;
  name: UserName;
  profileImage: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  gender?: 'male' | 'female';
  permanentAddress: string;
  presentAddress: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  designation: string;
  managementDepartment: Types.ObjectId | IManagementDepartment;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;
