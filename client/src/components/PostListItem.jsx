import React from "react";
import { Link } from "react-router-dom";
import Image from "./Image";

const PostListItem = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-8 mb-12">
      {/* image */}
      <div className="md:hidden xl:block xl:w-1/3">
        <Image
          src="postImg.jpeg"
          className="rounded-2xl object-cover"
          w="735"
        />
      </div>
      {/* details */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link to="/test" className="text-4xl font-semibold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
          eaque.
        </Link>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Written by</span>
          <Link className="text-blue-800">Jawaria</Link>
          <span>on</span>
          <Link className="text-blue-800">web design</Link>
          <span>on 2 feb</span>
        </div>

        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam
          iusto atque quas laudantium amet sequi, reprehenderit dolorem
          repudiandae dolore ex. Repellendus impedit vitae quos labore earum
          perferendis optio nisi pariatur.
        </p>
        <Link to="/test" className="underline text-blue-800">
          Read more
        </Link>
      </div>
    </div>
  );
};

export default PostListItem;
