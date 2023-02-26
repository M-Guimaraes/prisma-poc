import { prisma } from "../database/prismaClient";
import dayjs from "dayjs";

class GenerateClientsRefreshToken {
	async execute(id_client: string) {
		const exiresIn = dayjs().add(15, "seconds").unix();

		await prisma.clientsRefreshToken.deleteMany({
			where: {
				id_client,
			},
		});

		const generatedRefreshToken = await prisma.clientsRefreshToken.create({
			data: {
				id_client,
				exiresIn,
			},
		});
		return generatedRefreshToken;
	}
}

export { GenerateClientsRefreshToken };
