export interface IServiceForm<I, F, R> {
    crearFormulario(inputData: I): F;
    actualizarFormulario(form: F, inputData: I): void;
    obtenerDatos(form: F): R;
    reset(form: F): void;
}