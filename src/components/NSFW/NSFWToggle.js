import React, { useContext, useState } from 'react'
import { css } from '@emotion/core'
import { NSFWContext } from '../../utils/NSFWContext'

const NSFWToggle = () => {
  const { NSFWEnabled, handleToggleNSFW } = useContext(NSFWContext)
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <div css={NSFWToggleContainerStyle}>
        <div css={NSFWToggleLabelStyle} onClick={() => setModalVisible(true)}>{NSFWEnabled ? 'Disable NSFW' : 'Enable NSFW'}</div>
      </div>
      {
        modalVisible &&
        <div css={NSFWModalContainerStyle}>
          <div css={NSFWModalContainerOverlayStyle} onClick={() => setModalVisible(false)}></div>
          <div className='animated animatedFadeInUp fadeInUp' css={NSFWModalStyle}>
            <button onClick={() => setModalVisible(false)}>Hide Modal</button>

            {
              NSFWEnabled
              ? <p>Disable explicit content on ShounenStop?</p>
              : <p>If you are over 18 years of age and wish to see explicit content, click "Enable NSFW"</p>
            }

            <button css={NSFWConfirmButtonStyle} onClick={() => {
              setModalVisible(false)
              handleToggleNSFW()
            }}>{NSFWEnabled ? 'Disable NSFW' : 'Enable NSFW'}</button>
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
  background: white;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 4px 160px -2px black;
`

const NSFWConfirmButtonStyle = css`
  background: deepskyblue;
  color: white;
  border-radius: 64px;
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