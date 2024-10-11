function manejoErrores(err, req, res, next) {
    console.error(err);
    const statusCode = err.status || 500;
    const message = err.message || 'Ha ocurrido un error inesperado.';
    // Envio respuesta de error
    res.status(statusCode).json({
        success: false,
        message,
    });
}
export { manejoErrores };
//# sourceMappingURL=manejoErrores.js.map