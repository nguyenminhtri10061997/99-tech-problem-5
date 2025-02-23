import bcrypt from 'bcrypt';
import EnvConfig from '../env/envConfig';
import JwtService from '../utils/JwtService';

const envConfig = EnvConfig.getInstance();

export default class AuthService {
    async login(username: string, password: string): Promise<string | null> {
        const {
            ADMIN_USERNAME: envUserName = 'admin',
            ADMIN_PASSWORD_HASH: envPasswordHash = await bcrypt.hash('admin', 10)
        } = envConfig;

        if (!username || !password) {
            return null;
        }

        const isPasswordValid = await bcrypt.compare(password, envPasswordHash);

        if (username !== envUserName || !isPasswordValid) {
            return null;
        }

        return JwtService.generateToken(username);
    }
}