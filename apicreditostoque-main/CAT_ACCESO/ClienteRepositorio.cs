using System;
using CAT_MODELOS;
using CAT_REPOSITORIO;
using System.Data.SqlClient;
using System.Data;

namespace CAT_ACCESO
{
    public class ClienteRepositorio : Repositorio<Cliente>, ICliente
    {
        public ClienteRepositorio(string pConectionObjects) : base(pConectionObjects)
        {

        }

        public object getTipoClientes(int pAccion)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_GESTIONCLIENTE_LOAD";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = pAccion;

                        SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SingleResult);
                        if (dr != null)
                        {
                            while (dr.Read())
                            {
                                JsonConsulta = dr["JSON_CLIENTELOAD"].ToString();
                            }
                        }
                        return (JsonConsulta);
                    }
                }

            }
            catch (SqlException SQLex)
            {
                RepositorioLog repositorioLog = new RepositorioLog(_conection);
                repositorioLog.RegistrarLogError("getTipoClientes",SQLex.Message.ToString(),0,"");

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("getTipoClientes", ex.Message.ToString(), 0, "");

                return null;
            }
        }

        public object getTipoDocumentoClientes(int pAccion, int pTipoCliente)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_GESTIONCLIENTE_LOAD";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = pAccion;

                        SqlParameter par2 = cmd.Parameters.Add("@ID_TIPO_CLIENTE", SqlDbType.Int);
                        par2.Direction = ParameterDirection.Input;
                        par2.Value = pTipoCliente;

                        SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SingleResult);
                        if (dr != null)
                        {
                            while (dr.Read())
                            {
                                JsonConsulta = dr["JSON_CLIENTELOAD"].ToString();
                            }
                        }
                        return (JsonConsulta);
                    }
                }

            }
            catch (SqlException SQLex)
            {
                RepositorioLog repositorioLog = new RepositorioLog(_conection);
                repositorioLog.RegistrarLogError("getTipoDocumentoClientes", SQLex.Message.ToString(), 0, "");

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("getTipoDocumentoClientes", ex.Message.ToString(), 0, "");

                return null;
            }
        }

        public object getListarClienteAval(int pAccion, int pCodigoCliente, string pDocumentoCliente, string pNomRazonSocial)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_GESTIONCLIENTE_LISTARAVAL";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = pAccion;

                        SqlParameter par2 = cmd.Parameters.Add("@CODIGO_CLIENTE", SqlDbType.Int);
                        par2.Direction = ParameterDirection.Input;
                        par2.Value = pCodigoCliente;

                        SqlParameter par3 = cmd.Parameters.Add("@DOCUMENTO", SqlDbType.VarChar);
                        par3.Direction = ParameterDirection.Input;
                        par3.Value = pDocumentoCliente;

                        SqlParameter par4 = cmd.Parameters.Add("@NOMBRES_RAZONSOCIAL", SqlDbType.VarChar);
                        par4.Direction = ParameterDirection.Input;
                        par4.Value = pNomRazonSocial;

                        SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SingleResult);
                        if (dr != null)
                        {
                            while (dr.Read())
                            {
                                JsonConsulta = dr["JSON_CLIAVAL"].ToString();
                            }
                        }
                        return (JsonConsulta);
                    }
                }

            }
            catch (SqlException SQLex)
            {
                RepositorioLog repositorioLog = new RepositorioLog(_conection);
                repositorioLog.RegistrarLogError("getListarClienteAval", SQLex.Message.ToString(), 0, "");

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("getListarClienteAval", ex.Message.ToString(), 0, "");

                return null;
            }
        }

        public object GestionarClienteCrud(int pAccion, string JsonCliente)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_GESTIONCLIENTE_CRUD";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = pAccion;

                        SqlParameter par2 = cmd.Parameters.Add("@JSON_CLIENTE", SqlDbType.VarChar);
                        par2.Direction = ParameterDirection.Input;
                        par2.Value = JsonCliente;


                        SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SingleResult);
                        if (dr != null)
                        {
                            while (dr.Read())
                            {
                                JsonConsulta = dr["JSON_CLI"].ToString();
                            }
                        }
                        return (JsonConsulta);
                    }
                }

            }
            catch (SqlException SQLex)
            {
                RepositorioLog repositorioLog = new RepositorioLog(_conection);
                repositorioLog.RegistrarLogError("GestionarClienteCrud", SQLex.Message.ToString(), 0, JsonCliente);

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("GestionarClienteCrud", ex.Message.ToString(), 0, JsonCliente);

                return null;
            }
        }

        public object getGestionarClientes_Consultas(int pAccion, int pCodigoCliente)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_GESTIONCLIENTE_CONSULTAS";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = pAccion;

                        SqlParameter par2 = cmd.Parameters.Add("@CODIGO_CLIENTE", SqlDbType.Int);
                        par2.Direction = ParameterDirection.Input;
                        par2.Value = pCodigoCliente;


                        SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SingleResult);
                        if (dr != null)
                        {
                            while (dr.Read())
                            {
                                JsonConsulta = dr["JSON_CLI"].ToString();
                            }
                        }
                        return (JsonConsulta);
                    }
                }

            }
            catch (SqlException SQLex)
            {
                RepositorioLog repositorioLog = new RepositorioLog(_conection);
                repositorioLog.RegistrarLogError("getGestionarClientes_Consultas", SQLex.Message.ToString(), 0, "");

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("getGestionarClientes_Consultas", ex.Message.ToString(), 0, "");

                return null;
            }
        }

        public object InsertClienteSeguimiento(ClienteSeguimiento clienteSeguimiento)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_CLIENTE_SEGUIMIENTO";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = clienteSeguimiento.ACCION;

                        SqlParameter par2 = cmd.Parameters.Add("@CODIGO_CLIENTE", SqlDbType.Int);
                        par2.Direction = ParameterDirection.Input;
                        par2.Value = clienteSeguimiento.CODIGO_CLIENTE;

                        SqlParameter par3 = cmd.Parameters.Add("@CODIGO_CLIENTE_S", SqlDbType.Int);
                        par3.Direction = ParameterDirection.Input;
                        par3.Value = clienteSeguimiento.CODIGO_CLIENTE_S;

                        SqlParameter par4 = cmd.Parameters.Add("@NOTAS", SqlDbType.VarChar);
                        par4.Direction = ParameterDirection.Input;
                        par4.Value = clienteSeguimiento.NOTAS_S;

                        SqlParameter par5 = cmd.Parameters.Add("@USUARIO_S", SqlDbType.VarChar);
                        par5.Direction = ParameterDirection.Input;
                        par5.Value = clienteSeguimiento.USUARIO_S;


                        SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SingleResult);
                        if (dr != null)
                        {
                            while (dr.Read())
                            {
                                JsonConsulta = dr["JSON_CLI"].ToString();
                            }
                        }
                        return (JsonConsulta);
                    }
                }

            }
            catch (SqlException SQLex)
            {
                RepositorioLog repositorioLog = new RepositorioLog(_conection);
                repositorioLog.RegistrarLogError("InsertClienteSeguimiento", SQLex.Message.ToString(), 0, Convert.ToString(clienteSeguimiento.CODIGO_CLIENTE) );

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("InsertClienteSeguimiento", ex.Message.ToString(), 0, Convert.ToString(clienteSeguimiento.CODIGO_CLIENTE));

                return null;
            }
        }

        public object getListarClienteSeguimiento(int pAccion, int pCodigoCliente)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_CLIENTE_SEGUIMIENTO_SELECT";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = pAccion;

                        SqlParameter par2 = cmd.Parameters.Add("@CODIGO_CLIENTE", SqlDbType.Int);
                        par2.Direction = ParameterDirection.Input;
                        par2.Value = pCodigoCliente;


                        SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SingleResult);
                        if (dr != null)
                        {
                            while (dr.Read())
                            {
                                JsonConsulta = dr["JSON_CLI"].ToString();
                            }
                        }
                        return (JsonConsulta);
                    }
                }

            }
            catch (SqlException SQLex)
            {
                RepositorioLog repositorioLog = new RepositorioLog(_conection);
                repositorioLog.RegistrarLogError("getListarClienteSeguimiento", SQLex.Message.ToString(), 0, "");

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("getListarClienteSeguimiento", ex.Message.ToString(), 0, "");

                return null;
            }
        }

        public object InsertClienteDocumento(int pAccion, int pCodCli,int pCodcliFile, string pNamearchivoOri, string pNamearchivoSer)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_CLIENTE_FILES";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = pAccion;

                        SqlParameter par2 = cmd.Parameters.Add("@CODIGO_CLIENTE", SqlDbType.Int);
                        par2.Direction = ParameterDirection.Input;
                        par2.Value = pCodCli;

                        SqlParameter par3 = cmd.Parameters.Add("@CODIGO_CLIENTE_D", SqlDbType.Int);
                        par3.Direction = ParameterDirection.Input;
                        par3.Value = pCodcliFile;


                        SqlParameter par4 = cmd.Parameters.Add("@NAME_ARCHI_ORI", SqlDbType.VarChar);
                        par4.Direction = ParameterDirection.Input;
                        par4.Value = pNamearchivoOri;

                        SqlParameter par5 = cmd.Parameters.Add("@NAME_ARCHIVO_SER", SqlDbType.VarChar);
                        par5.Direction = ParameterDirection.Input;
                        par5.Value = pNamearchivoSer;


                        SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SingleResult);
                        if (dr != null)
                        {
                            while (dr.Read())
                            {
                                JsonConsulta = dr["JSON_CLI"].ToString();
                            }
                        }
                        return (JsonConsulta);
                    }
                }

            }
            catch (SqlException SQLex)
            {
                RepositorioLog repositorioLog = new RepositorioLog(_conection);
                repositorioLog.RegistrarLogError("InsertClienteDocumento", SQLex.Message.ToString(), 0, Convert.ToString(pCodCli));

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("InsertClienteDocumento", ex.Message.ToString(), 0, Convert.ToString(pCodCli));

                return null;
            }
        }

        public object getListarClienteFiles(int pAccion, int pCodigoCliente)
        {
            try
            {
                string JsonConsulta = "";

                using (SqlConnection cn = new SqlConnection(_conection))
                {
                    cn.Open();
                    using (SqlCommand cmd = cn.CreateCommand())
                    {

                        cmd.CommandText = "MODULO_CLIENTE_FILES_SELECT";
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        SqlParameter par1 = cmd.Parameters.Add("@ACCION", SqlDbType.Int);
                        par1.Direction = ParameterDirection.Input;
                        par1.Value = pAccion;

                        SqlParameter par2 = cmd.Parameters.Add("@CODIGO_CLIENTE", SqlDbType.Int);
                        par2.Direction = ParameterDirection.Input;
                        par2.Value = pCodigoCliente;


                        SqlDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SingleResult);
                        if (dr != null)
                        {
                            while (dr.Read())
                            {
                                JsonConsulta = dr["JSON_CLI"].ToString();
                            }
                        }
                        return (JsonConsulta);
                    }
                }

            }
            catch (SqlException SQLex)
            {
                RepositorioLog repositorioLog = new RepositorioLog(_conection);
                repositorioLog.RegistrarLogError("getListarClienteFiles", SQLex.Message.ToString(), 0, "");

                return null;
            }
            catch (Exception ex)
            {
                RepositorioLog repositorioLogEx = new RepositorioLog(_conection);
                repositorioLogEx.RegistrarLogError("getListarClienteFiles", ex.Message.ToString(), 0, "");

                return null;
            }
        }
    }
}
