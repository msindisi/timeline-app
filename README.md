```markdown
# Audio Timeline React App with Vite

This React application, built with Vite, displays a timeline of audio episodes fetched from a provided API. It allows users to play audio, view details, and interact with the content.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Features Implemented](#features-implemented)
- [Customization](#customization)
- [Acknowledgments](#acknowledgments)

## Getting Started

To get started with this project, follow the steps below:

### Prerequisites

- Node.js installed on your machine

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/msindisi/timeline-app.git
   ```

2. Change into the project directory:

   ```bash
   cd timeline-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Project Structure

The project is structured as follows:

- `src/components`: Contains React components for various parts of the application.
- `src/assets`: Stores static assets like images.
- `src/utils`: Includes utility functions.
- `public`: Houses the HTML template and other public assets.

## Technologies Used

- React
- Vite
- Tailwind CSS

## Installation

To install the project dependencies, run:

```bash
npm install
```

## Usage

To run the application, use the following command:

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser to view the app.

## Features Implemented

1. Display a timeline of audio episodes with details.
2. Play audio with play/pause controls.
3. Show a popup with episode details.
4. Lazy loading and suspense for improved performance.
5. Order timeline items by date.
6. Filter items by category using a dropdown.
7. Implement pagination to show 10 items per page.
8. Custom styling using Tailwind CSS.

## Environment Variables
In production i would use Environment Variables. I 

REACT_APP_API_ENDPOINT: The API endpoint for fetching audio timeline data.
REACT_APP_IMAGE_BASE_URL: The base URL for fetching images.

## Acknowledgments

Thank you for the opportunity. Feel free to reach out for any further clarification or assistance.
