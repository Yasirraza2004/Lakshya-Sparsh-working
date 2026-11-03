
export const requireAuth = (req, res, next) => {
  if (!req.isAuthenticated?.()) {
    return res.status(401).json({
      success: false,
      message: "Please log in first",
    });
  }

  next();
};

export const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!req.isAuthenticated?.()) {
      return res.status(401).json({
        success: false,
        message: "Please log in first",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission",
      });
    }

    next();
  };
};
