import React, { useContext, useState } from 'react'
import { css } from '@emotion/core'
import { NSFWContext } from '../../utils/NSFWContext'
import { toast } from 'react-toastify'

const NSFWToggle = () => {
  const { NSFWEnabled, handleToggleNSFW } = useContext(NSFWContext)
  const [modalVisible, setModalVisible] = useState(false)

  const nsfwToggleText = NSFWEnabled ? 'Hide NSFW' : 'Show NSFW'

  const requestModal = () => {
    setModalVisible(true)
  }

  const dismissModal = nsfwEnabledState => {
    let requestToast = nsfwEnabledState ? toast.error : toast.success
    if (nsfwEnabledState !== undefined) {
      setTimeout(() => {
        requestToast(
          <div style={{ 'text-align': 'center', color: 'white' }}>
            {nsfwEnabledState
              ? 'NSFW Content hidden ❌'
              : 'NSFW Content shown✅'}
          </div>,
          {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            onClick: () => {},
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        )
      }, 500)
    }
    setModalVisible(false)
  }

  const toggleNSFW = () => {
    let nsfwEnabledState = handleToggleNSFW()
    dismissModal(nsfwEnabledState)
  }

  return (
    <>
      <div css={NSFWToggleContainerStyle} onClick={requestModal}>
        <div css={NSFWToggleLabelStyle}>{nsfwToggleText}</div>
      </div>
      {modalVisible && (
        <div css={NSFWModalContainerStyle}>
          <div
            css={NSFWModalContainerOverlayStyle}
            onClick={() => dismissModal()}
          ></div>
          <div
            className="animated animatedFadeInUp fadeInUp"
            css={NSFWModalStyle}
          >
            <div css={NSFWModalUpper}>
              <span style={{ 'text-decoration': 'underline' }}>Notice:</span>
              <br />
              {NSFWEnabled ? (
                <span>Disable explicit content on ShounenStop?</span>
              ) : (
                <span>
                  If you are over 18 years of age and wish to see explicit
                  content, click "Enable NSFW"
                </span>
              )}
            </div>
            <div css={NSFWModalLower}>
              <div css={NSFWModalButtonContainerStyle}>
                <button css={NSFWConfirmButtonStyle} onClick={toggleNSFW}>
                  {nsfwToggleText}
                </button>
              </div>
              <div css={NSFWModalButtonContainerStyle}>
                <button
                  css={NSFWCancelButtonStyle}
                  onClick={() => dismissModal()}
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const NSFWModalContainerStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  backdrop-filter: blur(3px);
  z-index: 9999;

  @media screen and (min-width: 768px) {
    align-items: center;
  }
`

const NSFWModalContainerOverlayStyle = css`
  position: absolute;
  height: 100%;
  width: 100%;
  background: rgba(0, 10, 20, 0.25);
`

const NSFWModalStyle = css`
  max-width: 400px;
  margin: 16px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 160px -2px rgba(0, 10, 20, 0.5);
  display: flex;
  flex-direction: column;
`

const NSFWModalUpper = css`
  width: 100%;
  padding: 32px 32px 16px;
  text-align: center;
  font-size: 1.2em;
  font-weight: 400;
`

const NSFWModalLower = css`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  padding: 16px;
`

const NSFWModalButtonContainerStyle = css`
  padding: 8px;
  width: 100%;
  font-weight: bold;
`

const NSFWCancelButtonStyle = css`
  color: #000;
  font-family: lato;
  background-color: rgb(243, 244, 246);
  border-radius: 8px;
  border: none;
  padding: 12px 35px;
  width: 100%;
`

const NSFWConfirmButtonStyle = css`
  color: #dcecff;
  font-family: lato;
  background-color: #0f346c;
  border-radius: 8px;
  border: none;
  padding: 12px 35px;
  width: 100%;
`

const NSFWToggleContainerStyle = css`
  background-color: #dcecff;
  color: #0f346c;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  border-radius: 12px;
  font-family: 'lato';
  border: solid 2px #0f346c;
  box-shadow: 0px 2px 8px 0px rgba(31, 32, 68, 0.16);
  cursor: pointer;
`

const NSFWToggleLabelStyle = css`
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default NSFWToggle
