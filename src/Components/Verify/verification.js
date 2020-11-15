import React from "react";
import { Modal, ModalBody } from "reactstrap";
import Loader from "react-loader-spinner";
import ReactCodeInput from "react-code-input";
import CustomButton from '../CustomBtn';
import "./style.css";

const EmailVerifyModal = ({
  modal = true,
  onChange,
  onSubmit,
  loading,
  code,
}) => {
  return (
    <div>
      <Modal isOpen={modal} className="signInModel">
        {loading && (
          <div style={{ position: "absolute", top: "45%", left: "45%" }}>
            <Loader type="TailSpin" color="#007bff" height={50} width={50} timeout={0} />
          </div>
        )}
        <ModalBody calssName="modalBody px-5 mx-5">
          <h3 className="emailVerify" >Verify Email Address</h3>
          <p className="emailVerifyP">
            Please enter the code we sent to your email to get verified
          </p>
          <div className="inputVerifyCode">
            <ReactCodeInput type="text" value={code} fields={6} onChange={onChange} />
          </div>
          <div className="verifyPadding">
          <CustomButton onClick={onSubmit} name={'Submit Code'} />
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default EmailVerifyModal;