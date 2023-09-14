import React from 'react'

const Spacer = ({ horizontal = true, space = 0 }) => {
  if (horizontal) {
    return <div style={{ marginTop: space }}></div>
  } else {
    return <div style={{ marginLeft: space }}></div>
  }
}

export default Spacer
