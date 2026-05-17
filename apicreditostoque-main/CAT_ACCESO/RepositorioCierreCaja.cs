using CAT_MODELOS;
using CAT_REPOSITORIO;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAT_ACCESO
{
    public class RepositorioCierreCaja : Repositorio<CierreCaja>, ICierreCaja
    {
        public RepositorioCierreCaja(string pConectionObjects) : base(pConectionObjects)
        {

        }

        public object getCierreCajaSaldos(int pAccion, string pFechaIni, string pFechaFin)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_CIERRECAJASALDOS_CONSULTAS";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = pAccion;

                        SqlParameter par2 = cmd.Parameters.Add("@FECHA_INI", SqlDbType.VarChar);
                        par2.Direction = ParameterDirection.Input;
                        par2.Value = pFechaIni;

                        SqlParameter par3 = cmd.Parameters.Add("@FECHA_FIN", SqlDbType.VarChar);
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
                repositorioLog.RegistrarLogError("getCierreCajaSaldos", SQLex.Message.ToString(), 0, "");

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("getCierreCajaSaldos", ex.Message.ToString(), 0, "");

                return null;
            }
        }

        public object CerrarCierreCajaSaldos(CierreCajaSaldos cierreCajaSaldos)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_CIERRECAJASALDOS_CRUD";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = 1;

                        SqlParameter par2 = cmd.Parameters.Add("@MES_CIERRE_CAJA", SqlDbType.Int);
                        par2.Direction = ParameterDirection.Input;
                        par2.Value = cierreCajaSaldos.MES_CIERRECAJA;

                        SqlParameter par3 = cmd.Parameters.Add("@ANIO_CIERRE_CAJA", SqlDbType.Int);
                        par3.Direction = ParameterDirection.Input;
                        par3.Value = cierreCajaSaldos.ANIO_CIERRECAJA;

                        SqlParameter par4 = cmd.Parameters.Add("@FECHAINI_CIERRE_CAJA", SqlDbType.VarChar);
                        par4.Direction = ParameterDirection.Input;
                        par4.Value = cierreCajaSaldos.FECHAIN_CIERRECAJA;

                        SqlParameter par5 = cmd.Parameters.Add("@FECHAFIN_CIERRE_CAJA", SqlDbType.VarChar);
                        par5.Direction = ParameterDirection.Input;
                        par5.Value = cierreCajaSaldos.FECHAFIN_CIERRECAJA;

                        SqlParameter par6 = cmd.Parameters.Add("@ACCION_CIERRRE_CAJA", SqlDbType.Int);
                        par6.Direction = ParameterDirection.Input;
                        par6.Value = cierreCajaSaldos.MOROSO_CIERRECAJA;

                        SqlParameter par7 = cmd.Parameters.Add("@FLAG_SEMANA", SqlDbType.Int);
                        par7.Direction = ParameterDirection.Input;
                        par7.Value = cierreCajaSaldos.FLAG_SEMANA;

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
                repositorioLog.RegistrarLogError("CerrarCierreCajaSaldos", SQLex.Message.ToString(), 0, "");

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("CerrarCierreCajaSaldos", ex.Message.ToString(), 0, "");

                return null;
            }
        }

        public object getCierreCajaUtilidad(int pAccion, string pFechaIni, string pFechaFin)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_CIERRECAJAUTILIDAD_CONSULTAS";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = pAccion;

                        SqlParameter par2 = cmd.Parameters.Add("@FECHA_INI", SqlDbType.VarChar);
                        par2.Direction = ParameterDirection.Input;
                        par2.Value = pFechaIni;

                        SqlParameter par3 = cmd.Parameters.Add("@FECHA_FIN", SqlDbType.VarChar);
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
                repositorioLog.RegistrarLogError("getCierreCajaUtilidad", SQLex.Message.ToString(), 0, "");

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("getCierreCajaUtilidad", ex.Message.ToString(), 0, "");

                return null;
            }
        }

        public object CerrarCierreCajaUtilidad(CierreCajaUtilidad cierreCajaUtilidad, string pDetalleCierreCaja)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_CIERRECAJAUTILIDAD_CRUD";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = 1;

                        SqlParameter par2 = cmd.Parameters.Add("@MES_CIERRE_CAJA", SqlDbType.Int);
                        par2.Direction = ParameterDirection.Input;
                        par2.Value = cierreCajaUtilidad.MES_CIERRECAJA_UTILIDAD;

                        SqlParameter par3 = cmd.Parameters.Add("@ANIO_CIERRE_CAJA", SqlDbType.Int);
                        par3.Direction = ParameterDirection.Input;
                        par3.Value = cierreCajaUtilidad.ANIO_CIERRECAJA_UTILIDAD;

                        SqlParameter par4 = cmd.Parameters.Add("@FECHAINI_CIERRE_CAJA", SqlDbType.VarChar);
                        par4.Direction = ParameterDirection.Input;
                        par4.Value = cierreCajaUtilidad.FECHAINI_CIERRECAJA_UTILIDAD;

                        SqlParameter par5 = cmd.Parameters.Add("@FECHAFIN_CIERRE_CAJA", SqlDbType.VarChar);
                        par5.Direction = ParameterDirection.Input;
                        par5.Value = cierreCajaUtilidad.FECHAFIN_CIERRECAJA_UTILIDAD;

                        SqlParameter par6 = cmd.Parameters.Add("@DETALLE_CIERRE_UTILIDAD", SqlDbType.VarChar);
                        par6.Direction = ParameterDirection.Input;
                        par6.Value = pDetalleCierreCaja;

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
                repositorioLog.RegistrarLogError("CerrarCierreCajaUtilidad", SQLex.Message.ToString(), 0, "");

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("CerrarCierreCajaUtilidad", ex.Message.ToString(), 0, "");

                return null;
            }
        }

        public object getResumenpagossegunlistacobranza(int pAccion, string pFechacierre)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_CIERRE_CAJA_DIARIO_LOAD";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = pAccion;

                        SqlParameter par2 = cmd.Parameters.Add("@FECHA_CIERRE", SqlDbType.VarChar);
                        par2.Direction = ParameterDirection.Input;
                        par2.Value = pFechacierre;


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
                repositorioLog.RegistrarLogError("getResumenpagossegunlistacobranza", SQLex.Message.ToString(), 0, "");

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("getResumenpagossegunlistacobranza", ex.Message.ToString(), 0, "");

                return null;
            }
        }

        public object RegistrarCierrecajaDiario(int pAccion, string pCierrediario, string pFechacierre, int pIdciere)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_CIERRE_CAJA_DIARIO_CRUD";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = pAccion;

                        SqlParameter par2 = cmd.Parameters.Add("@JESON_CIERRE_DIARIO", SqlDbType.VarChar);
                        par2.Direction = ParameterDirection.Input;
                        par2.Value = pCierrediario;

                        SqlParameter par3 = cmd.Parameters.Add("@FECHA_CIERRE", SqlDbType.VarChar);
                        par3.Direction = ParameterDirection.Input;
                        par3.Value = pFechacierre;

                        SqlParameter par4 = cmd.Parameters.Add("@CODIGO_CIERRE", SqlDbType.Int);
                        par4.Direction = ParameterDirection.Input;
                        par4.Value = pIdciere;

                        SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SingleResult);
                        if (dr != null)
                        {
                            while (dr.Read())
                            {
                                JsonConsulta = dr["JSON_CD"].ToString();
                            }
                        }
                        return (JsonConsulta);
                    }
                }

            }
            catch (SqlException SQLex)
            {
                RepositorioLog repositorioLog = new RepositorioLog(_conection);
                repositorioLog.RegistrarLogError("RegistrarCierrecajaDiario", SQLex.Message.ToString(), 0, pCierrediario);

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("RegistrarCierrecajaDiario", ex.Message.ToString(), 0, pCierrediario);

                return null;
            }
        }

        public object getCierrecajaDiario(int pAccion, int pCodigocierrediario)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_CIERRE_CAJA_DIARIO_SELECT";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = pAccion;

                        SqlParameter par2 = cmd.Parameters.Add("@CODIGO_CIERRE", SqlDbType.Int);
                        par2.Direction = ParameterDirection.Input;
                        par2.Value = pCodigocierrediario;


                        SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SingleResult);
                        if (dr != null)
                        {
                            while (dr.Read())
                            {
                                JsonConsulta = dr["JSON_CD"].ToString();
                            }
                        }
                        return (JsonConsulta);
                    }
                }

            }
            catch (SqlException SQLex)
            {
                RepositorioLog repositorioLog = new RepositorioLog(_conection);
                repositorioLog.RegistrarLogError("getCierrecajaDiario", SQLex.Message.ToString(), 0, "");

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("getCierrecajaDiario", ex.Message.ToString(), 0, "");

                return null;
            }
        }
    }
}
