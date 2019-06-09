import passport from 'passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import Environment from '../environment';
import {User} from '../db/models';

const {secretOrKey} = new Environment();
const {fromAuthHeaderAsBearerToken} = ExtractJwt;

export class Passport {
  constructor() {
    this.opts = {
      jwtFromRequest: fromAuthHeaderAsBearerToken(),
      secretOrKey
    };
    passport.use(
        new Strategy(this.opts, (payload, done) => {
          const {username} = payload;
          User.findOne({username}, {}, (err, user) => {
            if (!err) {
              if (user) {
                done(null, user);
              } else {
                done(null, false);
              }
            } else {
              done(err, false);
            }
          });
        })
    );
  }

  init() {
    return passport.initialize();
  }

  authenticate(strategy) {
    return passport.authenticate(strategy, {session: false});
  }
}
