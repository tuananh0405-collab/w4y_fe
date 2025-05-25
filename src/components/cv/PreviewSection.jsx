import React from 'react';
import Button from '@mui/material/Button';
import theme from '../../utils/theme';

const PreviewSection = () => {
  return (
    <div className="w-full max-w-[1133px] bg-[#fff] rounded-lg p-5 mb-5 box-border mx-auto">
      <div className="flex flex-col items-center gap-2 mb-8">
        <h1 className="font-inter text-4xl font-bold text-orange-500 text-center" style={{color: theme.colors.darkTeal}}>Xem trước CV</h1>
        <p className="font-inter text-xl font-normal text-black text-center">
          Hoàn thành các bước trên để xem trước CV của bạn
        </p>
      </div>
      <div className="flex justify-between gap-5">
        {/* Nút Quay lại */}
        <Button
          variant="outlined"
          color=''
          className="bg-[#b0b0b0] text-white rounded-lg py-3 px-6 min-w-[135px] hover:bg-[#9e9e9e]"
        >
          Quay lại
        </Button>
        {/* Nút Tiếp tục */}
        <Button
          variant="contained"
          color='success'
          className="bg-[#6A9183] text-white rounded-lg py-3 px-6 min-w-[135px] hover:bg-[#6A9183]"
        >
          Tiếp tục
        </Button>
      </div>
    </div>
  );
};

export default PreviewSection;
