const { JWT_CLIENT_SECRET_KEY, JWT_DELIVERYMAN_SECRET_KEY } = process.env;


const config: any = {
	jwt: {
		client_secret: JWT_CLIENT_SECRET_KEY,
		deliveryman_secret: JWT_DELIVERYMAN_SECRET_KEY,
	},
};

export { config }