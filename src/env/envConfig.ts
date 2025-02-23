import { IsInt, IsString, validate } from 'class-validator';
import 'dotenv/config';

class EnvConfig {
    @IsInt()
    PORT: number;

    @IsString()
    DB_NAME: string;

    @IsString()
    ADMIN_USERNAME: string;

    @IsString()
    ADMIN_PASSWORD_HASH: string;

    @IsString()
    JWT_SECRET: string;

    private static instance: EnvConfig;

    private constructor() {
        this.PORT = Number(process.env.DB_PORT) || 3001;
        this.DB_NAME = process.env.DB_NAME || 'resources.db';
        this.ADMIN_USERNAME = process.env.DB_USER || 'admin';
        this.ADMIN_PASSWORD_HASH = process.env.DB_PASSWORD || '$2b$10$5Yzfze6vLvdTzA2ZFguu5.UcsPdT5xJ3TA262e/uKu7W7/AiqsZBy';
        this.JWT_SECRET = process.env.SECRET_KEY || 'your-secret-key';
    }

    public static getInstance(): EnvConfig {
        if (!EnvConfig.instance) {
            EnvConfig.instance = new EnvConfig();
        }
        return EnvConfig.instance;
    }

    async validate(): Promise<void> {
        const errors = await validate(this);
        if (errors.length > 0) {
            throw new Error('Invalid environment variables: ' + errors.map(err => Object.values(err.constraints!).join(', ')).join(', '));
        }
    }
}

export default EnvConfig;
