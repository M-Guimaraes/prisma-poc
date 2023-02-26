import { Request, Response } from "express";
import { FindAllAvailableDeliveriesUseCase } from "./FindAllAvailableDeliveriesUseCase";

const findAllAvailableDeliveriesUseCase = new FindAllAvailableDeliveriesUseCase();
export class FindAllAvailableDeliveriesController {
	async handle(request: Request, response: Response) {
		const { id_client } = request;
		const result = await findAllAvailableDeliveriesUseCase.execute(id_client);
		return response.json(result);
	}
}
