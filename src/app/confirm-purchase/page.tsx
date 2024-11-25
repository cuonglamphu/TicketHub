'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { ticketService } from '@/services/ticketService';
import { getStoredUser } from '@/utils/auth';
import { motion, AnimatePresence } from 'framer-motion';

const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]";
const pixelFont = { fontFamily: "'VT323', monospace" };

export default function ConfirmPurchasePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isProcessing, setIsProcessing] = useState(false);
    const [purchaseStatus, setPurchaseStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
    const [purchaseDetails, setPurchaseDetails] = useState<any>(null);

    useEffect(() => {
        // Lấy thông tin từ URL parameters
        const details = {
            eventId: searchParams.get('eventId'),
            eventName: searchParams.get('eventName'),
            ticketId: searchParams.get('ticketId'),
            ticketType: searchParams.get('ticketType'),
            quantity: Number(searchParams.get('quantity')),
            total: Number(searchParams.get('total')),
            unitPrice: Number(searchParams.get('unitPrice'))
        };
        setPurchaseDetails(details);
    }, [searchParams]);

    const handleConfirmPurchase = async () => {
        if (isProcessing) return;
        
        try {
            setIsProcessing(true);
            setPurchaseStatus('processing');
            const user = getStoredUser();
            
            if (!user) {
                setPurchaseStatus('error');
                toast.error('Please sign in to purchase tickets');
                router.push('/signin');
                return;
            }

            const response = await ticketService.purchaseTicket({
                userId: user.userId,
                data: {
                    ticketId: purchaseDetails.ticketId,
                    quantity: purchaseDetails.quantity
                }
            });

            if (response.saleId) {
                setPurchaseStatus('success');
                toast.success('Purchase successful! Redirecting to My Tickets...');
                
                // Đợi animation hoàn thành rồi mới redirect
                setTimeout(() => {
                    router.push('/tickets');
                }, 3000);
            }

        } catch (error: any) {
            setPurchaseStatus('error');
            console.error('Purchase failed:', error);
            if (error.response?.status === 400) {
                toast.error(error.response.data.message || 'Not enough tickets available');
            } else {
                toast.error('Purchase failed. Please try again.');
            }
        } finally {
            setIsProcessing(false);
        }
    };

    const renderProcessingState = () => {
        const states = {
            idle: null,
            processing: (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm"
                >
                    <motion.div 
                        className="bg-[#4CAF50] p-8 rounded-lg flex flex-col items-center"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        <Loader2 className="h-16 w-16 text-[#FFEB3B] animate-spin mb-4" />
                        <p className="text-white text-xl" style={pixelFont}>Processing your purchase...</p>
                    </motion.div>
                </motion.div>
            ),
            success: (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm"
                >
                    <motion.div 
                        className="bg-[#4CAF50] p-8 rounded-lg flex flex-col items-center"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            <CheckCircle2 className="h-16 w-16 text-[#FFEB3B] mb-4" />
                        </motion.div>
                        <p className="text-white text-xl" style={pixelFont}>Purchase Successful!</p>
                        <p className="text-white mt-2" style={pixelFont}>Redirecting to My Tickets...</p>
                    </motion.div>
                </motion.div>
            ),
            error: (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm"
                >
                    <motion.div 
                        className="bg-red-500 p-8 rounded-lg flex flex-col items-center"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            <XCircle className="h-16 w-16 text-white mb-4" />
                        </motion.div>
                        <p className="text-white text-xl" style={pixelFont}>Purchase Failed</p>
                        <Button 
                            onClick={() => setPurchaseStatus('idle')}
                            className="mt-4 bg-white text-red-500 hover:bg-gray-100"
                            style={pixelFont}
                        >
                            Try Again
                        </Button>
                    </motion.div>
                </motion.div>
            )
        };

        return states[purchaseStatus];
    };

    if (!purchaseDetails) return null;

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d] flex items-center justify-center px-4 relative">
            <motion.div 
                className={`bg-[#4CAF50] p-8 ${pixelBorder} max-w-md w-full relative`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold text-[#FFEB3B] mb-6" style={pixelFont}>
                    Confirm Your Purchase
                </h1>

                <div className="space-y-4 mb-6">
                    <div className="bg-black/20 p-4 rounded">
                        <h2 className="text-xl text-white mb-4" style={pixelFont}>
                            Purchase Details
                        </h2>
                        <div className="space-y-2 text-white" style={pixelFont}>
                            <p>Event: {purchaseDetails.eventName}</p>
                            <p>Ticket Type: {purchaseDetails.ticketType}</p>
                            <p>Quantity: {purchaseDetails.quantity}</p>
                            <p>Price per ticket: ${purchaseDetails.unitPrice}</p>
                            <p className="text-xl text-[#FFEB3B] pt-2">
                                Total: ${purchaseDetails.total}
                            </p>
                        </div>
                    </div>
                </div>

                <Button
                    onClick={handleConfirmPurchase}
                    disabled={isProcessing}
                    className={`
                        w-full ${pixelBorder} bg-[#FFEB3B] text-black hover:bg-[#FDD835] 
                        text-xl h-14 relative overflow-hidden
                        ${isProcessing ? 'cursor-not-allowed opacity-70' : ''}
                    `}
                    style={pixelFont}
                >
                    Confirm Purchase
                </Button>
            </motion.div>

            <AnimatePresence>
                {renderProcessingState()}
            </AnimatePresence>
        </div>
    );
}
