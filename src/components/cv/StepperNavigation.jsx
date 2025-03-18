import React from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';

const StepperNavigation = ({ currentStep = 1 }) => {
    const steps = [
        'Tải lên CV',
        'Thông tin hồ sơ',
        'Kỹ năng',
        'Hoàn tất'
    ];

    return (
        <div className="w-full min-w-[800px] py-5 bg-inherit">
            <Stepper activeStep={currentStep - 1} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>
                            <span className="font-inter font-medium text-2xl text-center text-gray-600">{label}</span>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
};

export default StepperNavigation;
