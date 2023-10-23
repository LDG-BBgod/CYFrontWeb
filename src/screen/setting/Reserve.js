// module
import { useEffect, useState, useRef } from 'react'
import { styled } from 'styled-components'
import axios from 'axios'
// action

// api

// components
import Typography from '../../components/Typography'
import Spacer from '../../components/Spacer.js'
// common
import { gray2, gray4, gray5, gray6, gray7 } from '../../common'

const Reserve = () => {
  return (
    <div>
      <Typography fontSize={24} color={gray6}>
        예약관리
      </Typography>
      <Spacer space={80} />
    </div>
  )
}
export default Reserve
