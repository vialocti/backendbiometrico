import { connect } from '../database';


//funcion prueba agentes_all
export const getAgentes = async (req, res) => {

    try {
        const db = await connect();
        const [rows] = await db.query('SELECT legajo, apellido, condicion FROM agentes WHERE condicion in (1,2) order by condicion,apellido');
        res.send(rows)
    } catch (e) {
        console.log(e)
    }
}


//funcion agente por legajo

export const getAgente = async (req, res) => {
    const leg = req.params.legajo;

    try {
        const db = await connect();
        const [row] = await db.query(`SELECT * FROM agentes WHERE legajo=${leg}`);
        res.send(row);
    } catch (e) {
        console.log(e)
    }
}

//traer claustro 'condicion'
const traerCondi = async (legajo) => {

    try {
        const db = await connect();
        const [row] = await db.query(`SELECT condicion FROM agentes WHERE legajo=${legajo}`);
        return (row[0].condicion);
    } catch (e) {
        console.log(e)
    }
}

//
export const getAgenteLogin = async (req, res) => {

    const { legajo, passw } = req.body
    try {
        const strqry = `SELECT count(*) as existe,legajo, nrodocumento,apellido,condicion,area,encargado_area FROM agentes WHERE legajo=${legajo} AND passuser=md5(${passw})`
        //const strqry=`SELECT count(*) as existe FROM agentes WHERE legajo=${legajo} AND passuser=md5(${passw})`
        //console.log(strqry)
        const db = await connect()
        const [row] = await db.query(strqry)
        res.send(row)
    } catch (error) {
        res.send('error')
    }

}
///nuevoAgente


////cambiar password

export const changePassAgente = async (req, res) => {

    const { legajo, passwold, passnew } = req.body
    let strUp = `UPDATE agentes SET passuser=MD5(${passnew}) WHERE passuser=MD5(${passwold}) and legajo=${legajo}`
    try {
        const db = await connect()
        const [row] = await db.query(strUp)
        res.send(row)
    } catch (e) {
        console.log(e)
    }

}

////cambiar password

const existeagente = async (legajo, documento) => {
    let querystr = `SELECT COUNT(*) AS tot FROM agentes WHERE legajo=${legajo} AND nrodocumento=${documento}`
    try {
        const db = await connect()
        const [row] = await db.query(querystr)
        return row[0].tot
    } catch (error) {
        console.log(error)
    }
}


export const resetPassAgente = async (req, res) => {

    const { legajo, documento } = req.body
    let verdao = await existeagente(legajo, documento)
    console.log(verdao)
    if (verdao > 0) {
        let strUp = `UPDATE agentes SET passuser=MD5(${documento}) WHERE legajo=${legajo}`
        try {
            const db = await connect()
            const [row] = await db.query(strUp)
            res.send(row)
        } catch (e) {
            console.log(e)
        }
    } else {
        res.send('N')
    }

}

//Buscar pesona por patron apellido
export const getAgenteName = async (req, res) => {
    const strname = req.params.strpatron;
    try {
        const db = await connect();
        const [rows] = await db.query(`SELECT legajo,apellido,condicion,area,encargado_area FROM agentes WHERE apellido like '%${strname}%'`)
        res.send(rows)
    } catch (e) {
        console.log(e)
    }
}

//buscar personas por area
export const getAgentesArea = async (req, res) => {

    const { area } = req.params
    try {
        let str_sql = `SELECT area,legajo,apellido FROM agentes WHERE condicion=0 AND area='${area}' ORDER BY legajo`
        const db = await connect();
        const [rows] = await db.query(str_sql)
        res.send(rows)
    } catch (e) {
        console.log(e)
    }
}


//Buscar persona/Docente por Apellido por patron apellido
export const getDocenteName = async (req, res) => {
    const strname = req.params.strpatron;
    try {
        const db = await connect();
        const [rows] = await db.query(`SELECT legajo,apellido FROM agentes WHERE condicion=1 AND apellido like '${strname}%'`)
        res.send(rows)
    } catch (e) {
        console.log(e)
    }
}


/////////### INASISTENCIA ENTRE FECHAS

export const getInasistencias_fechas = async (req, res) => {

    const { leg, fecha_i, fecha_f } = req.params;


    let cabeza = `SELECT nleg,nc,mot,r,DATE_FORMAT(fechcom,"%d-%m-%Y") as fechai,DATE_FORMAT(fechfin,"%d-%m-%Y") as fechaf,nres FROM inasist `
    let cola = ` WHERE nleg=${leg} and fechcom>='${fecha_i}' and fechcom<='${fecha_f}'    ORDER BY fechcom `
    let strqry = `${cabeza}${cola}`
    // console.log(strqry)
    try {
        const db = await connect()
        const [rows] = await db.query(strqry)
        res.send(rows)
    } catch (error) {
        console.log(error)
    }

}
///////////////

///--------------------------
/////////////----Inasistencias Reporte--------------

export const getInasistenciasPeriodo = async (req, res) => {

    const { fecha_i, fecha_f } = req.params;

    let strqry = `SELECT ina.nleg,a.apellido,DATE_FORMAT(ina.fechcom,"%d-%m-%Y") as fechai,DATE_FORMAT(ina.fechfin,"%d-%m-%Y") as fechaf,ina.nres,ina.mot,ina.r,a.condicion FROM dbasistencia.inasist ina
     inner join dbasistencia.agentes a on a.legajo=ina.nleg 
     where fechcom BETWEEN CAST('${fecha_i}' AS DATE) AND CAST('${fecha_f}' AS DATE) order by a.apellido,fechcom,mot`
    try {
        const db = await connect()
        const [rows] = await db.query(strqry)
        res.send(rows)
    } catch (error) {
        console.log(error)
    }


}

//inasistencias total anio 02/04/32
export const getInasistenciasRpEs = async (req, res) => {

    const { legajo, fecha_i, fecha_f } = req.params;

    let strqry = `SELECT ina.mot, sum(ina.fechfin-ina.fechcom + 1) as dias FROM dbasistencia.inasist ina
    inner join dbasistencia.agentes a on a.legajo=ina.nleg  
    where fechcom BETWEEN CAST('${fecha_i}' AS DATE) AND CAST('${fecha_f}' AS DATE)
    and legajo=${legajo}  and mot in ('02','04','32') 
    group by ina.mot
    order by mot`
    try {
        const db = await connect()
        const [rows] = await db.query(strqry)
        res.send(rows)
    } catch (error) {
        console.log(error)
    }


}


///---------------------Licencias------------------
export const getLicenciasPeriodo = async (req, res) => {

    const { fecha_i, fecha_f } = req.params;

    let strqry = `SELECT lic.nleg,a.apellido,DATE_FORMAT(lic.fechcom,"%d-%m-%Y") as fechai,DATE_FORMAT(lic.fechfin,"%d-%m-%Y") as fechaf,lic.nres,lic.mot,lic.r,a.condicion,lic.nc FROM dbasistencia.licencia lic 
    inner join dbasistencia.agentes a on a.legajo=lic.nleg
    where fechcom BETWEEN CAST('${fecha_i}' AS DATE) AND CAST('${fecha_f}' AS DATE) order by a.apellido,fechcom,mot
    ` //modificado
    try {
        const db = await connect()
        const [rows] = await db.query(strqry)
        res.send(rows)
    } catch (error) {
        console.log(error)
    }


}


export const getLicenciaAgenteM = async (req, res) => {
    const { legajo, nc, ncg } = req.params
    let sqlstr = `select l.nleg,l.mot,mt.Motivo  from dbasistencia.licencia l
    inner join dbasistencia.motina mt on mt.codina = CAST (l.mot as Integer)
    where nleg=${legajo} and nc=${nc} and ncg=${ncg}`
    try {
        const db = await connect()
        const [rows] = await db.query(sqlstr)
        res.send(rows)
    } catch (error) {
        console.log(error)
    }
}

//buscar entre fechas persona

export const getHorario_persona_fechas = async (req, res) => {

    const { condi, leg, fecha_i, fecha_f } = req.params;

    try {
        let cabeza = 'SELECT age.area,age.legajo, age.apellido,DATE_FORMAT(reg.fecha,"%d-%m-%Y") as fecha, reg.Hentrada, reg.Hsalida, round(reg.cantidadHoras,2) as horasT, nroregistro,virtual FROM '
        //let cabeza='SELECT age.area,age.legajo, age.apellido,reg.fecha, reg.Hentrada, reg.Hsalida, round(reg.cantidadHoras,2) as horasT FROM ' 

        let tabla = 'registroasistenciand'
        if (condi === '0') {
            tabla = "registroasistenciand"

        } else if (condi === '1') {

            tabla = "registroasistenciad"
        }
        let cola = '';
        if (fecha_f === '0') {

            cola = ` WHERE reg.legajo=${leg} AND fecha = '${fecha_i}' order by reg.Hentrada`;
        } else {

            cola = ` WHERE reg.legajo=${leg} AND fecha>='${fecha_i}' AND fecha <='${fecha_f}' ORDER BY reg.fecha,reg.Hentrada`;
        }

        let str_query = `${cabeza} ${tabla} as reg INNER JOIN agentes as age ON age.legajo = reg.legajo ${cola}`
        const db = await connect();
        const [rows] = await db.query(str_query)
        res.send(rows)
    } catch (e) {
        console.log(e)
    }
}
//calcular dias trabajados
export const getDias_Persona_fechas = async (req, res) => {
    const { condi, leg, fecha_i, fecha_f } = req.params;

    let cabeza = ''
    try {


        if (condi === '0') {
            cabeza = 'SELECT count(distinct DATE_FORMAT(fecha,"%d-%m-%Y")) as nrodias FROM registroasistenciand'

        } else if (condi === '1') {

            cabeza = 'SELECT count(distinct DATE_FORMAT(fecha,"%d-%m-%Y")) as nrodias FROM registroasistenciand'
        }
        let cola = '';
        if (fecha_f === '0') {
            cola = ` WHERE legajo=${leg} AND fecha = '${fecha_i}'`;
        } else {
            cola = ` WHERE legajo=${leg} AND fecha>='${fecha_i}' AND fecha <='${fecha_f}'`;
        }

        let str_query = `${cabeza} ${cola}`
        const db = await connect();
        const [rows] = await db.query(str_query)
        res.send(rows)
    } catch (e) {
        console.log(e)
    }
}

//buscar entre fechas por claustro

export const getHorarioClaustroFechas = async (req, res) => {

    const { condi, fecha_i, fecha_f } = req.params


    try {
        let cabeza = 'SELECT age.area,age.legajo, age.apellido,DATE_FORMAT(reg.fecha,"%d-%m-%Y") as fecha, reg.Hentrada, reg.Hsalida,round(reg.cantidadHoras,2) as horasT, reg.nroregistro FROM '

        let tabla = 'registroasistenciand'
        if (condi === '0') {
            tabla = "registroasistenciand"

        } else if (condi === '1') {

            tabla = "registroasistenciad"
        }
        let cola = '';
        if (fecha_f === '0') {
            cola = ` WHERE fecha = '${fecha_i}' order by age.apellido,reg.fecha,reg.Hentrada`;
        } else {
            cola = ` WHERE fecha>='${fecha_i}' AND fecha <='${fecha_f}' order by age.apellido,reg.fecha,reg.Hentrada`;
        }


        let str_query = `${cabeza} ${tabla} as reg INNER JOIN agentes as age ON age.legajo = reg.legajo ${cola}`
        const db = await connect();
        const [rows] = await db.query(str_query)
        res.send(rows)
    } catch (e) {
        console.log(e)
    }

}


//cantidad de horas
export const getHorasT_Persona_fechas = async (req, res) => {

    const { condi, leg, fecha_i, fecha_f } = req.params;

    let cabeza = ''

    try {

        if (condi === '0') {
            cabeza = "SELECT round(sum (cantidadhoras),2) as horasT FROM registroasistenciand"

        } else if (condi === '1') {

            cabeza = "SELECT round(sum (cantidadhoras),2) as horasT FROM registroasistenciand"
        }
        let cola = '';
        if (fecha_f === '0') {
            cola = ` WHERE legajo=${leg} AND fecha = '${fecha_i}'`;
        } else {
            cola = ` WHERE legajo=${leg} AND fecha>='${fecha_i}' AND fecha <='${fecha_f}'`;
        }

        let str_query = `${cabeza} ${cola}`
        const db = await connect();
        const [rows] = await db.query(str_query)
        res.send(rows)
    } catch (error) {
        console.log(error)
    }
}




//buscar entre fechas por area de trabajo
export const getHorasAreadeTrabajo = async (req, res) => {

    const { area, fecha_i, fecha_f } = req.params

    try {
        let cabeza = 'SELECT age.area,age.legajo, age.apellido,DATE_FORMAT(reg.fecha,"%d-%m-%Y") as fecha, reg.Hentrada, reg.Hsalida,round(reg.cantidadHoras,2) as horasT,reg.virtual, reg.nroregistro FROM '

        let tabla = ''
        if (area === 'Docentes') {
            tabla = 'registroasistenciad'
        } else {

            tabla = 'registroasistenciand'
        }
        /*
        if(condi === '0'){
            tabla="registroasistenciand"
    
        }else if(condi === '1'){
    
            tabla="registroasistenciad"
        }
        */
        let cola = '';
        if (fecha_f === '0') {
            cola = ` WHERE fecha = '${fecha_i}' order by age.area,age.legajo,reg.fecha,reg.Hentrada`;
        } else {
            cola = ` WHERE age.area='${area}' AND fecha>='${fecha_i}' AND fecha <='${fecha_f}' order by age.area,age.apellido,reg.fecha,reg.Hentrada`;
        }


        let str_query = `${cabeza} ${tabla} as reg INNER JOIN agentes as age ON age.legajo = reg.legajo ${cola}`
        console.log(str_query)
        const db = await connect();
        const [rows] = await db.query(str_query)
        res.send(rows)
    } catch (e) {
        console.log(e)
    }

}

//arreglar asistencia

//calcular horas trabajadas
const calcularhoras = (he, hs) => {

    let thp = 0
    let tmp = 0
    let totalc = 0
    let mine = parseInt(he.substring(3, 5))
    let hore = parseInt(he.substring(0, 2))

    let mins = parseInt(hs.substring(3, 5))
    let hors = parseInt(hs.substring(0, 2))

    if (mine > mins) {
        thp = hors - hore - 1
        tmp = mins + 60 - mine
    } else {
        thp = hors - hore
        tmp = mins - mine
    }
    console.log(hore, mine, hors, mins, thp, tmp)
    totalc = thp + tmp / 60

    return totalc



}

//update horas
export const updateAsistencia = async (req, res) => {
    const { leg, nror, he, hs } = req.params

    console.log(leg)
    let condi = await traerCondi(leg)
    const ht = calcularhoras(he, hs)
    let tabla = ""
    if (condi === '2') { tabla = 'registroasistenciand' } else { tabla = 'registroasistenciad' }
    const strqUpdate = `UPDATE ${tabla} SET Hentrada='${he}', Hsalida='${hs}', cantidadHoras=${ht} WHERE nroregistro=${nror} AND legajo=${leg}`
    console.log(strqUpdate)
    try {
        const db = await connect()
        const resu = await db.query(strqUpdate)
        res.send(resu)
    } catch (error) {
        console.log(error)
    }

}


//
//
//estadisticas de promedio por claustro *promedio en funcion de nro de marcas
export const getEstadistasHorasND = async (req, res) => {

    const { condi, fecha_i, fecha_f } = req.params
    let tabla = ''
    try {

        if (condi == 1) {
            tabla = 'dbasistencia.registroasistenciad'
        } else {
            tabla = 'dbasistencia.registroasistenciand'
        }
        const db = await connect()

        let strqry = `SELECT age.legajo,age.apellido,age.condicion,age.area,  count(asis.cantidadHoras) as dias ,round(sum(asis.cantidadHoras),2) as total,round(avg(asis.cantidadHoras),2) as media  FROM dbasistencia.agentes as age  
        INNER JOIN ${tabla} as asis ON asis.legajo = age.legajo
        WHERE age.condicion=${condi} and asis.fecha>='${fecha_i}' and asis.fecha<='${fecha_f}'
        GROUP BY age.legajo,age.apellido
        ORDER BY area,dias,media DESC`


        const [rows] = await db.query(strqry)
        res.send(rows)
    } catch (e) {
        console.log(e)
    }
}




export const getEstadistasHorasD = async (req, res) => {
    const { condi, fecha_i, fecha_f } = req.params
    try {
        let strqry = `SELECT age.legajo,age.apellido,age.condicion,age.area,  count(asis.cantidadHoras) as dias ,round(sum(asis.cantidadHoras),2) as total, round(avg(asis.cantidadHoras),2) as media  FROM dbasistencia.agentes as age  
        INNER JOIN dbasistencia.registroasistenciad as asis ON asis.legajo = age.legajo
        WHERE age.condicion=${condi} and asis.fecha>='${fecha_i}' and asis.fecha<='${fecha_f}'
        GROUP BY age.legajo,age.apellido
        ORDER BY media DESC`

        const db = await connect()
        const [rows] = await db.query(strqry)
        res.send(rows)
    } catch (e) {
        console.log(e)
    }
}

// promedios ? mal
// nuevo proceso del mismo
//nuevo proceso de promedios horas y dias marcados
// suma de personas por claustro

//cantidad de horas en un dia docentes o no docentes
const cantihorasclaustrodia = async (fecha, claustro) => {
    let tabla = ''
    tabla = claustro === '1' ? 'dbasistencia.registroasistenciad' : 'dbasistencia.registroasistenciand'
    try {
        let sqlstr = `select sum(cantidadHoras) as tot from ${tabla} 
        where fecha='${fecha}'`
        const db = await connect()
        const [rows] = await db.query(sqlstr)
        //console.log()
        return rows[0].tot

    } catch (error) {
        console.log(error)
    }

}

//cantidad de personas que marcaron en el dia

const cantidadpersonasmarca = async (fecha, claustro) => {
    let tabla = ''
    tabla = claustro === '1' ? 'dbasistencia.registroasistenciad' : 'dbasistencia.registroasistenciand'
    try {
        let sqlstr = `select distinct legajo from ${tabla} 
        where fecha='${fecha}'`
        const db = await connect()
        const [rows] = await db.query(sqlstr)
        return rows.length

    } catch (error) {
        console.log(error)
    }

}



export const traerDatosPromedia = async (req, res) => {

    const { fecha, claustro } = req.params
    let horasdoc = 0.0
    let horasnodoc = 0.0
    let registrosdoc = 0
    let registrosnodoc = 0

    try {
        if (claustro === '1') {
            horasdoc = await cantihorasclaustrodia(fecha, claustro)
            registrosdoc = await cantidadpersonasmarca(fecha, claustro)
            res.send({ 'horas': horasdoc, 'nroreg': registrosdoc })
        } else if (claustro === '2') {

            horasnodoc = await cantihorasclaustrodia(fecha, claustro)
            registrosnodoc = await cantidadpersonasmarca(fecha, claustro)
            res.send({ 'horas': horasnodoc, 'nroreg': registrosnodoc })
        }
        //console.log(horasdoc, horasnodoc, registrosdoc, registrosnodoc)

    } catch (error) {
        console.log(error)
    }
}

//////traer datos dia a dia

///nuevo registro


export const newRegistroasistencia = async (req, res) => {

    const { condi, legajo, fecha, hora } = req.body

    let tabla = ''
    if (condi === '1') {
        tabla = 'registroasistenciad'
    } else {
        tabla = 'registroasistenciand'
    }
    let cab = `INSERT INTO ${tabla} (legajo,fecha,Hentrada,virtual) VALUES(`
    let valores = `${legajo},'${fecha}','${hora}','V')`
    let sqli = `${cab}${valores}`
    try {
        const db = await connect()
        const resu = await db.query(sqli)
        res.send(resu)
    } catch (error) {
        console.log(error)
    }

}

//registrar salida virtual   

export const registrarSalida = async (req, res) => {


    const { condi, legajo, nroregistro } = req.params


    let tabla = ''
    if (condi === '1') {
        tabla = 'registroasistenciad'
    } else {
        tabla = 'registroasistenciand'
    }

    //let horastr = await calcularHorasTrabajadas(condi,legajo,fecha,hora)
    let cab = `UPDATE ${tabla} set Hsalida= '${req.body.hora}', cantidadHoras='${req.body.horastr}',virtual='V' `
    let condicion = ` WHERE nroregistro=${nroregistro} AND legajo=${legajo}`
    let sqlu = `${cab}${condicion}`
    try {
        const db = await connect()
        const resu = await db.query(sqlu)
        res.send(resu)
    } catch (error) {
        console.log(error)
    }
}

// acreditacion de horas
export const acreditarHorarioVirtual = async (req, res) => {


    const { legajo, nroregistro } = req.params
    let condi = await traerCondi(legajo)

    let tabla = ''
    if (condi === 1) {
        tabla = 'registroasistenciad'
    } else {
        tabla = 'registroasistenciand'
    }

    //let horastr = await calcularHorasTrabajadas(condi,legajo,fecha,hora)
    let cab = `UPDATE ${tabla} set virtual= 'A'`
    let condicion = ` WHERE nroregistro=${nroregistro} AND legajo=${legajo}`
    let sqlu = `${cab}${condicion}`
    try {
        const db = await connect()
        const resu = await db.query(sqlu)
        res.send(resu)
    } catch (error) {
        console.log(error)
    }

}




//listado de Inasistencias 


//buscar Asistentes fecha

const setPresentes = (datos) => {

    try {

    } catch (error) {
        console.log(error)
    }
}


const setAusenteAgente = async () => {

    let sqlu = "update dbasistencia.agentes set asistencia='A' where condicion=2 and not asistencia in ('L','O','V')"

    try {
        const db = await connect()
        const resu = await db.query(sqlu)

    } catch (error) {
        console.log(error)
    }
}
const buscarAsistenteFecha = async (fecha) => {

    let sqlstr = `update dbasistencia.agentes set asistencia='P' where condicion=2 and legajo in (
        select DISTINCT age.legajo from dbasistencia.agentes age 
        inner join dbasistencia.registroasistenciand ran on ran.legajo=age.legajo
        where age.condicion=2 and asistencia='A' and fecha='${fecha}}')
    `

    try {

        const db = await connect()
        const resu = await db.query(sqlstr)

    } catch (error) {
        console.log(error)
    }
}

export const buscarAusentes = async (req, res) => {
    const { fecha } = req.params

    let sqlstr = "SELECT legajo,apellido,area,asistencia FROM dbasistencia.agentes WHERE condicion='2' AND asistencia in ('A','L') order by apellido  "

    try {
        await setAusenteAgente()
        await buscarAsistenteFecha(fecha)
        const db = await connect()
        const [resu] = await db.query(sqlstr)
        res.send(resu)

    } catch (error) {
        console.log(error)
    }
}


//datos asistencia por tipo online
//

//cantidad de agentes docentes presencial
const cantiMarcaDocPre = async (fecha) => {
    let sqlstr = `select distinct legajo from dbasistencia.registroasistenciad 
    where fecha='${fecha}' and virtual='P'`
    try {
        const db = await connect()
        const [resu] = await db.query(sqlstr)
        //console.log(resu.length)
        return resu.length
    } catch (error) {
        console.log(error)
    }
}

//cantidad de agentes docentes virtuales
const cantiMarcaDocVirt = async (fecha) => {
    let sqlstr = `select distinct legajo from dbasistencia.registroasistenciad 
    where fecha='${fecha}' and virtual='V'`
    try {
        const db = await connect()
        const [resu] = await db.query(sqlstr)
        return resu.length
    } catch (error) {
        console.log(error)
    }
}

//solo aquellos presentes presenciales 
const cantiMarcaDocPPresentes = async (fecha) => {
    let sqlstr = `select distinct legajo  from dbasistencia.registroasistenciad 
    where fecha='${fecha}' and Hsalida='X' and virtual='P'`
    try {
        const db = await connect()
        const [resu] = await db.query(sqlstr)
        return resu.length
    } catch (error) {
        console.log(error)
    }
}

//solo aquellos docentes presentes virtuales
const cantiMarcaDocVPresentes = async (fecha) => {
    let sqlstr = `select distinct legajo from dbasistencia.registroasistenciad 
    where fecha='${fecha}' and Hsalida='X'  and virtual='V'`
    try {
        const db = await connect()
        const [resu] = await db.query(sqlstr)
        return resu.length
    } catch (error) {
        console.log(error)
    }
}




//asistencia presencial no docentes
const cantiMarcaNoDocPre = async (fecha) => {
    let sqlstr = `select distinct legajo  from dbasistencia.registroasistenciand 
    where fecha='${fecha}' and virtual='P'`
    try {
        const db = await connect()
        const [resu] = await db.query(sqlstr)
        return resu.length
    } catch (error) {
        console.log(error)
    }
}

//asistencia virtual no docentes
const cantiMarcaNoDocVirt = async (fecha) => {
    let sqlstr = `select distinct legajo  from dbasistencia.registroasistenciand 
    where fecha='${fecha}' and virtual='V'`
    try {
        const db = await connect()
        const [resu] = await db.query(sqlstr)
        return resu.length
    } catch (error) {
        console.log(error)
    }
}


//no docentes presentes presencial
const cantiMarcaNoDocPPresentes = async (fecha) => {
    let sqlstr = `select distinct legajo  from dbasistencia.registroasistenciand 
    where fecha='${fecha}' and Hsalida='X' and virtual='P'`
    try {
        const db = await connect()
        const [resu] = await db.query(sqlstr)
        //console.log(resu.rows)
        return resu.length
    } catch (error) {
        console.log(error)
    }
}

//no docentes presentes viruales
const cantiMarcaNoDocVPresentes = async (fecha) => {
    let sqlstr = `select distinct legajo  from dbasistencia.registroasistenciand 
    where fecha='${fecha}' and Hsalida='X' and virtual='V'`
    try {
        const db = await connect()
        const [resu] = await db.query(sqlstr)
        return resu.length
    } catch (error) {
        console.log(error)
    }
}



//recolector de info de registro doc, no doc, presencial y virtual
export const getAsistenciadia = async (req, res) => {

    const { fecha } = req.params


    let datosAsistencia = {

        docmarcadosP: 0,
        docmarcadosV: 0,
        docmarcadosPS: 0,
        docmarcadosVS: 0,
        NdocmarcadosP: 0,
        NdocmarcadosV: 0,
        NdocmarcadosPS: 0,
        NdocmarcadosVS: 0,
    }

    try {

        datosAsistencia = {
            docmarcadosP: await cantiMarcaDocPre(fecha),
            docmarcadosV: await cantiMarcaDocVirt(fecha),
            docmarcadosPS: await cantiMarcaDocPPresentes(fecha),
            docmarcadosVS: await cantiMarcaDocVPresentes(fecha),

            NdocmarcadosP: await cantiMarcaNoDocPre(fecha),
            NdocmarcadosV: await cantiMarcaNoDocVirt(fecha),
            NdocmarcadosPS: await cantiMarcaNoDocPPresentes(fecha),
            NdocmarcadosVS: await cantiMarcaNoDocVPresentes(fecha),
        }
        console.log(datosAsistencia)
        res.send(datosAsistencia)

    } catch (error) {
        console.log(error)
    }
}



