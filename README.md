# EHR

## Getting Started

Follow the steps below to set up and run the project.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <project_directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Configuration

Before running the project, you need to set the access token in the code.

1. Open the file `minimizable-iframe.tsx`:
   ```bash
   src/components/minimizable-iframe.tsx
   ```

2. Locate **line 64** and replace the placeholder with your access token:
   ```typescript
   src="https://sahl.ai/iframe?access_token=your-access-token-here"
   ```

  

---
