# InfoHub

A full-stack web application providing weather information, currency conversion, and motivational quotes. Built with React frontend and Express.js backend.

## 🚀 Features

- **Weather Information**: Real-time weather data for any city using WeatherAPI.com
- **Currency Converter**: Convert INR to USD and EUR with live exchange rates
- **Motivational Quotes**: Random inspirational quotes to boost your day
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Gradient backgrounds, smooth animations, and intuitive icons
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation support

## 🛠 Tech Stack

### Frontend
- **React 19**: Latest React with hooks and modern features
- **Vite**: Fast build tool and development server
- **Axios**: HTTP client for API requests
- **React Icons**: Icon library for UI elements
- **CSS3**: Custom styling with gradients, animations, and responsive design

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for Node.js
- **Axios**: HTTP client for external API calls
- **CORS**: Cross-origin resource sharing
- **Dotenv**: Environment variable management

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- WeatherAPI.com API key (optional, falls back to mock data)

## 🚀 Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/LEKKALAGANESH/InfoHub-Challenge.git
   cd InfoHub-Challenge
   ```

2. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../client
   npm install
   ```

4. Set up environment variables (optional):
   Create a `.env` file in the `server` directory:
   ```
   PORT=3001
   WEATHER_API_KEY=your_weatherapi_key_here
   ```

## 🏃‍♂️ Running the Application

1. Start the backend server:
   ```bash
   cd server
   npm start
   ```
   Server will run on `http://localhost:3001`

2. Start the frontend development server:
   ```bash
   cd ../client
   npm run dev
   ```
   Frontend will be available at `http://localhost:5173`

3. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
InfoHub-Challenge/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CurrencyConverter.jsx
│   │   │   ├── QuoteGenerator.jsx
│   │   │   └── WeatherModule.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── README.md
├── server/                 # Express.js backend
│   ├── server.js
│   ├── package.json
│   └── README.md (if exists)
├── .env.example            # Environment variables template
└──  README.md               # This file
```

## 🔌 API Endpoints

### Weather API
- **GET** `/api/weather?city={city}`
- Returns current weather data for the specified city

### Currency API
- **GET** `/api/currency?amount={amount}`
- Converts INR amount to USD and EUR

### Quotes API
- **GET** `/api/quote`
- Returns a random motivational quote

## 🎨 UI Components

### App.jsx
Main application component with tab navigation between Weather, Currency, and Quotes.

### CurrencyConverter.jsx
Currency conversion interface with input validation and real-time conversion.

### QuoteGenerator.jsx
Quote display component with refresh functionality.

### WeatherModule.jsx
Weather information display with city search and current conditions.

## 🎯 Development Scripts

### Frontend
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

### Backend
- `npm start`: Start production server
- `npm run dev`: Start development server with nodemon

## 🔧 Configuration

### Environment Variables
- `PORT`: Server port (default: 3001)
- `WEATHER_API_KEY`: WeatherAPI.com API key (optional)

### API Keys
- WeatherAPI.com: Sign up at https://www.weatherapi.com/ for a free API key
- Currency rates: Uses exchangerate.host (no API key required)

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- Desktop: > 768px
- Tablet: 480px - 768px
- Mobile: < 480px

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- High contrast colors

## 🧪 Testing

Currently, manual testing is supported. Future enhancements may include:
- Unit tests with Jest
- Integration tests
- E2E tests with Cypress

## 🚀 Deployment

### Frontend
Build the React app:
```bash
cd client
npm run build
```
Deploy the `dist` folder to your hosting service (Netlify, Vercel, etc.)

### Backend
Deploy the server to Heroku, Railway, or similar Node.js hosting platforms.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -am 'Add new feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📝 Code Quality

- Follow React best practices and hooks guidelines
- Use ESLint for code linting
- Ensure accessibility compliance
- Test on multiple devices and browsers
- Write clear, concise commit messages

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For questions or issues, please open an issue on the GitHub repository or contact the maintainers.

## 🙏 Acknowledgments

- Weather data provided by [WeatherAPI.com](https://www.weatherapi.com/)
- Currency exchange rates from [exchangerate.host](https://exchangerate.host/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- UI inspiration from modern web design trends
