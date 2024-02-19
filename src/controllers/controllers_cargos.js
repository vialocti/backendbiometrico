import { connect } from '../database'



// funciones complementarias 

export const buscarNumero = async (legajo) => {

    try {
        let strqry = `SELECT MAX(nc) + 1 as lastnro FROM cargos WHERE legajo=${legajo}`
        const db = await connect()
        const [rows] = db.query(strqry)
        console.warn(rows)
        return rows.lastnro

    } catch (error) {
        console.log(error)
    }

}

//Datos -------
//###################=============
//NuevoAgente

export const newAgente = async (req, res) => {

    const { legajo, tipodoc, nrodoc, nombre, claustro, nrocuil, area, sede } = req.body
    let cabinsert = 'INSERT INTO agentes(legajo,tipodocumento,nrodocumento,apellido,condicion,nrocuil,area,sede) VALUES('
    let colainsert = `${legajo},'${tipodoc}',${nrodoc},'${nombre}','${claustro}','${nrocuil}','${area}','${sede}')`
    let strqinsert = `${cabinsert}${colainsert}`
    //console.log(strqinsert)
    try {
        const db = await connect()
        const resu = await db.query(strqinsert)
        res.send(resu)

    } catch (error) {
        console.log(error)
    }
}

//modificar datos agentes principal

export const updateAgente = async (req, res) => {
    const { legajo } = req.params

    try {
        const db = await connect()
        const resu = await db.query('UPDATE agentes SET ? WHERE legajo=? ', [req.body, legajo])
        res.send(resu)
    } catch (error) {
        console.log(error)
    }

}


//########################=====================
//ver datos personales 

export const getDatosAgentePer = async (req, res) => {
    const { legajo } = req.params
    let strqry = `SELECT DATE_FORMAT(fechnac,"%d-%m-%Y") as fechanac,lugarn,nacionalidad,sexo,gs,rh,ecivil,tt,e,ua,smil,ap,DATE_FORMAT(fiapn,"%d-%m-%Y") as fechaIAPN,DATE_FORMAT(fiunc,"%d-%m-%Y") as fechaIUNC,DATE_FORMAT(fifce,"%d-%m-%Y") as fechaIFCE,DATE_FORMAT(rcond,"%d-%m-%Y") as rcond,jub70 FROM datos_rrhh WHERE legajo=${legajo}`
    try {
        const db = await connect()
        const [rows] = await db.query(strqry)
        res.send(rows)
    } catch (error) {
        console.log(error)
    }
}

//nuevo dato de Agentes Personal
export const newDatosAgentesPer = async (req, res) => {
    const { legajo, fechnac, lugarn, nacionalidad, sexo, gs, rh, ecivil, fiapn, fiunc, fifce } = req.body

    let sqlins = `INSERT INTO datos_rrhh (legajo,fechnac,lugarn,nacionalidad,sexo,gs,rh,ecivil,fiapn,fiunc,fifce)
        values(${legajo},'${fechnac}','${lugarn}','${nacionalidad}','${sexo}','${gs}','${rh}','${ecivil}','${fiapn}','${fiunc}','${fifce}')`

    try {
        const db = await connect()
        const resu = await db.query(sqlins)
        res.send(resu)

    } catch (error) {
        console.log(error)
    }
}


//modificar datos personales de agente

export const modiDatosAgentesPer = async (req, res) => {

    const { legajo } = req.params
    try {
        const db = await connect()
        const resu = await db.query('UPDATE datos_rrhh SET ? WHERE legajo=? ', [req.body, legajo])
        res.send(resu)
    } catch (error) {
        console.log(error)
    }
}


//%%$$$$$$$$$$$$$$$$$$$$====================
//datos antiguedad

export const getAntiguedadAgente = async (req, res) => {

    const { legajo } = req.params
    let strqry = `SELECT aad,mad,dad,aand,mand,dand,DATE_FORMAT(fechrecd,"%d-%m-%Y") as fechardoc,DATE_FORMAT(fechrecnd,"%d-%m-%Y") as fecharndoc,nresd,nresnd,DATE_FORMAT(fechan,"%d-%m-%Y") as fechaAn,ad,md,dd,annd,mnd,dnd FROM antiguedad_rrhh WHERE legajo = ${legajo}`
    try {
        const db = await connect()
        const [rows] = await db.query(strqry)
        res.send(rows)
    } catch (error) {
        console.log(error)
    }
}


//nuevo registro reconocimiento de antiguedad agente 
export const newDatosAgentesAnt = async (req, res) => {

    const { legajo, aad, mad, dad, aand, mand, dand, fechrecd, fechrecnd, nresd, nresnd } = req.body
    let sqlins = `INSERT INTO antiguedad_rrhh(legajo,aad,mad,dad,aand,mand,dand,fechrecd,fechrecnd,nresd,nresnd) 
    VALUES(${legajo},${aad},${mad},${dad},${aand},${mand},${dand},'${fechrecd}','${fechrecnd}','${nresd}','${nresnd}')`

    try {
        const db = await connect()
        const resu = await db.query(sqlins)
        res.send(resu)

    } catch (error) {
        console.log(error)
    }
}

//#modificar datos antiguedad agentes
export const modiDatosAgentesAnt = async (req, res) => {

    const { legajo } = req.params
    try {
        const db = await connect()
        const resu = await db.query('UPDATE antiguedad_rrhh SET ? WHERE legajo=? ', [req.body, legajo])
        res.send(resu)
    } catch (error) {
        console.log(error)
    }
}


//&&&&########################&&&&
//datos Familia

export const getFamiliaAgente = async (req, res) => {

    const { legajo } = req.params
    let strqry = `SELECT  * FROM familia_rrhh WHERE legajo = ${legajo}`
    try {
        const db = await connect()
        const [rows] = await db.query(strqry)
        res.send(rows)
    } catch (error) {
        console.log(error)
    }
}

//nuevo registro de familiares agentes 
export const newDatosAgentesFam = async (req, res) => {

    const { legajo, nombre, vinculo, tdoc, nrodoc, fechanac } = req.body
    let sqlins = `INSERT INTO familia_rrhh (legajo, nombre, vinculo, tdoc, nrodoc,fechanac) VALUES(
        ${legajo}, '${nombre}', '${vinculo}', ${tdoc}, ${nrodoc},'${fechanac}')`

    try {
        const db = await connect()
        const resu = await db.query(sqlins)
        res.send(resu)

    } catch (error) {
        console.log(error)
    }
}

//modificacion agente familiares
export const modiDatosAgentesFam = async (req, res) => {

    const { id } = req.params
    try {
        const db = await connect()
        const resu = await db.query('UPDATE familia_rrhh SET ? WHERE id=? ', [req.body, id])
        res.send(resu)
    } catch (error) {
        console.log(error)
    }
}



//datos persomicontacto
//
export const getDomiContactoAgente = async (req, res) => {

    const { legajo } = req.params
    let strqry = `SELECT * FROM perdomicontacto_rrhh WHERE legajo = ${legajo}`
    try {
        const db = await connect()
        const [rows] = await db.query(strqry)
        res.send(rows)
    } catch (error) {
        console.log(error)
    }
}

//nuevo registro de agente contacto
export const newDatosAgentesContacto = async (req, res) => {

    const { legajo, domicilio, cp, localidad, telefonoFijo, telefonoCelular, emailinstitucional, emailpersonal, telefonocontacto } = req.body
    let sqlins = `INSERT INTO perdomicontacto_rrhh(legajo,domicilio,cp,localidad,telefonoFijo,telefonoCelular,emailinstitucional,emailpersonal,telefonocontacto)VALUES(
        ${legajo},'${domicilio}','${cp}','${localidad}','${telefonoFijo}','${telefonoCelular}','${emailinstitucional}','${emailpersonal}','${telefonocontacto}')`

    console.log(legajo)
    try {
        const db = await connect()

        const resu = await db.query(sqlins)

        res.send(resu)

    } catch (error) {
        console.log(error)
    }
}

//modificar datos contacto agente
export const modiDatosAgentesContacto = async (req, res) => {

    const { legajo } = req.params
    try {
        const db = await connect()
        const resu = await db.query('UPDATE perdomicontacto_rrhh SET ? WHERE legajo=? ', [req.body, legajo])
        res.send(resu)
    } catch (error) {
        console.log(error)
    }
}

//___________FIN____________MODPER


// ##########################ver cargos vigentes e historicos


export const getlasTNroCargos = async (req, res) => {
    const { legajo } = req.params
    let strqry = `SELECT MAX(nc) AS nroC, MAX(ncg) AS nroCg FROM cargos WHERE legajo=${legajo}`
    try {
        const db = await connect()
        const [row] = await db.query(strqry)
        res.send(row)
        console.log(strqry)
    } catch (error) {
        console.log(error)
    }
}
//cargos de planta

export const getCargosPlanta = async (req, res) => {
    const { es, ppal } = req.params
    let strqry = ''
    if (es === '9' && ppal === '9') {
        strqry = `SELECT * FROM plantacargos_rrhh WHERE NOT nv='0' order by cargo`
    } else {
        strqry = `SELECT * FROM plantacargos_rrhh WHERE es='${es}' AND ppal='${ppal}' and NOT nv='0' order by cargo`
    }
    try {
        const db = await connect()
        const [rows] = await db.query(strqry)
        res.send(rows)
    } catch (error) {
        console.log(error)
    }
}
//cargos vigentes por persona
export const getCargosVigentesAgente = async (req, res) => {

    const { legajo } = req.params
    let strqry = `SELECT row_id,legajo,nc,inst,ca,es,ppal,nv,car,pl,mat,DATE_FORMAT(fechalt,"%d-%m-%Y") as fechaAlta ,nresa,DATE_FORMAT(fechbaj,"%d-%m-%Y") as fechaBaja,nresb,mb,st,ncg,titular,adic,rempla FROM cargos WHERE legajo=${legajo} and vigente='S' order by nc,fechalt`
    try {

        const db = await connect()
        const [rows] = await db.query(strqry)
        res.send(rows)
    } catch (error) {
        console.log(error)
    }
}

//cargos no vigentes por persona
export const getCargosHistoricosAgentes = async (req, res) => {

    const { legajo } = req.params

    let strqry = `SELECT row_id,legajo,nc,inst,ca,es,ppal,nv,car,pl,mat,DATE_FORMAT(fechalt,"%d-%m-%Y") as fechaAlta ,nresa,DATE_FORMAT(fechbaj,"%d-%m-%Y") as fechaBaja,nresb,mb,st,ncg,titular,adic,rempla FROM cargoant WHERE legajo=${legajo} order by nc,fechalt`
    try {

        const db = await connect()
        const [rows] = await db.query(strqry)
        res.send(rows)
    } catch (error) {
        console.log(error)
    }

}



// # Ver cargos interinos
//cargos vigentes interinos 
export const getCargosVigentesInterinos = async (req, res) => {

    let cab = 'SELECT cg.legajo,age.apellido,cg.row_id,cg.nc,cg.inst,cg.ca,cg.es,cg.ppal,cg.nv,cg.car,cg.pl,cg.mat,DATE_FORMAT(cg.fechalt,"%d-%m-%Y") as fechaAlta ,cg.nresa,cg.titular, cg.vigente,cg.adic FROM cargos as cg '
    let innerJ = 'INNER JOIN agentes as age ON age.legajo = cg.legajo '
    let whei = 'WHERE cg.vigente="S" AND ca in (2,3) order by age.apellido, cg.nc,fechalt'
    let strqry = `${cab}${innerJ}${whei}`
    try {

        const db = await connect()
        const [rows] = await db.query(strqry)
        res.send(rows)
    } catch (error) {
        console.log(error)
    }
}

//export const renovarCargo =(req,res)=>{

//}


export const darBajaCargo = async (req, res) => {

    const { nroreg, legajo, } = req.params

    let strBj = `DELETE FROM cargos WHERE legajo=${legajo} AND row_id=${nroreg} `
    /*
    if (req.body.fechab === '0') {
        strBj = `UPDATE cargos SET vigente='N', mb='${req.body.motbj}',nresb='${req.body.nroresub}' WHERE legajo=${legajo} AND row_id=${nroreg}  `
    } else {
        strBj = `UPDATE cargos SET vigente='N', mb='${req.body.motbj}',nresb='${req.body.nroresub}',fechbaj='${req.body.fechab}' WHERE legajo=${legajo} AND row_id=${nroreg}  `
    }
  */
    console.log(strBj)
    try {
        const db = await connect()
        const resu = await db.query(strBj)
        res.send(resu)
    } catch (error) {
        console.log(error)
    }
}



//eliminar un cargo historico
export const darBajaCargoHistorico = async (req, res) => {

    const { nroreg, legajo, } = req.params

    let strBj = `DELETE FROM cargoant WHERE legajo=${legajo} AND row_id=${nroreg} `
    /*
    if (req.body.fechab === '0') {
        strBj = `UPDATE cargos SET vigente='N', mb='${req.body.motbj}',nresb='${req.body.nroresub}' WHERE legajo=${legajo} AND row_id=${nroreg}  `
    } else {
        strBj = `UPDATE cargos SET vigente='N', mb='${req.body.motbj}',nresb='${req.body.nroresub}',fechbaj='${req.body.fechab}' WHERE legajo=${legajo} AND row_id=${nroreg}  `
    }
  */
    console.log(strBj)
    try {
        const db = await connect()
        const resu = await db.query(strBj)
        res.send(resu)
    } catch (error) {
        console.log(error)
    }
}


///cargo nuevo
export const createCargoNuevo = async (req, res) => {

    try {
        const { legajo, ncargo, sede, tcargo, claustro, ppal, nivel, adic, plan, codmat, fechaA, nroresA, fechaB, ncg, titu, car, rempl, st } = req.body


        let cabezaI = "INSERT INTO cargos (legajo,nc,inst,ca,es,ppal,nv,pl,mat,fechalt,nresa,adic,titular,ncg,fechbaj,car,rempla,st) VALUES("
        let valores = `${legajo},${ncargo},'${sede}','${tcargo}','${claustro}','${ppal}','${nivel}','${plan}','${codmat}','${fechaA}','${nroresA}','${adic}','${titu}','${ncg}','${fechaB}','${car}',${rempl},'${st}')`
        let strqry = `${cabezaI}${valores}`

        const db = await connect()
        const resu = await db.query(strqry)

        res.send(resu)



    } catch (error) {
        console.log(error)
    }
}

//nuevocargoHistorico
export const createCargoNuevoHist = async (req, res) => {

    try {
        const { legajo, ncargo, sede, tcargo, claustro, ppal, nivel, adic, plan, codmat, fechaA, nroresA, fechaB, nroresB, ncg, titu, car, motbj, sit, rempl } = req.body


        let cabezaI = "INSERT INTO cargoant (legajo,nc,inst,ca,es,ppal,nv,pl,mat,fechalt,nresa,adic,titular,ncg,fechbaj,nresb,car,st,mb,rempla) VALUES("
        let valores = `${legajo},${ncargo},'${sede}','${tcargo}','${claustro}','${ppal}','${nivel}','${plan}','${codmat}','${fechaA}','${nroresA}','${adic}','${titu}','${ncg}','${fechaB}','${nroresB}','${car}','${sit}','${motbj}',${rempl})`
        let strqry = `${cabezaI}${valores}`
        console.log(strqry)
        const db = await connect()
        const resu = await db.query(strqry)

        res.send(resu)



    } catch (error) {
        console.log(error)
    }

}

//modificar cargo

export const updateCargo = async (req, res) => {
    const { nroreg } = req.params

    //const {fechalt,nresa,fechbaj} =req.body


    try {
        const db = await connect()
        const resu = await db.query('UPDATE cargos SET ? WHERE row_id=? ', [req.body, nroreg])
        res.send(resu)
    } catch (error) {
        console.log(error)
    }

}


export const updateCargoH = async (req, res) => {
    const { nroreg } = req.params

    //const {fechalt,nresa,fechbaj} =req.body


    try {
        const db = await connect()
        const resu = await db.query('UPDATE cargoant SET ? WHERE row_id=? ', [req.body, nroreg])
        res.send(resu)
    } catch (error) {
        console.log(error)
    }

}



/////

// Inasistencias y Licencias

//buscar motivos inasistencias
export const getMotivosInasistencias = async (req, res) => {

    let strqry = 'SELECT * FROM motina'
    try {
        const db = await connect()
        const [rows] = await db.query(strqry)
        res.send(rows)
    } catch (error) {
        console.log(error)
    }

}




//inasistencias
//************** */
//inasistencias agentes del año en curso
export const getInasistenciasAgente = async (req, res) => {

    const { legajo, tipo, motivo } = req.params
    let fechahoy = new Date
    let anio = fechahoy.getFullYear()

    let strqry = `SELECT id_ina,nleg,nc,mot,r,DATE_FORMAT(fechcom,"%d-%m-%Y") as fechai,DATE_FORMAT(fechfin,"%d-%m-%Y") as fechaf,nres FROM inasist WHERE nleg=${legajo} and YEAR(fechcom) =${anio}  `
    let qw = ''
    if (tipo === '1') {
        qw = `ORDER BY fechcom desc`
    } else {
        qw = `AND mot=${motivo} ORDER BY fechcom desc`
    }
    strqry = strqry + qw
    console.log(tipo)
    try {
        const db = await connect()
        const [rows] = await db.query(strqry)
        res.send(rows)
    } catch (error) {
        console.log(error)
    }

}

//traer inasistencias
export const getInasistencias = async (req, res) => {

    const { legajo, fechaI, fechaF } = req.params
    let fechahoy = new Date
    let anio = fechahoy.getFullYear()

    let strqry = `SELECT id_ina,nleg,nc,mot,r,DATE_FORMAT(fechcom,"%d-%m-%Y") as fechai,DATE_FORMAT(fechfin,"%d-%m-%Y") as fechaf,nres FROM inasist WHERE nleg=${legajo} and YEAR(fechcom) =${anio}  ORDER BY fechcom desc`
    try {
        const db = await connect()
        const [rows] = await db.query(strqry)
        res.send(rows)
    } catch (error) {
        console.log(error)
    }

}

//cargar inasistencia
export const NewInasistencia = async (req, res) => {



    try {
        const { legajo, ncargo, motivo, nr, fechaini, fechafin, nrores } = req.body
        let cab = 'INSERT INTO inasist(nleg,nc,mot,r,fechcom,fechfin,nres) VALUES('
        let valores = `${legajo},${ncargo},'${motivo}','${nr}','${fechaini}','${fechafin}','${nrores}')`
        let sqli = `${cab}${valores}`
        const db = await connect()
        const resu = await db.query(sqli)
        res.send(resu)
    } catch (error) {
        console.log(error)
    }
}

// eliminar una inasistencia mal cargada
export const deleteInasistencia = async (req, res) => {

    const { id, legajo } = req.params
    try {
        let strqd = `DELETE FROM inasist WHERE id_ina=${id} AND nleg=${legajo}`
        const db = await connect()
        const resud = await db.query(strqd)
        res.send(resud)
    } catch (error) {
        console.log(error)

    }

}



//Licencias


export const getLicenciasAgente = async (req, res) => {

    const { legajo } = req.params
    //let fechahoy = new Date
    //let anio = fechahoy.getFullYear()

    let strqry = `SELECT 'C.Vig.' as ec, lic.row_id,lic.nleg,cg.ca,cg.ppal,cg.nv,lic.nc,lic.mot,lic.r,DATE_FORMAT(lic.fechcom,"%d-%m-%Y") as fechai,DATE_FORMAT(lic.fechfin,"%d-%m-%Y") as fechaf,lic.nres 
    FROM licencia as lic 
    INNER JOIN cargos as cg on cg.legajo=lic.nleg and cg.nc=lic.nc and cg.ncg=lic.ncg
    WHERE lic.nleg=${legajo} 
    UNION
    SELECT 'C.His.' as ec, lic.row_id,lic.nleg,cg.ca,cg.ppal,cg.nv,lic.nc,lic.mot,lic.r,DATE_FORMAT(lic.fechcom,"%d-%m-%Y") as fechai,DATE_FORMAT(lic.fechfin,"%d-%m-%Y") as fechaf,lic.nres 
    FROM licencia as lic 
    INNER JOIN cargoant as cg on cg.legajo=lic.nleg and cg.nc=lic.nc and cg.ncg=lic.ncg
    WHERE lic.nleg=${legajo} `

    try {
        const db = await connect()
        const [rows] = await db.query(strqry)
        res.send(rows)
    } catch (error) {
        console.log(error)
    }

}

//cargar licencias
export const NewLicencia = async (req, res) => {

    //const { idcargo } = req.params

    try {
        const { legajo, ncargo, motivo, nr, fechaini, fechafin, nrores, ncgen } = req.body
        let cab = 'INSERT INTO licencia(nleg,nc,mot,r,fechcom,fechfin,nres,ncg) VALUES('
        let valores = `${legajo},${ncargo},'${motivo}','${nr}','${fechaini}','${fechafin}','${nrores}',${ncgen})`
        let sqli = `${cab}${valores}`
        const db = await connect()
        const resu = await db.query(sqli)
        await modiCargolic(legajo, ncargo, ncgen, nr)
        res.send(resu)
    } catch (error) {
        console.log(error)
    }
}

const modiCargolic = async (legajo, ncargo, ncgen, nr) => {
    try {
        let strupdate = `UPDATE cargos SET st='${nr}' WHERE legajo=${legajo} AND nc=${ncargo} AND ncg=${ncgen}`
        const db = await connect()
        const resu = await db.query(strupdate)
        return resu
    } catch (error) {
        console.log(error)
    }
}

// eliminar una licencia mal cargada
export const deleteLicencia = async (req, res) => {

    const { id, legajo } = req.params
    try {
        let strqd = `DELETE FROM licencia WHERE row_id=${id} AND nleg=${legajo}`
        const db = await connect()
        const resud = await db.query(strqd)
        res.send(resud)
    } catch (error) {
        console.log(error)

    }

}


//
//
//consultas varias
//año de ingreso

export const getIngresoAñoAgentes = async (req, res) => {
    const { anioI, lugarI } = req.params
    try {
        let strqryC = 'SELECT age.legajo,age.apellido, DATE_FORMAT(da.fiapn,"%d-%m-%Y") as fechaIAPN,DATE_FORMAT(da.fiunc,"%d-%m-%Y") as fechaIUNC,DATE_FORMAT(da.fifce,"%d-%m-%Y") as fechaIFCE FROM datos_rrhh as da'
        let strqryI = ' INNER JOIN agentes as age ON age.legajo=da.legajo'
        let strqryW = ''
        if (lugarI === '1') {
            strqryW = ` WHERE EXTRACT(YEAR FROM fifce)=${anioI}`
        } else if (lugarI === '2') {
            strqryW = ` WHERE EXTRACT(YEAR FROM fiunc)=${anioI}`

        } else if (lugarI === '3') {
            strqryW = ` WHERE EXTRACT(YEAR FROM fiapn)=${anioI}`
        }

        let strquery = `${strqryC}${strqryI}${strqryW}`

        const db = await connect()
        const [resu] = await db.query(strquery)
        res.send(resu)
    } catch (error) {
        console.log(error)
    }
}

//verificar cumple en año corriente
export const getAgentescumpleEdad = async (req, res) => {
    const { edad } = req.params

    let strqry = `SELECT age.legajo,age.apellido, DATE_FORMAT(da.fechnac ,"%d-%m-%Y") as fechaNac,EXTRACT(YEAR FROM CURDATE()) as anioR,TIMESTAMPDIFF(YEAR,Fechnac,CURDATE()) as edad FROM datos_rrhh as da 
        INNER JOIN agentes as age ON age.legajo=da.legajo WHERE EXTRACT(YEAR FROM CURDATE()) - EXTRACT(YEAR FROM fechnac) = ${edad}`

    try {
        const db = await connect()
        const [resu] = await db.query(strqry)
        res.send(resu)
    } catch (error) {
        console.log(error)
    }
}




//lugar de nacimiento
export const getLugarNac = async (req, res) => {

    let strqry = 'SELECT * FROM codlugar_rrhh'
    try {
        const db = await connect()
        const [resu] = await db.query(strqry)
        res.send(resu)
    } catch (error) {
        console.log(error)
    }
}


//Adicionales fc y adicional por 

export const getAdicionalesAgente = async (req, res) => {

    const { legajo } = req.params
    //let fechahoy = new Date
    //let anio = fechahoy.getFullYear()

    let strqry = `SELECT id_row,row_id,legajo,nc,ppal,nv,nrores,tipoA,DATE_FORMAT(fecha_inicio,"%d-%m-%Y") as fechai,DATE_FORMAT(fecha_fin,"%d-%m-%Y") as fechaf,observacion,vigente 
    FROM adicional_rrhh WHERE legajo=${legajo} ORDER BY fecha_inicio desc`
    try {
        const db = await connect()
        const [rows] = await db.query(strqry)
        res.send(rows)
    } catch (error) {
        console.log(error)
    }

}


//cargar un adicional

export const createAdicionalNuevo = async (req, res) => {

    try {
        const { legajo, nc, fecha_inicio, nrores, fecha_fin, tipoA, observacion, vigente, ncg, ppal, nv, row_id } = req.body


        let cabezaI = "INSERT INTO adicional_rrhh (legajo,nc,fecha_inicio,nrores,fecha_fin,tipoA,observacion,vigente,ncg,ppal,nv,row_id) VALUES("
        let valores = `${legajo},${nc},'${fecha_inicio}','${nrores}','${fecha_fin}',${tipoA},'${observacion}','${vigente}',${ncg},'${ppal}','${nv}',${row_id})`
        let strqry = `${cabezaI}${valores}`

        const db = await connect()
        const resu = await db.query(strqry)

        res.send(resu)



    } catch (error) {
        console.log(error)
        //res.send(error)
    }
}

//dar baja un adicional
export const darBajaAdicional = async (req, res) => {

    const { id } = req.params

    try {
        const db = await connect()
        const resu = await db.query('UPDATE adicional_rrhh SET ? WHERE id_row=? ', [req.body, id])
        res.send(resu)

    } catch (error) {
        console.log(error)
    }
}

//borrar un adicional mal cargado

export const deleteAdicional = async (req, res) => {

    const { id, legajo } = req.params
    try {
        let strqd = `DELETE FROM adicional_rrhh WHERE id_row=${id} AND legajo=${legajo}`
        const db = await connect()
        const resud = await db.query(strqd)
        res.send(resud)
    } catch (error) {
        console.log(error)

    }

}


//&&&&########################&&&&
//datos Estudios de los agentes

export const getEstudiosAgente = async (req, res) => {

    const { legajo } = req.params
    let strqry = `SELECT es.id_row,es.legajo,tit.nombre as titulo,
     CASE es.tipotitulo WHEN 1 THEN 'Secundario' WHEN 2 THEN 'Terciario' WHEN 3 THEN 'Grado' WHEN 4 THEN 'Especialista' 
     WHEN 5 THEN 'Magister' WHEN 6 THEN 'Doctorado' WHEN 7 THEN 'Diplomatura' WHEN 8 THEN 'Curso' END AS tp, 
     CASE es.estado WHEN 1 THEN 'Finalizado' WHEN 2 THEN 'En Proceso' END AS situacion,ins.nombre as insti, est.nombre as esta, CASE es.adicional WHEN 1 THEN 'SI' WHEN 2 THEN 'NO' END AS adi 
     , es.titulo as ti, es.establecimiento as esb, es.institucion as ititu, es.estado,es.adicional,es.tipotitulo FROM dbasistencia.estudios_rrhh es
     inner join establecimientos est on est.id_row =es.establecimiento 
     inner join instituciones ins on ins.id_row =es.institucion  
     inner join titulos tit on tit.id_row = es.titulo  
     where es.legajo= ${legajo}`

    try {
        const db = await connect()
        const [rows] = await db.query(strqry)
        res.send(rows)
    } catch (error) {
        console.log(error)
    }
}

//nuevo registro de familiares agentes 
export const newDatosAgentesEstudio = async (req, res) => {

    const { legajo, tipotitulo, estado, titulo, institucion, establecimiento, adicional } = req.body
    let sqlins = `INSERT INTO estudios_rrhh (legajo, tipotitulo, estado, titulo, institucion,establecimiento ,adicional) VALUES(
        ${legajo}, ${tipotitulo}, ${estado}, ${titulo},${institucion}, ${establecimiento},${adicional})`

    try {
        const db = await connect()
        const resu = await db.query(sqlins)
        res.send(resu)

    } catch (error) {
        console.log(error)
    }
}

//modificacion agente familiares
export const modiDatosAgentesEstudio = async (req, res) => {
    //console.log(req.body)
    const { id } = req.params
    try {
        const db = await connect()
        const resu = await db.query('UPDATE estudios_rrhh SET ? WHERE id_row=? ', [req.body, id])
        //console.log('UPDATE estudios_rrhh SET ? WHERE id_row=? ', [req.body, id])
        //10.44.170.39/24 
        res.send(resu)
    } catch (error) {
        console.log(error)
    }
}

// eliminar un estudio
export const deleteDatoAgenteEstudio = async (req, res) => {

    const { id, legajo } = req.params
    try {
        let strqd = `DELETE FROM estudios_rrhh WHERE id_row=${id} AND legajo=${legajo}`
        const db = await connect()
        const resud = await db.query(strqd)
        res.send(resud)
    } catch (error) {
        console.log(error)

    }

}
//instituciones
//traer
export const getInstituciones = async (req, res) => {
    try {
        const db = await connect()
        const [rows] = await db.query('SELECT * FROM instituciones ORDER BY nombre')
        res.send(rows)
    } catch (error) {
        console.log(error)
    }
}

//grabar
export const grabarInstitucion = async (req, res) => {

    const { codigoI, nombre } = req.body
    let insStr = `INSERT INTO instituciones (codigoI, nombre) VALUES('${codigoI}','${nombre}')`

    try {
        const db = await connect()
        const resu = await db.query(insStr)
        res.send(resu)

    } catch (error) {
        console.log(error)
    }
}

//modificar
export const modiDatosInstitucion = async (req, res) => {

    const { id } = req.params

    try {
        const db = await connect()
        const resu = await db.query('UPDATE instituciones SET ? WHERE id_row=? ', [req.body, id])
        res.send(resu)
    } catch (error) {
        console.log(error)
    }
}

// eliminar una institucion
export const deleteIstitucion = async (req, res) => {

    const { id } = req.params
    try {
        let strqd = `DELETE FROM instituciones WHERE id_row=${id}`
        const db = await connect()
        const resud = await db.query(strqd)
        res.send(resud)
    } catch (error) {
        res.send(error)

    }

}

// establecimientos
export const getEstablecimientos = async (req, res) => {
    const { insti } = req.params
    try {
        const db = await connect()
        const [rows] = await db.query(`SELECT * FROM establecimientos WHERE institucion=${insti} ORDER BY nombre`)
        res.send(rows)
    } catch (error) {
        console.log(error)
    }
}
//grabar
export const grabarEstablecimiento = async (req, res) => {

    const { institucion, nombre } = req.body
    let insStr = `INSERT INTO establecimientos (institucion, nombre) VALUES(${institucion},'${nombre}')`
    try {

        const db = await connect()
        const resu = await db.query(insStr)
        res.send(resu)
    } catch (error) {
        console.log(error)
    }
}

//modificar
export const modiDatosEstablecimiento = async (req, res) => {

    const { id } = req.params
    try {

        const db = await connect()
        const resu = await db.query('UPDATE establecimientos SET ? WHERE id_row=? ', [req.body, id])
        res.send(resu)
    } catch (error) {
        console.log(error)
    }
}

// eliminar una establecimineto
export const deleteEstablecimiento = async (req, res) => {

    const { id } = req.params
    try {
        let strqd = `DELETE FROM establecimientos WHERE id_row=${id}`
        const db = await connect()
        const resud = await db.query(strqd)
        res.send(resud)
    } catch (error) {
        console.log(error)

    }

}


//titulos
export const getTitulos = async (req, res) => {

    try {
        const db = await connect()
        const [rows] = await db.query('SELECT * FROM titulos ORDER BY nombre')
        res.send(rows)
    } catch (error) {
        console.log(error)
    }
}

//grabar
export const grabarTitulo = async (req, res) => {

    const { nombre } = req.body
    let insStr = `INSERT INTO titulos(nombre) VALUES('${nombre}')`
    try {
        const db = await connect()
        const resu = await db.query(insStr)
        res.send(resu)
    } catch (error) {
        console.log(error)
    }
}

//modificar
export const modiDatosTitulo = async (req, res) => {
    const { id } = req.params
    try {
        const db = await connect()
        const resu = await db.query(`UPDATE titulos SET ? WHERE id_row=? `, [req.body, id])
        res.send(resu)
    } catch (error) {
        console.log(error)
    }
}

// eliminar un Titulo
export const deleteTitulo = async (req, res) => {

    const { id } = req.params
    try {
        let strqd = `DELETE FROM titulos WHERE id_row=${id}`
        const db = await connect()
        const resud = await db.query(strqd)
        res.send(resud)
    } catch (error) {
        console.log(error)

    }

}

export const buscarAntiguedadvaca =async (req,res)=>{
    const {legajo} = req.params

    let strqry = `SELECT * FROM vacaciones_rrhh WHERE legajo = ${legajo}`
    try {
        const db = await connect()
        const [rows] = await db.query(strqry)
        res.send(rows)
    } catch (error) {
        console.log(error)
    }



}