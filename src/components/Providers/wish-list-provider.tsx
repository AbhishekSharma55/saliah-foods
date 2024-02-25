"use client"
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// Sample wishlist item type
interface WishlistItem {
    _id: string;
    total: number;
    images: string[];
    product: string;
    price_range: {
        min_price: string | number
    };
    quantity: number | string

    /*  {
        name: string;
        image: string;
        price: number;
        unit?: string;
        category: string;
    }; */

}

// Define action types
type Action =
    | { type: 'ADD_TO_WISHLIST'; payload: WishlistItem }
    | { type: 'SET_WISHLIST'; payload: WishlistItem[] }
    | { type: 'REMOVE_FROM_WISHLIST'; payload: string };

// Reducer function
function wishlistReducer(state: WishlistItem[], action: Action): WishlistItem[] {
    switch (action.type) {
        case 'ADD_TO_WISHLIST':
            const d = [...state, action.payload]
            if (d?.length) {
                localStorage.setItem('wishlist', JSON.stringify(d));
            }
            return d;
        case 'REMOVE_FROM_WISHLIST':
            const data = state.filter(item => String(item._id) !== String(action.payload));
            localStorage.setItem('wishlist', JSON.stringify(data));
            return data;
        case 'SET_WISHLIST':
            return action.payload;
        default:
            return state;
    }
}

// Context
const WishlistContext = createContext<{
    wishlist: WishlistItem[] | [];
    addToWishlist: (item: WishlistItem) => void;
    removeFromWishlist: (_id: string) => void;
} | undefined>(undefined);

// Custom hook to use wishlist context
function useWishlist() {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
}

// Wishlist Provider component
function WishlistProvider({ children }: { children: ReactNode }) {
    const [wishlist, dispatch] = useReducer(wishlistReducer, []);

    // Update localStorage when
    useEffect(() => {
        const payload = JSON.parse(localStorage.getItem('wishlist') || '[]')
        if (payload?.length) {
            dispatch({ type: 'SET_WISHLIST', payload })
        } else {
            // //@ts-ignore
            // dispatch({ type: 'SET_WISHLIST', payload: [] })
        }
    }, []);

    const addToWishlist = (item: WishlistItem) => {
        dispatch({ type: 'ADD_TO_WISHLIST', payload: item });
    };

    const removeFromWishlist = (_id: string) => {
        dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: String(_id) });
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

export { WishlistProvider, useWishlist };
