import { Router} from "express";
import { userContoller } from "./user.controller.js";

const router = Router();

// EndPoints: /api/v1/users/ ====

//Post a User
router.post("/", userContoller.createUser);

//Get all users
router.get("/", userContoller.getAllUsers)

//Get A user
router.get("/:id", userContoller.getSingleUser)

// Update a user
router.put("/:id", userContoller.updateUser)

//Delete a User
router.delete("/:id", userContoller.deleteUser)

export const userRoute = router;