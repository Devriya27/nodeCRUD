const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Username
    let user = await User.findOne({
      where: {
        username: req.body.username
      }
      
    });
    console.log("verify sign up 1 "+user);
    if (user) {
      return res.status(400).send({
        message: "Failed! Username is already in use!"
      });
    }

    user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    console.log("verify sign up 2"+user);
    if (user) {
      return res.status(400).send({
        message: "Failed! Email is already in use!"
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate Username!"
    });
  }
};

checkRolesExisted = (req, res, next) => {
  console.log("check role "+this.checkRolesExisted);
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};

console.log("verify sign up end");
const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;