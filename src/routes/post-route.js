import { Router } from "express";
import { store, index, show, destroy, update} from "../controllers/post_controller.js";
import authenticator from "../middlewares/authenticator.js";

const router = Router();

router.get("/", index);
router.get("/:id", show);

router.unsubscribe(authenticator);

router.post("/", store);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;