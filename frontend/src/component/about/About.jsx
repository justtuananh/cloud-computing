import React from "react";
import { useSelector } from "react-redux";
import Footer from "../../Footer";
import Header from "../Home/Header";
import Loading from "../../more/Loader";
import MetaData from "../../more/Metadata";
import "./About.css";
import BottomTab from "../../more/BottomTab";

const About = () => {
  const { loading } = useSelector((state) => state.profile);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Giới thiệu" />
          <div>
            <Header />
            <div
              style={{
                width: "90%",
                margin: "0px auto",
              }}
            >
              <div className="about__page">
                {/* 1st verse */}
                <div className="row flex">
                  <div className="col__2">
                    <img src="https://ladigi.vn/wp-content/uploads/2020/04/nana-shop-296883.jpg" />
                  </div>
                  <div className="col__2">
                    <div className="meta">
                      <span
                        style={{
                          fontSize: "40px",
                          fontWeight: "700",
                          lineHeight: "1.2",
                        }}
                      >
                        Xin chào đến với Kiana Shop!!!
                      </span>
                      <p>
                        Kiana shop là một thương hiệu thời trang Việt Nam dành
                        cho giới trẻ.
                        <br />
                        ĐA DẠNG CÁC GU THỜI TRANG chính là phong cách hiện tại
                        của Kiana Shop.
                      </p>
                      <p>
                        Đặc biệt, GU TỐI GIẢN - ĐƠN GIẢN - THỂ THAO dành cho tất
                        cả mọi người, dành cho nhiều lứa tuổi là GU đang được
                        quan tâm nhất. Sản phẩm chiếm trưng bày lên đến 50% diện
                        tích cửa hàng. Mọi người dễ dàng chọn được những món
                        trang phục cơ bản và thiết yếu nhất dành cho mình.
                      </p>
                      <p>
                        <h1>1"</h1> <h2>Kiana shop </h2>mang đến cho khách hàng
                        những sản phẩm CHẤT LƯỢNG TỐT với GIÁ THÀNH RẺ nhất so
                        với chất lượng mang lại.
                        <br />
                        <br />
                        YaMe luôn nghiên cứu, phát triển mỗi ngày để mang đến
                        những sản phẩm đa dạng về chất liệu, nhiều tính năng, đa
                        dạng giá thành... mang lại nhiều sự lựa chọn hơn cho
                        khách hàng.
                      </p>
                      <p>
                        <h1>2"</h1>Mang đến những sản phẩm thiết kế đa dạng của
                        các nhà thiết kế trẻ, bắt kịp xu hướng thời trang thế
                        giới nhanh chóng nhất để đưa đến với các tín đồ thời
                        trang Việt Nam.
                        <br />
                        <br />
                        Các sản phẩm thời trang tại YaMe rất đa dạng, có thể
                        phục vụ nhiều nhu cầu trang phục ở nhiều lứa tuổi khác
                        nhau. Dù bạn thuộc Gu thời trang nào, YaMe tự tin có thể
                        mang đến sản phẩm thời trang phù hợp với phong cách.{" "}
                        <br />
                        YAME ĐA DẠNG VỀ GU THỜI TRANG, mỗi Gu mang 1 cá tính
                        khác biệt. YaMe ĐÁP ỨNG NHIỀU NHU CẦU trang phục cho
                        nhiều lứa tuổi
                        <br />
                        Không chỉ với áo thun, YaMe có tất cả các item thời
                        trang cần thiết. Chỉ cần lượn nhẹ một vòng bạn sẽ trang
                        bị đủ từ đầu đến chân, từ trong ra ngoài, cho đến phụ
                        kiện đi kèm phù hợp với mọi nhu cầu: tiệc tùng, lễ hội,
                        du lịch, đến trường hoặc đi làm..v.v..
                      </p>
                      <p>
                        <h1>3"</h1> <h2>Kiana shop </h2>Luôn duy trì chế độ bảo hành 365 ngày đối với mọi sản phẩm
                      </p>
                      
                    </div>
                  </div>
                </div>

                {/* 2nd verse */}
                <div className="second">
                  <div className="heading">
                    <h2>Chúng tôi cung cấp những gì?</h2>
                  </div>
                  <div className="row flex">
                    <div className="col__3">
                      <div
                        style={{
                          padding: "10px",
                          border: "1px solid rgb(0 0 0 / 14%)",
                          minHeight: "230px",
                        }}
                      >
                        <div className="flex align__items__center justify__content__center image">
                          <img src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-1.svg" />
                        </div>
                        <span>Giá & Ưu đãi Tốt nhất</span>
                        <p>
                          There are many variations of passages of Lorem Ipsum
                          available, but the majority have suffered alteration
                          in some form
                        </p>
                      </div>
                    </div>
                    <div className="col__3">
                      <div
                        style={{
                          padding: "10px",
                          border: "1px solid rgb(0 0 0 / 14%)",
                          minHeight: "230px",
                        }}
                      >
                        <div className="flex align__items__center justify__content__center image">
                          <img src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-2.svg" />
                        </div>
                        <span>Sản phẩm chất lượng cao</span>
                        <p>
                          There are many variations of passages of Lorem Ipsum
                          available, but the majority have suffered alteration
                          in some form
                        </p>
                      </div>
                    </div>
                    <div className="col__3">
                      <div
                        style={{
                          padding: "15px",
                          border: "1px solid rgb(0 0 0 / 14%)",
                          minHeight: "230px",
                        }}
                      >
                        <div className="flex align__items__center justify__content__center image">
                          <img src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-3.svg" />
                        </div>
                        <span>Hệ thống giao hàng nhanh</span>
                        <p>
                          There are many variations of passages of Lorem Ipsum
                          available, but the majority have suffered alteration
                          in some form
                        </p>
                      </div>
                    </div>

                    <div className="col__3">
                      <div
                        style={{
                          padding: "15px",
                          border: "1px solid rgb(0 0 0 / 14%)",
                          minHeight: "230px",
                        }}
                      >
                        <div className="flex align__items__center justify__content__center image">
                          <img src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-4.svg" />
                        </div>
                        <span>Dịch vụ trả hàng dễ dàng</span>
                        <p>
                          There are many variations of passages of Lorem Ipsum
                          available, but the majority have suffered alteration
                          in some form
                        </p>
                      </div>
                    </div>

                    <div className="col__3">
                      <div
                        style={{
                          padding: "15px",
                          border: "1px solid rgb(0 0 0 / 14%)",
                          minHeight: "230px",
                        }}
                      >
                        <div className="flex align__items__center justify__content__center image">
                          <img src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-5.svg" />
                        </div>
                        <span>100% hài lòng</span>
                        <p>
                          There are many variations of passages of Lorem Ipsum
                          available, but the majority have suffered alteration
                          in some form
                        </p>
                      </div>
                    </div>

                    <div className="col__3">
                      <div
                        style={{
                          padding: "15px",
                          border: "1px solid rgb(0 0 0 / 14%)",
                          minHeight: "230px",
                        }}
                      >
                        <div className="flex align__items__center justify__content__center image">
                          <img src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-6.svg" />
                        </div>
                        <span>Great Daily Deal</span>
                        <p>
                          There are many variations of passages of Lorem Ipsum
                          available, but the majority have suffered alteration
                          in some form
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
          <BottomTab />
        </>
      )}
    </>
  );
};

export default About;
