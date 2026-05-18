const breadcrumbs = [];

const MAX_BREADCRUMBS = 20;

export const addBreadcrumb = (type,data) =>{
    breadcrumbs.push({
        type,
        data,
        timestamp: new Date().toISOString(),
    });

    if(breadcrumbs.length > MAX_BREADCRUMBS){
        breadcrumbs.shift()
    }
};

export const getBreadcrumbs = () => {
    return [...breadcrumbs];
};


export const initBreadcrumbs = () =>{
    document.addEventListener("click",(e)=>{
        const target = e.target;

        addBreadcrumb("click",{
            tag:target?.tagName,
            text:target?.innerText?.slice(0,100),
        });
    });

    window.addEventListener("popstate",()=>{
        addBreadcrumb("navigation",{
            url:location.href,
        });
    });
};