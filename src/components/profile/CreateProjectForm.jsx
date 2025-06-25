// CreateProjectForm.jsx
import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  InputNumber,
  Select,
  Rate,
  Upload,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useUploadMediaFileMutation, useDeleteMediaFileMutation } from "../../redux/api/mediaS3ApiSlice";

const { Option } = Select;

const CreateProjectForm = ({ onCancel, onCreate, loading }) => {
  const [mediaList, setMediaList] = useState([]);
  const [uploadMediaFile] = useUploadMediaFileMutation();
  const [deleteMediaFile] = useDeleteMediaFileMutation();
  const [hasSubmitted, setHasSubmitted] = useState(false);

useEffect(() => {
  const handleBeforeUnload = (e) => {
    if (!hasSubmitted && mediaList.length > 0) {
      mediaList.forEach((media) => {
        const key = media.url.split("amazonaws.com/")[1];
        // Fire and forget — no await
        deleteMediaFile({ key });
      });
    }
  };

  window.addEventListener("beforeunload", handleBeforeUnload);

  return () => {
    handleBeforeUnload(); // same cleanup on unmount
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
}, [hasSubmitted, mediaList]);

  const handleUpload = async (file) => {
  try {
    // 1. Gọi API để lấy presigned URL
    console.log(file)
    const { url, key } = await uploadMediaFile({
  fileName: file.name,
  fileType: file.type,
}).unwrap();
const formData = new FormData();
formData.append("file", file);

// This avoids uploading the actual file to our backend for performance and cost reasons, should be done from the client directly to S3
await fetch(url, {
  method: "PUT",
  headers: {
    "Content-Type": file.type,
  },
  body: file,
});

const fileType = file.type.startsWith("video/") ? "video" : "image";

setMediaList((prev) => [
  ...prev,
  {
    url: url.split("?")[0], // clean presigned url
    type: fileType,
  },
]);

    message.success(`${file.name} uploaded thành công`);
  } catch (err) {
    console.error(err);
    message.error(`${file.name} upload thất bại`);
  }
};

const handleRemove = async (file) => {
  try {
    const url = file.url || file.thumbUrl;
    const key = url.split("amazonaws.com/")[1];

    await deleteMediaFile({ key }).unwrap();

    setMediaList((prev) => prev.filter((m) => m.url !== url));
    message.success("Đã xoá media khỏi S3");
  } catch (err) {
    console.error(err);
    message.error("Lỗi khi xoá media");
  }
};

  return (
    <div className="p-8 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Tạo Dự Án Mới
      </h2>
      <Form
        layout="vertical"
        onFinish={(values) => {
          setHasSubmitted(true);
          onCreate({
            ...values,
            media: mediaList, // Array of { url, type }
          });
        }}
      >
        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề dự án" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả dự án" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Công nghệ sử dụng"
          name="technologies"
          rules={[
            { required: true, message: "Vui lòng nhập công nghệ sử dụng" },
          ]}
        >
          <Select
            mode="tags"
            placeholder="Chọn công nghệ"
            style={{ width: "100%" }}
          >
            <Option value="React Native">React Native</Option>
            <Option value="ARCore">ARCore</Option>
            <Option value="Firebase">Firebase</Option>
            <Option value="NodeJS">NodeJS</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Tóm tắt"
          name="summary"
          rules={[{ required: true, message: "Vui lòng nhập tóm tắt dự án" }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          label="Tính năng chính"
          name="features"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tính năng chính của dự án",
            },
          ]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item label="Thời gian thực hiện" name="duration">
          <Input />
        </Form.Item>

        <Form.Item label="Vai trò" name="role">
          <Input />
        </Form.Item>

        <Form.Item
          label="Số lượng thành viên"
          name="teamSize"
          rules={[
            { required: true, message: "Vui lòng nhập số lượng thành viên" },
          ]}
        >
          <InputNumber min={1} max={100} />
        </Form.Item>

        <Form.Item label="Đánh giá" name="rating">
          <Rate />
        </Form.Item>

        <Form.Item
          label="Media"
          name="media"
          rules={[{ required: true, message: "Media (Hình ảnh, video)" }]}
        >
          {/* <Input placeholder="Media (Hình ảnh, video)" /> */}
          <Form.Item label="Media (Hình ảnh / Video)">
            <Upload
              listType="picture-card"
              multiple
              customRequest={({ file }) => handleUpload(file)}
              onRemove={(file) => handleRemove(file)}
              fileList={mediaList.map((media, index) => ({
                uid: media.url || index,
                name: media.url.split("/").pop(),
                status: "done",
                url: media.url,
              }))}
              showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
            >
              {mediaList.length < 10 && (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Tải lên</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Form.Item>

        <Form.Item
          label="Trạng thái"
          name="status"
          rules={[
            { required: true, message: "Vui lòng chọn trạng thái dự án" },
          ]}
        >
          <Select defaultValue="draft">
            <Option value="featured">Nổi bật</Option>
            <Option value="draft">Bản nháp</Option>
            <Option value="archived">Lưu trữ</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Tạo Dự Án
          </Button>
        </Form.Item>

        <Button onClick={onCancel} block>
          Hủy
        </Button>
      </Form>
    </div>
  );
};

export default CreateProjectForm;
