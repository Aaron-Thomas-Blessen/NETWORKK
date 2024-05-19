import React, { useState, useEffect } from 'react';
import GigCard from '../../components/GigCard';
import Navbarsign from '../../components/navsign';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../Firebase/Firebase';
import ClipLoader from 'react-spinners/ClipLoader';

const AdminGigs = () => {
    const [pendingGigs, setPendingGigs] = useState([]);
    const [acceptedGigs, setAcceptedGigs] = useState([]);
    const [rejectedGigs, setRejectedGigs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGigs = async () => {
            try {
                const pendingCollectionRef = collection(db, 'services');
                const pendingQuery = query(pendingCollectionRef, where('status', '==', 'Pending'));
                const pendingQuerySnapshot = await getDocs(pendingQuery);
                const pendingGigs = pendingQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPendingGigs(pendingGigs);

                const acceptedCollectionRef = collection(db, 'services');
                const acceptedQuery = query(acceptedCollectionRef, where('status', '==', 'Accepted'));
                const acceptedQuerySnapshot = await getDocs(acceptedQuery);
                const acceptedGigs = acceptedQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setAcceptedGigs(acceptedGigs);

                const rejectedCollectionRef = collection(db, 'services');
                const rejectedQuery = query(rejectedCollectionRef, where('status', '==', 'Rejected'));
                const rejectedQuerySnapshot = await getDocs(rejectedQuery);
                const rejectedGigs = rejectedQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setRejectedGigs(rejectedGigs);
            } catch (error) {
                console.error('Error fetching gigs: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGigs();
    }, []);

    const handleApprove = async (gigId) => {
        try {
            const gigRef = doc(db, 'services', gigId);
            await updateDoc(gigRef, { status: 'Accepted' });
        } catch (error) {
            console.error('Error approving gig: ', error);
        }
    };

    const handleReject = async (gigId) => {
        try {
            const gigRef = doc(db, 'services', gigId);
            await updateDoc(gigRef, { status: 'Rejected' });
        } catch (error) {
            console.error('Error rejecting gig: ', error);
        }
    };

    const isAdminLoggedIn = localStorage.getItem('isAdmin') === 'true';

    if (!isAdminLoggedIn) {
        return <div className="text-center mt-10">Please sign in to access this page.</div>;
    }

    return (
        <div>
            <Navbarsign />
            <div className="mt-20 px-4 md:px-8 container mx-auto p-4">
                {loading ? (
                    <div className="flex justify-center items-center h-80">
                        <ClipLoader size={50} color={"#123abc"} loading={loading} />
                    </div>
                ) : (
                    <>
                        <h1 className="text-2xl font-semibold mb-4">Pending Gigs</h1>
                        <div className="flex flex-col gap-4">
                            {pendingGigs.map(gig => (
                                <GigCard
                                    key={gig.id}
                                    gig={gig}
                                    onApprove={handleApprove}
                                    onReject={handleReject}
                                    className="shadow-lg transition-transform transform hover:scale-105"
                                />
                            ))}
                        </div>

                        <h1 className="text-2xl font-semibold mb-4 mt-8">Accepted Gigs</h1>
                        <div className="flex flex-col gap-4">
                            {acceptedGigs.map(gig => (
                                <GigCard
                                    key={gig.id}
                                    gig={gig}
                                    className="shadow-lg transition-transform transform hover:scale-105"
                                />
                            ))}
                        </div>

                        <h1 className="text-2xl font-semibold mb-4 mt-8">Rejected Gigs</h1>
                        <div className="flex flex-col gap-4">
                            {rejectedGigs.map(gig => (
                                <GigCard
                                    key={gig.id}
                                    gig={gig}
                                    className="shadow-lg transition-transform transform hover:scale-105"
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminGigs;
