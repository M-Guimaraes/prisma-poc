import { Request, Response } from "express";
import { RefreshTokenClientsUseCase } from "./RefreshTokenClientsUseCase";

class RefreshTokenClientsController {
	async handle(request: Request, response: Response) {
		const { refresh_token } = request.body;
		const refreshTokenClientsUseCase = new RefreshTokenClientsUseCase();

		const token = await refreshTokenClientsUseCase.execute(refresh_token);

		return response.json(token);
	}
}

export { RefreshTokenClientsController };
