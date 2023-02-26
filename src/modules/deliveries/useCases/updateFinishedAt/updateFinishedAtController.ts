import { Request, Response } from "express";
import { UpdateFinishedAtUseCase } from "./updateFinishedAtUseCase";

const updateFinishedAtUseCase = new UpdateFinishedAtUseCase();
export class UpdateFinishedAtController {
	async handle(request: Request, response: Response) {
		const { id_deliveryman } = request;
		const { id: id_delivery } = request.params;

		const result = await updateFinishedAtUseCase.execute({ id_deliveryman, id_delivery });
		return response.json(result);
	}
}
