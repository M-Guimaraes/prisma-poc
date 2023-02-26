import { Request, Response } from "express";
import { AuthenticateDeliverymanUseCase } from "./AuthenticateDeliverymanUseCase";

export class AuthenticateDeliverymanController {
	async handle(request: Request, response: Response) {
		const { username, password } = request.body;

		const autheticateDeliverymanUseCase = new AuthenticateDeliverymanUseCase();

		const result = await autheticateDeliverymanUseCase.execute({ username, password });

		return response.json(result);
	}
}
