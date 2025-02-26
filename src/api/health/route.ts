import { Request, Response } from "express"

export const GET = async (
  req: Request, 
  res: Response
) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString()
  })
} 