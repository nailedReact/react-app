import React from 'react';
import PostCard from '../../../components/postView/PostCard';

export default function FeedFollower({data, postDetailSrc}) {
  return (
    <>
      <PostCard data={data} postDetailSrc={postDetailSrc} />
    </>
  )
}
