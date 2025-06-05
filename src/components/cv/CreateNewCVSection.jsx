import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { jsPDF } from 'jspdf';
import theme from '../../utils/theme';

const CreateNewCVSection = () => {
    const [formData, setFormData] = useState({
        title: '',
        fullName: '',
        email: '',
        phone: '',
        position: '',
        summary: '',
        skills: ['Java', 'Design', 'MySQL'],
        newSkill: ''
    });
    const [previewData, setPreviewData] = useState(null); // State để lưu dữ liệu khi xem trước
    const [isPreviewing, setIsPreviewing] = useState(false); // Điều kiện để hiển thị preview

    // Hàm thay đổi dữ liệu khi người dùng điền vào form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Hàm thêm kỹ năng mới
    const handleSkillChange = (e) => {
        if (e.key === 'Enter' && formData.newSkill.trim()) {
            setFormData((prev) => ({
                ...prev,
                skills: [...prev.skills, formData.newSkill.trim()],
                newSkill: ''
            }));
        }
    };

    // Hàm xóa kỹ năng
    const handleRemoveSkill = (skillToRemove) => {
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.filter(skill => skill !== skillToRemove)
        }));
    };

    // Hàm xử lý việc xem trước CV
    const handlePreview = () => {
        setPreviewData(formData); // Lưu dữ liệu vào previewData để hiển thị
        setIsPreviewing(true); // Bật chế độ xem trước
    };

    // Hàm xử lý khi tạo CV và tải xuống PDF
    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        // Header
        doc.setFontSize(22);
        doc.text(formData.title, 20, 30);
        
        // User Info
        doc.setFontSize(14);
        doc.text(`Full Name: ${formData.fullName}`, 20, 50);
        doc.text(`Email: ${formData.email}`, 20, 60);
        doc.text(`Phone: ${formData.phone}`, 20, 70);
        doc.text(`Position: ${formData.position}`, 20, 80);
        
        // Summary
        doc.text(`Summary: ${formData.summary}`, 20, 100);

        // Skills
        doc.text('Skills:', 20, 120);
        formData.skills.forEach((skill, index) => {
            doc.text(`- ${skill}`, 20, 130 + index * 10);
        });

        // Save the document
        doc.save('CV.pdf');
    };

    return (
        <div className="w-full max-w-[1240px] mx-auto p-5 font-inter">
            <h1 className="text-4xl font-bold text-orange-500 mb-8" style={{color: theme.colors.darkTeal}}>Tạo CV mới</h1>

            <div className="flex flex-col gap-5">
                <TextField
                    label="Tiêu đề hồ sơ"
                    variant="outlined"
                    fullWidth
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Ví dụ: Senior Java Developer với 3 năm kinh nghiệm"
                />

                <div className="flex gap-5">
                    <TextField
                        label="Họ và tên"
                        variant="outlined"
                        fullWidth
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Nguyễn Văn A"
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="example@email.com"
                    />
                </div>

                <div className="flex gap-5">
                    <TextField
                        label="Số điện thoại"
                        variant="outlined"
                        fullWidth
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="0123456789"
                    />
                    <TextField
                        label="Vị trí mong muốn"
                        variant="outlined"
                        fullWidth
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        placeholder="Developer, Designer,..."
                    />
                </div>

                <TextField
                    label="Tóm tắt về bản thân"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    name="summary"
                    value={formData.summary}
                    onChange={handleInputChange}
                    placeholder="Giới thiệu ngắn gọn về bản thân"
                />

                <div className="flex flex-col gap-2">
                    <label className="text-xl font-semibold text-black text-opacity-85">Kỹ năng</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {formData.skills.map((skill, index) => (
                            <Button
                                key={index}
                                className="bg-teal-500 text-white py-1 px-3 rounded-lg"
                                onClick={() => handleRemoveSkill(skill)}
                            >
                                {skill} &times;
                            </Button>
                        ))}
                    </div>
                    <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Thêm kỹ năng..."
                        value={formData.newSkill}
                        onChange={(e) => setFormData({ ...formData, newSkill: e.target.value })}
                        onKeyPress={handleSkillChange}
                    />
                </div>
                
                {/* Nút Xem trước */}
                <Button
                    variant="contained"
                    color="primary"
                    className="mt-5"
                    onClick={handlePreview}
                >
                    Xem trước
                </Button>
            </div>

            {/* Phần hiển thị xem trước */}
            {isPreviewing && previewData && (
                <div className="mt-5 p-5 border border-gray-300 rounded-lg">
                    <h2 className="text-2xl font-bold">Xem trước CV</h2>
                    <p><strong>Tiêu đề hồ sơ: </strong>{previewData.title}</p>
                    <p><strong>Họ tên: </strong>{previewData.fullName}</p>
                    <p><strong>Email: </strong>{previewData.email}</p>
                    <p><strong>Số điện thoại: </strong>{previewData.phone}</p>
                    <p><strong>Vị trí mong muốn: </strong>{previewData.position}</p>
                    <p><strong>Tóm tắt về bản thân: </strong>{previewData.summary}</p>
                    <p><strong>Kỹ năng: </strong>{previewData.skills.join(', ')}</p>

                    {/* Nút Tải xuống PDF */}
                    <Button
                        variant="contained"
                        color="success"
                        className="mt-5"
                        onClick={handleDownloadPDF}
                    >
                        Tải xuống CV
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CreateNewCVSection;
