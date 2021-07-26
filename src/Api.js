import axios from "axios";
import wifi from "./wifi";
import Auth from "./Auth";
const api = axios.create({
    baseURL:`${wifi}`,
    headers:{
        "Authorization":`Bearer ${Auth.getAccessToken()}`
    }
});


export const portFolioApi = {
    getPosition : () => api.get("api/user/portfolio/positions"),
    getStackList : () => api.get("api/user/portfolio/stacks"),
    getEducationList : () => api.get("api/user/portfolio/educations"),
    getPortFolioList : () => api.get("api/user/portfolios"),
    getPortFolio : (idx) => api.get(`api/user/portfolio?portfolio_idx=${idx}`),
    savePorFolio : (data) => api.post('/api/user/portfolio',{
        "idx":data.Idx,
        "title": data.title,
        "content": data.content,
        "project":[
            ...data.project
        ],
        "positions":[{
            "idx":data.positionIdx
        }],
        "tech" :[
            ...data.stack
        ],
        "education": {
            "idx":data.educationIdx
        }
    })
}

export const studyApi = {
    getCategoryList : () => api.get("api/user/study/categories"),
    getStudyList : (applied)=> api.get(`api/user/studies?applied=${applied}`),
    saveRecruit : (data) => api.post("api/user/study/announcement",{
        studyIdx:data.studyIdx,
        title:data.title,
        content:data.content,
        demandPosition:[...data.demandPosition]
    })
    
}