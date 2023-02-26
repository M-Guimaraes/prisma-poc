import { Router } from "express";
import { AuthenticateClientController } from "./modules/account/useCases/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/useCases/authenticateDeliveryman/AuthenticateDeliverymanController";

import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";

import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";

import { FindAllAvailableDeliveriesController } from "./modules/deliveries/useCases/findAllAvailableDeliveries/findAllAvailableDeliveriesController";
import { ensureAuthenticateDeliveryman } from "./middlewares/ensureAuthenticateDeliveryman";

import { UpdateDeliverymanIdController } from "./modules/deliveries/useCases/updateDelivery/updateDeliverymanIdController";
import { UpdateFinishedAtController } from "./modules/deliveries/useCases/updateFinishedAt/updateFinishedAtController";

import { FindAllAvailableDeliveriesController as FindAllAvailableClientDeliveriesController } from "./modules/clients/useCases/findAllAvailableDeliveries/FindAllAvailableDeliveriesController";
import { FindAllAvailableDeliveriesController as FindAllAvailableDeliverymanDeliveriesController } from "./modules/deliveryman/useCases/findAllAvailableDeliveries/FindAllAvailableDeliveriesController";

import { RefreshTokenClientsController } from "./modules/clients/useCases/refreshToken/RefreshTokenClientsController";

const routes = Router();

const createClientController = new CreateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const createDeliveryController = new CreateDeliveryController();

const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();

const findAllAvailableDeliveriesController = new FindAllAvailableDeliveriesController();

const updateDeliverymanIdController = new UpdateDeliverymanIdController();
const updateFinishedAtController = new UpdateFinishedAtController();

const findAllAvailableClientDeliveriesController = new FindAllAvailableClientDeliveriesController();
const findAllAvailableDeliverymanDeliveriesController =
	new FindAllAvailableDeliverymanDeliveriesController();

const refreshTokenClientsController = new RefreshTokenClientsController();

routes.post("/client", createClientController.handle);
routes.post("/deliveryman", createDeliverymanController.handle);

routes.post("/client/authenticate", authenticateClientController.handle);
routes.post("/deliveryman/authenticate", authenticateDeliverymanController.handle);

routes.post("/delivery", ensureAuthenticateClient, createDeliveryController.handle);

routes.get(
	"/delivery/available",
	ensureAuthenticateDeliveryman,
	findAllAvailableDeliveriesController.handle
);

routes.get(
	"/client/deliveries",
	ensureAuthenticateClient,
	findAllAvailableClientDeliveriesController.handle
);

routes.get(
	"/deliveryman/deliveries",
	ensureAuthenticateDeliveryman,
	findAllAvailableDeliverymanDeliveriesController.handle
);

routes.put(
	"/delivery/update/deliveryman/:id",
	ensureAuthenticateDeliveryman,
	updateDeliverymanIdController.handle
);

routes.put(
	"/delivery/update/finish/:id",
	ensureAuthenticateDeliveryman,
	updateFinishedAtController.handle
);

routes.post(
	"/client/refresh/token",
	// ensureAuthenticateClient,
	refreshTokenClientsController.handle
);

export { routes };
