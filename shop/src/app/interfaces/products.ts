export interface Iproducts {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
    comments: []
}

export interface Ioffers {
    offers: [
        { offer: string, textOffer: string },
        { offer: string, textOffer: string },
        { offer: string, textOffer: string },

    ]
}
export interface IsectionAbout {
    about: [
        { advantg: string, text: string, fav: string },
        { advantg: string, text: string, fav: string },
        { advantg: string, text: string, fav: string },
        { advantg: string, text: string, fav: string },
    ]
}