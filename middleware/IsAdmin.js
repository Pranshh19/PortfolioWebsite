// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
    if (req.session.loggedIn && req.session.user.role === 'admin') {
        next(); // User is admin, proceed to the next middleware or route handler
    } else {
        req.session.flashMessage = "Only users with admin role can perform this action.";
        res.redirect('/projects'); // User is not admin, redirect back to projects page
    }
};
module.exports = isAdmin;