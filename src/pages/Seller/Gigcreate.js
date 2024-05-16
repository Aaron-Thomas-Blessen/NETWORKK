import React, { useState } from 'react';
import Navbar from "../../components/nav";
import { useUser } from '../../Context/Context';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import Autocomplete from "react-google-autocomplete";
import { ClipLoader } from "react-spinners";
import { useSpring, animated } from 'react-spring';

const Gigcreate = () => {
    const { user } = useUser();
    const [gigData, setGigData] = useState({
        title: '',
        category: '',
        basePrice: '',
        description: '',
        email: '',
        phoneNumber: '',
        address: '',
        demoPics: [],
        gigPdf: null,
        locality: '',
        latitude: '',
        longitude: '',
        holidays: ["01-01-2000"],
        rating: 0.0,
        isOpen: false
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGigData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDemoPicsChange = (e) => {
        const files = e.target.files;
        const picsArray = [];
        for (let i = 0; i < files.length; i++) {
            picsArray.push(files[i]);
        }
        setGigData(prevState => ({
            ...prevState,
            demoPics: picsArray
        }));
    };

    const handlePdfChange = (e) => {
        const pdfFile = e.target.files[0];
        setGigData(prevState => ({
            ...prevState,
            gigPdf: pdfFile
        }));
    };

    const handlePlaceSelected = (place) => {
        const locality = place.formatted_address;
        const latitude = place.geometry.location.lat();
        const longitude = place.geometry.location.lng();
        console.log("Place selected:", { locality, latitude, longitude });
        setGigData(prevState => ({
            ...prevState,
            locality,
            latitude,
            longitude
        }));
    };

    const handleAutocompleteKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };

    const validateForm = () => {
        const { title, category, basePrice, description, email, phoneNumber, address, locality } = gigData;
        return title && category && basePrice && description && email && phoneNumber && address && locality;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            setError("Please fill out all fields before submitting.");
            return;
        }

        setLoading(true);
        const db = getFirestore();
        const storage = getStorage();

        console.log("Submitting gig with data:", gigData);

        try {
            // Upload demo pics to Cloud Storage
            const demoPicsUrls = [];
            for (const pic of gigData.demoPics) {
                const picRef = ref(storage, `demoPics/${user.uid}/${pic.name}`);
                await uploadBytes(picRef, pic);
                const url = await getDownloadURL(picRef);
                demoPicsUrls.push(url);
            }

            // Upload gig PDF to Cloud Storage
            let gigPdfUrl = null;
            if (gigData.gigPdf) {
                const pdfRef = ref(storage, `gigPdfs/${user.uid}/${gigData.gigPdf.name}`);
                await uploadBytes(pdfRef, gigData.gigPdf);
                gigPdfUrl = await getDownloadURL(pdfRef);
            }

            // Add gig data to Firestore
            await addDoc(collection(db, 'services'), {
                ...gigData,
                serviceProviderId: user.uid,
                status: "Pending",
                demoPics: demoPicsUrls,
                gigPdf: gigPdfUrl,
            });

            console.log('Gig created successfully');
            navigate(-1); // Redirect to home page after gig creation
        } catch (error) {
            console.error('Error creating gig: ', error);
            // Handle error
        } finally {
            setLoading(false);
        }
    };

    // React Spring animations
    const formAnimation = useSpring({
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
    });

    const inputAnimation = useSpring({
        from: { boxShadow: '0px 0px 0px 0px rgba(0,0,0,0)' },
        to: { boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.2)' },
    });

    return (
        <div className="Gigcreate">
            <Navbar />
            <div className="flex flex-col items-center justify-center mt-8">
                <animated.div style={formAnimation} className="gig-container rounded-lg p-8 mb-8 w-96 border border-gray-400 rounded-l-md">
                    <div className="gigcreate">
                        <h1 className="text-3xl text-center mb-4">Create your Service</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="gigtitle mb-4">
                            <label htmlFor="title" className="block">Service Title</label>
                            <animated.input type="text" id="title" name="title" value={gigData.title} onChange={handleChange} placeholder="Enter your Service Title" style={inputAnimation} className="w-full h-full border border-black rounded p-2 border-gray-400 rounded-l-md py-2 px-4 w-96 focus:outline-none focus:ring-1 focus:ring-slate-950" />
                        </div>
                        <div className="gigcat mb-4">
                            <label htmlFor="category" className="block">Service Category</label>
                            <animated.select id="category" name="category" value={gigData.category} onChange={handleChange} style={inputAnimation} className="w-full h-full border border-black rounded p-2 border-gray-400 rounded-l-md py-2 px-4 w-96 focus:outline-none focus:ring-1 focus:ring-slate-950">
                                <option value="">Select Service Category</option>
                                <option value="Carpenter">Carpenter</option>
                                <option value="Plumber">Plumber</option>
                                <option value="Electrician">Electrician</option>
                                <option value="Mechanic">Mechanic</option>
                                <option value="Mason">Mason</option>
                                <option value="Laundry">Laundry</option>
                            </animated.select>
                        </div>
                        <div className="gigbaseprice mb-4">
                            <label htmlFor="basePrice" className="block">Base Price</label>
                            <animated.input type="number" id="basePrice" name="basePrice" value={gigData.basePrice} onChange={handleChange} placeholder="Enter Base Price" style={inputAnimation} className="w-full h-full border border-black rounded p-2 border-gray-400 rounded-l-md py-2 px-4 w-96 focus:outline-none focus:ring-1 focus:ring-slate-950" />
                        </div>
                        <div className="gigdes mb-4">
                            <label htmlFor="description" className="block">Description</label>
                            <animated.textarea id="description" name="description" value={gigData.description} onChange={handleChange} placeholder="Enter Description" style={inputAnimation} className="w-full h-full border border-black rounded p-2 border-gray-400 rounded-l-md py-2 px-4 w-96 focus:outline-none focus:ring-1 focus:ring-slate-950"></animated.textarea>
                        </div>
                        <div className="gigemail mb-4">
                            <label htmlFor="email" className="block">Email</label>
                            <animated.input type="email" id="email" name="email" value={gigData.email} onChange={handleChange} placeholder="Enter your Service email" style={inputAnimation} className="w-full h-full border border-black rounded p-2 border-gray-400 rounded-l-md py-2 px-4 w-96 focus:outline-none focus:ring-1 focus:ring-slate-950" />
                        </div>
                        <div className="gigphone mb-4">
                            <label htmlFor="phoneNumber" className="block">Phone Number</label>
                            <animated.input type="tel" id="phoneNumber" name="phoneNumber" value={gigData.phoneNumber} onChange={handleChange} placeholder="Enter Phone Number" style={inputAnimation} className="w-full h-full border border-black rounded p-2 border-gray-400 rounded-l-md py-2 px-4 w-96 focus:outline-none focus:ring-1 focus:ring-slate-950" />
                        </div>
                        <div className="gigaddress mb-4">
                            <label htmlFor="address" className="block">Address</label>
                            <animated.input type="text" id="address" name="address" value={gigData.address} onChange={handleChange} placeholder="Enter your address" style={inputAnimation} className="w-full h-full border border-black rounded p-2 border-gray-400 rounded-l-md py-2 px-4 w-96 focus:outline-none focus:ring-1 focus:ring-slate-950" />
                        </div>
                        <div className="giglocality mb-4">
                            <label htmlFor="locality" className="block">Locality</label>
                            <Autocomplete
                                apiKey="AIzaSyDjLpn8fDYOJJ9Yj7PVsJzslIiVfk2iiHg"
                                className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-custom-green focus:border-transparent"
                                options={{ componentRestrictions: { country: "in" } }}
                                onPlaceSelected={handlePlaceSelected}
                                onKeyDown={handleAutocompleteKeyDown}
                            />
                        </div>
                        <div className="gigperv mb-8">
                            <label htmlFor="demoPics" className="block">Proof of Work</label>
                            <animated.input type="file" id="demoPics" name="demoPics" accept="image/png, image/jpeg" multiple onChange={handleDemoPicsChange} style={inputAnimation} className="w-full h-full border border-black rounded p-2 border-gray-400 rounded-l-md py-2 px-4 w-96 focus:outline-none focus:ring-1 focus:ring-slate-950" />
                        </div>
                        <div className="gigperv mb-8">
                            <label htmlFor="gigPdf" className="block">PCC Certificate PDF</label>
                            <animated.input type="file" id="gigPdf" name="gigPdf" accept=".pdf" onChange={handlePdfChange} style={inputAnimation} className="w-full h-full border border-black rounded p-2 border-gray-400 rounded-l-md py-2 px-4 w-96 focus:outline-none focus:ring-1 focus:ring-slate-950" />
                        </div>
                        <div className="gigsubmit flex justify-center">
                            {loading ? (
                                <ClipLoader size={35} color={"#123abc"} loading={loading} />
                            ) : (
                                <input type="submit" value="Publish Gig" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer text-lg" />
                            )}
                        </div>
                        {error && (
                            <div className="error-message text-red-500 text-center mt-4">
                                {error}
                            </div>
                        )}
                    </form>
                </animated.div>
            </div>
        </div>
    );
};

export default Gigcreate;
