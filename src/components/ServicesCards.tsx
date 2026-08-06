import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function ServicesCards() {
  return (
    <section className="py-10 md:py-12 px-4 md:px-6 bg-[#F5F5F7]">
      <div className="max-w-[88rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 h-auto md:h-[600px]">

          {/* Card 1: Сервисный центр */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] text-white flex flex-col justify-between min-h-[340px] sm:min-h-[400px]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: 'url("/main/serivice1.jpg")', filter: 'grayscale(60%) brightness(0.6)' }}
            />
            {/* Тёмный оверлей для читаемости */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

            {/* Контент */}
            <div className="relative z-10 p-7 md:p-14 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 drop-shadow-lg">
                  Сервисный центр
                </h2>
                <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-sm drop-shadow">
                  Ремонтируем всю линейку техники Apple и все модели смартфонов Android. Ремонт ноутбуков и установка программного обеспечения для Windows.
                </p>
              </div>
              <div className="mt-10">
                <Link to="/remont" className="inline-block bg-[#007AFF] hover:bg-[#0066CC] transition-colors text-white px-8 py-3.5 rounded-full font-medium text-base">
                  К ремонту
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Скупка и продажа */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] text-white flex flex-col justify-between min-h-[340px] sm:min-h-[400px]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: 'url("/main/skupka.jpg")', filter: 'grayscale(60%) brightness(0.6)' }}
            />
            {/* Тёмный оверлей */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

            {/* Контент */}
            <div className="relative z-10 p-7 md:p-14 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 drop-shadow-lg">
                  Продажа и скупка по Trade-In
                </h2>
                <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-sm drop-shadow">
                  Продаём проверенные б/у смартфоны, ноутбуки и смарт-часы. Выкупаем и обслуживаем технику, подбираем, устанавливаем и настраиваем.
                </p>
              </div>
              <div className="mt-10">
                <Link
                  to="/tradein"
                  className="inline-block bg-white text-black hover:bg-gray-100 transition-colors px-8 py-3.5 rounded-full font-medium text-base"
                >
                  Подробнее
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
