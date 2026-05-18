import React, { useState } from 'react'
import Body from '../../components/layout/Body'

const LandingPage = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <Body openMenu={openMenu} setOpenMenu={setOpenMenu} />
  )
}

export default LandingPage;