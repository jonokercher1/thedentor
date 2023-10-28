'use client'

import { useCallback, useRef, type FC } from 'react'
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { AutoplayOptions, PaginationOptions } from 'swiper/types';

interface CarouselProps {
  items: JSX.Element[]
  slidesPerView?: number
  navigation?: boolean
  pagination?: boolean
  gap?: number
  loop?: boolean
}

const Carousel: FC<CarouselProps> = ({ items, slidesPerView = 1, gap, loop, navigation, pagination }) => {
  const sliderRef = useRef<SwiperRef>(null);
  const paginationOptions: PaginationOptions | undefined = pagination ? { clickable: true, el: '.coursel-pagination' } : undefined

  // For the future when we add in navigation option
  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  // For the future when we add in navigation option
  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <div>
      <Swiper
        ref={sliderRef}
        modules={[Navigation, Pagination]}
        slidesPerView={slidesPerView}
        spaceBetween={gap}
        loop={loop}
        pagination={paginationOptions}
        style={{
          "--swiper-pagination-color": "#60D1FA",
          "--swiper-pagination-bullet-inactive-color": "#41546E",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bullet-size": "12px",
        } as any}
      >
        {items.map((item) => (
          <SwiperSlide>
            {item}
          </SwiperSlide>
        ))}
        <div className="coursel-pagination text-center mt-4 gap-2" />
      </Swiper>
    </div>
  )
}

export default Carousel