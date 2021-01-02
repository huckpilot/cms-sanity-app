import CoverImage from "./cover-image";
import Link from "next/link";
import cn from "classnames";
import styles from "./post-preview.module.scss";

import Vimeo from "@u-wave/react-vimeo";

export default function PostPreview({
  index,
  title,
  brand,
  coverImage,
  slug,
  featured,
  vimeo,
}) {
  // easily combine tailwind and css modules
  const classes = {
    link: `block h-full ${styles["post-preview"]} ${
      featured && styles.featured
    }`,
  };

  return (
    <Link as={`/posts/${slug}`} href="/posts/[slug]">
      <a className={classes.link}>
        <div className={`relative h-full ${styles["video-container"]}`}>
          {!vimeo ? (
            <CoverImage isLink index={index} slug={slug} image={coverImage} />
          ) : (
            <Vimeo video={vimeo} background autoplay loop />
          )}
          <div
            className={`${styles.title}  transition duration-500 ease-in-out`}
          >
            <h3 className="text-3xl leading-snug">
              <span className="font-bold">{title}</span> / {brand}
            </h3>
          </div>
        </div>
      </a>
    </Link>
  );
}
