import { Github, Heart, Linkedin, Twitter } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-border/50 glass mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Left - Brand & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium gradient-text">TypeMaster</span>
            <span className="hidden sm:inline text-border">•</span>
            <span>© {new Date().getFullYear()}</span>
            <span className="hidden sm:inline text-border">•</span>
            <span className="flex items-center gap-1">
              Made with{" "}
              <Heart className="w-3 h-3 text-accent fill-accent animate-pulse" />{" "}
              by{" "}
              <a
                href="https://www.linkedin.com/in/faysaldev/"
                className="text-primary hover:text-secondary transition-colors font-medium hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Faysal Mridha
              </a>
            </span>
          </div>

          {/* Right - Social Links */}
          <div className="flex items-center gap-2">
            <a
              href="https://www.linkedin.com/in/faysaldev/"
              className="p-2 rounded-lg glass hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all border border-transparent hover:border-primary/30"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com/faysaldev"
              className="p-2 rounded-lg glass hover:bg-secondary/10 text-muted-foreground hover:text-secondary transition-all border border-transparent hover:border-secondary/30"
              target="_blank"
              rel="noopener noreferrer"
              title="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/faysaldev/typing-test"
              className="p-2 rounded-lg glass hover:bg-accent/10 text-muted-foreground hover:text-accent transition-all border border-transparent hover:border-accent/30"
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
