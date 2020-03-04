export const authCheck = (req, res, next) => {
  if (req.cookies.sid) {
    return next();
  } 
  return res.sendStatus(401);
}