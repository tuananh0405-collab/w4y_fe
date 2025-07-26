import React, { useState, useRef, useEffect } from 'react';
import theme from '../../utils/theme';
import { useGetFilterOptionsQuery } from '../../redux/api/jobApiSlice';

const FilterBar = ({ onFilterChange }) => {
  const [filterType, setFilterType] = useState('location');
  const [selectedOption, setSelectedOption] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);
  const dropdownRef = useRef(null);

  const { data, error, isLoading } = useGetFilterOptionsQuery();

  const optionsFilterType = [
    { id: 'location', label: 'Địa điểm' },
    { id: 'position', label: 'Vị trí' },
    { id: 'industry', label: 'Ngành nghề' },
    { id: 'level', label: 'Cấp độ' }
  ];

  const locations = data?.data?.locations?.map((loc) => ({ id: loc, label: loc })) || [];
  const positions = data?.data?.positions?.map((pos) => ({ id: pos, label: pos })) || [];
  const industries = data?.data?.industries?.map((ind) => ({ id: ind._id, label: ind.name })) || [];
  const levels = data?.data?.levels?.map((lvl) => ({ id: lvl, label: lvl })) || [];

  const options =
    filterType === 'location' ? locations :
    filterType === 'position' ? positions :
    filterType === 'industry' ? industries :
    filterType === 'level' ? levels : [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFilterTypeSelect = (id) => {
    setFilterType(id);
    setSelectedOption('');
    setIsDropdownOpen(false);
    setShowAllItems(false); // Reset show all when changing filter type
  };

  const handleOptionSelect = (id) => {
    setSelectedOption(id);
    onFilterChange({ type: filterType, value: id });
  };

  const toggleShowAllItems = () => {
    setShowAllItems(!showAllItems);
  };

  // Determine how many items to show initially (you can adjust this number)
  const itemsToShowInitially = 6;
  const displayedOptions = showAllItems ? options : options.slice(0, itemsToShowInitially);
  const hasMoreItems = options.length > itemsToShowInitially;

  if (isLoading) {
    return <div className="p-4 text-center text-gray-500">Đang tải bộ lọc...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Lỗi khi tải bộ lọc</div>;
  }

  return (
    <div className="flex items-center gap-8 p-4 bg-transparent">
      {/* Dropdown chọn loại lọc */}
      <div
        ref={dropdownRef}
        className="relative flex items-center p-3 rounded-md gap-2 cursor-pointer"
        style={{ background: theme.colors.mintGreen, minWidth: 140 }}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span className="text-black font-semibold select-none">Lọc theo:</span>
        <span className="text-black font-semibold select-none">
          {optionsFilterType.find(o => o.id === filterType)?.label}
        </span>
        <svg
          className={`w-4 h-4 text-black transition-transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>

        {isDropdownOpen && (
          <div
            className="absolute top-full left-0 mt-1 w-full bg-white rounded-md shadow-lg z-10"
            style={{ minWidth: '140px' }}
          >
            {optionsFilterType.map((option) => (
              <div
                key={option.id}
                className={`px-4 py-2 cursor-pointer hover:bg-[#A8E6CF] ${
                  filterType === option.id ? 'font-bold bg-[#A8E6CF]' : ''
                }`}
                onClick={() => handleFilterTypeSelect(option.id)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Danh sách các lựa chọn theo loại */}
      <div className="flex-1">
        <div className={`flex gap-4 ${showAllItems ? 'flex-col' : 'flex-wrap'}`}>
          {/* Nút "Ngẫu nhiên" */}
          <div className={`${showAllItems ? 'flex flex-wrap gap-4' : 'flex gap-4 flex-wrap'}`}>
            <button
              key="random"
              className="h-12 px-6 rounded-lg font-semibold bg-transparent border border-gray-300 whitespace-nowrap cursor-pointer hover:bg-[#A8E6CF] hover:text-black transition-colors"
              onClick={() => handleOptionSelect("random")}
            >
              Ngẫu nhiên
            </button>

            {/* Danh sách các options */}
            {displayedOptions.length === 0 ? (
              <div className="text-gray-500 italic">Không có dữ liệu</div>
            ) : (
              displayedOptions.map((option) => (
                <button
                  key={option.id}
                  className={`h-12 px-6 rounded-lg font-semibold whitespace-nowrap cursor-pointer ${
                    selectedOption === option.id ? 'bg-[#A8E6CF] text-black' : 'bg-transparent border border-gray-300'
                  }`}
                  onClick={() => handleOptionSelect(option.id)}
                >
                  {option.label}
                </button>
              ))
            )}

            {/* Button hiển thị thêm/ẩn bớt */}
            {hasMoreItems && (
              <button
                className="h-12 px-6 rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-colors whitespace-nowrap"
                onClick={toggleShowAllItems}
              >
                {showAllItems ? 'Ẩn bớt' : `Hiển thị thêm (${options.length - itemsToShowInitially})`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
