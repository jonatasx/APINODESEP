import sql from 'mssql';

export async function openDb() {
  const config = {
    user: 'jonatas.pessoa',
    port: 1433,
    server: 'localhost',
    database: 'dbpessoa_exemplo',
    options: {
        encrypt: true,
        trustServerCertificate: true
    },
  };
  const pool = await sql.connect(config);
  return pool;
}