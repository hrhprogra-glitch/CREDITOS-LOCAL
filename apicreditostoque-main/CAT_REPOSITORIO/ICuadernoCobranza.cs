using CAT_MODELOS;

namespace CAT_REPOSITORIO
{
    public interface ICuadernoCobranza
    {
        object getCuadernoCobranza(int pAccion);
        object ActualizarCuadernoCobranza(ActualizarCuadernoCobranza actualizarCuadernoCobranza);
        object getCuadernoCobranzaPorRangoFecha(int pAccion, string pFechaIni, string pFechaFin);
        object getCuadernoCobranzaPorCodigoCuadernoCobranza(int pAccion, int pCodigoCuadernoCobranza);
        object ActualizarCuadernoCobranzaNotas(CuadernoCobranzaNotas cuadernoCobranzaNotas);
        object GetNotasLiastadoCobranzas(int pAccion, int pCodigoCuadernoCobranza, int pDiaCobranza);
        object getCuadernoCobranzaDepositoEfectivo(int pAccion, int pCodigoCuadernoCobranza, int pCodigoPersonalCobranza);

        object ActualizarCuadernoCobranzaDepositoEfectivo(ActualizarCuadernoCobranzaDepositoEfectivo actualizarCuadernoCobranza);
        object ActualizarNotasDepositoEfectivo(ActualizarNotasDepositoEfectivo actualizarCuadernoCobranza);
    }
}
