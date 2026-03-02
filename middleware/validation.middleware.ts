import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodRawShape, ZodError } from 'zod';

export const validate = (schema: ZodObject<ZodRawShape>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        // Use ZodError<unknown> instead of any
        const zodErr: ZodError<unknown> = err;
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: zodErr.issues, // issues is typed
        });
      }

      const message = err instanceof Error ? err.message : 'Invalid request';
      return res.status(400).json({ success: false, message });
    }
  };
};