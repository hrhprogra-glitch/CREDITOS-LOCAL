using System;
using CAT_MODELOS;
using CAT_REPOSITORIO;
using System.Data.SqlClient;
using System.Data;



namespace CAT_ACCESO
{
    public class RepositorioSeguridad : Repositorio<Usuario>, ISeguridad
    {
        public RepositorioSeguridad(string pConectionObjects) : base(pConectionObjects)
        {

        }
        public object getAutenticacionUsuario(int pAccion, string usuario, string passwword)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_AUTENTICACION";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = pAccion;

                        SqlParameter par2 = cmd.Parameters.Add("@USUARIO", SqlDbType.VarChar);
                        par2.Direction = ParameterDirection.Input;
                        par2.Value = usuario;

                        SqlParameter par3 = cmd.Parameters.Add("@PASSWORD", SqlDbType.VarChar);
                        par3.Direction = ParameterDirection.Input;
                        par3.Value = passwword;

                        SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SingleResult);
                        if (dr != null)
                        {
                            while (dr.Read())
                            {
                                JsonConsulta = dr["JSON_SEG"].ToString();
                            }
                        }
                        return (JsonConsulta);
                    }
                }

            }
            catch (SqlException SQLex)
            {
                RepositorioLog repositorioLog = new RepositorioLog(_conection);
                repositorioLog.RegistrarLogError("getAutenticacionUsuario", SQLex.Message.ToString(), 0, "");

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("getAutenticacionUsuario", ex.Message.ToString(), 0, "");

                return null;
            }
        }
    }
}
