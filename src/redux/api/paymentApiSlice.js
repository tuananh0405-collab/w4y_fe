import { apiSlice } from "./apiSlice"; // Import apiSlice
import { PAYMENT_URL } from "../constants"; // Đảm bảo bạn có URL API cho ứng viên

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint đồng bộ giao dịch VietQR
    syncVietQR: builder.query({
      query: () => ({
        url: `${PAYMENT_URL}/sync-vietqr`, // URL API để đồng bộ giao dịch
        method: "GET",
        // Cookies tự động được gửi đi nếu cấu hình đúng
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLazySyncVietQRQuery 
} = paymentApiSlice;
