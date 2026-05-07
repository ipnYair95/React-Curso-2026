
export const CustomFullScreenLoading = () => {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div id="spinner" className="w-12 h-12 rounded-full border-4 border-t-4 border-blue-600 animate-spin"></div> 
                <p className="text-sm font-light text-gray-500 animate-pulse">Cargando...</p>
            </div>
        </div>
    )
}
