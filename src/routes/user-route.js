import { Router } from "express";
import { signup, login} from "../controllers/user_controller.js";
import authorizer from "../middlewares/authorizer.js";
import authenticator from "../middlewares/authenticator.js"

const router = Router();

router.post("/signup", signup);
router.post("/login", login)

router.use(authenticator);
router.use(authorizer(["ADMINISTRATOR", "SUPPORT"]));
router.get("/", index);
router.get("/:id", show);
router.post("/", store);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;