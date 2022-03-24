import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import * as Bcryptjs from 'bcryptjs';
import * as Jwt from 'jsonwebtoken';
import User from '../../entity/user.entity';
import { PageSize } from '../../utils';


@Injectable()
export default class UsersService {

  async get(p =  '1', authUser) {
    const page = Math.max(Number(p) || 1, 1);
    const users = await User.find({
      take: PageSize,
      skip: (page - 1) * PageSize,
    });

    const totalUserCount = await User.count();
    const pageCount = Math.ceil(totalUserCount / PageSize);

    return { users, page, pageCount };
  }

  async add({ photo, email, password }, authUser) {
    const check = await User.find({
      where: {
        email: email.toLowerCase()
      }
    })
    if(check.length === 0) {
      const user = new User();
      user.email = email;
      user.password = Bcryptjs.hashSync(password, 10);
      user.photo = photo;
      await user.save();
      return user;
    } else throw new HttpException("User email already exists", 400);
  }

  async update(id, {  photo, email, password }, authUser) {
    const user = await User.findOne(id);
    if(User) {
      user.email = email;
      if(password) {
        user.password = Bcryptjs.hashSync(password, 10);
      }
      user.photo = photo;
      await user.save();
      return user;
    } else throw new NotFoundException();
  }

  async delete(id, authUser) {
    const user = await User.findOne(id);
    if (user.id !== authUser.id) {
      if (user) {
        await User.delete(id);
        return {};
      } else throw new NotFoundException();
    } else throw new HttpException("User cannot delete oneself", 400)
  }
}