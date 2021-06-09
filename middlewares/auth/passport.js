const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;

let User = require('../../database/models/user.model');

module.exports = function (passport) {
    passport.use(
        new StrategyJwt(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.JWT_SECRET,
            },
            function (jwtPayload, done) {
                if (jwtPayload.id) {
                    User.findByPk(jwtPayload.id)
                        .then((user) => {
                            if (!user || user.length === 0 || user[0] === 0) {
                                const error = new Error("Invalid Payload");
                                return done(error, false);
                            }

                            return done(null, user);
                        })
                        .catch((error) => {
                            return done(error, false);
                        });
                }
                else {
                    const error = new Error("Invalid JWT Token");
                    return done(error, false);
                }
            }
        )
    );
}