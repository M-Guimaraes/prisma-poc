import { prisma } from "../../../../database/prismaClient";

export class FindAllAvailableDeliveriesUseCase {
	async execute(id_client: string) {
		const deliveries = await prisma.clients.findMany({
			where: {
				id: id_client,
			},
			select: {
				id: true,
				deliveries: true,
                username: true
			},
		});
		return deliveries;
	}
}
