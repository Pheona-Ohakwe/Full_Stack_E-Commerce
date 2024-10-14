import React from 'react';
import { Link, useHistory} from 'react-router-dom';
import Slider from 'react-slick';
import styles from './HomePage.module.css';
import dogImage from './dog.png';
import catImage from './cat.png';
import hamsterImage from './hamster.png';
import gpigImage from './Gpig.png';
import purinaCatFoodImage from '../ProductImages/PurinaProPlanWetCatFood.png';
import purinaDogTreatImage from '../ProductImages/BusyBoneDogTreat.png';
import purinaCatLitterImage from '../ProductImages/PurinaTidyCatsCatLitter.png';
import purinaOneCatImage from '../ProductImages/catFood.png';
import purinaOneDogImage from '../ProductImages/dogFood.png';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'slick-carousel/slick/slick.css';



const featuredProducts = [
    {
        id: 1,
        name: 'Purina Pro Plan Wet Cat Food',
        image: purinaCatFoodImage,
        description: 'High-quality wet cat food for your feline friends.',
    },
    {
        id: 2,
        name: 'Purina® Busy Bone Small/Medium Dog Treat',
        image: purinaDogTreatImage,
        description: 'Delicious dog treats to keep your dog busy and happy.',
    },
    {
        id: 3,
        name: 'Purina Tidy Cats Cat Litter',
        image: purinaCatLitterImage,
        description: 'Premium cat litter for a clean and fresh litter box.',
    },
    {
        id: 4,
        name: 'Purina One Cat Food',
        image: purinaOneCatImage,
        description: 'Nutritious cat food for a healthy and happy cat.',
    },
    {
        id: 5,
        name: 'Purina One Dog Food',
        image: purinaOneDogImage,
        description: 'Balanced dog food to support your dog\'s overall health.',
    }
];

const petTypes = [
    { id: 1, name: 'Dogs', image: dogImage },
    { id: 2, name: 'Cats', image: catImage },
    { id: 3, name: 'Hamsters', image: hamsterImage },
    { id: 4, name: 'Guinea Pigs', image: gpigImage }
];

const HomePage = () => {
    const history = useHistory();

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const navigateToProducts = (petType) => {
        history.push(`/products?search=${encodeURIComponent(petType)}`);
    };

    return (
        <div className={styles.homepage}>
            <div className={styles.banner}>
                15% off for Fur Baby members when you spend $75 or more
            </div>
            <h2>Featured Products</h2>
            <Carousel
                responsive={responsive}
                autoPlay={true}
                autoPlaySpeed={5000}
                infinite={true}
                className={styles.carousel}
            >
                {featuredProducts.map(product => (
                    <div key={product.id} className={styles.productCard}>
                        <img src={product.image} alt={product.name} className={styles.carouselImage} />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <Link to="/products" className={styles.shopNow}>Shop Now</Link>
                    </div>
                ))}
            </Carousel>
            <div className={styles.shopByPetType}>
                <h2>Shop by Pet Type</h2>
                <div className={styles.petTypeGrid}>
                    {petTypes.map(pet => (
                        <div key={pet.id} className={styles.petTypeItem} onClick={() => navigateToProducts(pet.name)}>
                            <img src={pet.image} alt={pet.name} className={styles.petTypeImage} />
                            <h3>{pet.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;