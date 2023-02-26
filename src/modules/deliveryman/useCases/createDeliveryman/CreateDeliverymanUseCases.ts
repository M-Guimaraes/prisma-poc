import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";

interface ICreateDeliveryman {
	username: string;
	password: string;
}
export class CreateDeliverymanUseCase {
	async execute({ username, password }: ICreateDeliveryman) {
		const deliverymanExist = await prisma.deliveryman.findFirst({
			where: {
				username,
			},
		});

		if (deliverymanExist) {
			throw new Error("Deliveryman already exists");
		}

		const hashedPassword = await hash(password, 10);

		const deliveryman = await prisma.deliveryman.create({
			data: {
				username,
				password: hashedPassword,
			},
			select: {
				id: true,
				username: true,
			},
		});

		return deliveryman;
	}
}
