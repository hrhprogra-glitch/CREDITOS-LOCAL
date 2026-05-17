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
    public class RepositorioReportes : Repositorio<Reporte>, IReporte
    {
        public RepositorioReportes(string pConectionObjects) : base(pConectionObjects)
        {

        }

        public object getCreditosSegunformaentregaporfecha(int pAccion, string pFechaIni, string pFechaFin)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_REPORTES_CREDITOS_SEGUN_FECHA_ENTREGA";
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
                                JsonConsulta = dr["JSON_RE"].ToString();
                            }
                        }
                        return (JsonConsulta);
                    }
                }

            }
            catch (SqlException SQLex)
            {
                RepositorioLog repositorioLog = new RepositorioLog(_conection);
                repositorioLog.RegistrarLogError("getCreditosSegunformaentregaporfecha", SQLex.Message.ToString(), 0, "");

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("getCreditosSegunformaentregaporfecha", ex.Message.ToString(), 0, "");

                return null;
            }
        }
    }
}
