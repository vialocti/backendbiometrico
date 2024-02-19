import { Router } from 'express';
import { getMaterias, getHconsultaMateria, getDocentes, getMateriasVigentes, newHorario, bajaHorario, updateHorario, getCatedraIntegrantes } from '../controllers/controllers_hcd'
const router = Router();

router.get('/materias/:carrera/:plan', getMaterias);
router.get('/docentes/:patron', getDocentes);
router.get('/consultam/:sede/:carrera/:plan/:id_mater', getHconsultaMateria);
router.get('/consultamv/:sede/:carrera/:plan', getMateriasVigentes);
router.post('/add_horario', newHorario);
router.put('/baja_horario/:id_hora', bajaHorario);
router.put('/modiHora/:id_hora', updateHorario)
router.get('/compocatedra/:sede/:carrera/:idmat/:tipo', getCatedraIntegrantes)

export default router;  