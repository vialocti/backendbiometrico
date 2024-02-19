import { connect } from '../database';

export const getMaterias = async (req, res) => {
    const { carrera, plan } = req.params;
    console.log(carrera, plan)
    let strqy
    try {

        const db = await connect();
        if (carrera === '1' && plan === '1') {
            strqy = `SELECT * FROM materias order by car,materia`
        } else {
            strqy = `SELECT * FROM materias where car=${carrera} and pl=${plan}`
        }
        const [rows] = await db.query(strqy);
        res.send(rows);
    }
    catch (e) {
        console.log(e)
    }
}
//buscar docentes
export const getDocentes = async (req, res) => {
    const { patron } = req.params;
    var strqy = ''
    try {
        const db = await connect();

        if (patron == 1) {

            strqy = `SELECT legajo, apellido FROM agentes WHERE condicion=1 order by apellido`

        } else {
            strqy = `SELECT legajo, apellido FROM agentes WHERE condicion=1 AND apellido like '${patron}%' order by apellido`
        }

        const [rows] = await db.query(strqy)
        res.send(rows)
    } catch (e) {
        console.log(e)
    }

}


export const getHconsultaMateria = async (req, res) => {
    const { sede, carrera, plan, id_mater } = req.params;

    try {
        const db = await connect();
        let cabecera = `SELECT hc.id_hora,hc.leg,ag.apellido,hc.lunes,hc.martes,hc.miercoles,hc.jueves,hc.viernes,hc.sabado,hc.sede,hc.carrera,hc.lugar_c from diahoraconsu as hc`
        let innerj = ' INNER JOIN agentes as ag ON ag.legajo = hc.leg'
        let condi = `  WHERE hc.vigente='S' AND hc.id_mat = ${id_mater} and hc.sede=${sede} and carrera='${carrera}' and plan='${plan}' order by ag.apellido`

        let strqy = cabecera + innerj + condi
        console.warn(strqy)
        const [rows] = await db.query(strqy);
        res.send(rows)
    } catch (e) {
        console.log(e)
    }
}

export const getCatedraIntegrantes = async (req, res) => {
    const { sede, carrera, idmat, tipo } = req.params
    console.log(idmat)
    let pl = idmat.substring(0, 1)
    let mat = idmat.substring(1, 4)
    try {
        let sqlstr_1 = 'select cg.inst,cg.ca, cg.legajo,ag.apellido,cg.ppal,cg.nv,plc.cargo  from dbasistencia.cargos as cg '
        let sqlstr_i1 = 'inner join dbasistencia.agentes as ag on ag.legajo=cg.legajo '
        let sqlstr_i2 = 'inner join dbasistencia.plantacargos_rrhh as plc on CAST(plc.nv AS INT)=CAST(cg.nv AS INT) and plc.ppal =cg.ppal '
        let strqy = ''
        if (tipo === 'C') {
            if (carrera === '8' || carrera === '2') {
                strqy = `where inst in ('1','2') and car='${carrera}' and pl='${pl}' and mat='${mat}' order by cg.inst,cg.nv`
            } else if (carrera === '7') {
                strqy = `where inst='4' and car='${carrera}' and pl='${pl}' and mat='${mat}' order by cg.inst,cg.nv`
            } else {
                strqy = `where inst=${sede} and car='${carrera}' and pl='${pl}' and mat='${mat}' order by cg.inst,cg.nv`
            }
        } else if (tipo === 'L') {

            strqy = `where inst='${sede}' and car='${carrera}' and pl='${pl}' and mat='${mat}' order by cg.inst, cg.nv`
        }
        let sqlstr = `${sqlstr_1}${sqlstr_i1}${sqlstr_i2}${strqy}`
        console.log(sqlstr)
        const db = await connect()
        const [rows] = await db.query(sqlstr)
        res.send(rows)

    } catch (error) {
        console.log(error)
    }
}


//traer materias con carga y vigentes
export const getMateriasVigentes = async (req, res) => {
    const { sede, carrera, plan } = req.params;
    try {
        const db = await connect();

        let cabecera = `SELECT distinct hc.id_mat,mat.materia, hc.catedra  FROM diahoraconsu as hc`
        let innerj = ` INNER JOIN materias as mat on mat.id_materia = hc.id_mat`
        let condi = ` WHERE vigente='S' and sede=${sede} and carrera='${carrera}' and plan='${plan}' order by mat.materia`
        let strqy = cabecera + innerj + condi

        const [rows] = await db.query(strqy);


        res.send(rows)

    } catch (e) {
        console.log(e)
    }
}


export const newHorario = async (req, res) => {
    const { legdoc, materia, sede, carrera, plan, catedra, lunes_c, martes_c, miercoles_c, jueves_c, viernes_c, sabado_c, lugar_c, fecha_i } = req.body;

    try {
        const db = await connect();
        let cab = `INSERT INTO diahoraconsu (leg,id_mat,f_inicio,lunes,martes,miercoles,jueves,viernes`
        let cab1 = `,sabado,lugar_c,carrera,catedra,plan,sede) VALUES (${legdoc},${materia},'${fecha_i}','${lunes_c}','${martes_c}','${miercoles_c}',`
        let cab2 = `'${jueves_c}','${viernes_c}','${sabado_c}','${lugar_c}','${carrera}','${catedra}',${plan},${sede})`
        let sqli = `${cab}${cab1}${cab2}`
        //console.warn(sqli)
        const resu = await db.query(sqli)
        res.send(resu)
    } catch (error) {
        console.log(error)
    }


}

export const bajaHorario = async (req, res) => {

    const { id_hora } = req.params;

    try {
        const db = await connect();

        const resu = await db.query('UPDATE diahoraconsu SET ? WHERE id_hora=?', [req.body, id_hora])

        res.send(resu)
    } catch (error) {
        console.log(error)
    }


}

export const updateHorario = async (req, res) => {
    const { id_hora } = req.params

    try {
        const db = await connect()
        const resu = await db.query('UPDATE diahoraconsu SET ? WHERE id_hora=?', [req.body, id_hora])
        res.send(resu)
    } catch (error) {
        console.log(error)
    }
}

