import type { Request, Response } from "express";

export const createListController = <T>(getter: () => Promise<T[]>) => {
  return async (_req: Request, res: Response) => {
    const items = await getter();
    res.json({ items });
  };
};
