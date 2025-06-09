import { Button, Col, Image, Row, Typography } from "antd";
import React from "react";

const { Title, Text, Paragraph } = Typography;
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import { playBtnIcon } from "../assets";
import theme from "../utils/theme";

const ProjectRoom = () => {
  const techTags = ["React Native", "AR Core", "3D Modeling", "Fire base"];

  return (
    <div className="flex flex-col w-full bg-[#fff] ">
      <Header />
      <div className="w-full flex flex-col justify-between">
        <section className=" p-8 md:p-10 font-sans bg-[theme.colors.bgColor]">
          <header className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mb-8">
            <span className="text-xl sm:text-2xl font-semibold text-[#000]">
              Đỗ Thế Hào /
            </span>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#000]">
              Exhibition AR
            </h2>
          </header>
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
            {/* Media section */}
            <div className="flex-1 w-1/2 h-[472px] bg-[#3a6656] rounded-2xl relative flex items-center justify-center">
              <div className="relative w-[68px] h-[78px] hover:opacity-90 transition duration-300">
                <img
                  src={playBtnIcon}
                  alt="Play button"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Details section */}
            <div className="flex-1 w-1/2">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#000] mb-4">
                Exhibition AR
              </h3>
              <ul className="flex flex-wrap gap-4 mb-6 list-none p-0">
                {techTags.map((tag) => (
                  <li
                    key={tag}
                    className="bg-[#3a6656] text-[#fff] text-lg font-medium px-4 py-2 rounded-full whitespace-nowrap cursor-pointer hover:bg-[#2b4b3b] transition duration-300"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <p className="text-lg sm:text-xl font-normal text-[#000] leading-relaxed">
                Ứng dụng thực tế ảo tăng cường (AR) cho triển lãm, cho phép
                người dùng tương tác với các đối tượng 3D và nhận thông tin chi
                tiết thông qua camera điện thoại. Dự án tích hợp công nghệ AR
                hiện đại với giao diện người dùng trực quan....
              </p>
            </div>
          </div>
        </section>

        <div data-model-id="1659:320-frame" className="p-8 md:p-10 font-sans ">
          <Row gutter={[16, 16]}>
            <Col span={16}>
              <div
                style={{
                  backgroundColor: "#f8fdfc",
                  borderRadius: "10px",
                  padding: "20px",
                }}
              >
                <Title level={1} style={{ textAlign: "center" }}>
                  Tổng quan dự án
                </Title>
                <Paragraph>
                  <Text strong>Vấn đề: </Text>
                  Các triển lãm truyền thống thiếu tính tương tác và khó thu hút
                  sự chú ý của du khách, đặc biệt là thế hệ trẻ.
                </Paragraph>
                <Paragraph>
                  <Text strong>Giải pháp: </Text>
                  Phát triển ứng dụng AR cho phép du khách quét các exhibit để
                  hiển thị thông tin 3D, video giải thích và trải nghiệm tương
                  tác phong phú.
                </Paragraph>
                <Paragraph>
                  <Text strong>Kết quả: </Text>
                  Tăng 75% thời gian lưu trú của du khách và 90% phản hồi tích
                  cực về trải nghiệm triển lãm.
                </Paragraph>
              </div>
              <div
                style={{
                  backgroundColor: "#f8fdfc",
                  borderRadius: "10px",
                  padding: "20px",
                  marginTop: "20px",
                }}
              >
                <Title level={2} style={{ textAlign: "center" }}>
                  Tính năng chính
                </Title>
                <Row gutter={[16, 16]}>
                  <Col span={2}>
                    <Image
                      src="https://c.animaapp.com/mblrhzumfhRI2m/img/vector.svg"
                      preview={false}
                    />
                  </Col>
                  <Col span={22}>
                    <Paragraph>
                      Quét QR code để kích hoạt AR experience
                    </Paragraph>
                  </Col>
                  <Col span={2}>
                    <Image
                      src="https://c.animaapp.com/mblrhzumfhRI2m/img/vector.svg"
                      preview={false}
                    />
                  </Col>
                  <Col span={22}>
                    <Paragraph>
                      Hiển thị mô hình 3D interactive cho từng exhibit
                    </Paragraph>
                  </Col>
                  <Col span={2}>
                    <Image
                      src="https://c.animaapp.com/mblrhzumfhRI2m/img/vector.svg"
                      preview={false}
                    />
                  </Col>
                  <Col span={22}>
                    <Paragraph>
                      Audio guide tự động khi đến gần đối tượng
                    </Paragraph>
                  </Col>
                  <Col span={2}>
                    <Image
                      src="https://c.animaapp.com/mblrhzumfhRI2m/img/vector.svg"
                      preview={false}
                    />
                  </Col>
                  <Col span={22}>
                    <Paragraph>Chụp ảnh, quay video với AR overlay</Paragraph>
                  </Col>
                  <Col span={2}>
                    <Image
                      src="https://c.animaapp.com/mblrhzumfhRI2m/img/vector.svg"
                      preview={false}
                    />
                  </Col>
                  <Col span={22}>
                    <Paragraph>Map navigation với AR directions</Paragraph>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={8}>
              <div
                style={{
                  backgroundColor: "#f8fdfc",
                  borderRadius: "10px",
                  padding: "20px",
                }}
              >
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Text>Thời gian thực hiện</Text>
                    <Text strong style={{ float: "right" }}>
                      3 tháng
                    </Text>
                  </Col>
                  <Col span={24}>
                    <Image
                      src="https://c.animaapp.com/mblrhzumfhRI2m/img/line-42.svg"
                      preview={false}
                    />
                  </Col>
                  <Col span={24}>
                    <Text>Vai trò</Text>
                    <Text strong style={{ float: "right" }}>
                      Graphic Designer
                    </Text>
                  </Col>
                  <Col span={24}>
                    <Image
                      src="https://c.animaapp.com/mblrhzumfhRI2m/img/line-42.svg"
                      preview={false}
                    />
                  </Col>
                  <Col span={24}>
                    <Text>Team size</Text>
                    <Text strong style={{ float: "right" }}>
                      3 người
                    </Text>
                  </Col>
                  <Col span={24}>
                    <Image
                      src="https://c.animaapp.com/mblrhzumfhRI2m/img/line-42.svg"
                      preview={false}
                    />
                  </Col>
                  <Col span={24}>
                    <Text>Rating</Text>
                    <Text strong style={{ float: "right" }}>
                      4.8/5.0
                    </Text>
                  </Col>
                  <Col span={24}>
                    <div
                      style={{
                        width: "90px",
                        height: "90px",
                        backgroundColor: "#d9d9d9",
                        borderRadius: "45px",
                        margin: "0 auto",
                      }}
                    />
                  </Col>
                  <Col span={24} style={{ textAlign: "center" }}>
                    <Title level={3}>Đỗ Thế Hảo</Title>
                    <Text>Junior Designer</Text>
                  </Col>
                  <Col span={24} style={{ textAlign: "center" }}>
                    <Image
                      src="https://c.animaapp.com/mblrhzumfhRI2m/img/group-408.png"
                      preview={false}
                    />
                    <Text>(4.2)</Text>
                  </Col>
                  <Col span={24} style={{ textAlign: "center" }}>
                    <Paragraph>312 lượt xem dự án</Paragraph>
                    <Paragraph>21 nhà tuyển dụng đã xem</Paragraph>
                  </Col>
                  <Col span={12}>
                    <Button type="primary" style={{ width: "100%" }}>
                      Xem thêm dự án
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button style={{ width: "100%" }}>Liên hệ ngay</Button>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>

        <div data-model-id="1678:70-frame" className="p-8 md:p-10">
          <Row
            justify="center"
            align="middle"
            style={{
              height: "100vh",
              backgroundColor: "#f8fdfc",
              borderRadius: "16px",
            }}
          >
            <Col
              span={24}
              style={{ textAlign: "center", marginBottom: "20px" }}
            >
              <h1
                style={{
                  fontFamily: "Inter, Helvetica",
                  fontWeight: "bold",
                  color: "black",
                  fontSize: "32px",
                }}
              >
                Screenshot &amp; Demo
              </h1>
            </Col>
            <Col span={12} style={{ padding: "10px" }}>
              <div
                style={{
                  backgroundColor: "#d9d9d9",
                  borderRadius: "16px",
                  height: "263px",
                }}
              />
              <div
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  fontFamily: "Inter, Helvetica",
                  fontSize: "20px",
                }}
              >
                AR Scanning
              </div>
            </Col>
            <Col span={12} style={{ padding: "10px" }}>
              <div
                style={{
                  backgroundColor: "#d9d9d9",
                  borderRadius: "16px",
                  height: "263px",
                }}
              />
              <div
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  fontFamily: "Inter, Helvetica",
                  fontSize: "20px",
                }}
              >
                3D Model View
              </div>
            </Col>
            <Col span={12} style={{ padding: "10px" }}>
              <div
                style={{
                  backgroundColor: "#d9d9d9",
                  borderRadius: "16px",
                  height: "263px",
                }}
              />
              <div
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  fontFamily: "Inter, Helvetica",
                  fontSize: "20px",
                }}
              >
                Info Overlay
              </div>
            </Col>
            <Col span={12} style={{ padding: "10px" }}>
              <div
                style={{
                  backgroundColor: "#d9d9d9",
                  borderRadius: "16px",
                  height: "263px",
                }}
              />
              <div
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  fontFamily: "Inter, Helvetica",
                  fontSize: "20px",
                }}
              >
                Navigation Map
              </div>
            </Col>
          </Row>
        </div>

         <div className="p-8 md:p-10">
      <Row
        justify="center"
        align="middle"
        style={{
          backgroundColor: "#f8fdfc",
          borderRadius: "16px",
          padding: "40px 0",
        }}
          gutter={[32, 16]}
      >
        <Col span={24}>
          <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
            Dự án khác
          </Title>
        </Col>

        {/* Project Cards Section */}
        <Col span={8}>
          <div
            style={{
              backgroundColor: "#3a6656",
              borderRadius: "16px 16px 0 0",
              padding: "60px 0",
              textAlign: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              W4U Web
            </Text>
          </div>
          <div
            style={{
              backgroundColor: "#d9d9d9",
              borderRadius: "0 0 16px 16px",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <Title level={3}>W4U - Job Matching Platform</Title>
            <Text>Ứng dụng thực tế tăng cường cho bảo tàng Việt Nam</Text>
          </div>
        </Col>

        <Col span={8}>
          <div
            style={{
              backgroundColor: "#3a6656",
              borderRadius: "16px 16px 0 0",
              padding: "60px 0",
              textAlign: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              W4U Web
            </Text>
          </div>
          <div
            style={{
              backgroundColor: "#d9d9d9",
              borderRadius: "0 0 16px 16px",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <Title level={3}>W4U - Job Matching Platform</Title>
            <Text>Ứng dụng thực tế tăng cường cho bảo tàng Việt Nam</Text>
          </div>
        </Col>

        <Col span={8}>
          <div
            style={{
              backgroundColor: "#3a6656",
              borderRadius: "16px 16px 0 0",
              padding: "60px 0",
              textAlign: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              W4U Web
            </Text>
          </div>
          <div
            style={{
              backgroundColor: "#d9d9d9",
              borderRadius: "0 0 16px 16px",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <Title level={3}>W4U - Job Matching Platform</Title>
            <Text>Ứng dụng thực tế tăng cường cho bảo tàng Việt Nam</Text>
          </div>
        </Col>

        {/* Back Button Section */}
        <Col span={24} style={{ textAlign: "center", marginTop: "20px" }}>
          <Button
            type="primary"
            style={{
              backgroundColor: "#3a6656",
              borderColor: "#3a6656",
              fontSize: "16px",
              padding: "10px 20px",
            }}
            onClick={() => history.goBack()}
          >
            Quay lại
          </Button>
        </Col>
      </Row>
    </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectRoom;
