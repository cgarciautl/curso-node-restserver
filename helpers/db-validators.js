const {
    Categoria,
    Producto,
    Usuarios
} = require('../models');
const Role = require('../models/catalogos/role'); // se requiere el modelo de rol

/**
 * Función que sirve para poder validar el nombre del rol que ya está registrado en la BD de la tabla roles
 * @param {*} nombre 
 */
const esRolValido = async (nombre = '') => {
    const existeRol = await Role.findOne({
        nombre
    });

    if (!existeRol) {
        throw new Error(`El rol '${nombre}' no está registrado en la base de datos`);
    }
};

/**
 * Función que sirve para poder buscar el correo en los usuarios ya registrados y que no se repita
 * @param {*} correo 
 */
const existeEmail = async (correo = '') => {
    //verificar el correo
    const existeCorreo = await Usuarios.findOne({
        correo
    });

    if (existeCorreo) {
        throw new Error(`El correo ${correo} ya está registrado`);
    }
};

/**
 * Función que sirve para buscar un usuario por su id
 * @param {*} idUsuario : es el id del usuario que se desea modificar
 */
const existeUsuarioPorId = async idUsuario => {
    //verificar el id del usuario
    const existeUsuario = await Usuarios.findById({
        _id: idUsuario
    });

    if (!existeUsuario) {
        throw new Error(`El id ${idUsuario} no existe`);
    }
};

/**
 * Función que sirve para buscar una categoria por nombre
 * @param {*} nombre se pasa el nuevo nombre de la categoria
 */
const existeCategoria = async (nombreCategoria = '') => {
    const nombre = nombreCategoria.toUpperCase();

    const existeCategoria = await Categoria.findOne({
        nombre
    });

    if (existeCategoria) {
        throw new Error(`La categoría '${nombre}' ya está registrada`);
    }
};

/**
 * Función que sirve para buscar una categoria por id
 * @param {*} idCategoria 
 */
const existeCategoriaPorId = async idCategoria => {
    //verificar el id de la categoria
    const existeCategoria = await Categoria.findById({
        _id: idCategoria
    });

    if (!existeCategoria) {
        throw new Error(`El id de la categoria ${idCategoria} no existe`);
    }
};

/**
 * Función que sirve para buscar un producto por id
 * @param {*} idProducto 
 */
const existeProductoPorId = async idProducto => {
    const existeProducto = await Producto.findById({
        _id: idProducto
    });

    if (!existeProducto) {
        throw new Error(`El id del producto ${idProducto} no existe`);
    }
};

//se exportan las funciones para que sean usadas en otros archivos JS
module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorId,
    existeCategoria,
    existeCategoriaPorId,
    existeProductoPorId
};