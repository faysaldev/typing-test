import React from "react";

const Footer = () => {
  return (
    <footer className="text-center py-8 mt-12 border-t border-primary/20">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-4xl mx-auto px-4">
        <div className="mb-4 md:mb-0">
          <h1 className="text-lg font-semibold text-primary">
            © {new Date().getFullYear()}{" "}
            <a
              href="https://www.linkedin.com/in/faysaldev/"
              className="hover:text-secondary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Faysal Mridha
            </a>
          </h1>
        </div>
        <div>
          <h1 className="text-primary font-medium">Powered by TypingTest</h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
