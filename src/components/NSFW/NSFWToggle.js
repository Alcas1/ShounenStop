import React, { useContext, useState } from 'react'
import { css } from '@emotion/core'
import { NSFWContext } from '../../utils/NSFWContext'

const NSFWToggle = () => {
  const { NSFWEnabled, handleToggleNSFW } = useContext(NSFWContext)
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <div css={NSFWToggleContainerStyle}>
        <div css={NSFWToggleLabelStyle} onClick={() => setModalVisible(true)}>Enable NSFW</div>
      </div>
      {
        modalVisible &&
        <div css={NSFWModalContainerStyle}>
          <div css={NSFWModalStyle}>
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
  background: rgba(0,10,20,0.25);
  backdrop-filter: blur(4px);
  z-index: 99;
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
  background: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
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