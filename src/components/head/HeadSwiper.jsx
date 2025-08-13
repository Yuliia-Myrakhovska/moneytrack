import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import style from "./headswiper.modules.css";
import HeadCard from "./card/HeadCard";

function HeadSwiper({
  getSumCurrentMonth,
  getSumLast6Months,
  getSumCurrentYear,
}) {
  const [sumList, setSumList] = useState([]);

  useEffect(() => {
    async function fetchSums() {
      const sums = [];
      if (getSumCurrentMonth) {
        const sumMonth = await getSumCurrentMonth();
        sums.push(sumMonth);
      }
      if (getSumLast6Months) {
        const sum6 = await getSumLast6Months();
        sums.push(sum6);
      }
      if (getSumCurrentYear) {
        const sumYear = await getSumCurrentYear();
        sums.push(sumYear);
      }
      setSumList(sums);
    }
    fetchSums();
  }, [getSumCurrentMonth, getSumLast6Months, getSumCurrentYear]);

  return (
    <Swiper
      spaceBetween={35}
      slidesPerView={3}
      breakpoints={{
        0: { slidesPerView: 1 },
        768: { slidesPerView: 3 },
      }}
    >
      {sumList.map((item, index) => (
        <SwiperSlide key={index}>
          <HeadCard sum={item} index={index} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
export default HeadSwiper;
