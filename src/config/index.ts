import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_student_password: process.env.DEFAULT_STUDENT_PASSWORD,
  default_faculty_password: process.env.DEFAULT_FACULTY_PASSWORD,
  default_admin_password: process.env.DEFAULT_ADMIN_PASSWORD,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_access_secret_expires_in: process.env.JWT_ACCESS_SECRET_EXPIRES_IN,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_refresh_secret_expires_in: process.env.JWT_REFRESH_SECRET_EXPIRES_IN,
  },
};
