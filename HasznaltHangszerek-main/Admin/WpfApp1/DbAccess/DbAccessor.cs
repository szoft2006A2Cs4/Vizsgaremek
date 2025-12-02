using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Common;

namespace WpfApp1.DbAccess
{
    public abstract class DbAccessor<T> where T : class
    {
        protected DbConnection _conn { get; private set; }

        public abstract void Create(T item);
        public abstract T? Read(int id);
        public abstract IEnumerable<T> ReadAll();
        public abstract void Update(int id, T item);
        public abstract bool Delete(int id);

        protected DbAccessor(DbConnection conn)
        {
            _conn = conn;
        }
    }
}
