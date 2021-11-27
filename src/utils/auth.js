import passport from "passport";
import {Strategy} from "passport-local";

import config from "../utils/config";

passport.use(new Strategy((user, pass, done) => {
    if (user === config.apiUser && pass === config.apiPassword) {
        return done(null, user);
    }
    return done(null, false);
}));

export default passport;