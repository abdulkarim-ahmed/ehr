# EHR Platform - Embedded Frame Host

**⚠️ IMPORTANT: This application is designed to work with the SAHL main frontend. It provides a setup for the main SAHL app to run in an embedded iframe.**

This EHR (Electronic Health Records) platform serves as a host application that embeds the main SAHL frontend within an iframe, enabling seamless integration of medical consultation and patient management features.

## Overview

This application acts as a wrapper/host for the SAHL main frontend

## Quick Start

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Access to SAHL main frontend endpoints

### Installation
```bash
npm install
```

### Environment Setup
Create a `.env` file with the following variables:
```env
VITE_PASSWORD=your_app_password
VITE_IFRAME_URL_DEV=http://localhost:5173/iframe?access_token=
VITE_IFRAME_URL_ALT=http://localhost:5173/iframe?access_token=
VITE_IFRAME_URL_ALTPROD=http://localhost:5173/iframe?access_token=
VITE_IFRAME_URL_PROD=http://localhost:5173/iframe?access_token=
```

Backend API base URLs for login are defined in `src/config/api.ts` so you can adjust staging/production endpoints without touching environment variables.

### Development
```bash
npm run dev
```
Server runs on http://localhost:5174

### Build
```bash
npm run build
```

### Lint
```bash
npm run lint
```

## Application Flow

1. **Authentication**: Password verification → SAHL login (email & password) → Token stored automatically (login endpoint switches between staging/prod based on the selected environment)
2. **Environment Selection**: Choose target SAHL environment (dev/alt/altProd/prod)
3. **Patient Management**: Select patients from dashboard
4. **Embedded Experience**: SAHL main app loads in iframe with patient context
5. **Data Integration**: Medical data flows between host and embedded app

## Key Features

### Iframe Integration
- Embeds SAHL main frontend with patient context
- Handles authentication token passing
- Manages theme synchronization
- Processes medical data messages

### Patient Interface
- Patient roster with search and filtering
- Tabbed interface for different medical workflows
- Real-time data updates from embedded app
- Form management for medical documentation

### Communication Protocol
The application communicates with the embedded SAHL app via `postMessage`:
- **Summary Data**: Medical consultation summaries
- **ICD Automation**: Diagnosis and coding data
- **Patient History**: Historical consultation data

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: Radix UI with Tailwind CSS
- **State Management**: React Context API
- **Forms**: React Hook Form + Zod validation
- **Build Tool**: Vite with SWC for fast refresh

## Architecture

```
┌─────────────────────────────────────┐
│           EHR Host App              │
│  ┌─────────────────────────────────┐│
│  │     Patient Dashboard           ││
│  │  ┌─────────────────────────────┐││
│  │  │                             │││
│  │  │    SAHL Main App            │││
│  │  │    (Embedded Iframe)        │││
│  │  │                             │││
│  │  └─────────────────────────────┘││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

## Development Notes

- Server runs on port 5174 (configured in vite.config.ts)
- Uses path alias `@` pointing to `./src`
- ESLint configuration includes TypeScript and React rules
- Supports hot module replacement for fast development
