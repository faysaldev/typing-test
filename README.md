# Typing Speed Test Application

A professional typing speed test application built with Next.js, TypeScript, and Tailwind CSS. This application allows users to test and improve their typing skills by measuring words per minute (WPM) and accuracy.

## Features

- Real-time typing assessment with WPM and accuracy calculation
- Visual feedback for correct and incorrect characters
- Progress tracking with localStorage persistence
- Performance comparison with previous tests
- Responsive design for all device sizes
- Dark mode support
- Social sharing capabilities
- Paste protection to ensure authentic typing tests

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for production
- [TypeScript](https://www.typescriptlang.org/) - Strongly typed programming language
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide React](https://lucide.dev/) - Beautiful icon library
- [shadcn/ui](https://ui.shadcn.com/) - Reusable UI components

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Navigate to the project directory:

```bash
cd typing-test
```

3. Install dependencies:

```bash
pnpm install
```

4. Run the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. The application will display a random text passage to type.
2. Start typing in the input field below the text.
3. The application will highlight correct characters in green and incorrect ones in red.
4. Your WPM and accuracy will be updated in real-time.
5. After 60 seconds, the test will automatically end, or you can click "Finish Test".
6. Your results will be displayed in a modal with the option to try again or share your score.

## Project Structure

```
typing-test/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── not-found.tsx
├── src/
│   ├── components/
│   │   ├── ui/
│   │   └── TypingTest.tsx
│   └── lib/
├── public/
│   └── favicon.png
├── README.md
├── LICENSE
└── package.json
```

## Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Icons by [Lucide React](https://lucide.dev/)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)

## Support

If you encounter any issues or have questions, please file an issue on the [GitHub repository](https://github.com/faysaldev/typing-test).
