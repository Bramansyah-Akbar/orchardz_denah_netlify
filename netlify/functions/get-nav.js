const postgres = require('postgres');

// Kita ambil "Kunci" dari environment variable nanti biar aman
const { DATABASE_URL } = process.env;
const sql = postgres(DATABASE_URL, { ssl: 'require' });

exports.handler = async (event, context) => {
  try {
    // Ambil data dari tabel yang kamu buat tadi
    const data = await sql`SELECT * FROM navigasi_hotel`;

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};