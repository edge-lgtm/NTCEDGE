# NTC EDGE Portal

The **Electronic Data Governance and Evaluation (EDGE)** System is a professional, official-looking, and mobile-friendly government digital service portal for the National Telecommunications Commission (NTC) of the Philippines.

## 🏛️ Overview

NTC EDGE streamlines regulatory workflows by facilitating secure online submission and real-time application tracking. The portal is designed to provide a transparent, efficient, and accessible platform for telecommunications-related services, effectively *bringing NTC services closer to you.*

## 🚀 Key Features

- **Multi-Step Application Wizard**: A guided 8-step process for submitting applications (Select Service, Region, Mode, Form, Upload, Review, Submit, and Confirm).
- **Real-Time Tracking**: A dedicated tracking system where applicants can monitor their application status using a unique reference number.
- **Service Directory**: Categorized listings for Certificates, Permits, and Equipment Registration with detailed requirements and processing steps.
- **Government-Style UI**: A conservative and credible interface using an institutional color palette (Navy Blue, White, and Light Gray).
- **Mobile Responsive**: Fully optimized for desktop and mobile devices.
- **Announcement System**: A public advisory section for news, system maintenance, and deadline reminders.
- **Staff Evaluator Module**: A React-based internal dashboard for processing bulk applications (located in the Staff Portal link).

## 🛠️ Technology Stack

- **Static Site Generator**: [Hugo](https://gohugo.io/)
- **Frontend Core**: Plain HTML5, CSS3 (Flexbox/Grid), and Vanilla JavaScript
- **Evaluator Module**: React 19, TypeScript, Zustand (State Management), Tailwind CSS, and Framer Motion
- **Iconography**: Lucide-style SVGs

## 📁 Project Structure

- `assets/`: Contains global CSS, JavaScript, and the React source code for the Evaluator module.
- `content/`: Markdown files for services, announcements, FAQs, and static pages.
- `data/`: JSON files for regional offices, site statistics, and process steps.
- `layouts/`: Hugo templates and partials for reusable UI components.
- `static/`: Static assets such as images and favicons.

## 🔧 Getting Started

### Prerequisites
- Hugo (Extended Version)
- Node.js & npm

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   hugo server
   ```

3. Build the site:
   ```bash
   hugo --gc --minify
   ```

---
*Official Digital Service Portal of the National Telecommunications Commission*
