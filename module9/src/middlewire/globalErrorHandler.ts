import type { NextFunction, Request, Response } from "express";

const globalErrorHandeler = (err: any, req : Request, res: Response, next: NextFunction) => {

    // console.log(err); //log the error
    res.status(500).json({success: false, message: err.message || "Internal server error"});

}

export default globalErrorHandeler;