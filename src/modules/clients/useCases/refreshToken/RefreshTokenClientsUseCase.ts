import dayjs from "dayjs";
import { prisma } from "../../../../database/prismaClient";
import { GenerateClientsRefreshToken } from "../../../../provider/GenerateClientsRefreshToken";
import { GenerateClientsTokenProvider } from "../../../../provider/GenerateClientsTokenProvider";

class RefreshTokenClientsUseCase {
	async execute(refresh_token: string) {
		const refreshToken = await prisma.clientsRefreshToken.findFirst({
			where: {
				id_client: refresh_token
			}
		})

		if (!refreshToken) {
			throw new Error("Refresh token invalid");
		}

		const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.exiresIn));

		const generateClientsTokenProvider = new GenerateClientsTokenProvider();
		const token = await generateClientsTokenProvider.execute(refreshToken.id_client);

		if (refreshTokenExpired) {
			await prisma.clientsRefreshToken.deleteMany({
				where: {
					id_client: refreshToken.id_client,
				},
			});

			const generatedRefreshToken = new GenerateClientsRefreshToken();
			const generatedNewRefreshToken = await generatedRefreshToken.execute(refreshToken.id);

			return { token, generatedNewRefreshToken };
		}

		return { token };
	}
}

export { RefreshTokenClientsUseCase };
