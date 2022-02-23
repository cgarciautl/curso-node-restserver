const {response, request, bcryptjs} = require('../helpers/requires');

const Usuario = require('../models/usuario'); //requiere el modelo de Usuario

//trae info del servidor
const usuariosGet = async (req, res = response) => {
    // const {q,nombre = 'Sin nombre',apikey} = req.query; //es un ejemplo de parametros que se enviaron en pruebas
    const {limite = 10, desde = 1} = req.query;//valores que mando en la url para saber desde y el límite de registros que quiero

    const query = {
        estado: true,
        // rol: 'ADMIN_ROLE',
        // google: false
    };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),//hace un conteo de los registros de la tabla
        Usuario.find(query)//find trae los registros de la tabla si no hay limit ni skip traerá toooodos
            .skip(Number(desde - 1))//skip sirve para saltar
            .limit(Number(limite))//limit es para limitar con un número
    ]);

    res.json({
        total, usuarios
    });
};

//Función que inserta el usuario
const usuariosPost = async (req, res = response) => {

    const {
        nombre,
        correo,
        contrasenia,
        rol
    } = req.body; //desestructuro el body con los valores que son obligatorios

    const usuario = new Usuario({
        nombre,
        correo,
        contrasenia,
        rol
    }); //mando los valores desestructurados al modelo de usuario

    //encriptar la contraseña
    //bcryptjs sirve para encriptar y según el número es la cantidad de vueltas que hace para encriptar
    //entre mayor el numero mas seguro es, pero tarda más en procesar
    const salt = bcryptjs.genSaltSync(10);

    //mando al modelo de usuario.contrasenia la clave encriptada
    usuario.contrasenia = bcryptjs.hashSync(contrasenia, salt);

    //guardar en la base de datos
    await usuario.save();

    res.json({
        msg: 'Post API - controlador',
        usuario
    });
};

//actualiza información en el servidor
const usuariosPut = async (req, res = response) => {
    const {
        idUsuario
    } = req.params;

    const {
        _id,
        contrasenia,
        google,
        correo,
        ...restUsuario
    } = req.body; //EXCLUYE DE los params a contrasenia, google y correo

    //quiere actualizar contraseña
    if (contrasenia) {
        const salt = bcryptjs.genSaltSync(10);
        restUsuario.contrasenia = bcryptjs.hashSync(contrasenia, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(idUsuario, restUsuario); //LO ENCUENTRA Y ACTUALIZA

    res.json(usuario);
};

//
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API - controlador'
    });
};

//elimina información del servidor
const usuariosDelete = async (req, res = response) => {

    const {idUsuario} = req.params;

    //Elimina al usuario de manera física
    //const usuario = await Usuario.findByIdAndDelete(idUsuario);
    const usuario = await Usuario.findByIdAndUpdate(idUsuario, {estado: false});

    res.json(usuario);
};

//se exportan las variables de cada ruta
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
};