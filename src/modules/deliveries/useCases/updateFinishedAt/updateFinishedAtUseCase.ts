import { prisma } from "../../../../database/prismaClient";

interface IUpdateFinishedAt {
	id_deliveryman: string;
	id_delivery: string;
}
export class UpdateFinishedAtUseCase {
	async execute({ id_delivery, id_deliveryman }: IUpdateFinishedAt) {
		const delivery = await prisma.deliveries.updateMany({
			where: {
				id: id_delivery,
				id_deliveryman,
			},
			data: {
				finished_at: new Date(),
			},
		});

		return delivery;
	}
}
