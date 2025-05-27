import React from 'react';
import { Card, Col, Row, Typography } from 'antd';
import { DollarOutlined, ScheduleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import JobCard from './JobCard';

// Sử dụng tailwindcss cho các kiểu dáng
const { Title, Text } = Typography;

const JobDisplay = ({ job }) => {
  const navigate = useNavigate();

  // Click vào job sẽ chuyển hướng đến trang chi tiết công việc
  const handleJobClick = (jobId) => {
    navigate(`/job-detail/${jobId}`);
  };

  console.log('====================================');
  console.log(job);
  console.log('====================================');

  return (
    <Col span={8} className="p-4">
    
        <div onClick={()=>handleJobClick(job.id)}>
        <JobCard {...job} />
      </div>
    </Col>
  );
};

export default JobDisplay;
