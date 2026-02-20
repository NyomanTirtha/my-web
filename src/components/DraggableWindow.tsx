import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface WindowProps {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    initialPosition?: { x: number; y: number };
    isMuted?: boolean;
    windowClassName?: string;
    stickyHeader?: React.ReactNode;
    zIndex?: number;
    onFocus?: () => void;
}

export const DraggableWindow = ({
    title,
    children,
    isOpen,
    onClose,
    initialPosition = { x: 0, y: 0 },
    isMuted = false,
    windowClassName = 'w-[800px]',
    stickyHeader,
    zIndex = 50,
    onFocus,
}: WindowProps) => {
    const handleClose = () => {
        if (!isMuted) {
            const audio = new Audio('/sfx/button-click-2.mp3');
            audio.volume = 0.5;
            audio.play().catch(e => console.error("Audio play failed", e));
        }
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center pointer-events-none"
                    style={{ zIndex }}
                >
                    <motion.div
                        drag
                        dragMomentum={false}
                        initial={{ opacity: 0, scale: 0.9, x: initialPosition.x, y: initialPosition.y }}
                        animate={{ opacity: 1, scale: 1, x: initialPosition.x, y: initialPosition.y }}
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                        onMouseDown={onFocus}
                        className={`${windowClassName} bg-neutral-900/80 backdrop-blur-xl border border-neutral-700 rounded-xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto`}
                    >
                        {/* Window Header */}
                        <div className="h-11 bg-neutral-800/50 border-b border-neutral-700 flex items-center justify-between px-4">
                            <span className="text-sm font-medium text-neutral-400">
                                {title}
                            </span>
                            <button
                                onClick={handleClose}
                                className="w-6 h-6 flex items-center justify-center rounded transition-transform hover:scale-110 active:scale-90"
                            >
                                <X size={16} className="text-neutral-400 hover:text-white" />
                            </button>
                        </div>

                        {/* Sticky Header Content */}
                        {stickyHeader && (
                            <div className="px-8 pt-6 pb-4 flex-shrink-0">
                                {stickyHeader}
                            </div>
                        )}

                        {/* Scrollable Content */}
                        <div className={`px-8 pb-8 ${stickyHeader ? '' : 'pt-8 flex-1 flex items-center'} text-neutral-300 text-base leading-relaxed overflow-y-auto max-h-[60vh] custom-scrollbar`}>
                            <div className="w-full">
                                {children}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
