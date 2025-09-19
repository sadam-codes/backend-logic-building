import { BadRequestException, Injectable } from '@nestjs/common';
import { Login_dto, Signup_dto } from './dto/auth.dto';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private AuthModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async signup(dto: Signup_dto) {
    const existingUser = await this.AuthModel.findOne({
      where: { email: dto.email },
    });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.AuthModel.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    });
    return user;
  }

  async login(dto: Login_dto) {
    const user = await this.AuthModel.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new BadRequestException('User not Registered');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password');
    }
    const payload = { id: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      user: { user },
      access_token: token,
    };
  }
}
