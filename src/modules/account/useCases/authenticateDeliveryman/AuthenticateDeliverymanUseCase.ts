import { compare } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";
import { sign } from "jsonwebtoken";

import { config } from "../../../../config";

interface IAuthenticateDeliveryman {
	username: string;
	password: string;
}
export class AuthenticateDeliverymanUseCase {
	async execute({ password, username }: IAuthenticateDeliveryman) {
		const deliveryman = await prisma.deliveryman.findFirst({
			where: {
				username,
			},
		});

		if (!deliveryman) {
			throw new Error("Username or password invalid!");
		}

		const passwordMatch = await compare(password, deliveryman.password);

		if (!passwordMatch) {
			throw new Error("Username or password invalid!");
		}

		const token = sign({ username }, config.jwt.deliveryman_secret, {
			subject: deliveryman.id,
			expiresIn: "1d",
		});

		return { auth_token: token };
	}
}
