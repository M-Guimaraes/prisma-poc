"use strict";
exports.__esModule = true;
exports.config = void 0;
var _a = process.env, JWT_CLIENT_SECRET_KEY = _a.JWT_CLIENT_SECRET_KEY, JWT_DELIVERYMAN_SECRET_KEY = _a.JWT_DELIVERYMAN_SECRET_KEY;
var config = {
    jwt: {
        client_secret: JWT_CLIENT_SECRET_KEY,
        deliveryman_secret: JWT_DELIVERYMAN_SECRET_KEY
    }
};
exports.config = config;
//# sourceMappingURL=config.js.map