const isTeacher = (req, res, next) => {
    
    if (req.payload && req.payload.status === 'teacher') {
        next();
    } else {
        res.status(403).json ({ error: 'Only teachers are allowed to create dance classes.'});
    }
};

module.exports = {
    isTeacher,
  };