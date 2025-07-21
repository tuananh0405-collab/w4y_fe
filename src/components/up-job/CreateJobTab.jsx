import React, { useCallback, useEffect, useMemo, useState } from "react";
import theme from "../../utils/theme";
import {
  useCreateJobMutation,
  useGetFilterOptionsQuery,
} from "../../redux/api/jobApiSlice";
import { useNavigate } from "react-router-dom";
import JobCategorySelector from "../JobCategorySelector";
import { useGetJobCategoriesByRecursiveQuery } from "../../redux/api/jobCategoryApiSlice";
import {
  useGetJobSkillsByIdsQuery,
  useGetJobSkillsQuery,
} from "../../redux/api/jobSkillApiSlice";
import check from "check-types";
import { Tooltip } from "antd";
import { InfoOutlined } from "@mui/icons-material";

const technicalOptions = [
  "Công nghệ thông tin / Lập trình",
  "Thiết kế đồ họa / Multimedia",
  "Dịch thuật / Biên - phiên dịch",
  "Giảng dạy / Gia sư",
  "Marketing / Content / SEO",
  "Kế toán / Tài chính",
  "Nhân sự / Hành chính",
  "Chăm sóc khách hàng / Tư vấn",
  "Viết lách tự do / Freelance writing",
];

const nonTechnicalOptions = [
  "Phục vụ / Bán hàng",
  "Thu ngân / Bán hàng tại cửa hàng",
  "Giao hàng / Shipper",
  "Phát tờ rơi / Treo banner",
  "Nhân viên kho / Gói hàng / Dán tem",
];

const deliveryTimeOptions = ["Thoả thuận", "Theo dự án", "Khác"];
const locationOptions = ["Online", "Offline"];
const experienceOptions = ["< 1 năm", "1-3 năm", "> 3 năm"];

const QUERY_DELAY_MS = 500;

const CreateJobTab = ({ onBack, onSubmit }) => {
  const navigate = useNavigate();

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

  const [formData, setFormData] = useState({
    title: "",
    quantity: "",
    deliveryTime: "",
    deliveryTimeOther: "", // text tùy chỉnh nếu chọn "Khác"
    level: "",
    industry: "",
    position: "",
    locationType: "",
    locationAddress: "",
    applicationDeadline: "",
    experience: "",
    description: "",
    requirementsTechnical: [],
    requirementsNonTechnical: [],
    salary: "",
    salaryRangeStart: "",
    salaryRangeEnd: "",
    salaryRangeUnit: "",
    categoryId: "",
    skillIds: [],
  });

  const [useSalaryRange, setUseSalaryRange] = useState(true);

  /*
   * Handle job categories list and pick
   */

  const {
    data: jobCategoriesQuery,
    error: jobCategoriesFetchError,
    isLoading: isFetchingJobCategories,
    isUninitialized: isIndustryUnselected,
  } = useGetJobCategoriesByRecursiveQuery({ categoryId: formData.industry }, {
    skip: !formData.industry || !formData.industry.length,
  });

  const jobCategories = useMemo(() => {
    return jobCategoriesQuery?.data ? jobCategoriesQuery.data.children : [];
  }, [jobCategoriesQuery]);

  /*
   * Handle job skills search, list, and pick
   */
  const [skillNameQuery_Display, setSkillNameQuery_Display] = useState(""); // The query that will be displayed on the skill search bar
  const [skillNameQuery, setSkillNameQuery] = useState(""); // Actual query that will be used to fetch skills
  const [isChangingSkillQuery, setIsChangingSkillQuery] = useState(false);

  useEffect(() => {
    setIsChangingSkillQuery(true);
    const timeout = setTimeout(() => {
      setSkillNameQuery(skillNameQuery_Display);
      requestAnimationFrame(() => {
        setIsChangingSkillQuery(false);
      });
    }, QUERY_DELAY_MS);

    return () => clearTimeout(timeout);
  }, [skillNameQuery_Display]);

  const {
    data: skillListQuery,
    isLoading: isLoadingSkillListQuery,
    error: errorLoadingSkillListQuery,
  } = useGetJobSkillsQuery({ name: skillNameQuery, page: 1, limit: 10 }, {
    skip: !skillNameQuery,
  });

  const {
    data: selectedSkillsQuery,
    isLoading: isLoadingUserSkills,
  } = useGetJobSkillsByIdsQuery({ ids: formData.skillIds }, {
    skip: !check.nonEmptyArray(formData.skillIds),
  });

  const selectedSkillsDocs = useMemo(() => {
    return selectedSkillsQuery?.data ?? [];
  }, [selectedSkillsQuery]);

  const skillSearchResults = useMemo(() => {
    return skillListQuery?.data?.filter(
      (skill) => !formData.skillIds.includes(skill._id),
    ) ?? [];
  }, [skillListQuery, formData.skillIds]);

  /*
   * Form validation and inputs
   */
  const [errors, setErrors] = useState({});
  const [createJob] = useCreateJobMutation();

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Tiêu đề là bắt buộc";
    else if (formData.title.length > 100) {
      newErrors.title = "Tiêu đề không được vượt quá 100 ký tự";
    }

    if (!formData.quantity) {
      newErrors.quantity = "Số lượng tuyển dụng là bắt buộc";
    } else if (isNaN(formData.quantity) || Number(formData.quantity) <= 0) {
      newErrors.quantity = "Số lượng phải là số nguyên dương";
    }

    if (!formData.deliveryTime) {
      newErrors.deliveryTime = "Thời gian làm việc là bắt buộc";
    } else if (
      formData.deliveryTime === "Khác" && !formData.deliveryTimeOther.trim()
    ) {
      newErrors.deliveryTimeOther = "Vui lòng nhập thời gian làm việc";
    }

    if (!formData.locationType) {
      newErrors.locationType = "Địa điểm làm việc là bắt buộc";
    } else if (
      formData.locationType === "Offline" && !formData.locationAddress.trim()
    ) {
      newErrors.locationAddress = "Vui lòng nhập địa chỉ làm việc";
    }
    if (!formData.applicationDeadline) {
      newErrors.applicationDeadline = "Thời hạn ứng tuyển là bắt buộc";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Mô tả công việc là bắt buộc";
    }

    if (
      !(formData.salary.trim() ||
        (formData.salaryRangeStart.trim() && formData.salaryRangeEnd.trim() &&
          formData.salaryRangeUnit.trim()))
    ) {
      newErrors.salary = "Lương và phúc lợi là bắt buộc";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleCheckboxChange = (type, option) => {
    const key = type === "technical"
      ? "requirementsTechnical"
      : "requirementsNonTechnical";
    const selected = formData[key];
    let updated;

    if (selected.includes(option)) {
      updated = selected.filter((item) => item !== option);
    } else {
      if (selected.length >= 3) return;
      updated = [...selected, option];
    }

    setFormData((prev) => ({ ...prev, [key]: updated }));
  };

  const handleSelectCategory = (checkedArray) => {
    if (checkedArray) {
      setFormData((prev) => ({
        ...prev,
        categoryId: checkedArray.length ? checkedArray[0] : undefined,
      }));
    }
  };

  const handleAddSkill = useCallback((skillId) => {
    if (!formData.skillIds.includes(skillId) && formData.skillIds.length < 5) {
      setFormData((prev) => ({
        ...prev,
        skillIds: [...prev.skillIds, skillId],
      }));
      setSkillNameQuery_Display(""); // Clear input after selection
    }
  }, [formData.skillIds]);

  const handleRemoveSkill = (skillId) => {
    setFormData((prev) => ({
      ...prev,
      skillIds: prev.skillIds.filter((id) => id !== skillId),
    }));
  };

  const handleChangeSkillQueryInput = useCallback((value) => {
    setSkillNameQuery_Display(value);
  }, []);

  // Xử lý nút chọn địa chỉ Google Maps (hiện dummy)
  const handleSelectFromMaps = () => {
    alert("Mở Google Maps để chọn địa chỉ (chưa cài đặt)");
    // TODO: Mở popup chọn địa chỉ, lấy tọa độ, cập nhật locationAddress
  };

  /*
   * Form submit
   */
  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const jobData = {
        title: formData.title,
        description: formData.description,
        requirements: [
          ...formData.requirementsTechnical,
          ...formData.requirementsNonTechnical,
        ].join(", "),
        deliveryTime: formData.deliveryTime === "Khác"
          ? formData.deliveryTimeOther
          : formData.deliveryTime,
        priorityLevel: "Thông thường",
        quantity: Number(formData.quantity),
        level: formData.level,
        deadline: formData.applicationDeadline,
        industry: formData.industry,
        position: formData.position,
        location: formData.locationType === "Online"
          ? "Online"
          : formData.locationAddress,
        experience: formData.experience,
        skillIds: formData.skillIds,
        categoryId: formData.categoryId,
      };

      if (useSalaryRange) {
        jobData.salaryRangeStart = formData.salaryRangeStart;
        jobData.salaryRangeEnd = formData.salaryRangeEnd;
        jobData.salaryRangeUnit = formData.salaryRangeUnit;
      } else {
        jobData.salary = formData.salary;
      }

      await createJob(jobData);
      navigate("/");
      console.log("Job created successfully");
      if (onSubmit) onSubmit();
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-teal-700">Thông tin cơ bản</h2>
        <button
          className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 cursor-pointer"
          onClick={() => alert("Chưa hỗ trợ tính năng này")}
        >
          Xem bản nháp đã lưu
        </button>
      </div>

      <div
        className="mb-6 p-4 bg-lightGray border border-gray-300 rounded-lg"
        style={{ backgroundColor: theme.colors.bgColor }}
      >
        <h3 className="text-lg font-semibold text-teal-700 mb-2">
          Mẹo đăng tin hiệu quả 💡
        </h3>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          <li>Tiêu đề việc làm rõ ràng, có chứa tên vị trí và cấp bậc</li>
          <li>
            Mô tả công việc và yêu cầu chi tiết, tập trung vào kỹ năng cần thiết
          </li>
          <li>Thông tin về lương và phúc lợi cụ thể để thu hút ứng viên mới</li>
          <li>Sử dụng từ khóa ngành nghề để tối ưu khả năng tìm kiếm</li>
        </ul>
      </div>

      <div className="flex flex-col gap-5">
        {/* Tiêu đề */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700">
            Tiêu đề tin tuyển dụng <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Senior Java Developer - Lương đến 4000$"
            maxLength={100}
            className="border p-2 rounded"
          />
          {errors.title && <p className="text-red-600 mt-1">{errors.title}</p>}
        </div>

        {/* Chức danh */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700">
            Chức danh <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            placeholder="Senior Developer"
            maxLength={100}
            className="border p-2 rounded"
          />
          {errors.position && (
            <p className="text-red-600 mt-1">{errors.position}</p>
          )}
        </div>

        {/* Số lượng & Thời gian làm việc */}
        <div className="flex gap-5">
          <div className="flex flex-col w-full">
            <label className="text-lg font-medium text-gray-700">
              Số lượng tuyển dụng <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="Số lượng"
              className="border p-2 rounded"
              min={1}
            />
            {errors.quantity && (
              <p className="text-red-600 mt-1">{errors.quantity}</p>
            )}
          </div>

          <div className="flex flex-col w-full">
            <label className="text-lg font-medium text-gray-700">
              Thời gian làm việc <span className="text-red-600">*</span>
            </label>
            <select
              name="deliveryTime"
              value={formData.deliveryTime}
              onChange={handleInputChange}
              className="border p-2 rounded"
            >
              <option value="">-- Chọn --</option>
              {deliveryTimeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.deliveryTime && (
              <p className="text-red-600 mt-1">{errors.deliveryTime}</p>
            )}

            {/* Input text nếu chọn Khác */}
            {formData.deliveryTime === "Khác" && (
              <>
                <input
                  type="text"
                  name="deliveryTimeOther"
                  value={formData.deliveryTimeOther}
                  onChange={handleInputChange}
                  placeholder="Nhập thời gian làm việc"
                  className="border p-2 rounded mt-2"
                />
                {errors.deliveryTimeOther && (
                  <p className="text-red-600 mt-1">
                    {errors.deliveryTimeOther}
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Cấp bậc & Ngành nghề */}
        <div className="flex gap-5">
          <div className="flex flex-col w-full">
            <label className="text-lg font-medium text-gray-700">
              Thời hạn ứng tuyển <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              name="applicationDeadline"
              value={formData.applicationDeadline}
              onChange={handleInputChange}
              className="border p-2 rounded"
              min={new Date().toISOString().split("T")[0]} // không cho chọn ngày quá khứ
            />
            {errors.applicationDeadline && (
              <p className="text-red-600 mt-1">{errors.applicationDeadline}</p>
            )}
          </div>
          <div className="flex flex-col w-full">
            <label className="text-lg font-medium text-gray-700">
              Kinh nghiệm
            </label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              className="border p-2 rounded"
            >
              <option value="">-- Chọn --</option>
              {experiencesOptions &&
                experiencesOptions.map((opt, index) => (
                  <option key={index} value={opt}>
                    {opt}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Chức danh & Địa điểm làm việc */}
        <div className="flex gap-5">
          <div className="flex flex-col w-full">
            <label className="text-lg font-medium text-gray-700">Cấp bậc</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleInputChange}
              className="border p-2 rounded"
            >
              <option value="">-- Chọn --</option>
              {levelsOptions &&
                levelsOptions.map((opt, index) => (
                  <option key={index} value={opt}>
                    {opt}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label className="text-lg font-medium text-gray-700">
              Địa điểm làm việc <span className="text-red-600">*</span>
            </label>
            <select
              name="locationType"
              value={formData.locationType}
              onChange={handleInputChange}
              className="border p-2 rounded mb-2"
            >
              <option value="">-- Chọn --</option>
              {locationOptions.map((opt, index) => (
                <option key={index} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            {formData.locationType === "Offline" && (
              <>
                <input
                  type="text"
                  name="locationAddress"
                  value={formData.locationAddress}
                  onChange={handleInputChange}
                  placeholder="Nhập địa chỉ làm việc"
                  className="border p-2 rounded mb-2"
                />
                <button
                  type="button"
                  onClick={handleSelectFromMaps}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Chọn trên Google Maps
                </button>
              </>
            )}

            {errors.locationType && (
              <p className="text-red-600 mt-1">{errors.locationType}</p>
            )}
            {errors.locationAddress && (
              <p className="text-red-600 mt-1">{errors.locationAddress}</p>
            )}
          </div>
        </div>

        {/* Danh mục ngành nghề */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col w-full">
            <label className="text-lg font-medium text-gray-700">
              Lĩnh vực
            </label>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
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
          <div className="flex items-center gap-2">
            <div
              className={`font-medium ${isIndustryUnselected ? "text-gray-400" : "text-gray-700"
                }`}
            >
              Ngành nghề
            </div>
            {isIndustryUnselected && (
              <Tooltip title="Vui lòng chọn lĩnh vực trước khi chọn ngành nghề">
                <InfoOutlined style={{ color: "gray", fontSize: "16px" }} />
              </Tooltip>
            )}
          </div>
          <div
            className={`w-full rounded-md ${isIndustryUnselected ? "bg-gray-100/80" : "bg-gray-200/80"
              } min-h-[100px] max-h-[700px] overflow-auto p-4 mb-2`}
          >
            {!isIndustryUnselected && (
              <JobCategorySelector
                categories={jobCategories}
                multiple={false}
                onSelect={handleSelectCategory}
              />
            )}
          </div>
        </div>

        {/* Kỹ năng */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium text-gray-700">
            Kỹ năng (tối đa 5)
          </label>
          <div className="flex flex-wrap gap-2 p-2 rounded-md min-h-[40px] bg-gray-200/80">
            {isLoadingUserSkills
              ? (
                <p className="text-gray-500 text-sm">
                  Đang tải kỹ năng đã chọn...
                </p>
              )
              : (
                selectedSkillsDocs.map((skill) => (
                  <div
                    key={skill._id}
                    className="flex items-center bg-teal-100 text-teal-800 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {skill.name}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill._id)}
                      className="ml-2 font-bold text-teal-600 hover:text-teal-800"
                      aria-label={`Remove ${skill.name}`}
                    >
                      &times;
                    </button>
                  </div>
                ))
              )}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm và thêm kỹ năng..."
              value={skillNameQuery_Display}
              onChange={(e) => handleChangeSkillQueryInput(e.target.value)}
              className="border p-2 rounded w-full"
              disabled={formData.skillIds.length >= 5}
            />
            {skillNameQuery_Display.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {isLoadingSkillListQuery || isChangingSkillQuery
                  ? <div className="px-4 py-2 text-gray-500">Đang tìm...</div>
                  : errorLoadingSkillListQuery
                    ? (
                      <div className="px-4 py-2 text-red-500">
                        Lỗi khi tìm kỹ năng.
                      </div>
                    )
                    : skillSearchResults.length > 0
                      ? (
                        skillSearchResults.map((skill) => (
                          <div
                            key={skill._id}
                            onClick={() => handleAddSkill(skill._id)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            {skill.name}
                          </div>
                        ))
                      )
                      : (
                        <div className="px-4 py-2 text-gray-500">
                          Không tìm thấy kỹ năng.
                        </div>
                      )}
              </div>
            )}
          </div>
          {formData.skillIds.length >= 5 && (
            <p className="text-sm text-gray-600 mt-1">
              Bạn đã chọn tối đa 5 kỹ năng.
            </p>
          )}
        </div>

        {/* Mô tả công việc */}
        <TextAreaField
          label={
            <>
              Mô tả công việc <span className="text-red-600">*</span>
            </>
          }
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          error={errors.description}
        />

        {/* Yêu cầu công việc */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700 mb-2">
            Yêu cầu công việc
          </label>
          <div className="flex gap-10">
            {/* Technical */}
            <div className="flex flex-col w-1/2">
              <strong className="mb-2">Technical (Chọn tối đa 3)</strong>
              {technicalOptions.map((option) => (
                <label
                  key={option}
                  className="inline-flex items-center mb-1 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.requirementsTechnical.includes(option)}
                    onChange={() => handleCheckboxChange("technical", option)}
                    disabled={!formData.requirementsTechnical.includes(
                      option,
                    ) &&
                      formData.requirementsTechnical.length >= 3}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>

            {/* Non-technical */}
            <div className="flex flex-col w-1/2">
              <strong className="mb-2">Non-technical (Chọn tối đa 3)</strong>
              {nonTechnicalOptions.map((option) => (
                <label
                  key={option}
                  className="inline-flex items-center mb-1 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.requirementsNonTechnical.includes(option)}
                    onChange={() =>
                      handleCheckboxChange("nonTechnical", option)}
                    disabled={!formData.requirementsNonTechnical.includes(
                      option,
                    ) &&
                      formData.requirementsNonTechnical.length >= 3}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Lương */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700">
            Lương <span className="text-red-600">*</span>
          </label>
          <div>
            <label className="inline-flex items-center mb-1 cursor-pointer">
              <input
                type="checkbox"
                checked={useSalaryRange}
                onChange={() => setUseSalaryRange((prev) => !prev)}
                className="mr-2"
              />
              Sử dụng khoảng
            </label>
          </div>
          {useSalaryRange && (
            <div className="flex gap-2 items-center">
              <input
                type="text"
                name="salaryRangeStart"
                value={formData.salaryRangeStart}
                onChange={handleInputChange}
                placeholder="Lương"
                className="border p-2 rounded"
              />
              -
              <input
                type="text"
                name="salaryRangeEnd"
                value={formData.salaryRangeEnd}
                onChange={handleInputChange}
                placeholder="Lương"
                className="border p-2 rounded"
              />
              <select
                className="w-full sm:w-auto px-3 py-2 border rounded focus:outline-none focus:ring"
                name="salaryRangeUnit"
                value={formData.salaryRangeUnit}
                onChange={handleInputChange}
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
          )}
          {!useSalaryRange && (
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              placeholder="Lương"
              className="border p-2 rounded"
            />
          )}
          {errors.salary && (
            <p className="text-red-600 mt-1">
              {errors.salary}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-5">
          <button
            onClick={onBack}
            className="bg-gray-300 text-black px-4 py-2 rounded cursor-pointer"
          >
            Quay lại
          </button>
          <button
            onClick={handleSubmit}
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 cursor-pointer"
          >
            Đăng việc
          </button>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange }) => (
  <div className="flex flex-col w-full">
    <label className="text-lg font-medium text-gray-700">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="border p-2 rounded"
    />
  </div>
);

const TextAreaField = ({ label, name, value, onChange, error }) => (
  <div className="flex flex-col">
    <label className="text-lg font-medium text-gray-700">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows="4"
      className="border p-2 rounded"
    />
    {error && <p className="text-red-600 mt-1">{error}</p>}
  </div>
);

export default CreateJobTab;
