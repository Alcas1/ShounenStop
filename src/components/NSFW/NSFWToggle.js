import React, { useContext, useState } from 'react'
import { css } from '@emotion/core'
import { NSFWContext } from '../../utils/NSFWContext'

const NSFWToggle = () => {
  const { NSFWEnabled, handleToggleNSFW } = useContext(NSFWContext)
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <div css={NSFWToggleContainerStyle} onClick={() => setModalVisible(true)}>
        <div css={NSFWToggleLabelStyle} >{NSFWEnabled ? 'Disable NSFW' : 'Enable NSFW'}</div>
      </div>
      {
        modalVisible &&
        <div css={NSFWModalContainerStyle}>
          <div css={NSFWModalContainerOverlayStyle} onClick={() => setModalVisible(false)}></div>
          <div className='animated animatedFadeInUp fadeInUp' css={NSFWModalStyle}>
            <div css={NSFWModalUpper}>
              <p>//FIX: Needs tightening up</p> 
              {
                NSFWEnabled
                ? <p>Disable explicit content on ShounenStop?</p>
                : <p>If you are over 18 years of age and wish to see explicit content, click "Enable NSFW"</p>
              }

            </div>
            <div css={NSFWModalLower}>
            <button css={NSFWCancelButtonStyle} onClick={() => setModalVisible(false)}>Hide Modal</button>
            <button css={NSFWConfirmButtonStyle} onClick={() => {
                setModalVisible(false)
                handleToggleNSFW()
              }}>{NSFWEnabled ? 'Disable NSFW' : 'Enable NSFW'}</button>
            </div>
          </div>
        </div>
      }
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
  align-items: center;
  backdrop-filter: blur(3px);
  z-index: 9999;
`

const NSFWModalContainerOverlayStyle = css`
  position: absolute;
  height: 100%;
  width: 100%;
  background: rgba(0,10,20,0.25);
`

const NSFWModalStyle = css`
  max-width: 400px;
  margin:16px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 160px -2px rgba(0,10,20,.5);
`


const NSFWModalUpper = css`
  width:100%;
  height:150px;
  background:white;
  border-top-right-radius:12px;
  border-top-left-radius:12px;
  padding:15px;
`


const NSFWModalLower = css`
  width:100%;
  height:80px;
  // background:rgb(249, 250, 251);
  border-bottom-right-radius:12px;
  border-bottom-left-radius:12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding:10px;
`

const NSFWCancelButtonStyle = css`
  color: #000;
  font-family:lato;
  background-color: rgb(243, 244, 246);
  border-radius: 8px;
  border:none;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 35px;
  padding-right: 35px;
  margin-right:10px;
`

const NSFWConfirmButtonStyle = css`
  color: #dcecff;
  font-family:lato;
  background-color: #0f346c;
  border-radius: 8px;
  border:none;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 35px;
  padding-right: 35px;
  margin-left:10px;
`

const NSFWToggleContainerStyle = css`
  background-color: #dcecff;
  color: #0f346c;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  border-radius:12px;
  font-family: 'lato';
  border: solid 2px #0f346c;
  box-shadow: 0px 2px 8px 0px rgba(31,32,68,0.16);
  cursor: pointer;
`

const NSFWToggleLabelStyle = css`
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const NSFWToggleStyle = css`
  --color: deepskyblue;

  display: grid;
  place-items: center;

  appearance: none;
  -webkit-tap-highlight-color: transparent;
  border: solid 0.1rem var(--color);
  width: 5ch;
  border-radius: 15rem;
  cursor: pointer;
  transition: background 300ms;

  &:after {
    color: var(--color);
  }

  &:checked {
    background-color: var(--color);
  }

  &:checked:after {
    color: '#fff';
  }
`

export default NSFWToggle