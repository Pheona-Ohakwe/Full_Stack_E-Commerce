import styles from './ProductCard.module.css';
import React, { useState } from 'react';
import catFoodImage from '../ProductImages/catFood.png';
import dogFoodImage from '../ProductImages/dogFood.png';
import dogToyImage from '../ProductImages/dogToy.png';
import purinaProPlanWetCatFoodImage from '../ProductImages/PurinaProPlanWetCatFood.png';
import purinaTidyCatsCatLitterImage from '../ProductImages/PurinaTidyCatsCatLitter.png';
import hamsterImage from '../ProductImages/hamster.png';
import busyBoneDogTreatImage from '../ProductImages/BusyBoneDogTreat.png';
import ropeDogChewToyImage from '../ProductImages/RopeDogChewToy.png';
import whiskerCityCatScratcherImage from '../ProductImages/WhiskerCityCatScratcher.png';
import smallPetHabitatImage from '../ProductImages/SmallPetHabitat.png';
import solutionForCatsImage from '../ProductImages/SolutionforCats.png';
import treatmentForDogsImage from '../ProductImages/TreatmentForDogs.png';
import appleSlicesImage from '../ProductImages/AppleSlices.png';
import dogBedImage from '../ProductImages/dogbed.png';
import litterBoxImage from '../ProductImages/litterbox.png';
import dogCrateImage from '../ProductImages/DogCrate.png';
import catScratcherImage from '../ProductImages/CatScratcher.png';
import collarImage from '../ProductImages/Collar.png';
import leashImage from '../ProductImages/Leash.png';
import harnessImage from '../ProductImages/Harness.png';
import shampooImage from '../ProductImages/Shampoo.jpg';
import gpigImage from '../ProductImages/Gpig.png';
import ballImage from '../ProductImages/Ball.jpg';
import catnipImage from '../ProductImages/catnip.jpg';
import bagsImage from '../ProductImages/bags.png';

const ProductCard = ({ product, onAddToCart,  onDeleteProduct, onUpdateProduct }) => {
    const [quantity, setQuantity] = useState(0);

    const getImage = (productName) => {
        switch (productName) {
            case 'Purina One Cat Food':
                return catFoodImage;
            case 'Purina One Dog Food':
                return dogFoodImage;
            case 'Plastic Dog Chew Toy':
                return dogToyImage;
            case 'Purina Pro Plan Wet Cat Food':
                return purinaProPlanWetCatFoodImage;
            case 'Purina Tidy Cats Cat Litter':
                return purinaTidyCatsCatLitterImage;
            case 'Short Haired Hamster':
                return hamsterImage;
            case 'Purina® Busy Bone Small/Medium Dog Treat':
                return busyBoneDogTreatImage;
            case 'Rope Dog Chew Toy':
                return ropeDogChewToyImage;
            case 'Whisker City Cat Scratcher':
                return whiskerCityCatScratcherImage;
            case 'Full Cheeks™ Customizable Small Pet Habitat':
                return smallPetHabitatImage;
            case 'Bravecto Topical Solution for Cats':
                return solutionForCatsImage;
            case 'Frontline Plus Flea & Tick Dog Treatment':
                return treatmentForDogsImage;
            case 'Full Cheeks™ Small Pet Apple Slices':
                return appleSlicesImage;
            case 'Top Paw® Orthopedic Mattress Dog Bed':
                return dogBedImage;
            case 'ExquisiCat® Hooded Corner Litter Box':
                return litterBoxImage;
            case 'Prevue Pet Products Home On-The-Go Dog Crate':
                return dogCrateImage;
            case 'Whisker City® 23-in Scratch & Play Cuddler':
                return catScratcherImage;
            case 'Top Paw® Nylon Dog Collar':
                return collarImage;
            case 'Top Paw® Dog Leash: 6-ft long':
                return leashImage;
            case 'Top Paw® Vest Dog Harness':
                return harnessImage;
            case 'Top Paw® All-In-1 With Dog Shampoo, Conditioner, Deodorizer & Moisturizer':
                return shampooImage;
            case 'Guinea Pig':
                return gpigImage;
            case 'Full Cheeks™ Small Pet Adventure Exercise Ball':
                return ballImage;
            case 'Whisker City® Organic Catnip':
                return catnipImage;
            case 'Top Paw® Paws Poop Bags':
                return bagsImage;
            default:
                return null; 
        }
    };

    const productImage = getImage(product.name);

    const decreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const handleAddToCartClick = () => {
        const cartItem = {
            ...product,
            quantity: Number(quantity) 
        };
        if (cartItem.quantity > 0) {
            onAddToCart(cartItem); 
            setQuantity(0); 
        }
    };

    const handleEdit = () => {
        const updatedProduct = {
            ...product,
            name: prompt('Update Product Name:', product.name),
            price: prompt('Update Product Price:', product.price),
        };
        onUpdateProduct(product.product_id, updatedProduct);
    };

    return (
        <div className={styles.productCard}>
            {productImage ? (
                <img src={productImage} alt={product.name} className={styles.productImage} />
            ) : (
                <div className={styles.productImagePlaceholder}>Image not available</div>
            )}
            <h3 className={styles.productTitle}>{product.name}</h3>
            <p className={styles.productPrice}>${product.price}</p>
            <div className={styles.quantitySelector}>
                <button onClick={decreaseQuantity} className={styles.quantityButton}>-</button>
                <span className={styles.quantity}>{quantity}</span>
                <button onClick={increaseQuantity} className={styles.quantityButton}>+</button>
            </div>
            <button onClick={handleAddToCartClick} className={styles.addToCartButton}>Add to Cart</button>
        </div>
    );
};

export default ProductCard;

