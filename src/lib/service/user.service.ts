import jwt from "jsonwebtoken";
import { UserSchema } from "@/lib/models/user.model";
import * as jose from "jose";

const jwtConfig = {
  secret: new TextEncoder().encode(process.env.JWT_SECRET_KEY),
};
class UserService {
  signJWT(payload: UserSchema): string {
    const plainPayload = payload.toObject();
    return jwt.sign(plainPayload, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "30d",
    });
  }

  async verifyJWT(
    token: string
  ): Promise<jose.JWTVerifyResult<jose.JWTPayload>> {
    const data = await jose.jwtVerify(token, jwtConfig.secret);
    return data;
  }
}

const userService = new UserService();

export default userService;
