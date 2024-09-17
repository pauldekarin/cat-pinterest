import React, { useState } from 'react';
import { links } from './links.json';
import { Link, Path, PathMatch, useMatch, useResolvedPath } from 'react-router-dom';
import { AuthForm } from '../Auth/Auth';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import styles from './Navbar.module.css'

type Link = {
  label: string;
  href: string;
};

const Links: React.FC<{ links: Link[] }> = ({ links }) => {
  const [isAuthFormOpened, setAuthFormOpened] = useState<boolean>(false);

  const openModal = () => setAuthFormOpened(true);
  const closeModal = () => setAuthFormOpened(false);

  return (
    <div className={styles['nav-links']}>
      <div className={styles['nav-left']}>
        {links.map((link: Link) => {
          const resolvedPath: Path = useResolvedPath(link.href);
          const isActive: PathMatch<string> | null = useMatch({ path: resolvedPath.pathname, end: true });

          return (
            <div
              key={link.href}
              className={`${styles['nav-link']} ${isActive ? styles['nav-link-active'] : ''}`}
            >
              <Link to={link.href}>
                {link.label}
              </Link>
            </div>
          );
        })}
      </div>
      <div className={styles['nav-right']}>
        <Button onClick={openModal}>
            USER
        </Button>
      </div>
      <Modal isOpen={isAuthFormOpened} onClose={closeModal}>
        <AuthForm />
      </Modal>
    </div>
  );
};

const Navbar: React.FC<{}> = () => {
  return (
    <nav className={styles.navbar}>
      <Links links={links} />
    </nav>
  );
};

export default Navbar;
