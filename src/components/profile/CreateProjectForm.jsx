// CreateProjectForm.jsx
import React from "react";
import { Form, Input, Button, InputNumber, Select, Rate } from "antd";

const { Option } = Select;

const CreateProjectForm = ({ onCancel, onCreate, loading }) => {
  return (
    <div className="p-8 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Tạo Dự Án Mới</h2>
      <Form
        layout="vertical"
        onFinish={onCreate}
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
          rules={[{ required: true, message: "Vui lòng nhập công nghệ sử dụng" }]}
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
          rules={[{ required: true, message: "Vui lòng nhập tính năng chính của dự án" }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          label="Thời gian thực hiện"
          name="duration"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Vai trò"
          name="role"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Số lượng thành viên"
          name="teamSize"
          rules={[{ required: true, message: "Vui lòng nhập số lượng thành viên" }]}
        >
          <InputNumber min={1} max={100} />
        </Form.Item>

        <Form.Item
          label="Đánh giá"
          name="rating"
        >
          <Rate />
        </Form.Item>

        <Form.Item
          label="Media"
          name="media"
          rules={[{ required: true, message: "Vui lòng nhập URL media" }]}
        >
          <Input placeholder="URL của media (hình ảnh, video)" />
        </Form.Item>

        <Form.Item
          label="Trạng thái"
          name="status"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái dự án" }]}
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
      </Form>

      <Button onClick={onCancel} block>
        Hủy
      </Button>
    </div>
  );
};

export default CreateProjectForm;
