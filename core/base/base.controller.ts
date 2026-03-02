import { Request, Response, NextFunction } from 'express';

export abstract class BaseController {
  protected sendResponse(res: Response, data: any, status = 200) {
    res.status(status).json({ success: true, data });
  }

  protected sendError(res: Response, error: any, status = 500) {
    res.status(status).json({ success: false, message: error.message || 'Internal Server Error' });
  }

  abstract registerRoutes(): void;
}