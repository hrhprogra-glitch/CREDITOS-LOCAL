using System;
using CAT_MODELOS;
using CAT_REPOSITORIO;
using System.Data.SqlClient;
using System.Data;

namespace CAT_ACCESO
{
    public class RepositorioDashboard : Repositorio<Dashboard>, IDashboard
    {
        public RepositorioDashboard(string pConectionObjects) : base(pConectionObjects)
        {

        }

        public object getConsultarDashboard(int pAccion, int pEstadoCredito)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_REPORTES_DASHBOARD";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = pAccion;

                        SqlParameter par2 = cmd.Parameters.Add("@ESTADO_CREDITO", SqlDbType.Int);
                        par2.Direction = ParameterDirection.Input;
                        par2.Value = pEstadoCredito;

                        SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SingleResult);
                        if (dr != null)
                        {
                            while (dr.Read())
                            {
                                JsonConsulta = dr["JSON_DASHBOARD"].ToString();
                            }
                        }
                        return (JsonConsulta);
                    }
                }

            }
            catch (SqlException SQLex)
            {
                RepositorioLog repositorioLog = new RepositorioLog(_conection);
                repositorioLog.RegistrarLogError("getConsultarDashboard", SQLex.Message.ToString(), 0, "");

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("getConsultarDashboard", ex.Message.ToString(), 0, "");

                return null;
            }
        }
    }
}
