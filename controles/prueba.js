;
let config = require('../knexfile');
let env = 'development';
let db = require('knex')(config[env]);

let getDatos = (req, res) => {
    let tabla = req.query.tabla;
    let campo = req.query.campo;
    db.select(campo).from(tabla)
        .then(resultado => {
            return res.status(200).json({
                ok: true,
                datos: resultado
            })
        })

    .catch((error) => {
        return res.status(500).json({
            ok: false,
            datos: null,
            sms: `Error del servidor ${error}`
        })
    })
}

let postDatos = (req, res) => {
    let tabla = req.body.tabla
    let datos = req.body.datos
    db(tabla).returning('id').insert(datos)
        .then(resultado => {
            return res.status(200).json({
                ok: true,
                data: resultado,
                mensaje: `Se insertaron los datos`
            })
        })

    .catch((error) => {
        return res.status(500).json({
            ok: false,
            data: null,
            mensaje: `Error del servidor: ${error}`
        })
    })
}

let updateDatos = (req, res) => {
    let tabla = req.body.tabla
    let datos = req.body.datos
    datos.forEach(element => {
        db(tabla).where('id', element.id).update(element)
            .then(resultado => {
                return res.status(200).json({
                    ok: true,
                    data: resultado,
                    mensaje: `se actualizo el registro`
                })
            })
            .catch((error) => {
                return res.status(500).json({
                    ok: false,
                    data: null,
                    mensaje: `error ${error}`
                })
            })
    })
}


let deleteDatos = (req, res) => {
    let tabla = req.body.tabla
    let dataId = req.body.datoId
    db(tabla).where('id', dataId).delete()
        .then(resultado => {
            return res.status(200).json({
                ok: true,
                datos: resultado
            })
        })

    .catch((error) => {
        return res.status(500).json({
            ok: false,
            datos: null,
            sms: `Error en el servidor ${error}`
        })
    })
}

module.exports = {
    getDatos,
    postDatos,
    updateDatos,
    deleteDatos,

}