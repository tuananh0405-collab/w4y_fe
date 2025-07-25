import React, { useCallback, useMemo } from "react";
import { funnelIcon } from "../../assets";
import {
  useGetFilterOptionsQuery,
} from "../../redux/api/jobApiSlice";
import JobCategorySelector from "../JobCategorySelector";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { InputNumber, Select } from "antd";
import "./SelectStyle.css";
import "./ScrollBar.css";
import { Report, ReportProblem } from "@mui/icons-material";
import { useGetJobCategoriesByRecursiveQuery } from "../../redux/api/jobCategoryApiSlice";

const RadioSx = {
  color: "#00796b",
  "&.Mui-checked": {
    color: "#00796b",
  },
  "&.MuiCheckbox-indeterminate": {
    color: "#00796b",
  },
};

const NumberInputSx = {
  "& .MuiOutlinedInput-root": {
    transition: "border-color 0.3s",
    "& fieldset": {
      transition: "border-color 0.3s",
    },
    "&:hover fieldset": {
      borderColor: "#00796b",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#00796b",
    },
  },
};

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
  } = useGetJobCategoriesByRecursiveQuery(
    { categoryId: filterObject.industry },
    {
      skip: !filterObject.industry || !filterObject.industry.length,
    },
  );

  const jobCategories = useMemo(() => {
    return jobCategoriesQuery?.data ? jobCategoriesQuery.data.children : [];
  }, [jobCategoriesQuery]);

  const handleSelectIndustry = useCallback(
    (value) => {
      setFilterObject((prev) => ({
        ...prev,
        industry: value,
        categoryIds: [],
      }));
    },
    [setFilterObject],
  );

  const handleSetCategories = useCallback(
    (values) => {
      setFilterObject((prev) => ({ ...prev, categoryIds: values }));
    },
    [setFilterObject],
  );

  const handleSelectExperience = useCallback(
    (value) => {
      setFilterObject((prev) => ({ ...prev, experience: value }));
    },
    [setFilterObject],
  );

  const handleSelectLevel = useCallback(
    (value) => {
      setFilterObject((prev) => ({ ...prev, level: value }));
    },
    [setFilterObject],
  );

  const handleSetSalaryRangeStart = useCallback(
    (value) => {
      setFilterObject((prev) => ({
        ...prev,
        salaryRangeStart: (prev.salaryRangeEnd)
          ? Math.min(parseInt(value), parseInt(prev.salaryRangeEnd) - 1)
          : value,
      }));
    },
    [setFilterObject],
  );

  const handleSetSalaryRangeEnd = useCallback(
    (value) => {
      setFilterObject((prev) => ({
        ...prev,
        salaryRangeEnd: (prev.salaryRangeStart)
          ? Math.max(parseInt(value), parseInt(prev.salaryRangeStart) + 1)
          : value,
      }));
    },
    [setFilterObject],
  );

  const handleSelectSalaryRangeUnit = useCallback(
    (value) => {
      setFilterObject((prev) => ({ ...prev, salaryRangeUnit: value }));
    },
    [setFilterObject],
  );

  return (
    <aside className="w-full p-6 bg-white rounded-lg shadow-lg ring-1 ring-gray-200 sticky top-30 max-h-[80vh] overflow-y-auto flex flex-col filter-scrollbar">
      <h2 className="flex items-center gap-2 mb-6 text-green-600 font-bold text-xl">
        <img
          src={funnelIcon}
          alt="funnel icon"
          className="w-6 h-6"
        />

        Lọc nâng cao
      </h2>

      {
        isFetchingFilterOptions ? (
          <Stack gap={3}>
            <Skeleton variant="rounded" height={60} />
            <Skeleton variant="rounded" height={60} />
            <Skeleton variant="rounded" height={60} />
          </Stack>)

          : filterOptionsFetchError ?
            (
              <div className="grow flex flex-col gap-2 p-4 justify-center items-center">
                <ReportProblem sx={{ fontSize: 80, color: "gray" }} />
                <Typography variant="p" className="text-gray">
                  Có lỗi xảy ra khi tải bộ lọc!
                </Typography>
              </div>
            )
            : (
              <>
                <div key={"Theo danh mục nghề"} className="mb-6 last:mb-0">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Theo danh mục nghề
                  </h3>

                  <div className="flex flex-col w-full my-2">
                    <label className="text-lg font-medium text-gray-700">
                      Lĩnh vực
                    </label>
                    <Select
                      value={filterObject.industry &&
                        filterObject.industry.length
                        ? filterObject.industry
                        : undefined}
                      onChange={handleSelectIndustry}
                      style={{ width: "100%" }}
                      placeholder="-- Chọn lĩnh vực --"
                      size="large"
                      allowClear
                    >
                      {industriesOptions &&
                        industriesOptions.map((opt, index) => (
                          <Select.Option key={index} value={opt.value}>
                            {opt.name}
                          </Select.Option>
                        ))}
                    </Select>
                  </div>

                  {
                    isFetchingJobCategories ? (
                      <Skeleton variant="rounded" height={60} />
                    ) :

                      jobCategoriesFetchError ?
                        (
                          <div className="grow flex flex-col gap-2 p-4 justify-center items-center bg-gray-200/80 rounded-md">
                            <ReportProblem sx={{ fontSize: 80, color: "gray" }} />
                            <Typography variant="p" className="text-gray">
                              Có lỗi xảy ra khi tải các ngành nghề!
                            </Typography>
                          </div>
                        )
                        :
                        (
                          <div>
                            <div
                              className={`font-medium ${isIndustryUnselected ? "text-gray-400" : "text-gray-700"
                                }`}
                            >
                              Ngành nghề
                            </div>
                            <div
                              className={`w-full rounded-md ${isIndustryUnselected ? "bg-gray-100/80" : "bg-gray-200/80"
                                } min-h-[100px] max-h-[700px] overflow-auto p-4 mb-2`}
                            >
                              {!isIndustryUnselected && (
                                <JobCategorySelector
                                  categories={jobCategories}
                                  checkedIds={filterObject.categoryIds}
                                  multiple={true}
                                  onSelect={(values) => handleSetCategories(values)}
                                />
                              )}
                            </div>
                          </div>
                        )}
                </div>

                <div key={"Kinh nghiệm"} className="mb-6 last:mb-0">
                  <h3 className="font-semibold text-gray-900 mb-3">Kinh nghiệm</h3>
                  <div className="flex flex-col gap-2">
                    <FormControl>
                      <RadioGroup
                        name="experiences"
                        value={filterObject.experience}
                        onChange={(v) => handleSelectExperience(v.target.value)}
                      >
                        <FormControlLabel
                          key={"all"}
                          value={""}
                          control={
                            <Radio
                              sx={RadioSx}
                            />
                          }
                          label={"Tất cả"}
                        />
                        {experiencesOptions &&
                          experiencesOptions.map((option, index) => (
                            <FormControlLabel
                              key={index}
                              value={option}
                              control={
                                <Radio
                                  sx={RadioSx}
                                />
                              }
                              label={option}
                            />
                          ))}
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>

                <div key={"Cấp bậc"} className="mb-6 last:mb-0">
                  <h3 className="font-semibold text-gray-900 mb-3">Cấp bậc</h3>
                  <div className="flex flex-col gap-2">
                    <FormControl>
                      <RadioGroup
                        name="levels"
                        value={filterObject.level}
                        onChange={(v) => handleSelectLevel(v.target.value)}
                      >
                        <FormControlLabel
                          key={"all"}
                          value={""}
                          control={
                            <Radio
                              sx={RadioSx}
                            />
                          }
                          label={"Tất cả"}
                        />
                        {levelsOptions &&
                          levelsOptions.map((option, index) => (
                            <FormControlLabel
                              key={index}
                              value={option}
                              control={
                                <Radio
                                  sx={RadioSx}
                                />
                              }
                              label={option}
                            />
                          ))}
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>

                <div key={"Mức lương"} className="mb-6 last:mb-0 flex flex-col gap-3">
                  <h3 className="font-semibold text-gray-900">Mức lương</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex flex-row items-center gap-2 flex-1">
                      <TextField
                        label="Từ"
                        type="number"
                        value={filterObject.salaryRangeStart}
                        onChange={(e) => handleSetSalaryRangeStart(e.target.value)}
                        size="small"
                        variant="outlined"
                        slotProps={{
                          htmlInput: { min: 1 },
                        }}
                        fullWidth
                        sx={NumberInputSx}
                      />
                      <span className="text-gray-500 select-none px-2">-</span>
                      <TextField
                        label="Đến"
                        type="number"
                        value={filterObject.salaryRangeEnd}
                        onChange={(e) => handleSetSalaryRangeEnd(e.target.value)}
                        size="small"
                        variant="outlined"
                        slotProps={{
                          htmlInput: { min: 1 },
                        }}
                        fullWidth
                        sx={NumberInputSx}
                      />
                    </div>
                  </div>
                  <div>
                    <Select
                      value={filterObject.salaryRangeUnit &&
                        filterObject.salaryRangeUnit.length
                        ? filterObject.salaryRangeUnit
                        : undefined}
                      onChange={handleSelectSalaryRangeUnit}
                      style={{ width: "100%", borderColor: "green" }}
                      placeholder="-- Chọn đơn vị --"
                      size="medium"
                      allowClear
                    >
                      {salaryRangeUnitsOptions &&
                        salaryRangeUnitsOptions.map((opt, index) => (
                          <Select.Option key={index} value={opt}>
                            {opt}
                          </Select.Option>
                        ))}
                    </Select>
                  </div>
                </div>
              </>
            )}
    </aside>
  );
};
