import { Request, Response, NextFunction } from 'express';

const whitelistedEmails = ['latest1@gmail.com'];

export const whitelistMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.body.email || req.params.email;
  if (whitelistedEmails.includes(email)) {
    next();
  } else {
    res.status(403).json({ error: 'Unauthorized' });
  }
};

/*
Sample data in MongoDB Atlas
{"_id":{"$oid":"6579eb21d43e986b53eb7a84"},"name":"Name1","email":"name@email.com","bio":"Bio","age":{"$numberInt":"10"},"image":"img.jpg","resume":"resume.pdf"}
{"_id":{"$oid":"6579f02c3e30efb9eaf5a9fc"},"name":"latest","email":"latest@gmail.com","bio":"goood","age":{"$numberInt":"25"},"image":"ll.jpg","resume":"great.doc"}
{"_id":{"$oid":"6579f1e8a95e8dfd9be22713"},"name":"latest1","email":"latest1@gmail.com","bio":"good","age":{"$numberInt":"15"},"image":"ll2.jpg","resume":"great2.doc","__v":{"$numberInt":"0"}}
*/