import { useState, useEffect } from "react"
import { getCompanies } from "../services/CompanyService"
import type { company } from "../types/company"

function CompanyCard(){
    const [companies , setCompanies] = useState <company[]>([]);
    const fetchCompanies = async()=>{
        const companiesData = await getCompanies()
        setCompanies(companiesData)
    }
    useEffect(()=>{
        fetchCompanies()
    },[])
    return (
        <div>
            {companies.map((c)=> (
                <div key = {c.id}>
                    <h1> {c.name}</h1>
                    <p>Email: {c.email}</p>
                    <p>Phone: {c.phone}</p>
                    <p>Location: {c.location}</p>
                    <hr></hr>
                </div>
            ))}
        </div>
    )
}
export default CompanyCard