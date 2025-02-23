import 'dotenv/config';
import jwt from 'jsonwebtoken';
import EnvConfig from '../env/envConfig';

const envConfig = EnvConfig.getInstance();
class JwtService {
  private jwtSecret: string;

  constructor() {
    this.jwtSecret = envConfig.JWT_SECRET || 'your-secret-key';
  }

  public generateToken(username: string): string {
    return jwt.sign(
      { username },
      this.jwtSecret,
      { expiresIn: '1h' }
    );
  }

  public verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.jwtSecret);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}

export default new JwtService();
