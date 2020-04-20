import React from "react";
import { Dropdown } from "../lib";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'

import './App.scss';

const fruits = [
    'Açaí',
    'Ackee',
    'Apple',
    'Apricot',
    'Avocado',
    'Banana',
    'Bilberry',
    'Blackberry',
    'Blackcurrant',
    'Black sapote',
    'Blueberry',
    'Boysenberry',
    'Breadfruit',
    'Buddha\'s hand (fingered citron)',
    'Cactus pear',
    'Crab apple',
    'Currant',
    'Cherry',
    'Cherimoya (Custard Apple)',
    'Chico fruit',
    'Cloudberry',
    'Coconut',
    'Cranberry',
    'Damson',
    'Date',
    'Dragonfruit (or Pitaya)',
    'Durian',
    'Elderberry',
    'Feijoa',
    'Fig',
    'Goji berry',
    'Gooseberry',
    'Grape',
    'Grewia asiatica (phalsa or falsa)',
    'Raisin',
    'Grapefruit',
    'Guava',
    'Hala Fruit',
    'Honeyberry',
    'Huckleberry',
    'Jabuticaba',
    'Jackfruit',
    'Jambul',
    'Japanese plum',
    'Jostaberry',
    'Jujube',
    'Juniper berry',
    'Kiwano (horned melon)',
    'Kiwifruit',
    'Kumquat',
    'Lemon',
    'Lime',
    'Loganberry',
    'Loquat',
    'Longan',
    'Lychee',
    'Mango',
    'Mangosteen',
    'Marionberry',
    'Melon',
    'Cantaloupe',
    'Galia melon',
    'Honeydew',
    'Watermelon',
    'Miracle fruit',
    'Monstera Delisiousa',
    'Mulberry',
    'Nectarine',
    'Nance',
    'Orange',
    'Blood orange',
    'Clementine',
    'Mandarine',
    'Tangerine',
    'Papaya',
    'Passionfruit',
    'Peach',
    'Pear',
    'Persimmon',
    'Plantain',
    'Plum',
    'Prune (dried plum)',
    'Pineapple',
    'Pineberry',
    'Plumcot (or Pluot)',
    'Pomegranate',
    'Pomelo',
    'Purple mangosteen',
    'Quince',
    'Raspberry',
    'Salmonberry',
    'Rambutan (or Mamin Chino)',
    'Redcurrant',
    'Salal berry',
    'Salak',
    'Satsuma',
    'Soursop',
    'Star apple',
    'Star fruit',
    'Strawberry',
    'Surinam cherry',
    'Tamarillo',
    'Tamarind',
    'Tangelo',
    'Tayberry',
    'Ugli fruit',
    'White currant',
    'White sapote',
    'Yuzu',
    'Bell pepper',
    'Chile pepper',
    'Corn kernel',
    'Cucumber',
    'Eggplant',
    'Jalapeño',
    'Olive',
    'Pea',
    'Pumpkin',
    'Squash',
    'Tomato',
    'Zucchini'
];


const App = () => (
    <div className='app'>
        <h1>Dropdown Examples</h1>
        {/* <Dropdown
            // prefix={<FontAwesomeIcon icon={faCaretRight} />}
            // suffix={<FontAwesomeIcon icon={faCaretLeft} />}
            clear={null}
            open={true}
            options={
                fruits.map((fruit, index) => ({
                    id: (index + 1),
                    sortIndex: index,
                    name: fruit
                }))
            }
            // header='This is a simple header'
            // footer='This is a simple footer'
            sortFn={(e1, e2) => {
                return e1.sortIndex - e2.sortIndex;
            }}
            filterFn={(searchTerm, item) => {
                const regExp = new RegExp(searchTerm, 'i');

                return regExp.test(item.id) || regExp.test(item.name);
            }}
            maxSelected={1}
            noneOption={true}
        /> */}
        <Dropdown
            // prefix={<FontAwesomeIcon icon={faCaretRight} />}
            // suffix={<FontAwesomeIcon icon={faCaretLeft} />}
            options={
                fruits.map((fruit, index) => ({
                    id: (index + 1),
                    sortIndex: index,
                    name: fruit
                }))
            }
            // header='This is a simple header'
            // footer='This is a simple footer'
            sortFn={(e1, e2) => {
                return e1.sortIndex - e2.sortIndex;
            }}
            filterFn={(searchTerm, item) => {
                const regExp = new RegExp(searchTerm, 'i');

                return regExp.test(item.id) || regExp.test(item.name);
            }}
            maxSelected={0}
            // noneOption={true}
            moveToTop={true}
        />
    </div>
);

export default App;
