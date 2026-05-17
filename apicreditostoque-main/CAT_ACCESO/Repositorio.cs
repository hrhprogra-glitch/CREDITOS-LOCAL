using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CAT_REPOSITORIO;
namespace CAT_ACCESO
{
    public class Repositorio<T> : IRepositorio<T> where T : class
    {
        protected string _conection;
        public Repositorio(string conectionstring)
        {
            _conection = conectionstring;
        }
        public bool Delete(T entity)
        {
            return true;
        }

        public T GetByID(int id)
        {
            return null;
        }

        public IEnumerable<T> getList()
        {
            return null;
        }

        public int Insert(T entity)
        {
            return 0;
        }

        public bool Update(T entity)
        {
            return true;
        }
    }
}
