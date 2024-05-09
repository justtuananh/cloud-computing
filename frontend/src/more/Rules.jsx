import React from 'react'
import "./Rules.css";
import Header from '../component/Home/Header';
import BottomTab from './BottomTab';
import MetaData from './Metadata';
import Footer from '../Footer';

const Rules = () => {
    return (
        <>
        <MetaData title="Điều khoản" />
        <Header />
        <div className='rules' style={{
            padding:"50px 30px",
            display:"flex",
            width:"95%",
            overflow:"hidden"
        }}>
            <ul className='rules'>
                <span style={{
                    color:"#000",
                    fontSize:"1.3rem",
                    fontWeight:"800",
                    fontFamily:"Roboto",
                }}>Quy trình nhận hàng - kiểm hàng:</span>
                <li>Bước 1: Khi nhận hàng, Quý khách vui lòng kiểm tra kỹ thông tin nhận hàng trên đơn hàng, cụ thể: Số lượng sản phẩm, Chủng loại sản phẩm, Giá sản phẩm</li>
               
                <li>Bước 2: Quý khách sau khi kiểm hàng trên phương tiện vận chuyển đảm bảo chất lượng thì tiến hành thanh toán cho bên giao hàng. </li>
                <li>Bước 3: Bên giao hàng có trách nhiệm giao hàng cho quý khách.</li>
                
                <span style={{
                    color:"#000",
                    fontSize:"1.3rem",
                    fontWeight:"800",
                    fontFamily:"Roboto",
                }}>Nếu đơn hàng bị một trong các trường hợp sau:</span>
                <li>Thừa/ thiếu sản phẩm</li>
                <li>Sản phẩm không đúng với đơn hàng đã đặt</li>
                <li>Sản phẩm bị rách bao bì khi nhìn bằng mắt thường</li>
                <h2>Quý khách hàng có quyền từ chối nhận hàng và gọi ngay đến Hotline 0985 432 542 để được hỗ trợ nhanh nhất.</h2>
            </ul>
        </div>
        <Footer />
        <BottomTab />
        </>
    )
}

export default Rules
