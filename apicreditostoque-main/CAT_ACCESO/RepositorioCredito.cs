using System;
using CAT_MODELOS;
using CAT_REPOSITORIO;
using System.Data.SqlClient;
using System.Data;


namespace CAT_ACCESO
{
    public class RepositorioCredito : Repositorio<Credito>, ICredito
    {
        public RepositorioCredito(string pConectionObjects) : base(pConectionObjects)
        {

        }

        public object getTipoCreditos(int pAccion)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_GESTIONCREDITO_LOAD";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = pAccion;

                        SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SingleResult);
                        if (dr != null)
                        {
                            while (dr.Read())
                            {
                                JsonConsulta = dr["JSON_CREDITOLOAD"].ToString();
                            }
                        }
                        return (JsonConsulta);
                    }
                }

            }
            catch (SqlException SQLex)
            {
                RepositorioLog repositorioLog = new RepositorioLog(_conection);
                repositorioLog.RegistrarLogError("getTipoCreditos", SQLex.Message.ToString(), 0, "");

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("getTipoCreditos", ex.Message.ToString(), 0, "");

                return null;
            }
        }

        public object getPersonalCobranza(int pAccion)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_GESTIONCREDITO_LOAD";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = pAccion;

                        SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SingleResult);
                        if (dr != null)
                        {
                            while (dr.Read())
                            {
                                JsonConsulta = dr["JSON_CREDITOLOAD"].ToString();
                            }
                        }
                        return (JsonConsulta);
                    }
                }

            }
            catch (SqlException SQLex)
            {
                RepositorioLog repositorioLog = new RepositorioLog(_conection);
                repositorioLog.RegistrarLogError("getPersonalCobranza", SQLex.Message.ToString(), 0, "");

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("getPersonalCobranza", ex.Message.ToString(), 0, "");

                return null;
            }
        }

        public object GetlistarClientesAll()
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_GESTIONCREDITO_CONSULTAS";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = 6;

                        SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SingleResult);
                        if (dr != null)
                        {
                            while (dr.Read())
                            {
                                JsonConsulta = dr["JSON_CRE"].ToString();
                            }
                        }
                        return (JsonConsulta);
                    }
                }

            }
            catch (SqlException SQLex)
            {
                RepositorioLog repositorioLog = new RepositorioLog(_conection);
                repositorioLog.RegistrarLogError("getTipoCreditos", SQLex.Message.ToString(), 0, "");

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("getTipoCreditos", ex.Message.ToString(), 0, "");

                return null;
            }
        }
        public object GestionarCréditoCrud(int pAccion, string JsonCredito)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_GESTIONCREDITO_CRUD";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = pAccion;

                        SqlParameter par2 = cmd.Parameters.Add("@JSON_CREDITO", SqlDbType.VarChar);
                        par2.Direction = ParameterDirection.Input;
                        par2.Value = JsonCredito;


                        SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SingleResult);
                        if (dr != null)
                        {
                            while (dr.Read())
                            {
                                JsonConsulta = dr["JSON_CRE"].ToString();
                            }
                        }
                        return (JsonConsulta);
                    }
                }

            }
            catch (SqlException SQLex)
            {
                RepositorioLog repositorioLog = new RepositorioLog(_conection);
                repositorioLog.RegistrarLogError("GestionarCréditoCrud", SQLex.Message.ToString(), 0, JsonCredito);

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("GestionarCréditoCrud", ex.Message.ToString(), 0, JsonCredito);

                return null;
            }
        }

        public object getGestionarCreditosCliente_Consultas(int pAccion, int pCodCredito, int pCodCliente)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_GESTIONCREDITO_CONSULTAS";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = pAccion;

                        SqlParameter par2 = cmd.Parameters.Add("@ID_CREDITO", SqlDbType.Int);
                        par2.Direction = ParameterDirection.Input;
                        par2.Value = pCodCredito;

                        SqlParameter par3 = cmd.Parameters.Add("@ID_CLIENTE", SqlDbType.Int);
                        par3.Direction = ParameterDirection.Input;
                        par3.Value = pCodCliente;

                        SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SingleResult);
                        if (dr != null)
                        {
                            while (dr.Read())
                            {
                                JsonConsulta = dr["JSON_CRE"].ToString();
                            }
                        }
                        return (JsonConsulta);
                    }
                }

            }
            catch (SqlException SQLex)
            {
                RepositorioLog repositorioLog = new RepositorioLog(_conection);
                repositorioLog.RegistrarLogError("getGestionarCreditosCliente_Consultas", SQLex.Message.ToString(), 0, "");

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("getGestionarCreditosCliente_Consultas", ex.Message.ToString(), 0, "");

                return null;
            }
        }

        public object GestionarCreditoActualizarComentarioCrono(int pAccion, int pCodigoCredCrenoDeta, string pObservaciones)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_GESTIONCREDITO_CRUD";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = pAccion;

                        SqlParameter par2 = cmd.Parameters.Add("@CODIGO_CREDITO_CRONO_DE", SqlDbType.Int);
                        par2.Direction = ParameterDirection.Input;
                        par2.Value = pCodigoCredCrenoDeta;

                        SqlParameter par3 = cmd.Parameters.Add("@OBSERVACIONES", SqlDbType.VarChar);
                        par3.Direction = ParameterDirection.Input;
                        par3.Value = pObservaciones;


                        SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SingleResult);
                        if (dr != null)
                        {
                            while (dr.Read())
                            {
                                JsonConsulta = dr["JSON_CRE"].ToString();
                            }
                        }
                        return (JsonConsulta);
                    }
                }

            }
            catch (SqlException SQLex)
            {
                RepositorioLog repositorioLog = new RepositorioLog(_conection);
                repositorioLog.RegistrarLogError("GestionarCreditoActualizarComentarioCrono", SQLex.Message.ToString(), 0, "");

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("GestionarCreditoActualizarComentarioCrono", ex.Message.ToString(), 0, "");

                return null;
            }
        }

        public object ActualizarFechasPendientesCreditos()
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_GESTIONCREDITO_GENERACION_FECHAS_AUSENTES";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.CommandTimeout = 180;

                        SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SingleResult);
                       
                        return (JsonConsulta);
                    }
                }

            }
            catch (SqlException SQLex)
            {
                RepositorioLog repositorioLog = new RepositorioLog(_conection);
                repositorioLog.RegistrarLogError("ActualizarFechasPendientesCreditos", SQLex.Message.ToString(), 0, "");

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("ActualizarFechasPendientesCreditos", ex.Message.ToString(), 0, "");

                return null;
            }
        }

        public object ActualizarFechasPendientesCreditosPorCredito(int pCodigoCredito)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_GESTIONCREDITO_GENERACION_FECHAS_AUSENTES_POR_CREDITO";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.CommandTimeout = 180;

                        SqlParameter par1 = cmd.Parameters.Add("@CODIGO_CREDITO", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = pCodigoCredito;

                        SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SingleResult);

                        return (JsonConsulta);
                    }
                }

            }
            catch (SqlException SQLex)
            {
                RepositorioLog repositorioLog = new RepositorioLog(_conection);
                repositorioLog.RegistrarLogError("ActualizarFechasPendientesCreditosPorCredito", SQLex.Message.ToString(), 0, "");

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("ActualizarFechasPendientesCreditosPorCredito", ex.Message.ToString(), 0, "");

                return null;
            }
        }

        public object getCreditosPorFechaCliente(int pCodigoCliente, string pFechaIni, string pFechaFin)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_GESTIONCREDITO_CONSULTAS";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = 7;

                        SqlParameter par2 = cmd.Parameters.Add("@ID_CLIENTE", SqlDbType.Int);
                        par2.Direction = ParameterDirection.Input;
                        par2.Value = pCodigoCliente;

                        SqlParameter par3 = cmd.Parameters.Add("@FECHA_INI_SP", SqlDbType.VarChar);
                        par3.Direction = ParameterDirection.Input;
                        par3.Value = pFechaIni;

                        SqlParameter par4 = cmd.Parameters.Add("@FECHA_FIN_SP", SqlDbType.VarChar);
                        par4.Direction = ParameterDirection.Input;
                        par4.Value = pFechaFin;

                        SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SingleResult);
                        if (dr != null)
                        {
                            while (dr.Read())
                            {
                                JsonConsulta = dr["JSON_CRE"].ToString();
                            }
                        }
                        return (JsonConsulta);
                    }
                }

            }
            catch (SqlException SQLex)
            {
                RepositorioLog repositorioLog = new RepositorioLog(_conection);
                repositorioLog.RegistrarLogError("getTipoCreditos", SQLex.Message.ToString(), 0, "");

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("getTipoCreditos", ex.Message.ToString(), 0, "");

                return null;
            }
        }

        public object InsertarEliminarFormaentregaCredito(CreditoFormaEntregaupd creditoFormaEntregaupd)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_GESTIONCREDITO_FORMAENTREGA";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = creditoFormaEntregaupd.ACCION;

                        SqlParameter par2 = cmd.Parameters.Add("@CODIGO_CREDITO", SqlDbType.Int);
                        par2.Direction = ParameterDirection.Input;
                        par2.Value = creditoFormaEntregaupd.CODIGO_CREDITO;

                        SqlParameter par3 = cmd.Parameters.Add("@CODIGO_CREDITO_E", SqlDbType.Int);
                        par3.Direction = ParameterDirection.Input;
                        par3.Value = creditoFormaEntregaupd.CODIGO_CREDITO_E;

                        SqlParameter par4 = cmd.Parameters.Add("@CODIGO_ENTREGA", SqlDbType.Int);
                        par4.Direction = ParameterDirection.Input;
                        par4.Value = creditoFormaEntregaupd.CODIGO_ENTREGA;

                        SqlParameter par5 = cmd.Parameters.Add("@MONTO_ENTREGA", SqlDbType.Decimal);
                        par5.Direction = ParameterDirection.Input;
                        par5.Value = creditoFormaEntregaupd.MONTO_ENTREGA;

                        SqlParameter par6 = cmd.Parameters.Add("@NOTAS_ENTREGA", SqlDbType.VarChar);
                        par6.Direction = ParameterDirection.Input;
                        par6.Value = creditoFormaEntregaupd.NOTAS_ENTREGA;


                        SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SingleResult);
                        if (dr != null)
                        {
                            while (dr.Read())
                            {
                                JsonConsulta = dr["JSON_CRE"].ToString();
                            }
                        }
                        return (JsonConsulta);
                    }
                }

            }
            catch (SqlException SQLex)
            {
                RepositorioLog repositorioLog = new RepositorioLog(_conection);
                repositorioLog.RegistrarLogError("InsertarEliminarFormaentregaCredito", SQLex.Message.ToString(), 0, "");

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("InsertarEliminarFormaentregaCredito", ex.Message.ToString(), 0, "");

                return null;
            }
        }

        public object getListarformaentregacredito(int pAccion, int pCodigoCredito)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_GESTIONCREDITO_FORMAENTREGA_SELECT";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = pAccion;

                        SqlParameter par2 = cmd.Parameters.Add("@CODIGO_CREDITO", SqlDbType.Int);
                        par2.Direction = ParameterDirection.Input;
                        par2.Value = pCodigoCredito;


                        SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SingleResult);
                        if (dr != null)
                        {
                            while (dr.Read())
                            {
                                JsonConsulta = dr["JSON_CRE"].ToString();
                            }
                        }
                        return (JsonConsulta);
                    }
                }

            }
            catch (SqlException SQLex)
            {
                RepositorioLog repositorioLog = new RepositorioLog(_conection);
                repositorioLog.RegistrarLogError("getListarformaentregacredito", SQLex.Message.ToString(), 0, "");

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("getListarformaentregacredito", ex.Message.ToString(), 0, "");

                return null;
            }
        }
    }
}
