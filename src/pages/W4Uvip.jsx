import React, { useState } from "react";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updatePoints } from "../redux/features/authSlice";
import { useLazySyncVietQRQuery } from "../redux/api/paymentApiSlice";

const W4Uvip = () => {
  const [points, setPoints] = useState(0);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const user = useSelector((state) => state.auth.userState);
  const email = user?.user?.email;
  const dispatch = useDispatch();

  const [triggerSyncVietQR] = useLazySyncVietQRQuery();

  const handleCreateQR = async () => {
    const amount = points * 1000;
    if (!points || amount < 1000) {
      alert("Số điểm tối thiểu là 1 (tương đương 1,000đ)");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/api/v1/payment/create-vietqr", {
        amount,
        description: `Nap ${points} diem W4U - ${email}`,
      });

      setQrCodeUrl(res.data.qr_code);
      alert("Mã QR đã được tạo! Quét mã để thanh toán trong 60 giây.");

      // Sau 60 giây, gọi API sync
      setTimeout(async () => {
        try {
          const result = await triggerSyncVietQR().unwrap();

          if (result?.message?.includes("thành công")) {
            setPaymentStatus("Thanh toán thành công!");

            // Cập nhật điểm trong Redux
            const current = user?.user?.points || 0;
            dispatch(updatePoints(current + points));
          } else {
            setPaymentStatus("Không phát hiện giao dịch phù hợp.");
          }
        } catch (err) {
          console.error("Lỗi khi sync VietQR:", err);
          setPaymentStatus("Lỗi khi kiểm tra thanh toán.");
        }
      }, 60000);
    } catch (err) {
      console.error("Lỗi tạo QR:", err);
      alert("Không thể tạo mã QR. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      <Header />

      <div className="flex flex-col items-center justify-center flex-grow px-4 py-12">
        <h1 className="text-3xl font-bold text-teal-700 mb-6">Nạp điểm W4U VIP</h1>

        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <label className="block mb-4">
            <span className="text-gray-700 font-medium">Nhập số điểm cần nạp</span>
            <input
              type="number"
              min="1"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-400 focus:outline-none"
              placeholder="VD: 10 điểm"
            />
          </label>

          <p className="mb-6 text-gray-600">
            <strong>{points * 1000}</strong> VNĐ sẽ được thanh toán qua mã QR.
          </p>

          <button
            onClick={handleCreateQR}
            disabled={loading}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded w-full transition"
          >
            {loading ? "Đang tạo mã QR..." : "Tạo mã VietQR"}
          </button>

          {qrCodeUrl && (
            <div className="mt-8 text-center">
              <p className="mb-4 font-semibold text-gray-700">Quét mã QR bên dưới để thanh toán:</p>
              <img src={qrCodeUrl} alt="VietQR" className="mx-auto max-w-xs border rounded" />
            </div>
          )}

          {paymentStatus && (
            <div className="mt-6 text-center">
              <p className="font-semibold text-lg text-teal-700">Trạng thái thanh toán:</p>
              <p className="text-gray-600">{paymentStatus}</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default W4Uvip;
