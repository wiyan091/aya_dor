import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Swal) {
      document.getElementById('tembakButton')?.addEventListener('click', () => {
        window.Swal.fire({
          title: "Aku Sayang Kamu 💖",
          html: `
            <p style="font-size:16px; color:#7c3a50;">
              Kalau aku jadi pilot, aku pasti gagal mendarat, karena udah terlanjur jatuh di hatimu.<br><br>
              <strong style="font-size:18px;">Mau nggak kamu jadi pacarku? 💘</strong>
            </p>
          `,
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Mau Banget! ❤️",
          cancelButtonText: "Hmm... Nanti dulu 😢",
          background: "#ffe6eb",
          color: "#5c2c36",
          customClass: {
            popup: "swal-popup-romantic",
            confirmButton: "swal-btn-confirm",
            cancelButton: "swal-btn-cancel",
          },
        }).then((result) => {
          let keterangan = "";
          let jawaban = 0;

          if (result.isConfirmed) {
            keterangan = "Yeayy! Kamu udah buat aku jadi orang paling bahagia!";
            jawaban = 1;

            window.Swal.fire({
              title: "Yeayy! 💞",
              text: keterangan,
              icon: "success",
              background: "#ffe6eb",
              color: "#5c2c36",
              confirmButtonText: "Awww 💖",
              allowOutsideClick: false,
              allowEscapeKey: false,
              customClass: {
                popup: "swal-popup-romantic",
                confirmButton: "swal-btn-confirm",
              },
            });
          } else if (result.dismiss === window.Swal.DismissReason.cancel) {
            keterangan = "Yahh... Gapapa kok, aku ngerti kalau kamu butuh waktu";
            jawaban = 0;

            window.Swal.fire({
              title: "Yahh... 😢",
              text: keterangan,
              icon: "info",
              background: "#ffe6eb",
              color: "#5c2c36",
              confirmButtonText: "Peluk Dulu 🤗",
              allowOutsideClick: false,
              allowEscapeKey: false,
              customClass: {
                popup: "swal-popup-romantic",
                confirmButton: "swal-btn-cancel",
              },
            });
          }

          window.$.ajax({
            url: "/api/simpan_jawaban",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ keterangan, jawaban }),
            success: function (response) {
              console.log("Data berhasil disimpan:", response);
            },
            error: function () {
              console.error("Terjadi kesalahan saat menyimpan data.");
            },
          });
        });
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>Kamu & Aku</title>
      </Head>

      <Script src="https://cdn.jsdelivr.net/npm/sweetalert2@11" strategy="beforeInteractive" />
      <Script src="https://code.jquery.com/jquery-3.7.1.min.js" strategy="beforeInteractive" />

      <div className="content">
        <h1>Ada yang ingin aku katakan...</h1>
        <p>
          Setiap detik yang kulalui bersamamu terasa begitu berarti. Senyummu bagaikan cahaya hangat
          yang menerangi hari-hariku. Jujur, aku nggak mau lagi menyimpan rasa ini sendirian.
        </p>
        <p>
          Boleh nggak, aku jadi bagian dari hidupmu, bukan cuma sebagai teman, tapi sebagai seseorang
          yang selalu ada di sampingmu.
        </p>
        <button id="tembakButton">Jawab dengan hatimu ❤️</button>
      </div>

      <style jsx>{`
        body {
          background: linear-gradient(135deg, #ffe6eb, #ffd1e3);
          font-family: "Poppins", sans-serif;
          text-align: center;
          padding-top: 50px;
          color: #5c2c36;
          margin-right: 40px;
        }
        h1 {
          font-size: 32px;
          margin-bottom: 10px;
          color: #e75480;
        }
        .content {
          background: #fff0f5;
          padding: 30px;
          margin: 20px auto;
          width: 90%;
          max-width: 600px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          animation: fadeIn 3s ease;
          border: 2px dashed #ffb6c1;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        button {
          background-color: #ff6fa5;
          color: white;
          border: none;
          padding: 12px 28px;
          margin-top: 25px;
          font-size: 16px;
          border-radius: 30px;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(255, 111, 165, 0.4);
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: #ff4f8b;
        }
        p {
          line-height: 1.8;
          font-size: 16px;
          color: #7c3a50;
        }
        .swal-popup-romantic {
          border-radius: 20px !important;
          box-shadow: 0 0 15px rgba(255, 105, 180, 0.3) !important;
          animation: fadeInSweet 1s ease;
        }
        .swal-btn-confirm {
          background-color: #ff6fa5 !important;
          color: white !important;
          border-radius: 25px !important;
          font-weight: bold !important;
          padding: 10px 24px !important;
          font-size: 16px !important;
        }
        .swal-btn-confirm:hover {
          background-color: #ff4f8b !important;
        }
        .swal-btn-cancel {
          background-color: #f3b0c3 !important;
          color: #5c2c36 !important;
          border-radius: 25px !important;
          font-weight: normal !important;
          padding: 10px 24px !important;
          font-size: 15px !important;
        }
        @keyframes fadeInSweet {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
