const postgres = require('postgres');

exports.handler = async (event, context) => {
  // 1. Ambil URL di DALAM handler
  const URL = process.env.DATABASE_URL;

  // 2. Cek apakah URL-nya ada
  if (!URL) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "DATABASE_URL tidak ditemukan di Environment Variables Netlify!" })
    };
  }

  try {
    // 3. Inisialisasi koneksi di sini
    const sql = postgres(URL, { ssl: 'require' });
    
    const data = await sql`SELECT * FROM navigasi_hotel`;
    
    // 4. Tutup koneksi setelah selesai (opsional tapi bagus buat serverless)
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
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: "Gagal konek ke Neon", 
        message: error.message 
      })
    };
  }
};