import { Request, Response } from "express";
import { FindAllAvailableDeliveriesUseCase } from "./FindAllAvailableDeliveriesUseCase";

const findAllAvailableDeliveriesUseCase = new FindAllAvailableDeliveriesUseCase();
export class FindAllAvailableDeliveriesController {
	async handle(request: Request, response: Response) {
		const { id_deliveryman } = request;
		const result = await findAllAvailableDeliveriesUseCase.execute(id_deliveryman);
		return response.json(result);
	}
}
