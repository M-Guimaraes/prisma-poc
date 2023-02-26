import { sign } from "jsonwebtoken";
import { config } from "../config";


class GenerateClientsTokenProvider {
	async execute(id: string ) {
		const token = sign({  }, config.jwt.client_secret, {
			subject: id,
			expiresIn: "20s",
		});

		return token;
	}
}

export { GenerateClientsTokenProvider };
