import React from "react";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import * as SelectPrimitive from "@radix-ui/react-select";

// Utility function
const cn = (...classes) => classes.filter(Boolean).join(" ");

// UI Components
const Button = React.forwardRef(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    {...props}
  >
    {children}
  </button>
));
Button.displayName = "Button";

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
    {...props}
  />
));
Card.displayName = "Card";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      "flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[60px] w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

const Select = SelectPrimitive.Root;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn("flex h-9 w-full items-center justify-between rounded-md border px-3 py-2 text-sm shadow-sm", className)}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDownIcon className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn("z-50 max-h-96 overflow-hidden rounded-md border bg-white shadow-md", className)}
      {...props}
    >
      <SelectPrimitive.ScrollUpButton>
        <ChevronUpIcon className="h-4 w-4" />
      </SelectPrimitive.ScrollUpButton>
      <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
      <SelectPrimitive.ScrollDownButton>
        <ChevronDownIcon className="h-4 w-4" />
      </SelectPrimitive.ScrollDownButton>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm", className)}
    {...props}
  >
    <span className="absolute right-2">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

// Main Component
export const FastApply = ({ jobTitle = "Công việc" }) => {
  const formFields = [
    { id: "fullName", label: "Họ và tên", type: "input", required: true },
    { id: "birthYear", label: "Năm sinh", type: "select", required: true },
    { id: "address", label: "Nơi ở hiện tại", type: "input", required: true },
    { id: "phone", label: "Số điện thoại", type: "input", required: true },
    { id: "idCard", label: "CMNN/CCCD", type: "input", required: true },
    { id: "other", label: "Khác", type: "textarea", required: false },
  ];

  return (
    <div className="w-full max-w-[1029px] mx-auto">
      <Card className="w-full max-w-[856px] ml-auto rounded-[30px] bg-[#d7f3ea] border-none shadow-none">
        <CardContent className="p-7">
          <div className="text-center mb-8">
            <h1 className="font-bold text-2xl">Ứng tuyển {jobTitle}</h1>
          </div>

          <div className="text-center mb-6">
            <h2 className="font-semibold text-2xl">
              Thông tin cá nhân<span className="text-[#ff0000]">*</span>
            </h2>
          </div>

          <div className="space-y-6 max-w-[774px] mx-auto">
            {formFields.map((field) => (
              <div key={field.id} className="flex flex-col space-y-2">
                <label className="font-semibold text-base flex items-center">
                  {field.label}
                  {field.required && <span className="text-[#ff0000] ml-1">*</span>}
                </label>

                {field.type === "input" && (
                  <Input className="h-[50px] border border-[#9c9c9c]" />
                )}

                {field.type === "select" && (
                  <Select>
                    <SelectTrigger className="h-[50px] border border-[#9c9c9c]">
                      <SelectPrimitive.Value placeholder="Chọn năm" />
                    </SelectTrigger>
                    <SelectContent>
                      {["2000", "2001", "2002", "2003"].map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {field.type === "textarea" && (
                  <Textarea
                    className="h-[180px] border border-[#9c9c9c]"
                    defaultValue="Bạn có thể đi làm theo ca không? Công việc liên quan trước đây? Có thể làm việc nặng không? Có thể đi làm ngay không?...."
                  />
                )}
              </div>
            ))}

            <div className="mt-8">
              <h2 className="font-semibold text-2xl mb-4 flex items-center">
                <img
                  className="w-[62px] h-[62px] mr-2"
                  alt="Note icon"
                  src="https://c.animaapp.com/mbyysuwsLozlGm/img/ic-outline-edit-note.svg"
                />
                Lưu ý
              </h2>
              <div className="border border-[#9c9c9c] rounded p-4 text-[#00000099] text-xl space-y-4">
                <p>
                  Chúng tôi khuyến nghị ứng viên cần chủ động tìm hiểu kỹ thông tin công ty, vị trí ứng tuyển...
                </p>
                <p>
                  Ứng viên cần chịu trách nhiệm với các hành vi ứng tuyển của mình...
                </p>
                <p>
                  Để tránh rủi ro, bạn nên tránh cung cấp các thông tin nhạy cảm như CMND/CCCD...
                </p>
                <p>
                  4. Xem thêm hướng dẫn phòng tránh lừa đảo và mẹo tìm việc an toàn{" "}
                  <span className="text-[#183c2e] underline">tại đây</span>
                </p>
              </div>
            </div>

            <div className="flex space-x-4 mt-8">
              <Button className="w-[81px] h-[50px] border border-[#f2762e] text-[#010101] text-2xl">
                Huỷ
              </Button>
              <Button className="flex-1 h-[50px] bg-[#3a6656] hover:bg-[#2d5244] text-white text-2xl">
                Nộp hồ sơ ứng tuyển
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
