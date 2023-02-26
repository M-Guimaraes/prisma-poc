import { compare } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";
import { sign } from "jsonwebtoken";

import { config } from "../../../../config";
import { GenerateClientsRefreshToken } from "../../../../provider/GenerateClientsRefreshToken";
import { GenerateClientsTokenProvider } from "../../../../provider/GenerateClientsTokenProvider";

interface IAuthenticateClient {
	username: string;
	password: string;
}
export class AuthenticateClientUseCase {
	async execute({ password, username }: IAuthenticateClient) {
		const client = await prisma.clients.findFirst({
			where: {
				username,
			},
		});

		if (!client) {
			throw new Error("Username or password invalid!");
		}

		const passwordMatch = await compare(password, client.password);

		if (!passwordMatch) {
			throw new Error("Username or password invalid!");
		}

		await prisma.clientsRefreshToken.deleteMany({
			where: {
				id_client: client.id,
			},
		});

		const generateClientsTokenProvider = new GenerateClientsTokenProvider();
		const token = await generateClientsTokenProvider.execute(client.id);

		const generatedRefreshToken = new GenerateClientsRefreshToken();
		const refreshToken = await generatedRefreshToken.execute(client.id);

		return { auth_token: token, refreshToken };
	}
}
