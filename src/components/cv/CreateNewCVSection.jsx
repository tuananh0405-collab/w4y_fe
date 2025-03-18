import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';

const CreateNewCVSection = () => {
    const [skills, setSkills] = useState(['Java', 'Design', 'MySQL']);
    const [newSkill, setNewSkill] = useState('');

    const handleRemoveSkill = (skillToRemove) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const handleAddSkill = (e) => {
        if (e.key === 'Enter' && newSkill.trim()) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill('');
        }
    };

    return (
        <div className="w-full max-w-[1240px] mx-auto p-5 font-inter">
            <h1 className="text-4xl font-bold text-orange-500 mb-8">Hoặc tạo CV mới</h1>
            
            <div className="flex flex-col gap-5">
                <TextField 
                    label="Tiêu đề hồ sơ"
                    variant="outlined"
                    fullWidth
                    placeholder="Ví dụ: Senior Java Developer với 3 năm kinh nghiệm"
                />

                <div className="flex gap-5">
                    <TextField 
                        label="Họ và tên"
                        variant="outlined"
                        fullWidth
                        placeholder="Nguyễn Văn A"
                    />
                    <TextField 
                        label="Email"
                        variant="outlined"
                        fullWidth
                        placeholder="example@email.com"
                    />
                </div>

                <div className="flex gap-5">
                    <TextField 
                        label="Số điện thoại"
                        variant="outlined"
                        fullWidth
                        placeholder="0123456789"
                    />
                    <TextField 
                        label="Vị trí mong muốn"
                        variant="outlined"
                        fullWidth
                        placeholder="Developer, Designer,..."
                    />
                </div>

                <TextField 
                    label="Tóm tắt về bản thân"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Giới thiệu ngắn gọn về bản thân"
                />

                <div className="flex flex-col gap-2">
                    <label className="text-xl font-semibold text-black text-opacity-85">Kỹ năng</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {skills.map((skill, index) => (
                            <Chip 
                                key={index} 
                                label={skill} 
                                onDelete={() => handleRemoveSkill(skill)}
                                color="primary"
                            />
                        ))}
                    </div>
                    <TextField 
                        variant="outlined"
                        fullWidth
                        placeholder="Thêm kỹ năng..."
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={handleAddSkill}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateNewCVSection;
