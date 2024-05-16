import React, { useState } from 'react';
import Navbar from "../../components/nav";
import { useUser } from '../../Context/Context';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import Autocomplete from "react-google-autocomplete";

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
        console.log("Place selected:", { locality, latitude, longitude }); // Debugging log
        setGigData(prevState => ({
            ...prevState,
            locality,
            latitude,
            longitude
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const db = getFirestore();
        const storage = getStorage();

        console.log("Submitting gig with data:", gigData); // Debugging log

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
        }
    };

    return (
        <div className="Gigcreate">
            <Navbar />
            <div className="flex flex-col items-center justify-center mt-8">
                <div className="gig-container rounded-lg p-8 mb-8 w-96 border border-gray-400 rounded-l-md">
                    <div className="gigcreate">
                        <h1 className="text-3xl text-center mb-4">Create your Gig</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="gigtitle mb-4">
                            <label htmlFor="title" className="block">Gig Title</label>
                            <input type="text" id="title" name="title" value={gigData.title} onChange={handleChange} placeholder="Enter your Gig title" className="w-full h-full border border-black rounded p-2 border-gray-400 rounded-l-md py-2 px-4 w-96 focus:outline-none focus:ring-1 focus:ring-slate-950" />
                        </div>
                        <div className="giglocality mb-4">
                            <label htmlFor="locality" className="block">Locality</label>
                            <Autocomplete
                                apiKey="AIzaSyDjLpn8fDYOJJ9Yj7PVsJzslIiVfk2iiHg"
                                className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-custom-green focus:border-transparent"
                                options={{ componentRestrictions: { country: "in" } }}
                                onPlaceSelected={handlePlaceSelected}
                            />
                        </div>
                        <div className="gigcat mb-4">
                            <label htmlFor="category" className="block">Gig Category</label>
                            <select id="category" name="category" value={gigData.category} onChange={handleChange} className="w-full h-full border border-black rounded p-2 border-gray-400 rounded-l-md py-2 px-4 w-96 focus:outline-none focus:ring-1 focus:ring-slate-950">
                                <option value="">Select Gig Category</option>
                                <option value="Carpenter">Carpenter</option>
                                <option value="Plumber">Plumber</option>
                                <option value="Electrician">Electrician</option>
                                <option value="Mechanic">Mechanic</option>
                                <option value="Mason">Mason</option>
                                <option value="Laundry">Laundry</option>
                            </select>
                        </div>
                        <div className="gigbaseprice mb-4">
                            <label htmlFor="basePrice" className="block">Base Price</label>
                            <input type="number" id="basePrice" name="basePrice" value={gigData.basePrice} onChange={handleChange} placeholder="Enter Base Price" className="w-full h-full border border-black rounded p-2 border-gray-400 rounded-l-md py-2 px-4 w-96 focus:outline-none focus:ring-1 focus:ring-slate-950" />
                        </div>
                        <div className="gigdes mb-4">
                            <label htmlFor="description" className="block">Description</label>
                            <textarea id="description" name="description" value={gigData.description} onChange={handleChange} placeholder="Enter Description" className="w-full h-full border border-black rounded p-2 border-gray-400 rounded-l-md py-2 px-4 w-96 focus:outline-none focus:ring-1 focus:ring-slate-950"></textarea>
                        </div>
                        <div className="gigemail mb-4">
                            <label htmlFor="email" className="block">Email</label>
                            <input type="email" id="email" name="email" value={gigData.email} onChange={handleChange} placeholder="Enter your Gig email" className="w-full h-full border border-black rounded p-2 border-gray-400 rounded-l-md py-2 px-4 w-96 focus:outline-none focus:ring-1 focus:ring-slate-950" />
                        </div>
                        <div className="gigphone mb-4">
                            <label htmlFor="phoneNumber" className="block">Phone Number</label>
                            <input type="tel" id="phoneNumber" name="phoneNumber" value={gigData.phoneNumber} onChange={handleChange} placeholder="Enter Phone Number" className="w-full h-full border border-black rounded p-2 border-gray-400 rounded-l-md py-2 px-4 w-96 focus:outline-none focus:ring-1 focus:ring-slate-950" />
                        </div>
                        <div className="gigaddress mb-4">
                            <label htmlFor="address" className="block">Address</label>
                            <input type="text" id="address" name="address" value={gigData.address} onChange={handleChange} placeholder="Enter your address" className="w-full h-full border border-black rounded p-2 border-gray-400 rounded-l-md py-2 px-4 w-96 focus:outline-none focus:ring-1 focus:ring-slate-950" />
                        </div>
                        <div className="gigperv mb-8">
                            <div className="">
                                <label htmlFor="demoPics" className="block">Proof of Work</label>
                                <input className="w-full h-full border border-black rounded p-2 border-gray-400 rounded-l-md py-2 px-4 w-96 focus:outline-none focus:ring-1 focus:ring-slate-950" type="file" id="demoPics" name="demoPics" accept="image/png, image/jpeg" multiple onChange={handleDemoPicsChange} />
                            </div>
                        </div>
                        <div className="gigperv mb-8">
                            <div className="">
                                <label htmlFor="gigPdf" className="block">PCC Certificate PDF</label>
                                <input className="w-full h-full border border-black rounded p-2 border-gray-400 rounded-l-md py-2 px-4 w-96 focus:outline-none focus:ring-1 focus:ring-slate-950" type="file" id="gigPdf" name="gigPdf" accept=".pdf" onChange={handlePdfChange} />
                            </div>
                        </div>
                        <div className="gigsubmit flex justify-center">
                        <input type="submit" value="Publish Gig" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer text-lg" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Gigcreate;
