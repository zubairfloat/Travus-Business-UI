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
  code,
  password,
  onPasswordChange,
  loading
}) => {
  return (
    <div>
      <Modal isOpen={modal} className="signInModel">
        <ModalBody >
          <h3 className="emailVerify" >Reset your password</h3>
          <p className="emailVerifyP">
            Please enter the code we sent to your email to change password
          </p>
          <div className="inputVerifyCode">
            <ReactCodeInput type="text" value={code} fields={6} onChange={onChange} />
          </div>
          <div className="inputVlaueReset">
          <input type="password"  value={password} onChange={onPasswordChange} placeholder="Enter your Password"/>
          </div>
          <div className="inputVlaueResetBtn">
          {loading && (
          <div >
            <Loader type="TailSpin" color="#007bff" height={50} width={50} timeout={0} />
          </div>
        )}
         {!loading && (
        <CustomButton onClick={onSubmit} name={'Submit Code'} />
        )}

          </div>
        
          
        </ModalBody>
      </Modal>
    </div>
  );
};
export default EmailVerifyModal;