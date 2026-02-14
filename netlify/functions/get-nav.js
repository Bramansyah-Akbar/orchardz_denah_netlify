const postgres = require('postgres');

exports.handler = async (event, context) => {
  const URL = process.env.DATABASE_URL;

  if (!URL) {
    return { statusCode: 500, body: JSON.stringify({ error: "DATABASE_URL kosong" }) };
  }

  try {
    const sql = postgres(URL, { ssl: 'require' });
    
    // 1. Dapatkan tanggal hari ini khusus zona waktu Jakarta (WIB)
    // Format yang dihasilkan: YYYY-MM-DD
    const options = { timeZone: 'Asia/Jakarta', year: 'numeric', month: '2-digit', day: '2-digit' };
    const formatter = new Intl.DateTimeFormat('en-CA', options); 
    const todayWIB = formatter.format(new Date());

    // 2. Minta ke Neon DB HANYA acara yang tanggalnya = hari ini di WIB
    const data = await sql`SELECT * FROM navigasi_hotel WHERE tanggal_acara = ${todayWIB}`;
    
    await sql.end();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error("Error Detail:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Gagal ambil data", message: error.message }) };
  }
};