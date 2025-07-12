import React, { useCallback, useMemo } from "react";
import { funnelIcon } from "../../assets";
import {
  useGetFilterOptionsQuery,
  useGetJobCategoriesByRecursiveQuery,
} from "../../redux/api/jobApiSlice";
import JobCategorySelector from "../JobCategorySelector";

export const FilterSidebar = ({ filterObject, setFilterObject }) => {
  const {
    data: filterOptionsQuery,
    error: filterOptionsFetchError,
    isLoading: isFetchingFilterOptions,
  } = useGetFilterOptionsQuery();

  const {
    industriesOptions,
    levelsOptions,
    experiencesOptions,
    salaryRangeUnitsOptions,
  } = useMemo(() => {
    const results = {
      industriesOptions: undefined,
      levelsOptions: undefined,
      experiencesOptions: undefined,
      salaryRangeUnitsOptions: undefined,
    };

    const data = filterOptionsQuery?.data;
    if (data) {
      results.levelsOptions = data.levels ?? null;
      results.experiencesOptions = data.experiences ?? null;
      results.salaryRangeUnitsOptions = data.salaryRangeUnits ?? null;

      results.industriesOptions = data.industries?.map((industry) => ({
        name: industry.name,
        value: industry._id,
      })) ?? null;
    }
    return results;
  }, [filterOptionsQuery]);

  const {
    data: jobCategoriesQuery,
    error: jobCategoriesFetchError,
    isLoading: isFetchingJobCategories,
    isUninitialized: isIndustryUnselected,
  } = useGetJobCategoriesByRecursiveQuery({ categoryId: filterObject.industry }, {
    skip: !filterObject.industry || !filterObject.industry.length,
  });

  const jobCategories = useMemo(() => {
    return jobCategoriesQuery?.data ? jobCategoriesQuery.data.children : [];
  }, [jobCategoriesQuery]);

  const handleSelectIndustry = useCallback(
    (value) => {
      setFilterObject(prev => ({ ...prev, industry: value }));
    },
    [setFilterObject],);

  const handleSetCategories = useCallback(
    (values) => {
      setFilterObject(prev => ({ ...prev, categoryIds: values }));
    },
    [setFilterObject],);

  const handleSelectExperience = useCallback(
    (value) => {
      setFilterObject(prev => ({ ...prev, experience: value }));
    },
    [setFilterObject],);

  const handleSelectLevel = useCallback(
    (value) => {
      setFilterObject(prev => ({ ...prev, level: value }));
    },
    [setFilterObject],);

  const handleSetSalaryRangeStart = useCallback(
    (value) => {
      setFilterObject(prev => ({ ...prev, salaryRangeStart: (prev.salaryRangeEnd) ? Math.min(parseInt(value), parseInt(prev.salaryRangeEnd) - 1) : value }));
    },
    [setFilterObject],);

  const handleSetSalaryRangeEnd = useCallback(
    (value) => {
      setFilterObject(prev => ({ ...prev, salaryRangeEnd: (prev.salaryRangeStart) ? Math.max(parseInt(value), parseInt(prev.salaryRangeStart) + 1) : value }));
    },
    [setFilterObject],);

  const handleSelectSalaryRangeUnit = useCallback(
    (value) => {
      setFilterObject(prev => ({ ...prev, salaryRangeUnit: value }));
    },
    [setFilterObject],);

  return (
    <aside className="w-full p-6 bg-white rounded-lg shadow-lg sticky top-20 max-h-[80vh] overflow-y-auto">
      <h2 className="flex items-center gap-2 mb-6 text-green-600 font-bold text-xl">
        {
          /* <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M8 16h8" />
        </svg> */
        }
        <img
          src={funnelIcon}
          alt="funnel icon"
          className="w-6 h-6"
        />

        Lọc nâng cao
      </h2>

      {
        /*filterSections.map(({ title, options }) => (
        <div key={title} className="mb-6 last:mb-0">
          <h3 className="font-semibold text-gray-900 mb-3">{title}</h3>
          <div className="flex flex-col gap-2">
            {options.map((option) => (
              <label
                key={option}
                className="inline-flex items-center cursor-pointer text-gray-700 text-sm select-none"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-green-600 rounded focus:ring-2 focus:ring-green-400"
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))*/
      }

      <div key={"Theo danh mục nghề"} className="mb-6 last:mb-0">
        <h3 className="font-semibold text-gray-900 mb-3">Theo danh mục nghề</h3>

        <div className="flex flex-col w-full my-2">
          <label className="text-lg font-medium text-gray-700">Lĩnh vực</label>
          <select
            name="industry"
            value={filterObject.industry}
            onChange={(v) => handleSelectIndustry(v.target.value)}
            className="border p-2 rounded"
          >
            <option value="">-- Chọn --</option>
            {industriesOptions &&
              industriesOptions.map((opt, index) => (
                <option key={index} value={opt.value}>
                  {opt.name}
                </option>
              ))}
          </select>
        </div>

        <div className="flex flex-col my-2">
          <label className="text-lg font-medium text-gray-700">
            Ngành nghề
          </label>
          <JobCategorySelector categories={jobCategories} checkedIds={filterObject.categoryIds} onSelect={(values) => handleSetCategories(values)} />
        </div>
      </div>

      <div key={"Kinh nghiệm"} className="mb-6 last:mb-0">
        <h3 className="font-semibold text-gray-900 mb-3">Kinh nghiệm</h3>
        <div className="flex flex-col gap-2">
          <label
            key={"all"}
            className="inline-flex items-center cursor-pointer text-gray-700 text-sm select-none"
          >
            <input
              type="radio"
              className="form-checkbox h-4 w-4 text-green-600 rounded focus:ring-2 focus:ring-green-400"
              checked={filterObject.experience === ""}
              onChange={() => handleSelectExperience("")}
            />
            <span className="ml-2">Tất cả</span>
          </label>

          {experiencesOptions &&
            experiencesOptions.map((option, index) => (
              <label
                key={index}
                className="inline-flex items-center cursor-pointer text-gray-700 text-sm select-none"
              >
                <input
                  type="radio"
                  className="form-checkbox h-4 w-4 text-green-600 rounded focus:ring-2 focus:ring-green-400"
                  checked={option === filterObject.experience}
                  onChange={() => handleSelectExperience(option)}
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
        </div>
      </div>

      <div key={"Cấp bậc"} className="mb-6 last:mb-0">
        <h3 className="font-semibold text-gray-900 mb-3">Cấp bậc</h3>
        <div className="flex flex-col gap-2">
          <label
            key={"all"}
            className="inline-flex items-center cursor-pointer text-gray-700 text-sm select-none"
          >
            <input
              type="radio"
              className="form-checkbox h-4 w-4 text-green-600 rounded focus:ring-2 focus:ring-green-400"
              checked={filterObject.level === ""}
              onChange={() => handleSelectLevel("")}
            />
            <span className="ml-2">Tất cả</span>
          </label>
          {levelsOptions && levelsOptions.map((option, index) => (
            <label
              key={index}
              className="inline-flex items-center cursor-pointer text-gray-700 text-sm select-none"
            >
              <input
                type="radio"
                className="form-checkbox h-4 w-4 text-green-600 rounded focus:ring-2 focus:ring-green-400"
                checked={option === filterObject.level}
                onChange={() => handleSelectLevel(option)}
              />
              <span className="ml-2">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div key={"Mức lương"} className="mb-6 last:mb-0">
        <h3 className="font-semibold text-gray-900 mb-3">Mức lương</h3>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex flex-row items-center gap-2 flex-1">
            <input
              type="number"
              placeholder="Từ"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
              value={filterObject.salaryRangeStart}
              onChange={(v) => handleSetSalaryRangeStart(v.target.value)}
              min={1}
            />
            <span className="text-gray-500 select-none">-</span>
            <input
              type="number"
              placeholder="Đến"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
              value={filterObject.salaryRangeEnd}
              onChange={(v) => handleSetSalaryRangeEnd(v.target.value)}
              min={1}
            />
          </div>
          <select className="w-full sm:w-auto px-3 py-2 border rounded focus:outline-none focus:ring"
            name="salaryRange"
            value={filterObject.salaryRangeUnit}
            onChange={(v) => handleSelectSalaryRangeUnit(v.target.value)}
          >
            <option value="">-- Chọn --</option>
            {salaryRangeUnitsOptions &&
              salaryRangeUnitsOptions.map((opt, index) => (
                <option key={index} value={opt}>
                  {opt}
                </option>
              ))}
          </select>
        </div>
      </div>
    </aside>
  );
};
