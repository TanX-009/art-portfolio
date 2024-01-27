import React from "react";
import GradientTXT from "../Heading/GradientTXT.component";
import { FaGithub, FaGitlab, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="w-full h-80 bg-primary-100">
      <div className="max-w-screen-lg w-full h-full mx-auto p-5 flex flex-col sm:flex-row gap-4 items-center">
        <h1 className="w-full sm:w-1/2 text-6xl">
          <GradientTXT>art portfolio</GradientTXT>
        </h1>

        <div className="w-full sm:w-1/2 flex items-center justify-center text-2xl">
          <div className="flex flex-row sm:flex-col flex-wrap gap-3 ">
            <a
              className="flex items-center gap-2 hover:text-text-800"
              href="https://www.linkedin.com/in/tanmay-muley-8307141a2/"
            >
              <FaLinkedin /> LinkedIn
            </a>
            <a
              className="flex items-center gap-2 hover:text-text-800"
              href="https://www.linkedin.com/in/tanmay-muley-8307141a2/"
            >
              <FaInstagram /> Instagram
            </a>
            <a
              className="flex items-center gap-2 hover:text-text-800"
              href="https://www.linkedin.com/in/tanmay-muley-8307141a2/"
            >
              <FaGithub /> Github
            </a>
            <a
              className="flex items-center gap-2 hover:text-text-800"
              href="https://www.linkedin.com/in/tanmay-muley-8307141a2/"
            >
              <FaGitlab /> Gitlab
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
