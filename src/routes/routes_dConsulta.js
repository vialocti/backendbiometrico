import {Router} from 'express'
import { getTipoCargo } from '../controllers/controllers_dConsultas'


const router = Router()

router.get('/portipocargo/:tipocargo', getTipoCargo)


export default router
