import { Request, Response } from "express";
import { UpdateDeliverymanIdUseCase } from "./updateDeliverymanIdUseCase";

const updateDeliverymanIdUseCase = new UpdateDeliverymanIdUseCase();

export class UpdateDeliverymanIdController {
	async handle(request: Request, response: Response) {
		const { id_deliveryman } = request;
		const { id: id_delivery } = request.params;

		const result = await updateDeliverymanIdUseCase.execute({ id_deliveryman, id_delivery });

		return response.json(result);
	}
}
