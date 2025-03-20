import React from 'react';
import { Card, Col, Row, Typography } from 'antd';
import { DollarOutlined, ScheduleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

// Sử dụng tailwindcss cho các kiểu dáng
const { Title, Text } = Typography;

const JobDisplay = ({ job }) => {
  const navigate = useNavigate();

  // Click vào job sẽ chuyển hướng đến trang chi tiết công việc
  const handleJobClick = (jobId) => {
    navigate(`/job-detail/${jobId}`);
  };

  return (
    <Col span={8} className="p-4">
      <Card
        hoverable
        onClick={() => handleJobClick(job.id)}
        className="border border-gray-200 rounded-lg shadow-md"
      >
        <Title level={4} className="text-gray-800">{job.title}</Title>
        <Text className="text-gray-600">{job.employerName}</Text>
        <div className="mt-4">
          <p className="text-sm text-gray-700">{job.description}</p>
          <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <DollarOutlined className="mr-2" />
              <Text>{job.salary}</Text>
            </div>
            <div className="flex items-center">
              <ScheduleOutlined className="mr-2" />
              <Text>{job.deliveryTime}</Text>
            </div>
            <div className="flex items-center">
              <EnvironmentOutlined className="mr-2" />
              <Text>{job.priorityLevel}</Text>
            </div>
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default JobDisplay;
