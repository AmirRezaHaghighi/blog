import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:"#F9F9F9",
        error:"#8D0000",
        warning:"#BD9700",
        sucess:"#01813B",
        gray:{
          DEFAULT:"#E5E5E5",
          dark:"#DADBE0"
        },
        primary:{
          DEFAULT :"#457D82",
          dark:"#1A3F61"
        },
        secondary: {
          DEFAULT: "#01636C",
          dark:"#004d54"
        },
        txt: {
          DEFAULT: "#2A3648",
          secondary: "#4F596B",
        },      
      },
      boxShadow: {
        'card': '0 0 40px 0 rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
export default config;