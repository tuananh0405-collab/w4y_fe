import React from 'react';
import Card from '@mui/material/Card';
import theme from '../../utils/theme';

const CVTemplateSelection = () => {
    const templates = [
        {
            id: 1,
            title: "Mẫu 1",
            type: "Mẫu chuyên nghiệp",
            description: "Đơn giản, phù hợp với mọi ngành nghề"
        },
        {
            id: 2,
            title: "Mẫu 2", 
            type: "Mẫu sáng tạo",
            description: "Phù hợp với các ngành thiết kế"
        },
        {
            id: 3,
            title: "Mẫu 3",
            type: "Mẫu hiện đại", 
            description: "Nổi bật với nhiều màu sắc"
        }
    ];

    return (
        <div className="w-full min-w-[1000px] p-5 bg-inherit">
            <h1 className="font-inter font-bold text-4xl text-orange-500 mb-8 text-center text-teal-700">Chọn mẫu CV</h1>
            <div className="flex gap-5 justify-center flex-wrap">
                {templates.map((template) => (
                    <div key={template.id} className="w-[311px] cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg">
                        <div className="h-[296px] bg-teal-700 rounded-t-lg flex items-center justify-center">
                            <h2 className="font-inter font-medium text-4xl text-white text-center">{template.title}</h2>
                        </div>
                        <div className={`bg-white p-5 h-[173px] rounded-b-lg ${template.id === 3 ? 'bg-[#fffaf1]' : ''}`}>
                            <h3 className="font-inter font-bold text-xl text-black text-center mb-2">{template.type}</h3>
                            <p className="font-inter font-medium text-xl text-gray-600 text-center">{template.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default CVTemplateSelection;
