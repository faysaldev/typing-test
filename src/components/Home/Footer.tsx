import { Github, Heart, Linkedin } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-primary/10 bg-background/50 backdrop-blur-sm mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Left - Brand & Copyright */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} TypeMaster</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> by{" "}
              <a
                href="https://www.linkedin.com/in/faysaldev/"
                className="text-primary hover:text-secondary transition-colors font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Faysal Mridha
              </a>
            </span>
          </div>

          {/* Right - Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/faysaldev/"
              className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/faysaldev/typing-test"
              className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              title="View on GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
