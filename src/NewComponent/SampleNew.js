import React from "react";
import { useNavigate } from "react-router-dom";
export default function SampleNew()
{
    var product = {
        Name:"Amazon",
        Price:45000,
        Stock:'Available'
    }
    return(
        <div className="netflix-background main-content text-center text-white">
            <div className="bg-black text-white p-4 rounded w-50">
                <h2>Product Details </h2>
                <dl>
                    <dt>Name</dt>
                    <dt>{product.Name}</dt>
                </dl>
                <dl>
                    <dt>Price</dt>
                    <dt>{product.Price}</dt>
                </dl>
                <dl>
                    <dt>Stock</dt>
                    <dt>{product.Stock}</dt>
                </dl>
            </div>
        </div>
    )
}