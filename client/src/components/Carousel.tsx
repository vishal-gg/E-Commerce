import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Carousel = () => {

  const slides = [
    {
      href: "https://img.freepik.com/free-photo/big-sale-discounts-products_23-2150336669.jpg",
      category: "Audio",
    },
    {
      href: "https://img.freepik.com/premium-psd/gaming-laptop-sale-promotion-banner_252779-743.jpg",
      category: "Laptop",
    },
    {
      href: "https://img.freepik.com/free-psd/black-friday-super-sale-web-banner-template_120329-2158.jpg",
      category: "Appliances",
    },
    {
      href: "https://img.freepik.com/premium-psd/smart-phone-sale-promotion-black-friday-sale-web-banner-template_179771-192.jpg",
      category: "Mobile",
    },
  ];

  return (
    <div className="absolute w-full h-full">
      <Swiper
        className="w-full h-full"
        loop={true}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        spaceBetween={0}
        // pagination={{ dynamicBullets: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Navigation, Pagination, Autoplay]}
      >
        {slides.map((item, i) => (
          <SwiperSlide key={i}>
            <span
              // to="product_list"
              // smooth
              // duration={300}
              // offset={-90}
              // onClick={() => setSelectedCategory(item.category)}
            >
              <img
                src={item.href}
                alt="404"
                className="selection:bg-none w-full h-full object-cover bg-gray-300 cursor-pointer"
              />
            </span>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="swiper-button-next bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-md text-black group rounded-sm">
        <svg
          className="group-hover:scale-125 transition-transform active:translate-x-[3px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill=""
        >
          <path
            fillRule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <button className="swiper-button-prev bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-md group rounded-sm">
        <svg
          className="group-hover:scale-125 transition-transform active:-translate-x-[3px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill=""
        >
          <path
            fillRule="evenodd"
            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default Carousel;
