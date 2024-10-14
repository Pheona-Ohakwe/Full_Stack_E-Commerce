import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className="container">
                <h1 className={styles.storeName}></h1>
            </div>
        </header>
    );
};

export default Header;

