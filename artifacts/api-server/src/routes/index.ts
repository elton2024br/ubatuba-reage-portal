import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import denunciasRouter from "./denuncias";
import contatoRouter from "./contato";
import articlesRouter from "./articles";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(denunciasRouter);
router.use(contatoRouter);
router.use(articlesRouter);
router.use(adminRouter);

export default router;
