import React, { useState, useEffect } from 'react';
import Navbar from "../../components/nav";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useUser } from '../../Context/Context';
import { useGig } from '../../Context/GigContext';
import { haversineDistance } from '../../components/Haversine';
import { format, isToday, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { useSpring, animated, config } from 'react-spring';

const GigSearch = () => {
    const { user } = useUser();
    const { selectGig } = useGig();
    const navigate = useNavigate();
    const [gigs, setGigs] = useState([]);
    const [filteredGigs, setFilteredGigs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchParams, setSearchParams] = useState({
        date: '',
        searchText: '',
        sortPrice: 'asc',
        category: ''
    });
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const fetchGigs = async () => {
        const db = getFirestore();
        const gigsCollection = collection(db, 'services');
        const gigsSnapshot = await getDocs(gigsCollection);
        const gigsData = gigsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGigs(gigsData);

        // Extract unique categories from gigs data
        const uniqueCategories = [...new Set(gigsData.map(gig => gig.category))];
        setCategories(uniqueCategories);
    };

    useEffect(() => {
        fetchGigs();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (name === 'searchText') {
            setShowDropdown(true);
        }
    };

    const handleCategorySelect = (category) => {
        setSearchParams(prevState => ({
            ...prevState,
            searchText: category,
            category: category
        }));
        setShowDropdown(false);
    };

    const handleSearch = () => {
        if (!searchParams.date || !searchParams.searchText) {
            setFilteredGigs([]);
            return;
        }

        setLoading(true);

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
            if (gig.status !== "Accepted") {
                return false;
            }

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
        setLoading(false);
    };

    const handleBookNow = (gig) => {
        selectGig(gig);
        navigate('/booking', { state: { gig, date: searchParams.date } });
    };

    const formAnimation = useSpring({
        from: { opacity: 0, transform: 'translateY(-20px)' },
        to: { opacity: 1, transform: 'translateY(0px)' },
        config: config.gentle,
    });

    const resultsAnimation = useSpring({
        from: { opacity: 0 },
        to: { opacity: filteredGigs.length > 0 ? 1 : 0 },
        delay: 200,
    });

    return (
        <div className="GigSearch">
            <Navbar />
            <div className="flex flex-col items-center justify-center mt-8 px-4 md:px-8">
                <animated.div style={formAnimation} className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-3xl text-center mb-6 font-semibold text-gray-700">Search for Services</h1>
                    <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                        <div className="mb-4">
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                            <input 
                                type="date" 
                                id="date" 
                                name="date" 
                                value={searchParams.date} 
                                onChange={handleChange} 
                                min={format(new Date(), 'yyyy-MM-dd')}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="searchText" className="block text-sm font-medium text-gray-700">Search Text</label>
                            <input 
                                type="text" 
                                id="searchText" 
                                name="searchText" 
                                value={searchParams.searchText} 
                                onChange={handleChange} 
                                placeholder="Enter search text" 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                onFocus={() => setShowDropdown(true)}
                            />
                            {showDropdown && (
                                <ul className="bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-40 overflow-auto">
                                    {categories
                                        .filter(category => category.toLowerCase().includes(searchParams.searchText.toLowerCase()))
                                        .map((category, index) => (
                                            <li 
                                                key={index} 
                                                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                                onClick={() => handleCategorySelect(category)}
                                            >
                                                {category}
                                            </li>
                                        ))
                                    }
                                </ul>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="sortPrice" className="block text-sm font-medium text-gray-700">Sort by Price</label>
                            <select 
                                id="sortPrice" 
                                name="sortPrice" 
                                value={searchParams.sortPrice} 
                                onChange={handleChange} 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                        <div className="flex justify-center">
                            <input 
                                type="submit" 
                                value="Search" 
                                className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 cursor-pointer text-lg"
                            />
                        </div>
                    </form>
                </animated.div>
                <div className="results-container mt-8 w-full max-w-2xl">
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <ClipLoader size={50} color={"#123abc"} loading={loading} />
                        </div>
                    ) : filteredGigs.length > 0 ? (
                        <animated.ul style={resultsAnimation} className="space-y-4">
                            {filteredGigs.map(gig => (
                                <li 
                                    key={gig.id} 
                                    className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:bg-gray-100 mb-8 transition" 
                                    onClick={() => handleBookNow(gig)}
                                >
                                    <h2 className="text-xl font-bold text-gray-800">{gig.title}</h2>
                                    <p className="text-gray-600"><strong>Category:</strong> {gig.category}</p>
                                    <p className="text-gray-600"><strong>Base Price:</strong> Rs {gig.basePrice}</p>
                                    <p className="text-gray-600"><strong>Description:</strong> {gig.description}</p>
                                    <p className="text-gray-600"><strong>Email:</strong> {gig.email}</p>
                                    <p className="text-gray-600"><strong>Phone Number:</strong> {gig.phoneNumber}</p>
                                    <p className="text-gray-600"><strong>Address:</strong> {gig.address}</p>
                                </li>
                            ))}
                        </animated.ul>
                    ) : (
                        <p className="text-gray-600 text-center">No services found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GigSearch;
