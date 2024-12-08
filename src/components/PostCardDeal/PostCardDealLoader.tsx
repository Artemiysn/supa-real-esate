import React from 'react'

const PostCardDealLoader = () => {
  return (
    <div className="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-2 items-stretch h-[300px]">
        <div className="rounded h-[200px] w-[200px] mb-2 overflow-hidden"><div className="moving-bar"></div></div>
        <div className="h-4 w-20 mb-2 overflow-hidden rounded-sm"><div className="moving-bar"></div></div>
        <div className="h-4 w-20 mb-2 overflow-hidden rounded-sm"><div className="moving-bar"></div></div>
        <div className="h-4 w-20 mb-2 overflow-hidden rounded-sm"><div className="moving-bar"></div></div>
    </div>
  )
}

export default PostCardDealLoader