import sql from 'mssql';

export async function openDb() {
  const config = {
    user: 'IN\jonatas.pessoa',
    port: 1433,
    server: 'COTIC-004221',
    database: 'dbpessoa_exemplo',
    options: {
        encrypt: true,
        trustServerCertificate: true
    },
  };
  const pool = await sql.connect(config);
  return pool;
}