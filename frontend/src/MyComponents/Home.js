import React from "react";
import "./Home.css";
import { Product } from "./Product.js";

export const Home = () => {
  return (
    <div className="home">
      <div className="home_container">
        <img src='https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/51ovs76vmtL._SX3000_.jpg' alt="" className="home_image" />
        <div className="home_row">
          <Product 
            id={0}
            title="Apple 2022 MacBook Pro Laptop with M2 chip"
            image="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61bX2AoGj2L._AC_SY200_.jpg"
            price={129900}
            rating={5}
          />
          <Product 
            id={1}
            title='Apple 2022 12.9-inch iPad Pro (Wi-Fi, 2TB) - Space Grey (6th Generation)'
            image='https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81c+9BOQNWL._AC_UY218_.jpg'
            price={221900}
            rating={4}
          />
        </div>
        <div className="home_row">
        <Product
            id={3} 
            title='boAt Wave Call Smart Watch, Smart Talk with Advanced Dedicated Bluetooth Calling Chip'
            image='https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/614AipEWSIL._AC_UL320_.jpg'
            price={1799}
            rating={4}
          />
          <Product 
            id={4}
            title='Noise Newly Launched Twist Bluetooth Calling Smart Watch with 1.38" TFT Biggest Display'
            image='https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61TapeOXotL._AC_UL320_.jpg'
            price={1899}
            rating={5}
          />
          <Product
            id={5} 
            title='Fire-Boltt Phoenix Smart Watch with Bluetooth Calling 1.3",120+ Sports Modes, 240 * 240 PX High Res with SpO2, Heart Rate Monitoring & IP67 Rating, Rs 100 Off on UPI'
            image='https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61y2VVWcGBL._AC_UL320_.jpg'
            price={1699}
            rating={5}
          />
        </div>
        <div className="home_row">
          <Product
            id={6} 
            title='Acer 139 cm (55 inches) I Series 4K Ultra HD Android Smart LED TV AR55AR2851UDFL (Black)'
            image='https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71RNJ5AGNBL._AC_UY218_.jpg'
            price={30999}
            rating={5}
          />
        </div>
        <div className="home_row">
          <Product
            id={7} 
            title='Lezino 1 Seater Electric Motorized Recliner Chair in Faux Leather(Leatherette) (Motorized Recliner, Brown)'
            image='https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71wYnfU59aS._AC_UL320_.jpg'
            price={32500}
            rating={4}
          />
          <Product
            id={8} 
            title='NICE HOUSE FURNITURE Sheesham Wood Dining Table 4 Seater | Dinning Table with 4 Chairs | Dining Room Furniture | Warm Chestnut Finish'
            image='https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71nkhGj9P-L._AC_UL320_.jpg'
            price={18499}
            rating={3}
          />
          <Product
            id={9} 
            title='Dennis Lingo'
            image='https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61XzMtVz3PL._AC_UL320_.jpg'
            price={599}
            rating={4}
          />
          <Product
          i d={10} 
            title='Majestic Man'
            image='https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71mNefE3H9L._AC_UL320_.jpg'
            price={429}
            rating={4}
          />
        </div>
      </div>
    </div>
  );
};
