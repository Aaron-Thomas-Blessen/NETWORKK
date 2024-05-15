import React, { useState, useEffect } from 'react';
import Navbar from "../../components/nav";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useUser } from '../../Context/Context';
import { haversineDistance } from '../../components/Haversine';
import { format, isToday, parseISO } from 'date-fns';

const GigSearch = () => {
    const { user } = useUser();
    const [gigs, setGigs] = useState([]);
    const [filteredGigs, setFilteredGigs] = useState([]);
    const [searchParams, setSearchParams] = useState({
        date: '',
        searchText: '',
        sortPrice: 'asc'
    });

    useEffect(() => {
        const fetchGigs = async () => {
            const db = getFirestore();
            const gigsCollection = collection(db, 'services');
            const gigsSnapshot = await getDocs(gigsCollection);
            const gigsData = gigsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setGigs(gigsData);
        };

        fetchGigs();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSearch = () => {
        if (!searchParams.date || !searchParams.searchText) {
            setFilteredGigs([]);
            return;
        }

        const userLat = parseFloat(user.latitude);
        const userLng = parseFloat(user.longitude);
        const searchTextPart = searchParams.searchText.slice(1, 5);
        const searchDate = parseISO(searchParams.date);

        console.log("User Location:", { userLat, userLng });
        console.log("Search Params:", { searchTextPart, searchDate });

        const distances = gigs.map(gig => {
            const gigLat = parseFloat(gig.latitude);
            const gigLng = parseFloat(gig.longitude);

            if (isNaN(gigLat) || isNaN(gigLng)) {
                console.warn("Invalid gig coordinates:", { gigLat, gigLng, gig });
                return null;
            }

            const distance = haversineDistance(userLat, userLng, gigLat, gigLng);
            return { id: gig.id, distance, gig };
        }).filter(item => item !== null);

        console.log("Distances:", distances);

        const filtered = distances.filter(({ distance, gig }) => {
            const gigCategoryPart = gig.category.slice(1, 5);
            const isCategoryMatch = gigCategoryPart.toLowerCase() === searchTextPart.toLowerCase();

            if (distance <= 10 && isCategoryMatch) {
                if (isToday(searchDate)) {
                    return gig.isOpen;
                } else {
                    const formattedDate = format(searchDate, 'MM-dd-yyyy');
                    return !gig.holidays.includes(formattedDate);
                }
            }
            return false;
        });

        console.log("Filtered:", filtered);

        const sorted = filtered.sort((a, b) => {
            if (searchParams.sortPrice === 'asc') {
                return a.gig.basePrice - b.gig.basePrice;
            } else {
                return b.gig.basePrice - a.gig.basePrice;
            }
        });

        setFilteredGigs(sorted.map(item => item.gig));
    };

    return (
        <div className="GigSearch">
            <Navbar />
            <div className="flex flex-col items-center justify-center mt-8">
                <div className="gig-container rounded-lg p-8 mb-8 w-96 border border-gray-400 rounded-l-md">
                    <div className="gigsearch">
                        <h1 className="text-3xl text-center mb-4">Search for Gigs</h1>
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                        <div className="gigdate mb-4">
                            <label htmlFor="date" className="block">Date</label>
                            <input type="date" id="date" name="date" value={searchParams.date} onChange={handleChange} className="w-full h-full border border-black rounded p-2 border-gray-400 rounded-l-md py-2 px-4 w-96 focus:outline-none focus:ring-1 focus:ring-slate-950" />
                        </div>
                        <div className="gigsearchtext mb-4">
                            <label htmlFor="searchText" className="block">Search Text</label>
                            <input type="text" id="searchText" name="searchText" value={searchParams.searchText} onChange={handleChange} placeholder="Enter search text" className="w-full h-full border border-black rounded p-2 border-gray-400 rounded-l-md py-2 px-4 w-96 focus:outline-none focus:ring-1 focus:ring-slate-950" />
                        </div>
                        <div className="gigsort mb-4">
                            <label htmlFor="sortPrice" className="block">Sort by Price</label>
                            <select id="sortPrice" name="sortPrice" value={searchParams.sortPrice} onChange={handleChange} className="w-full h-full border border-black rounded p-2 border-gray-400 rounded-l-md py-2 px-4 w-96 focus:outline-none focus:ring-1 focus:ring-slate-950">
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                        <div className="gigsubmit flex justify-center">
                            <input type="submit" value="Search" className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 cursor-pointer text-lg" />
                        </div>
                    </form>
                </div>
                <div className="results-container mt-8 w-full">
                    {filteredGigs.length > 0 ? (
                        <ul>
                            {filteredGigs.map(gig => (
                                <li key={gig.id} className="mb-4 p-4 border border-gray-400 rounded-lg">
                                    <h2 className="text-xl font-bold">{gig.title}</h2>
                                    <p>Category: {gig.category}</p>
                                    <p>Base Price: ${gig.basePrice}</p>
                                    <p>Description: {gig.description}</p>
                                    <p>Email: {gig.email}</p>
                                    <p>Phone Number: {gig.phoneNumber}</p>
                                    <p>Address: {gig.address}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No gigs found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GigSearch;


