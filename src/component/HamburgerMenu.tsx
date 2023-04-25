import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import styles from '../styles/HamburgerMenu.module.scss';

const HamburgerMenu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [currentEmoji, setCurrentEmoji] = useState<string>('🍔');
  const menuRef = useRef<HTMLDivElement>(null);

const toggleMenu = () => {
 setMenuOpen(!menuOpen);
 setCurrentEmoji(currentEmoji === '🍔' ? '✖️' : '🍔');
 if (!menuOpen) {
   gsap.to(menuRef.current, {
     duration: 0.5,
     opacity: 1,
     visibility: 'visible',
     scaleY: 1, // スケールアニメーションを追加
     ease: 'power2.out', // イージングを追加
   });
 } else {
   gsap.to(menuRef.current, {
     duration: 0.5,
     opacity: 0,
     scaleY: 0, // スケールアニメーションを追加
     onComplete: () => {
       gsap.set(menuRef.current, { visibility: 'hidden' });
     },
     ease: 'power2.in', // イージングを追加
   });
 }
};
const handleMouseEnter = () => {
 gsap.to('.hamburger span', {
   duration: 0.3,
   rotation: 50, // 絵文字を20度まで回転させる
   yoyo: true, // 元の状態に戻す
   repeat: 1, // アニメーションを1回繰り返す
   ease: 'power1.inOut', // イージングを設定
 });
};

const handleMouseLeave = () => {
 gsap.to('.hamburger span', {
   duration: 0.3,
   rotation: 0, // 絵文字を元の状態に戻す
   ease: 'power1.inOut', // イージングを設定
 });
};

  return (
    <>
    <div
      className={`${styles.hamburger} hamburger`}
      onClick={toggleMenu}
    >
       <span
       role="img"
       aria-label="menu"
       onMouseEnter={handleMouseEnter}
       onMouseLeave={handleMouseLeave}>{currentEmoji}
       </span>
      </div>
      <div ref={menuRef} className={styles.menu}>
        {/* メニューアイテムをここに追加 */}
        <ul>
          <li onClick={toggleMenu}>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Blog</li>
        </ul>
      </div>
    </>
  );
};

export default HamburgerMenu;
