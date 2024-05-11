import React, { useState, useEffect } from 'react';
import { useFirestore } from '../../Context/Context';
import GigCard from '../../components/GigCard';
import Navbarsign from '../../components/navsign';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../Firebase/Firebase';

const AdminGigs = () => {
    const firestore = useFirestore();
    const [pendingGigs, setPendingGigs] = useState([]);
    const [acceptedGigs, setAcceptedGigs] = useState([]);
    const [rejectedGigs, setRejectedGigs] = useState([]);
    const [showPending, setShowPending] = useState(true);
    const [showAccepted, setShowAccepted] = useState(false);
    const [showRejected, setShowRejected] = useState(false);

    useEffect(() => {
        const fetchPendingGigs = async () => {
            try {
                const collectionRef = collection(db, 'services');
                const q = query(collectionRef, where('status', '==', 'Pending'));
                const querySnapshot = await getDocs(q);
                const gigs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPendingGigs(gigs);
            } catch (error) {
                console.error('Error fetching pending gigs: ', error);
            }
        };

        const fetchAcceptedGigs = async () => {
            try {
                const collectionRef = collection(db, 'services');
                const q = query(collectionRef, where('status', '==', 'Accepted'));
                const querySnapshot = await getDocs(q);
                const gigs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setAcceptedGigs(gigs);
            } catch (error) {
                console.error('Error fetching accepted gigs: ', error);
            }
        };

        const fetchRejectedGigs = async () => {
            try {
                const collectionRef = collection(db, 'services');
                const q = query(collectionRef, where('status', '==', 'Rejected'));
                const querySnapshot = await getDocs(q);
                const gigs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setRejectedGigs(gigs);
            } catch (error) {
                console.error('Error fetching rejected gigs: ', error);
            }
        };

        fetchPendingGigs();
        fetchAcceptedGigs();
        fetchRejectedGigs();
    }, [firestore]);

    const handleApprove = async (gigId) => {
        try {
            const gigRef = doc(firestore, 'services', gigId);
            await updateDoc(gigRef, { status: 'Accepted' });
            setPendingGigs(prevGigs => prevGigs.filter(gig => gig.id !== gigId));
        } catch (error) {
            console.error('Error approving gig: ', error);
        }
    };

    const handleReject = async (gigId) => {
        try {
            const gigRef = doc(firestore, 'services', gigId);
            await updateDoc(gigRef, { status: 'Rejected' });
            setPendingGigs(prevGigs => prevGigs.filter(gig => gig.id !== gigId));
        } catch (error) {
            console.error('Error rejecting gig: ', error);
        }
    };

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
