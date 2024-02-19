import { buscarAntiguedadvaca, createAdicionalNuevo, createCargoNuevo, createCargoNuevoHist, darBajaAdicional, darBajaCargo, darBajaCargoHistorico, deleteAdicional, deleteDatoAgenteEstudio, deleteEstablecimiento, deleteInasistencia, deleteIstitucion, deleteLicencia, deleteTitulo, getAdicionalesAgente, getAgentescumpleEdad, getAntiguedadAgente, getCargosHistoricosAgentes, getCargosPlanta, getCargosVigentesAgente, getCargosVigentesInterinos, getDatosAgente, getDatosAgentePer, getDomiContactoAgente, getEstablecimientos, getEstudiosAgente, getFamiliaAgente, getInasistenciasAgente, getIngresoAñoAgentes, getInstituciones, getlasTNroCargos, getLicenciasAgente, getLugarNac, getMotivosInasistencias, getTitulos, grabarEstablecimiento, grabarInstitucion, grabarTitulo, modiDatosAgentesAnt, modiDatosAgentesContacto, modiDatosAgentesEstudio, modiDatosAgentesFam, modiDatosAgentesPer, modiDatosEstablecimiento, modiDatosInstitucion, modiDatosTitulo, newAgente, newDatosAgentesAnt, newDatosAgentesContacto, newDatosAgentesEstudio, newDatosAgentesFam, newDatosAgentesPer, NewInasistencia, NewLicencia, updateAgente, updateCargo, updateCargoH } from '../controllers/controllers_cargos';

import { Router } from 'express'

const router = Router()

router.get('/datosAgente/:legajo', getDatosAgentePer)
router.get('/datosAntiguedadAgente/:legajo', getAntiguedadAgente)
router.get('/datosFamiliaAgente/:legajo', getFamiliaAgente)
router.get('/lastnrocargos/:legajo', getlasTNroCargos)
router.get('/datosDomiContactoAgente/:legajo', getDomiContactoAgente)
router.get('/cargosvigentes/:legajo', getCargosVigentesAgente)
router.get('/cargoshistoricos/:legajo', getCargosHistoricosAgentes)
router.get('/cargosinterinos', getCargosVigentesInterinos)
router.get('/motina', getMotivosInasistencias)

//manejo agentes
router.post('/addAgente', newAgente)
router.put('/modiAgente/:legajo', updateAgente)

router.post('/addADatosPer', newDatosAgentesPer)
router.put('/modiADatosPer/:legajo', modiDatosAgentesPer)

router.post('/addADatosFam', newDatosAgentesFam)
router.put('/modiADatosFam/:id', modiDatosAgentesFam)

router.post('/addADatosAnt', newDatosAgentesAnt)
router.put('/modiADatosAnt/:legajo', modiDatosAgentesAnt)

router.post('/addADatosCont', newDatosAgentesContacto)
router.put('/modiADatosCont/:legajo', modiDatosAgentesContacto)

//cargos
router.post('/addCargo', createCargoNuevo)
router.put('/bajacargo/:nroreg/:legajo', darBajaCargo)
router.get('/bajacargohistorico/:legajo/:nroreg', darBajaCargoHistorico)
router.post('/addcargoH', createCargoNuevoHist)
router.put('/modiCargo/:nroreg', updateCargo)
router.put('/modiCargoh/:nroreg', updateCargoH)
router.get('/getcargosp/:es/:ppal', getCargosPlanta)

//licencia e inasistencias

router.get('/licenciasagente/:legajo', getLicenciasAgente)
router.post('/cargarlicencia', NewLicencia)

router.delete('/dellicencia/:id/:legajo', deleteLicencia)

//
router.put('/bajaAdicional/:id', darBajaAdicional)
router.get('/inasistenciasagente/:legajo/:tipo/:motivo', getInasistenciasAgente)
router.post('/cargarinasistencia', NewInasistencia)
router.delete('/delinasistencia/:id/:legajo', deleteInasistencia)

//adicional
router.post('/addAdicionalFC', createAdicionalNuevo)
router.get('/adicionalagente/:legajo', getAdicionalesAgente)
router.delete('/deladicional/:id/:legajo', deleteAdicional)
//utiles
router.get('/ingreanioagentes/:anioI/:lugarI', getIngresoAñoAgentes)
router.get('/cumpleEdad/:edad', getAgentescumpleEdad)
router.get('/traerloc', getLugarNac)
//estudios
router.get('/estudios/:legajo', getEstudiosAgente)
router.post('/addADatosEst', newDatosAgentesEstudio)
router.put('/modiADatosEst/:id', modiDatosAgentesEstudio)

//utiles estudio
router.get('/instituciones', getInstituciones)
router.get('/establecimientos/:insti', getEstablecimientos)
router.get('/titulos', getTitulos)

router.post('/addInstitucion', grabarInstitucion)
router.post('/addEstablecimiento', grabarEstablecimiento)
router.post('/addTitulo', grabarTitulo)

router.put('/modiInstitucion/:id', modiDatosInstitucion)
router.put('/modiEstablecimiento/:id', modiDatosEstablecimiento)
router.put('/modiTitulo/:id', modiDatosTitulo)

router.delete('/delADatoEst/:id/:legajo', deleteDatoAgenteEstudio)
router.delete('/delInstitucion/:id', deleteIstitucion)
router.delete('/delEstablecimiento/:id', deleteEstablecimiento)
router.delete('/delTitulo/:id', deleteTitulo)

//
router.get('/datosVaca/:legajo', buscarAntiguedadvaca)
export default router