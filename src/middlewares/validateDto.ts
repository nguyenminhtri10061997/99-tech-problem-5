import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export type TDataFrom = 'body' | 'params' | 'query';

export const validateDto = (dtoClass: any, dataFrom: TDataFrom = 'body') => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const data = dataFrom === 'params' ? req.params : dataFrom === 'query' ? req.query : req.body;

    const dtoObject = plainToInstance(dtoClass, data);

    if (dataFrom === 'params') req.params = dtoObject as any;
    else if (dataFrom === 'query') req.query = dtoObject as any;
    else req.body = dtoObject;

    const errors = await validate(dtoObject);

    if (errors.length > 0) {
        const errorMessages = errors.map(err => Object.values(err.constraints!).join(', ')).join(', ');
        res.status(400).json({ message: `Validation failed: ${errorMessages}` });
    } else {
        next();
    }
};
