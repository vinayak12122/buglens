import React, { useState } from 'react'
import Body from '../../components/layout/Body'

const LandingPage = ({ openMenu, setOpenMenu ,openRag,setOpenRag}) => {

  return (
    <Body openMenu={openMenu} setOpenMenu={setOpenMenu} openRag={openRag} setOpenRag={setOpenRag}/>
  )
}

export default LandingPage;