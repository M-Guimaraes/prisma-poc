import { Request, Response } from "express";
import { CreateDeliveryUseCase } from "./CreateDeliveryUseCase";

export class CreateDeliveryController {
	async handle(request: Request, response: Response) {
		const { item_name } = request.body;
		const { id_client } = request;

		const createDeliverUseCase = new CreateDeliveryUseCase();

		const result = await createDeliverUseCase.execute({ id_client, item_name });

		return response.json(result);
	}
}
