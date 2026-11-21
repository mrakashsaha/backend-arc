import { Router} from "express";
import { userContoller } from "./user.controller.js";
import auth from "../../middlewire/auth.js";

const router = Router();

// EndPoints: /api/v1/users/ ====

//Post a User
router.post("/", userContoller.createUser);

//Get all users
router.get("/", auth ("admin", "agent"), userContoller.getAllUsers)

//Get A user
router.get("/:id", auth("admin", "agent", "user"), userContoller.getSingleUser)

// Update a user
router.put("/:id", auth("admin", "user"), userContoller.updateUser)

//Delete a User
router.delete("/:id", userContoller.deleteUser)

export const userRoute = router;