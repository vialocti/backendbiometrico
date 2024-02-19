import {connect} from '../database';

//solo consultas referidos a carreras, docentes y sus cargos 

/*
export const getname = async (req, res) => {
    const { parametros } = req.params
    let strqry = `SELECT * FROM tabla WHERE campo=${parametro}`
    try {
        const db = await connect() //instancia connection
        const [rows] = await db.query(strqry) //consulta
        res.send(rows) //envio del resultado
    } catch (error) {
        console.log(error)
    }
}
*/

//cantidad de cargos por tipo

export const getCoutTiposCargosDND =async (req,res)=>{
    const {claustro} = req.params
    let strqry = `elect ca,case when ca=1 then 'Efectivo' when ca=2 then 'Interino' when ca=3 then 'Interino Remplazante' when ca=4 then 'Contratado'
    when ca=5 then 'Mensualizado' when ca=6 then 'Jornalizado' when ca=7 then 'Sulente' when ca=8 then 'Asignacion' when ca=9 then 'Beca nv JTP'
    when ca=10 then 'Cargo F.Critica' when ca=11 then 'Interino M.Responzabilidad' when ca=12 then 'Interino Ord.36'
    else 'desconocido' end as tp , count(ca) from dbasistencia.cargos c where es=${claustro} group by c.ca order by c.ca`
    try {
        
    } catch (error) {
        console.log(error)
    }
}

//docentes tipo de cargo

export const getTipoCargo = async (req, res)=>{
    const {tipocargo} = req.params
    let strqry = `select c.legajo,a.apellido ,c.nc,c.inst,c.fechalt,c.ppal,c.nv, c.pl,c.car, c.mat  from dbasistencia.cargos c 
    inner join dbasistencia.agentes a on a.legajo = c.legajo 
    where es='1' and ca=${tipocargo} order by inst,a.apellido `
    try {
        const db = await connect()
        const [rows]=await db.query(strqry)
        res.send(rows)
    } catch (error) {
        console.log(error)
    }
}

