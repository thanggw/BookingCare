import React, { Component } from "react";
import { FormattedMessage } from "react-intl";

import { connect } from "react-redux";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">
          Truyền thông nói về Vũ Văn Thăng
        </div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/haXXDU1XiBE"
              title="Series Ăn Cơm Cùng Doraemon #56 | Giáng sinh ấm áp và năm mới đầy niềm vui vì đã có Mèo ú Doraemon!"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
          <div className="content-right">
            <p>
              Mỗi gia đình đều có cách tiếp cận riêng đối với công nghệ và
              truyền thông, do đó chúng tôi cung cấp nhiều lựa chọn để bạn quyết
              định điều phù hợp nhất với gia đình mình. Để đáp ứng nhu cầu đa
              dạng của các gia đình, chúng tôi thường xuyên cập nhật sản phẩm
              của mình dưới sự tư vấn của uỷ ban cố vấn gồm các chuyên gia độc
              lập.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
