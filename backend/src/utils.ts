import { HttpException } from "@nestjs/common";
import * as Jwt from "jsonwebtoken";
import { ObjectSchema } from "joi";
import User from './entity/user.entity'

export const PageSize = 10;

export const JoiValidate = (schema: ObjectSchema, data: Record<string, string | number>) => {
  const { value, error } = schema.validate(data);
  if (error) throw new HttpException(error.message, 400);
  return value;
};

export const JwtSecret = "asdugasdu6753276qtwe76tq";

export const verifyJwtToken = async (token: string) => {
  try {
    const decoded = Jwt.verify(token, JwtSecret);
    const { id } = decoded;
    return await User.findOne(id);
  } catch (e) {
    return null;
  }
};
