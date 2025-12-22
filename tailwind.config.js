/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Добавляем наши новые нежные цвета
      colors: {
        // Палитра 1: Сладкая Вата
        'cotton-blue': '#E0F7FA',   // Очень светлый голубой
        'cotton-pink': '#FCE4EC',   // Пудровый розовый
        'cotton-purple': '#F3E5F5', // Светло-сиреневый
        'cotton-accent': '#FFAB91', // Мягкий коралловый (акцент)

        // Палитра 2: Весенний Рассвет
        'spring-cream': '#FFFDE7', // Кремово-желтый
        'spring-peach': '#FFECB3', // Нежный персиковый
        'spring-mint': '#E0F2F1',  // Светлый мятный
        'spring-accent': '#FFD54F', // Приглушенный золотой (акцент)

        // Палитра 3: Лавандовая Дымка
        'lavender-light': '#EDE7F6', // Светлый лавандовый
        'lavender-pink': '#F8BBD0',  // Нежно-розовый
        'lavender-blue': '#D1C4E9',  // Туманно-голубой
        'lavender-accent': '#BA68C8', // Мягкий аметист (акцент)
        
        // Общие цвета для текста и фона карточек
        'soft-white': 'rgba(255, 255, 255, 0.8)', // Полупрозрачный белый для карточек
        'dark-text': '#455A64', // Мягкий темно-серый для основного текста
      },
      // Готовые градиенты для фона страниц и кнопок
      backgroundImage: {
        // Фоновые градиенты страниц
        'gradient-cotton': 'linear-gradient(135deg, #E0F7FA 0%, #FCE4EC 50%, #F3E5F5 100%)',
        'gradient-spring': 'linear-gradient(135deg, #FFFDE7 0%, #FFECB3 50%, #E0F2F1 100%)',
        'gradient-lavender': 'linear-gradient(135deg, #EDE7F6 0%, #F8BBD0 50%, #D1C4E9 100%)',

        // Градиенты для кнопок (более насыщенные)
        'btn-cotton': 'linear-gradient(to right, #FFAB91, #FF8A65)',
        'btn-spring': 'linear-gradient(to right, #FFD54F, #FFCA28)',
        'btn-lavender': 'linear-gradient(to right, #BA68C8, #AB47BC)',
      },
      animation: {
        'gradient-shift': 'gradientShift 15s ease infinite', // Чуть замедлим анимацию для плавности
      },
      keyframes: {
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        }
      }
    },
  },
  plugins: [],
}