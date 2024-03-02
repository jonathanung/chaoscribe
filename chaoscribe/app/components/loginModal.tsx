import Link from "next/link";

export default function LoginModal({ setShowLoginModal }: { setShowLoginModal: (showLoginModal: boolean) => void; }) {
    const closeLoginModal = () => {
        setShowLoginModal(false);
    }
    return (
        <dialog
            className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
            <div className="bg-white m-auto p-8">
                <button type="button" className="text-s mb-5 border rounded-lg dark:border-gray-700 px-2" onClick={closeLoginModal}>{`x`}</button>
                <div className="flex flex-col items-center">
                        <p className="mb-5">Log in to access features, such as liking, commenting and sharing posts.</p>
                        <Link href="/login" className="text-sm font-medium text-gray-900 dark:text-white bg-green-500 px-3 py-1 rounded-md hover:bg-green-600 transition-colors duration-300 ease-in-out">
                            Login
                        </Link>
                </div>
            </div>
        </dialog>
    )
}