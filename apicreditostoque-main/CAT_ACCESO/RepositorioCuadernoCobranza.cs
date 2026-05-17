using System;
using CAT_MODELOS;
using CAT_REPOSITORIO;
using System.Data.SqlClient;
using System.Data;

namespace CAT_ACCESO
{
    public class RepositorioCuadernoCobranza : Repositorio<CuadernoCobranza>, ICuadernoCobranza
    {
        public RepositorioCuadernoCobranza(string pConectionObjects) : base(pConectionObjects)
        {

        }

        public object getCuadernoCobranza(int pAccion)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_CUADERNOCOBRANZA_CONSULTAS";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = pAccion;

                        SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SingleResult);
                        if (dr != null)
                        {
                            while (dr.Read())
                            {
                                JsonConsulta = dr["JSON_CC"].ToString();
                            }
                        }
                        return (JsonConsulta);
                    }
                }

            }
            catch (SqlException SQLex)
            {
                RepositorioLog repositorioLog = new RepositorioLog(_conection);
                repositorioLog.RegistrarLogError("getCuadernoCobranza", SQLex.Message.ToString(), 0, "");

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("getCuadernoCobranza", ex.Message.ToString(), 0, "");

                return null;
            }
        }

        public object ActualizarCuadernoCobranza(ActualizarCuadernoCobranza actualizarCuadernoCobranza)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_CUADERNOCOBRANZA_CRUD";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = actualizarCuadernoCobranza.ACCION;

                        SqlParameter par2 = cmd.Parameters.Add("@CODIGO_CUADERNO_COBRANZA", SqlDbType.Int);
                        par2.Direction = ParameterDirection.Input;
                        par2.Value = actualizarCuadernoCobranza.CODIGO_CUADERNO_COBRANZA;

                        SqlParameter par3 = cmd.Parameters.Add("@CODIGO_CLIENTE", SqlDbType.Int);
                        par3.Direction = ParameterDirection.Input;
                        par3.Value = actualizarCuadernoCobranza.CODIGO_CLIENTE;

                        SqlParameter par4 = cmd.Parameters.Add("@CODIGO_PERSONAL_COBRANZA", SqlDbType.Int);
                        par4.Direction = ParameterDirection.Input;
                        par4.Value = actualizarCuadernoCobranza.CODIGO_PERSONAL_COBRANZA;

                        SqlParameter par5 = cmd.Parameters.Add("@CODIGO_CREDITO", SqlDbType.Int);
                        par5.Direction = ParameterDirection.Input;
                        par5.Value = actualizarCuadernoCobranza.CODIGO_CREDITO;

                        SqlParameter par6 = cmd.Parameters.Add("@MONTO_PAGADO", SqlDbType.Decimal);
                        par6.Direction = ParameterDirection.Input;
                        par6.Value = actualizarCuadernoCobranza.MONTO_PAGADO;

                        SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SingleResult);
                        if (dr != null)
                        {
                            while (dr.Read())
                            {
                                JsonConsulta = dr["JSON_CC"].ToString();
                            }
                        }
                        return (JsonConsulta);
                    }
                }

            }
            catch (SqlException SQLex)
            {
                RepositorioLog repositorioLog = new RepositorioLog(_conection);
                repositorioLog.RegistrarLogError("ActualizarCuadernoCobranza", SQLex.Message.ToString(), 0, "");

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("ActualizarCuadernoCobranza", ex.Message.ToString(), 0, "");

                return null;
            }
        }

        public object getCuadernoCobranzaPorRangoFecha(int pAccion, string pFechaIni, string pFechaFin)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_CUADERNOCOBRANZA_CONSULTAS";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = pAccion;

                        SqlParameter par2 = cmd.Parameters.Add("@FECHA_INI_SP", SqlDbType.VarChar);
                        par2.Direction = ParameterDirection.Input;
                        par2.Value = pFechaIni;

                        SqlParameter par3 = cmd.Parameters.Add("@FECHA_FIN_SP", SqlDbType.VarChar);
                        par3.Direction = ParameterDirection.Input;
                        par3.Value = pFechaFin;

                        SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SingleResult);
                        if (dr != null)
                        {
                            while (dr.Read())
                            {
                                JsonConsulta = dr["JSON_CC"].ToString();
                            }
                        }
                        return (JsonConsulta);
                    }
                }

            }
            catch (SqlException SQLex)
            {
                RepositorioLog repositorioLog = new RepositorioLog(_conection);
                repositorioLog.RegistrarLogError("getCuadernoCobranzaPorRangoFecha", SQLex.Message.ToString(), 0, "");

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("getCuadernoCobranzaPorRangoFecha", ex.Message.ToString(), 0, "");

                return null;
            }
        }

        public object getCuadernoCobranzaPorCodigoCuadernoCobranza(int pAccion, int pCodigoCuadernoCobranza)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_CUADERNOCOBRANZA_CONSULTAS";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = pAccion;

                        SqlParameter par2 = cmd.Parameters.Add("@CODIGO_CUADERNO_COBRANZA", SqlDbType.Int);
                        par2.Direction = ParameterDirection.Input;
                        par2.Value = pCodigoCuadernoCobranza;


                        SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SingleResult);
                        if (dr != null)
                        {
                            while (dr.Read())
                            {
                                JsonConsulta = dr["JSON_CC"].ToString();
                            }
                        }
                        return (JsonConsulta);
                    }
                }

            }
            catch (SqlException SQLex)
            {
                RepositorioLog repositorioLog = new RepositorioLog(_conection);
                repositorioLog.RegistrarLogError("getCuadernoCobranzaPorCodigoCuadernoCobranza", SQLex.Message.ToString(), 0, "");

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("getCuadernoCobranzaPorCodigoCuadernoCobranza", ex.Message.ToString(), 0, "");

                return null;
            }
        }

        public object ActualizarCuadernoCobranzaNotas(CuadernoCobranzaNotas cuadernoCobranzaNotas)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_CUADERNOCOBRANZANOTAS_CRUD";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = cuadernoCobranzaNotas.ACCION;

                        SqlParameter par2 = cmd.Parameters.Add("@CODIGO_CUADERNO_COBRANZA", SqlDbType.Int);
                        par2.Direction = ParameterDirection.Input;
                        par2.Value = cuadernoCobranzaNotas.CODIGO_CUADERNOCOBRANZA;

                        SqlParameter par3 = cmd.Parameters.Add("@NUMDIA_CUADERNO_COBRANZA", SqlDbType.Int);
                        par3.Direction = ParameterDirection.Input;
                        par3.Value = cuadernoCobranzaNotas.DIASEMANA_CUADERNO_COBRANZA;

                        SqlParameter par4 = cmd.Parameters.Add("@NOTAS", SqlDbType.VarChar);
                        par4.Direction = ParameterDirection.Input;
                        par4.Value = cuadernoCobranzaNotas.NOTAS_CUDERNOCOBRANZA_N;

                        SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SingleResult);
                        if (dr != null)
                        {
                            while (dr.Read())
                            {
                                JsonConsulta = dr["JSON_CC"].ToString();
                            }
                        }
                        return (JsonConsulta);
                    }
                }

            }
            catch (SqlException SQLex)
            {
                RepositorioLog repositorioLog = new RepositorioLog(_conection);
                repositorioLog.RegistrarLogError("ActualizarCuadernoCobranzaNotas", SQLex.Message.ToString(), 0, "");

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("ActualizarCuadernoCobranzaNotas", ex.Message.ToString(), 0, "");

                return null;
            }
        }

        public object GetNotasLiastadoCobranzas(int pAccion, int pCodigoCuadernoCobranza, int pDiaCobranza)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_CUADERNOCOBRANZANOTAS_CONSULTAS";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = pAccion;

                        SqlParameter par2 = cmd.Parameters.Add("@CODIGO_CUADERNO_COBRANZA", SqlDbType.Int);
                        par2.Direction = ParameterDirection.Input;
                        par2.Value = pCodigoCuadernoCobranza;

                        SqlParameter par3 = cmd.Parameters.Add("@NUMDIA_CUADERNO_COBRANZA", SqlDbType.Int);
                        par3.Direction = ParameterDirection.Input;
                        par3.Value = pDiaCobranza;

                        SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SingleResult);
                        if (dr != null)
                        {
                            while (dr.Read())
                            {
                                JsonConsulta = dr["JSON_CC"].ToString();
                            }
                        }
                        return (JsonConsulta);
                    }
                }

            }
            catch (SqlException SQLex)
            {
                RepositorioLog repositorioLog = new RepositorioLog(_conection);
                repositorioLog.RegistrarLogError("GetNotasLiastadoCobranzas", SQLex.Message.ToString(), 0, "");

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("GetNotasLiastadoCobranzas", ex.Message.ToString(), 0, "");

                return null;
            }
        }
        public object getCuadernoCobranzaDepositoEfectivo(int pAccion, int pCodigoCuadernoCobranza, int pCodigoPersonalCobranza)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_CUADERNOCOBRANZA_DEPOSITO_EFECTIVO_CONSULTAS";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = pAccion;

                        SqlParameter par2 = cmd.Parameters.Add("@CODIGO_CUADERNO_COBRANZA", SqlDbType.Int);
                        par2.Direction = ParameterDirection.Input;
                        par2.Value = pCodigoCuadernoCobranza;

                        SqlParameter par3 = cmd.Parameters.Add("@CODIGO_PERSONAL_COBRANZA", SqlDbType.Int);
                        par3.Direction = ParameterDirection.Input;
                        par3.Value = pCodigoPersonalCobranza;

                        SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SingleResult);
                        if (dr != null)
                        {
                            while (dr.Read())
                            {
                                JsonConsulta = dr["JSON_CC"].ToString();
                            }
                        }
                        return (JsonConsulta);
                    }
                }

            }
            catch (SqlException SQLex)
            {
                RepositorioLog repositorioLog = new RepositorioLog(_conection);
                repositorioLog.RegistrarLogError("getCuadernoCobranzaDepositoEfectivo", SQLex.Message.ToString(), 0, "");

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("getCuadernoCobranzaDepositoEfectivo", ex.Message.ToString(), 0, "");

                return null;
            }
        }

        public object ActualizarCuadernoCobranzaDepositoEfectivo(ActualizarCuadernoCobranzaDepositoEfectivo actualizarCuadernoCobranza)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_CUADERNOCOBRANZA_DEPOSITO_EFECTIVO_CRUD";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = actualizarCuadernoCobranza.ACCION;

                        SqlParameter par7 = cmd.Parameters.Add("@ACCION_DE", SqlDbType.Int);
                        par7.Direction = ParameterDirection.Input;
                        par7.Value = actualizarCuadernoCobranza.ACCION_DE;

                        SqlParameter par2 = cmd.Parameters.Add("@CODIGO_CUADERNO_COBRANZA", SqlDbType.Int);
                        par2.Direction = ParameterDirection.Input;
                        par2.Value = actualizarCuadernoCobranza.CODIGO_CUADERNO_COBRANZA;

                        SqlParameter par3 = cmd.Parameters.Add("@CODIGO_CLIENTE", SqlDbType.Int);
                        par3.Direction = ParameterDirection.Input;
                        par3.Value = actualizarCuadernoCobranza.CODIGO_CLIENTE;

                        SqlParameter par4 = cmd.Parameters.Add("@CODIGO_PERSONAL_COBRANZA", SqlDbType.Int);
                        par4.Direction = ParameterDirection.Input;
                        par4.Value = actualizarCuadernoCobranza.CODIGO_PERSONAL_COBRANZA;

                        SqlParameter par5 = cmd.Parameters.Add("@CODIGO_CREDITO", SqlDbType.Int);
                        par5.Direction = ParameterDirection.Input;
                        par5.Value = actualizarCuadernoCobranza.CODIGO_CREDITO;

                        SqlParameter par6 = cmd.Parameters.Add("@MONTO_PAGADO", SqlDbType.Decimal);
                        par6.Direction = ParameterDirection.Input;
                        par6.Value = actualizarCuadernoCobranza.MONTO_PAGADO;

                        SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SingleResult);
                        if (dr != null)
                        {
                            while (dr.Read())
                            {
                                JsonConsulta = dr["JSON_CC"].ToString();
                            }
                        }
                        return (JsonConsulta);
                    }
                }

            }
            catch (SqlException SQLex)
            {
                RepositorioLog repositorioLog = new RepositorioLog(_conection);
                repositorioLog.RegistrarLogError("ActualizarCuadernoCobranzaDepositoEfectivo", SQLex.Message.ToString(), 0, "");

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("ActualizarCuadernoCobranzaDepositoEfectivo", ex.Message.ToString(), 0, "");

                return null;
            }
        }

        public object ActualizarNotasDepositoEfectivo(ActualizarNotasDepositoEfectivo actualizarCuadernoCobranza)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_CUADERNOCOBRANZA_DEPOSITO_EFECTIVO_NOTAS_CRUD";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = actualizarCuadernoCobranza.ACCION;

                        SqlParameter par2 = cmd.Parameters.Add("@CODIGO_CUADERNO_COBRANZA", SqlDbType.Int);
                        par2.Direction = ParameterDirection.Input;
                        par2.Value = actualizarCuadernoCobranza.CODIGO_CUADERNO_COBRANZA;

                        SqlParameter par3 = cmd.Parameters.Add("@CODIGO_CLIENTE", SqlDbType.Int);
                        par3.Direction = ParameterDirection.Input;
                        par3.Value = actualizarCuadernoCobranza.CODIGO_CLIENTE;

                        SqlParameter par4 = cmd.Parameters.Add("@CODIGO_PERSONAL_COBRANZA", SqlDbType.Int);
                        par4.Direction = ParameterDirection.Input;
                        par4.Value = actualizarCuadernoCobranza.CODIGO_PERSONAL_COBRANZA;

                        SqlParameter par5 = cmd.Parameters.Add("@CODIGO_CREDITO", SqlDbType.Int);
                        par5.Direction = ParameterDirection.Input;
                        par5.Value = actualizarCuadernoCobranza.CODIGO_CREDITO;

                        SqlParameter par6 = cmd.Parameters.Add("@NOTAS", SqlDbType.VarChar);
                        par6.Direction = ParameterDirection.Input;
                        par6.Value = actualizarCuadernoCobranza.NOTAS;

                        SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SingleResult);
                        if (dr != null)
                        {
                            while (dr.Read())
                            {
                                JsonConsulta = dr["JSON_CC"].ToString();
                            }
                        }
                        return (JsonConsulta);
                    }
                }

            }
            catch (SqlException SQLex)
            {
                RepositorioLog repositorioLog = new RepositorioLog(_conection);
                repositorioLog.RegistrarLogError("ActualizarNotasDepositoEfectivo", SQLex.Message.ToString(), 0, "");

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("ActualizarNotasDepositoEfectivo", ex.Message.ToString(), 0, "");

                return null;
            }
        }
    }
}
