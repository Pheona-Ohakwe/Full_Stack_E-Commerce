
import styles from './Footer.module.css';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa'; 

const Footer = () => {
    return (
        <footer className={`${styles.footer} mt-auto py-3 bg-light`}>
            <div className="container text-center">
                <div className={styles.socialIcons}>
                    <a href="#" className={styles.icon}><FaInstagram /></a>
                    <a href="#" className={styles.icon}><FaFacebook /></a>
                    <a href="#" className={styles.icon}><FaTwitter /></a>
                </div>
                <span className="text-muted">© 2024 Created & Designed by Pheona Ohakwe.</span>
            </div>
        </footer>
    );
};

export default Footer;
