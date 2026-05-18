export const mergeIssues = (current,icoming) =>{
    const map = new Map();

    current.forEach(issue => {
        map.set(issue.fingerprint,issue);
    })

    icoming.forEach(issue =>{
        const existing = map.get(issue.fingerprint);

        if(existing){
            map.set(issue.fingerprint,{
                ...existing,
                ...issue,
                count: Math.max(
                    existing.count,
                    issue.count
                ),
                realtime: false
            });
        }else{
            map.set(issue.fingerprint,issue);
        }
    });

    return Array.from(map.values()).sort((a,b)=>new Date(b.last_seen)- new Date(a.last_seen)).slice(0,500);
};