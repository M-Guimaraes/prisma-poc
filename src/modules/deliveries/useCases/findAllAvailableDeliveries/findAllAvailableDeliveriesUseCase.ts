import { prisma } from "../../../../database/prismaClient";

export class FindAllAvailableDeliveriesUseCase {
	async execute() {
		const deliveries = prisma.deliveries.findMany({
			where: {
				finished_at: null,
				id_deliveryman: null,
			},
		});

		return deliveries;
	}
}
