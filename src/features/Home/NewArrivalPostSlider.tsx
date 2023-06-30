// src/components/MySwiper.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";

export default function NewArrivalPostSlider() {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={2}
      modules={[Autoplay]}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        // sm
        640: {
          width: 640,
          slidesPerView: 3,
        },
        // lg
        1024: {
          width: 1024,
          slidesPerView: 4,
        },
      }}
    >
      <SwiperSlide>
        <img
          src="https://placehold.jp/3d4070/ffffff/700x450.png?text=1"
          alt="1"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://placehold.jp/3d4070/ffffff/700x450.png?text=2"
          alt="2"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://placehold.jp/3d4070/ffffff/700x450.png?text=3"
          alt="3"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://placehold.jp/3d4070/ffffff/700x450.png?text=4"
          alt="4"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://placehold.jp/3d4070/ffffff/700x450.png?text=5"
          alt="5"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://placehold.jp/3d4070/ffffff/700x450.png?text=5"
          alt="5"
        />
      </SwiperSlide>
    </Swiper>
  );
}
