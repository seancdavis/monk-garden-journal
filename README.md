# Garden Journal

Welcome to the Garden Journal project! This application allows users to document their gardening experiences by adding journal entries with photographs. Entries are displayed in reverse chronological order, making it easy to track your gardening journey.

## Features

- Add new journal entries with text and images.
- View all journal entries in reverse chronological order.
- Responsive design using Tailwind CSS.
- Utilizes Netlify blob storage for storing journal entries and images.

## Project Structure

```
garden-journal
├── src
│   ├── components
│   │   ├── EntryForm.astro
│   │   ├── EntryList.astro
│   │   └── Header.astro
│   ├── layouts
│   │   └── MainLayout.astro
│   ├── pages
│   │   ├── index.astro
│   │   └── new-entry.astro
│   ├── styles
│   │   └── tailwind.css
│   └── utils
│       └── netlifyBlob.ts
├── public
│   └── favicon.ico
├── astro.config.mjs
├── tailwind.config.js
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

To get started with the Garden Journal project, follow these steps:

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd garden-journal
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the development server:**
   ```
   npm run dev
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Usage

- Navigate to the **Home** page to view existing journal entries.
- Click on **New Entry** to add a new journal entry with text and an image.

## Deployment

This project is designed to be deployed on Netlify. Follow the Netlify documentation for instructions on deploying your Astro application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is open-source and available under the MIT License.