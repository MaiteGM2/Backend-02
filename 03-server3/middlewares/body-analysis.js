export const bodyAnalysis = (req, res, next) => {
    res.json(req.body);
    next();
};