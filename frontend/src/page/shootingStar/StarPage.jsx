import React from 'react'
import styled from "styled-components";

import {Background} from "@component/Background";
import ShootingStars from '@/component/shootingStar/ShootingStarBackground';

const StarPage = () => {
  return (
    <div>
      <Background></Background>
      <ShootingStars></ShootingStars>
    </div>
  )
}

export default StarPage