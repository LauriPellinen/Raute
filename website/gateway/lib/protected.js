export function isAuth(req, res, next){
    if (req.isAuthenticated()){
        next();
    } else {
        res.status(401).render("login")
    };
}


export function isAdmin(req, res, next){
    if (req.isAuthenticated()){
        if (req.user.admin){
            next();
        } else {
            res.status(401).send({message: "Unauthorized - Not an Admin"})   
        }
        
    } else {
        res.status(401).render("login")
    }
}