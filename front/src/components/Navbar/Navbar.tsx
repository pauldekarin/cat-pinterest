import React from 'react'
import styles from './Navbar.module.css'
import { links } from './links.json'
import {Link, Path, PathMatch, useMatch, useResolvedPath} from 'react-router-dom'
import { AuthForm } from '../Auth/Auth'

type Link = {
    label : string;
    href : string;
};

const Links : React.FC<{links: Link[]}> = ({links} )=> {
    return(
        <div className={styles['nav-links']}>
            {links.map((link : Link) => {
                const resolvedPath: Path = useResolvedPath(link.href);
                const isActive: PathMatch<string> | null = useMatch({path: resolvedPath.pathname, end:true});

                return (
                    <div key={link.href} className={styles['nav-link'] + ( isActive ? " " + styles['nav-link-active'] : "" )}>
                        <Link to={link.href}>
                            {link.label}
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

const Navbar:  React.FC<{}> = () => {
    return (
        <nav className={styles.navbar}>
            <Links links={ links } />
            <AuthForm />
        </nav>
    );
}

export default Navbar;