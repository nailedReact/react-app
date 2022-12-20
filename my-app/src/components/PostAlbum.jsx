import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'


export default function PostAlbum({data, myProfile, postDetailSrc}) {
    
  const Contentimg = styled.img`
    width: 100%;
	  height: auto;
  `;

  return (
    <>
      { data.image ? <Link to={postDetailSrc}><Contentimg src={data.image} alt="컨텐츠 사진입니다." /></Link> : null}
    </>
  )
}