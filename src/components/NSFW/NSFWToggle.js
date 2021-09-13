import React, { useContext } from 'react'
import { css } from '@emotion/core'
import { NSFWContext } from '../../utils/NSFWContext'

const NSFWToggle = () => {
  const { NSFWEnabled, handleToggleNSFW } = useContext(NSFWContext)

  return (
    <div css={NSFWToggleContainerStyle}>
      <label css={NSFWToggleLabelStyle}>
        <span>Enable NSFW &nbsp;</span>
        <input
          css={NSFWToggleStyle}
          type="checkbox"
          checked={NSFWEnabled}
          onChange={handleToggleNSFW}
        />
      </label>
    </div>
  )
}

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