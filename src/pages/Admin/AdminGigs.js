import React, { useState, useEffect } from 'react';
import GigCard from '../../components/GigCard';
import Navbarsign from '../../components/navsign';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../Firebase/Firebase';

const AdminGigs = () => {
    const [pendingGigs, setPendingGigs] = useState([]);
    const [acceptedGigs, setAcceptedGigs] = useState([]);
    const [rejectedGigs, setRejectedGigs] = useState([]);
    const [showPending, setShowPending] = useState(true);
    const [showAccepted, setShowAccepted] = useState(false);
    const [showRejected, setShowRejected] = useState(false);

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
            }
        };

        fetchGigs();
    }, []);

    const handleApprove = async (gigId) => {
        try {
            const gigRef = doc(db, 'services', gigId);
            await updateDoc(gigRef, { status: 'Accepted' });
            setPendingGigs(prevGigs => prevGigs.filter(gig => gig.id !== gigId));
            setAcceptedGigs(prevGigs => [...prevGigs, { id: gigId, status: 'Accepted' }]);
        } catch (error) {
            console.error('Error approving gig: ', error);
        }
    };

    const handleReject = async (gigId) => {
        try {
            const gigRef = doc(db, 'services', gigId);
            await updateDoc(gigRef, { status: 'Rejected' });
            setPendingGigs(prevGigs => prevGigs.filter(gig => gig.id !== gigId));
            setRejectedGigs(prevGigs => [...prevGigs, { id: gigId, status: 'Rejected' }]);
        } catch (error) {
            console.error('Error rejecting gig: ', error);
        }
    };

    const isAdminLoggedIn = localStorage.getItem('isAdmin') === 'true';

    if (!isAdminLoggedIn) {
        return <div>Please sign in to access this page.</div>;
    }

    return (
        <div>
            <Navbarsign />
            <div className="admin-page">
                <h1 onClick={() => setShowPending(!showPending)}>Pending Gigs</h1>
                {showPending && (
                    <div className="gig-cards">
                        {pendingGigs.map(gig => (
                            <GigCard
                                key={gig.id}
                                gig={gig}
                                onApprove={() => handleApprove(gig.id)}
                                onReject={() => handleReject(gig.id)}
                            />
                        ))}
                    </div>
                )}
            </div>
            <div className="admin-page">
                <h1 onClick={() => setShowAccepted(!showAccepted)}>Accepted Gigs</h1>
                {showAccepted && (
                    <div className="gig-cards">
                        {acceptedGigs.map(gig => (
                            <GigCard
                                key={gig.id}
                                gig={gig}
                            />
                        ))}
                    </div>
                )}
            </div>
            <div className="admin-page">
                <h1 onClick={() => setShowRejected(!showRejected)}>Rejected Gigs</h1>
                {showRejected && (
                    <div className="gig-cards">
                        {rejectedGigs.map(gig => (
                            <GigCard
                                key={gig.id}
                                gig={gig}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminGigs;
