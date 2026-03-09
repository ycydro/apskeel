import type { Request, Response, NextFunction } from "express";
export const validateNumericId = (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  if (!/^\d+$/.test(id)) {
    return res.status(400).json({
      message: "ID must be a valid numeric value",
    });
  }

  next();
};

export const pleaseAuth = (
  req: Request<{}, unknown, {}, { password: string }>,
  res: Response,
  next: NextFunction,
) => {
  const { password } = req.query;

  if (password !== "please") {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  next();
};
