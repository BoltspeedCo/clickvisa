import Section from "@/components/Section";
import VideoPlayer from "@/components/VideoPlayer";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Image from "next/image";
import dynamic from 'next/dynamic'

const DynamicVideoPlayer = dynamic(() => import('@/components/VideoPlayer'), { ssr: false })

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const { image, video } = slice.primary
  return (
    <Section
      name="hero"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-0 lg:py-0"
    >
      {isFilled.image(image) && !isFilled.link(video) ? (
        <Image src={image.url} alt={image.alt || ''} priority width={image.dimensions.width} height={image.dimensions.height}
          className="w-full  h-[450px] lg:h-[680px] object-cover object-center "
        />
      ) : null}
      {isFilled.link(video) && video.url ? (
        <div className="w-full  h-[450px] lg:h-[680px] object-cover object-center relative overflow-hidden video-background">
          {/* <div className="absolute w-full  -top-[60px] h-[570px] lg:h-[800px]"> */}
          <DynamicVideoPlayer url={video.url} playing playsinline style={{ objectFit: 'cover' }} loop muted width={'100%'} height={'100%'} controls={false} />
          {/* </div> */}
        </div>
      ) : null}

    </Section>
  );
};

export default Hero;
