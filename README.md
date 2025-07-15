# 🏫 Dynasty Departmental Wears

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.1-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Firebase-11.9.1-FFCA28?style=for-the-badge&logo=firebase" alt="Firebase">
</div>

<div align="center">
  <h3>🎓 High-Quality Departmental Wears for Ebonyi State University Students</h3>
  <p><em>Empowering student identity through premium departmental uniforms</em></p>
</div>

---

## ✨ Features

### 🏠 **Landing Page Experience**
- **Hero Section** - Compelling imagery and value proposition
- **About Us** - Mission-driven content showcasing quality commitment
- **Featured Products** - Interactive carousel with product highlights
- **Modern Header** - Seamless navigation with login and shop actions
- **Professional Footer** - Complete contact and legal information

### 🔐 **Authentication System**
- User registration and login functionality
- Secure authentication flows
- Protected dashboard access

### 📊 **Dashboard**
- User-friendly interface for order management
- Personalized student experience
- Order tracking and history

### 🤖 **AI Integration**
- Google Genkit AI implementation
- Smart product recommendations
- Enhanced user experience through AI

---

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15.3.3** - React framework with App Router
- **React 18.3.1** - Component-based UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives

### **AI & Backend**
- **Google Genkit AI** - AI-powered features
- **Firebase** - Authentication and hosting
- **Zod** - Schema validation

### **UI Components**
- **Lucide React** - Beautiful icons
- **Recharts** - Data visualization
- **React Hook Form** - Form management
- **Embla Carousel** - Smooth carousels

---

## 🎨 Design System

### **Color Palette**
- **Primary**: Vivid Yellow (`#FFDA33`) - Energy and school pride
- **Background**: Soft Yellow (`#FAF7E6`) - Professional backdrop
- **Accent**: Warm Orange (`#FFA500`) - Call-to-action highlights

### **Typography**
- **Headlines**: Poppins (Sans-serif) - Modern and bold
- **Body Text**: PT Sans (Sans-serif) - Readable and clean

### **Design Principles**
- Clean, professional layout
- Consistent design language
- Accessible and responsive design
- Student-centric user experience

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ installed
- npm or yarn package manager
- Firebase account (for deployment)

### **Installation**

```bash
# Clone the repository
git clone <repository-url>
cd dynasty-departmental-wears

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Firebase and AI configuration
```

### **Development**

```bash
# Start development server
npm run dev

# Start with Turbopack (faster)
npm run dev

# Run AI development server
npm run genkit:dev

# Watch mode for AI development
npm run genkit:watch
```

### **Build & Deploy**

```bash
# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run typecheck

# Linting
npm run lint
```

---

## 📁 Project Structure

```
dynasty-departmental-wears/
├── 📁 src/
│   ├── 📁 app/                 # Next.js App Router
│   │   ├── 📄 layout.tsx       # Root layout
│   │   ├── 📄 page.tsx         # Home page
│   │   ├── 📁 dashboard/       # Dashboard pages
│   │   ├── 📁 login/          # Authentication
│   │   └── 📁 signup/         # User registration
│   ├── 📁 components/         # React components
│   │   ├── 📁 dashboard/      # Dashboard components
│   │   ├── 📁 landing/        # Landing page components
│   │   └── 📁 ui/            # Reusable UI components
│   ├── 📁 ai/                # AI integration
│   ├── 📁 hooks/             # Custom React hooks
│   └── 📁 lib/               # Utility functions
├── 📁 docs/                  # Documentation
├── 📄 apphosting.yaml        # Firebase App Hosting config
└── 📄 package.json           # Dependencies and scripts
```

---

## 🔧 Configuration

### **Environment Variables**
Create a `.env.local` file with:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id

# Google AI Configuration
GOOGLE_AI_API_KEY=your_genkit_api_key

# Development
NEXT_PUBLIC_DEV_PORT=9002
```

### **Firebase Setup**
1. Create a Firebase project
2. Enable Authentication
3. Configure App Hosting
4. Update `apphosting.yaml` settings

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack on port 9002 |
| `npm run genkit:dev` | Start Genkit AI development server |
| `npm run genkit:watch` | Start Genkit with watch mode |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript compiler check |

---

## 🎯 Key Components

### **Landing Page Components**
- `Header` - Navigation with auth buttons
- `Hero` - Main value proposition section
- `About` - Mission and quality commitment
- `FeaturedProducts` - Product showcase carousel
- `Footer` - Contact and legal information

### **Dashboard Components**
- `DashboardHeader` - Dashboard navigation
- User management interface
- Order tracking system

### **UI Components**
Comprehensive set of accessible components built with Radix UI:
- Forms, buttons, dialogs
- Data visualization charts
- Navigation menus
- Feedback components (toasts, alerts)

---

## 🚀 Deployment

### **Firebase App Hosting**
```bash
# Deploy to Firebase
firebase deploy

# Configure hosting settings in apphosting.yaml
# Current config: maxInstances: 1
```

### **Production Checklist**
- [ ] Environment variables configured
- [ ] Firebase project setup
- [ ] AI services connected
- [ ] Performance optimization
- [ ] Security headers configured
- [ ] SEO meta tags updated

---

## 🤝 Contributing

We welcome contributions to improve Dynasty Departmental Wears!

### **Getting Started**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Development Guidelines**
- Follow TypeScript best practices
- Use semantic commit messages
- Ensure all tests pass
- Maintain code coverage
- Update documentation as needed

---

## 📊 Performance & Monitoring

- **Next.js Analytics** - Performance monitoring
- **Firebase Analytics** - User behavior tracking
- **Core Web Vitals** - Optimized for Google metrics
- **SEO Optimization** - Search engine friendly

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


### **Ebonyi State University Partnership**
Proudly serving the academic community of Ebonyi State University with premium departmental uniforms.

---

<div align="center">
  <p><strong>Made with ❤️ for Ebonyi State University Students</strong></p>
  <p><em>Empowering academic excellence through quality departmental wears</em></p>
</div>

---

## 🔄 Recent Updates

- ✅ **v0.1.0** - Initial release with landing page and authentication
- 🔄 **In Progress** - Dashboard enhancements and AI features
- 📅 **Coming Soon** - Mobile app and advanced order management

---

*Last updated: June 29, 2025*