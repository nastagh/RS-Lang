import React from 'react';
import './footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <a href="https://rs.school/js/" target="_blank" rel="noreferrer">RSSchool</a>
      <div className="github-links">
        <a href="https://github.com/AndrewMatsiash" target="_blank" rel="noreferrer">AndrewMatsiash</a>
        <a href="https://github.com/nastagh" target="_blank" rel="noreferrer">nastagh</a>
        <a href="https://github.com/YanaHrebneva" target="_blank" rel="noreferrer">YanaHrebneva</a>
      </div>
      <span>2022</span>
    </footer>
  );
}
