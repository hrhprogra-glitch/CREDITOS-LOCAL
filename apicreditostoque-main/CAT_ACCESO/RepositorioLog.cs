using System;
using CAT_MODELOS;
using CAT_REPOSITORIO;
using System.Data.SqlClient;
using System.Data;

namespace CAT_ACCESO
{
    public class RepositorioLog : Repositorio<Log>, Ilog
    {
        public RepositorioLog(string pConectionObjects) : base(pConectionObjects)
        {

        }

        public void RegistrarLogError(string pMetodo, string pError, int pNumeroError, string pInput)
        {
            try
            {

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_LOG";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@MODULO", SqlDbType.VarChar);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = pMetodo;

                        SqlParameter par2 = cmd.Parameters.Add("@ERROR", SqlDbType.VarChar);
                        par2.Direction = ParameterDirection.Input;
                        par2.Value = pError;

                        SqlParameter par3 = cmd.Parameters.Add("@LINE_ERROR", SqlDbType.Int);
                        par3.Direction = ParameterDirection.Input;
                        par3.Value = pNumeroError;

                        SqlParameter par4 = cmd.Parameters.Add("@INPUT", SqlDbType.VarChar);
                        par4.Direction = ParameterDirection.Input;
                        par4.Value = pInput;

                        SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SingleResult);
                    }
                }

            }
            catch (SqlException SQLex)
            {
            }
            catch (Exception ex)
            {
            }
        }

    }
}
