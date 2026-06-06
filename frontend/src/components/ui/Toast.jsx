import React, { createContext, useCallback, useContext, useState } from 'react'

const ToastContext = createContext(null);

export const ToastProvider = ({children}) => {
    const [toasts,setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    },[])

    const toast = useCallback((message,type="success")=>{
        const id = Date.now();
        setToasts((prev) => [...prev,{id,message,type}]);

        setTimeout(()=> removeToast(id),4000);
    },[removeToast]);

    const typeStyles = {
        // Light mode (default) vs Dark mode (overrides)
        success: "bg-white text-gray-900 border-gray-300 dark:bg-black dark:text-white dark:border-gray-800",

        error: "bg-red-400/60 text-red-500 border-red-200 dark:bg-red-900 dark:text-red-400 dark:border-red-800"
    };

  return (
    <ToastContext.Provider value={{toast}}>
        {children}
          <div className="fixed top-5 left-1/2 -translate-x-1/2 flex flex-col gap-2 z-500 w-full max-w-[90%] sm:max-w-sm px-4">
              {toasts.map((t) => (
                  <div
                      key={t.id}
                      className={`animate-slide-in flex items-start justify-between w-full h-auto p-3 rounded-lg border transition-all ${typeStyles[t.type] || typeStyles.success}`}
                  >
                      <span className="text-sm sm:text-base wrap-break-words leading-tight font-medium">
                          {t.message}
                      </span>
                      <button
                          onClick={() => removeToast(t.id)}
                          className="ml-4 opacity-70 hover:opacity-100 shrink-0 font-bold"
                      >
                          ✕
                      </button>
                  </div>
              ))}
          </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useToast must be used within a ToastProvider");
    return context.toast;
};